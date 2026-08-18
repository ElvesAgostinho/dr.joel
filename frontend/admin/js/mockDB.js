// mockDB.js - Ponte sincronizada entre LocalStorage (Offline Cache) e Supabase (Base de Dados Global)
const DB_KEY = 'mj_blog_posts';
const STATS_KEY = 'mj_site_stats';
const TEAM_KEY = 'mj_team';

const SUPABASE_URL = 'https://ulymellasjmsejgeutyt.supabase.co/rest/v1';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseW1lbGxhc2ptc2VqZ2V1dHl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NzU0NzQsImV4cCI6MjA4ODA1MTQ3NH0.wSa6XbIylhl7ChzeD9oqGu5NzN4_0E1cWHYeUmeBAkY';

// FIX: Guard para evitar sincronizações concorrentes
var _syncInProgress = {};

// Helper de requisições ASSÍNCRONAS para escrita segura e compatível com CORS em todos os browsers
function makeRequestAsync(method, path, body) {
    var headers = {
        'apikey': SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    };

    var sessionRaw = localStorage.getItem('mj_admin_session');
    if (sessionRaw) {
        try {
            var session = JSON.parse(sessionRaw);
            if (session && session.access_token) {
                headers['Authorization'] = 'Bearer ' + session.access_token;
            }
        } catch(e) {}
    }

    return fetch(SUPABASE_URL + path, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : undefined
    })
    .then(function(res) {
        if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('mj_admin_session');
            // Só redirecionar se estivermos numa página admin
            if (window.location.pathname.indexOf('/admin/') !== -1 ||
                window.location.pathname.indexOf('admin/') !== -1) {
                alert('Sessão expirada. Por favor, inicie sessão novamente.');
                window.location.href = 'login.html';
            }
            throw new Error('Auth expired');
        }
        if (!res.ok) throw new Error('Request failed with status ' + res.status);
        return res.text().then(function(text) { return text ? JSON.parse(text) : {}; });
    });
}

// FIX: syncTable agora atualiza localStorage silenciosamente sem causar reload
// Dispara evento customizado 'mj:db-updated' para que as páginas re-renderizem se necessário
function syncTable(endpoint, localStorageKey, mapFunction) {
    // Evitar chamadas concorrentes para o mesmo endpoint
    if (_syncInProgress[endpoint]) return;
    _syncInProgress[endpoint] = true;

    var headers = {
        'apikey': SUPABASE_ANON_KEY,
        'Content-Type': 'application/json'
    };

    fetch(SUPABASE_URL + '/' + endpoint, {
        method: 'GET',
        headers: headers
    })
    .then(function(res) {
        if (res.ok) return res.json();
        throw new Error('Fetch failed with status ' + res.status);
    })
    .then(function(data) {
        var mapped = data.map(mapFunction);
        var oldLocal = localStorage.getItem(localStorageKey);
        var newLocalJson = JSON.stringify(mapped);

        // FIX: Atualizar silenciosamente — SEM window.location.reload()
        if (oldLocal !== newLocalJson) {
            localStorage.setItem(localStorageKey, newLocalJson);
            // Disparar evento customizado para re-renderização sem reload
            try {
                window.dispatchEvent(new CustomEvent('mj:db-updated', {
                    detail: { key: localStorageKey }
                }));
            } catch(e) {}
        }
    })
    .catch(function(err) {
        console.warn('Erro na sincronização de segundo plano para: ' + endpoint, err);
    })
    .finally(function() {
        _syncInProgress[endpoint] = false;
    });
}

// Gerador de UUID para chaves primárias do Supabase
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Inicializar Sincronização em Segundo Plano (SWR) ao carregar a página
if (typeof window !== 'undefined') {
    // Sincronizar membros
    syncTable('team?order=created_at.desc', TEAM_KEY, function(row) {
        return {
            id: row.id,
            name: row.name,
            role: row.role,
            area: row.area,
            img: row.img,
            email: row.email,
            phone: row.phone,
            bio: row.bio,
            habilitacoes: row.habilitacoes,
            experiencia: row.experiencia,
            associacoes: row.associacoes,
            linguas: row.linguas,
            cv: row.cv,
            createdAt: new Date(row.created_at).getTime()
        };
    });

    // Sincronizar posts
    syncTable('posts?order=created_at.desc', DB_KEY, function(row) {
        return {
            id: row.id,
            title: row.title,
            content: row.content,
            coverImage: row.cover_image,
            published: row.published,
            createdAt: new Date(row.created_at).getTime(),
            category: row.category || 'ARTIGO'
        };
    });

    // Sincronizar artes
    syncTable('artes?order=created_at.desc', 'mj_artes', function(row) {
        return {
            id: row.id,
            title: row.title,
            image: row.image,
            description: row.description,
            createdAt: new Date(row.created_at).getTime()
        };
    });

    // Sincronizar expertise
    syncTable('expertise?order=created_at.desc', 'mj_expertise', function(row) {
        return {
            id: row.id,
            title: row.title,
            description: row.description,
            createdAt: new Date(row.created_at).getTime()
        };
    });

    // Sincronizar páginas sobre nós
    syncTable('sobrenos_pages', 'mj_sobrenos', function(row) {
        return {
            id: row.id,
            title: row.title,
            content: row.content,
            lastUpdated: new Date(row.last_updated).getTime()
        };
    });
}

const MockDB = {
    // --- GESTÃO DE POSTS ---
    getPosts: function() {
        var local = localStorage.getItem(DB_KEY);
        return local ? JSON.parse(local) : [];
    },

    getPost: function(id) {
        var posts = this.getPosts();
        return posts.find(function(p) { return p.id === id; });
    },

    savePost: function(post) {
        var isNew = !post.id;
        var payload = {
            title: post.title,
            content: post.content,
            cover_image: post.coverImage,
            published: post.published === true || post.published === 'true',
            category: post.category || 'ARTIGO'
        };

        var promise;
        if (isNew) {
            payload.id = generateUUID();
            promise = makeRequestAsync('POST', '/posts', payload);
        } else {
            promise = makeRequestAsync('PATCH', '/posts?id=eq.' + post.id, payload);
        }

        return promise.then(function() {
            var posts = MockDB.getPosts();
            if (isNew) {
                posts.unshift(Object.assign({ createdAt: Date.now() }, payload));
            } else {
                var index = posts.findIndex(function(p) { return p.id === post.id; });
                if (index !== -1) posts[index] = Object.assign({}, posts[index], payload);
            }
            localStorage.setItem(DB_KEY, JSON.stringify(posts));
            return post;
        });
    },

    deletePost: function(id) {
        return makeRequestAsync('DELETE', '/posts?id=eq.' + id).then(function() {
            var posts = MockDB.getPosts().filter(function(p) { return p.id !== id; });
            localStorage.setItem(DB_KEY, JSON.stringify(posts));
        });
    },

    togglePublish: function(id) {
        var post = this.getPost(id);
        if (post) {
            post.published = !post.published;
            return this.savePost(post);
        }
        return Promise.resolve();
    },

    // --- GESTÃO DE ESTATÍSTICAS ---
    getStats: function() {
        var data = localStorage.getItem(STATS_KEY);
        if (!data) {
            return {
                pessoas: 550,
                advogados: 9,
                jurisdicoes: 21
            };
        }
        return JSON.parse(data);
    },

    saveStats: function(stats) {
        localStorage.setItem(STATS_KEY, JSON.stringify(stats));
        return stats;
    },

    // --- GESTÃO DE EQUIPA ---
    getTeam: function() {
        var local = localStorage.getItem(TEAM_KEY);
        return local ? JSON.parse(local) : [];
    },

    getMember: function(id) {
        var team = this.getTeam();
        return team.find(function(m) { return m.id === id; });
    },

    saveMember: function(member) {
        var isNew = !member.id || member.id.startsWith('tm_');
        var payload = {
            name: member.name,
            role: member.role,
            area: member.area,
            img: member.img,
            email: member.email,
            phone: member.phone,
            bio: member.bio,
            cv: member.cv,
            habilitacoes: member.habilitacoes,
            experiencia: member.experiencia,
            associacoes: member.associacoes,
            linguas: member.linguas
        };

        var promise;
        if (isNew) {
            payload.id = generateUUID();
            promise = makeRequestAsync('POST', '/team', payload);
        } else {
            promise = makeRequestAsync('PATCH', '/team?id=eq.' + member.id, payload);
        }

        return promise.then(function() {
            var team = MockDB.getTeam();
            if (isNew) {
                team.push(Object.assign({ createdAt: Date.now() }, payload));
            } else {
                var index = team.findIndex(function(m) { return m.id === member.id; });
                if (index !== -1) team[index] = Object.assign({}, team[index], payload);
            }
            localStorage.setItem(TEAM_KEY, JSON.stringify(team));
            return member;
        });
    },

    deleteMember: function(id) {
        return makeRequestAsync('DELETE', '/team?id=eq.' + id).then(function() {
            var team = MockDB.getTeam().filter(function(m) { return m.id !== id; });
            localStorage.setItem(TEAM_KEY, JSON.stringify(team));
        });
    },

    // --- GESTÃO DE ARTES ---
    getArtes: function() {
        var local = localStorage.getItem('mj_artes');
        return local ? JSON.parse(local) : [];
    },

    getArte: function(id) {
        var artes = this.getArtes();
        return artes.find(function(a) { return a.id === id; });
    },

    saveArte: function(arte) {
        var isNew = !arte.id || arte.id.startsWith('art_');
        var payload = {
            title: arte.title,
            image: arte.image,
            description: arte.description
        };

        var promise;
        if (isNew) {
            payload.id = generateUUID();
            promise = makeRequestAsync('POST', '/artes', payload);
        } else {
            promise = makeRequestAsync('PATCH', '/artes?id=eq.' + arte.id, payload);
        }

        return promise.then(function() {
            var artes = MockDB.getArtes();
            if (isNew) {
                artes.unshift(Object.assign({ createdAt: Date.now() }, payload));
            } else {
                var index = artes.findIndex(function(a) { return a.id === arte.id; });
                if (index !== -1) artes[index] = Object.assign({}, artes[index], payload);
            }
            localStorage.setItem('mj_artes', JSON.stringify(artes));
            return arte;
        });
    },

    deleteArte: function(id) {
        return makeRequestAsync('DELETE', '/artes?id=eq.' + id).then(function() {
            var artes = MockDB.getArtes().filter(function(a) { return a.id !== id; });
            localStorage.setItem('mj_artes', JSON.stringify(artes));
        });
    },

    // --- GESTÃO DE EXPERTISE (Áreas de Prática) ---
    getExpertise: function() {
        var local = localStorage.getItem('mj_expertise');
        return local ? JSON.parse(local) : [];
    },

    getExpertiseItem: function(id) {
        var items = this.getExpertise();
        return items.find(function(i) { return i.id === id; });
    },

    saveExpertiseItem: function(item) {
        var isNew = !item.id || item.id.startsWith('exp_');
        var payload = {
            title: item.title,
            description: item.description
        };

        var promise;
        if (isNew) {
            payload.id = generateUUID();
            promise = makeRequestAsync('POST', '/expertise', payload);
        } else {
            promise = makeRequestAsync('PATCH', '/expertise?id=eq.' + item.id, payload);
        }

        return promise.then(function() {
            var items = MockDB.getExpertise();
            if (isNew) {
                items.unshift(Object.assign({ createdAt: Date.now() }, payload));
            } else {
                var index = items.findIndex(function(i) { return i.id === item.id; });
                if (index !== -1) items[index] = Object.assign({}, items[index], payload);
            }
            localStorage.setItem('mj_expertise', JSON.stringify(items));
            return item;
        });
    },

    deleteExpertiseItem: function(id) {
        return makeRequestAsync('DELETE', '/expertise?id=eq.' + id).then(function() {
            var items = MockDB.getExpertise().filter(function(i) { return i.id !== id; });
            localStorage.setItem('mj_expertise', JSON.stringify(items));
        });
    },

    // --- GESTÃO DE PÁGINAS SOBRE NÓS ---
    getSobreNosPages: function() {
        var local = localStorage.getItem('mj_sobrenos');
        return local ? JSON.parse(local) : [];
    },

    getSobreNosPage: function(id) {
        var pages = this.getSobreNosPages();
        return pages.find(function(p) { return p.id === id; });
    },

    saveSobreNosPage: function(page) {
        var payload = {
            title: page.title,
            content: page.content,
            last_updated: new Date().toISOString()
        };

        return makeRequestAsync('PATCH', '/sobrenos_pages?id=eq.' + page.id, payload).then(function() {
            var pages = MockDB.getSobreNosPages();
            var index = pages.findIndex(function(p) { return p.id === page.id; });
            if (index !== -1) {
                pages[index] = Object.assign({}, pages[index], payload, { lastUpdated: Date.now() });
            }
            localStorage.setItem('mj_sobrenos', JSON.stringify(pages));
            return page;
        });
    }
};

window.MockDB = MockDB;
