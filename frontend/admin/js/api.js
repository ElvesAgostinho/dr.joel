// api.js - Módulo de comunicação direta com a Base de Dados (Supabase)
const SUPABASE_URL = 'https://ulymellasjmsejgeutyt.supabase.co';
const REST_URL = SUPABASE_URL + '/rest/v1';
const STORAGE_URL = SUPABASE_URL + '/storage/v1';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseW1lbGxhc2ptc2VqZ2V1dHl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NzU0NzQsImV4cCI6MjA4ODA1MTQ3NH0.wSa6XbIylhl7ChzeD9oqGu5NzN4_0E1cWHYeUmeBAkY';

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getHeaders(isUpload = false) {
    const headers = {
        'apikey': SUPABASE_ANON_KEY
    };
    
    if (!isUpload) {
        headers['Content-Type'] = 'application/json';
        headers['Prefer'] = 'return=representation';
    }

    const sessionRaw = localStorage.getItem('mj_admin_session');
    if (sessionRaw) {
        try {
            const session = JSON.parse(sessionRaw);
            if (session && session.access_token) {
                headers['Authorization'] = 'Bearer ' + session.access_token;
            }
        } catch(e) {}
    }
    return headers;
}

async function request(method, path, body, isUpload = false) {
    const options = {
        method: method,
        headers: getHeaders(isUpload)
    };

    if (body) {
        options.body = isUpload ? body : JSON.stringify(body);
    }

    const res = await fetch(REST_URL + path, options);
    
    if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('mj_admin_session');
        if (window.location.pathname.includes('/admin/')) {
            alert('Sessão expirada. Por favor, inicie sessão novamente.');
            window.location.href = 'login.html';
        }
        throw new Error('Sessão expirada');
    }
    
    if (!res.ok) {
        throw new Error(`Erro ${res.status}: Ocorreu um erro ao comunicar com a base de dados.`);
    }
    
    if (method === 'DELETE' || res.status === 204) return null;
    
    const text = await res.text();
    return text ? JSON.parse(text) : null;
}

const API = {
    // --- STORAGE (UPLOADS DE MUNDO REAL) ---
    uploadMedia: async function(file) {
        if (!file) return null;
        
        // Gerar nome único
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filename = `${Date.now()}_${generateUUID().substring(0,8)}_${safeName}`;
        
        const headers = getHeaders(true);
        headers['Content-Type'] = file.type;

        const res = await fetch(`${STORAGE_URL}/object/media/${filename}`, {
            method: 'POST',
            headers: headers,
            body: file
        });

        if (!res.ok) {
            throw new Error(`Falha ao fazer upload do ficheiro (${res.status})`);
        }
        
        return `${STORAGE_URL}/object/public/media/${filename}`;
    },

    // --- POSTS ---
    getPosts: async function() {
        const data = await request('GET', '/posts?order=created_at.desc');
        return data.map(p => ({
            id: p.id,
            title: p.title,
            content: p.content,
            coverImage: p.cover_image,
            published: p.published,
            category: p.category || 'ARTIGO',
            createdAt: new Date(p.created_at).getTime()
        }));
    },

    getPost: async function(id) {
        const data = await request('GET', `/posts?id=eq.${id}`);
        if (!data || data.length === 0) return null;
        const p = data[0];
        return {
            id: p.id,
            title: p.title,
            content: p.content,
            coverImage: p.cover_image,
            published: p.published,
            category: p.category || 'ARTIGO',
            createdAt: new Date(p.created_at).getTime()
        };
    },

    savePost: async function(post) {
        const isNew = !post.id;
        const payload = {
            title: post.title,
            content: post.content,
            cover_image: post.coverImage,
            published: post.published === true || post.published === 'true',
            category: post.category || 'ARTIGO'
        };

        if (isNew) {
            payload.id = generateUUID();
            return await request('POST', '/posts', payload);
        } else {
            return await request('PATCH', `/posts?id=eq.${post.id}`, payload);
        }
    },

    deletePost: async function(id) {
        return await request('DELETE', `/posts?id=eq.${id}`);
    },

    togglePublish: async function(id) {
        const post = await this.getPost(id);
        if (post) {
            post.published = !post.published;
            return await this.savePost(post);
        }
    },

    // --- EQUIPA ---
    getTeam: async function() {
        const data = await request('GET', '/team?order=created_at.desc');
        return data.map(p => ({
            id: p.id,
            name: p.name,
            role: p.role,
            area: p.area,
            img: p.img,
            email: p.email,
            phone: p.phone,
            bio: p.bio,
            cv: p.cv,
            habilitacoes: p.habilitacoes,
            experiencia: p.experiencia,
            associacoes: p.associacoes,
            linguas: p.linguas,
            createdAt: new Date(p.created_at).getTime()
        }));
    },

    getMember: async function(id) {
        const data = await request('GET', `/team?id=eq.${id}`);
        if (!data || data.length === 0) return null;
        const p = data[0];
        return {
            id: p.id,
            name: p.name,
            role: p.role,
            area: p.area,
            img: p.img,
            email: p.email,
            phone: p.phone,
            bio: p.bio,
            cv: p.cv,
            habilitacoes: p.habilitacoes,
            experiencia: p.experiencia,
            associacoes: p.associacoes,
            linguas: p.linguas,
            createdAt: new Date(p.created_at).getTime()
        };
    },

    saveMember: async function(member) {
        const payload = {
            name: member.name,
            role: member.role,
            area: member.area || '',
            img: member.img || '',
            email: member.email || '',
            phone: member.phone || '',
            bio: member.bio || '',
            cv: member.cv || '',
            habilitacoes: member.habilitacoes || '',
            experiencia: member.experiencia || '',
            associacoes: member.associacoes || '',
            linguas: member.linguas || ''
        };

        if (!member.id || member.id.startsWith('tm_')) {
            payload.id = generateUUID();
            return await request('POST', '/team', payload);
        } else {
            return await request('PATCH', `/team?id=eq.${member.id}`, payload);
        }
    },

    deleteMember: async function(id) {
        return await request('DELETE', `/team?id=eq.${id}`);
    },

    // --- ARTES ---
    getArtes: async function() {
        const data = await request('GET', '/artes?order=created_at.desc');
        return data.map(row => ({
            id: row.id,
            title: row.title,
            image: row.image,
            description: row.description,
            createdAt: new Date(row.created_at).getTime()
        }));
    },

    getArte: async function(id) {
        const data = await request('GET', `/artes?id=eq.${id}`);
        if (!data || data.length === 0) return null;
        const row = data[0];
        return {
            id: row.id,
            title: row.title,
            image: row.image,
            description: row.description,
            createdAt: new Date(row.created_at).getTime()
        };
    },

    saveArte: async function(arte) {
        const payload = {
            title: arte.title,
            image: arte.image || '',
            description: arte.description || ''
        };

        if (!arte.id || arte.id.startsWith('arte_')) {
            payload.id = generateUUID();
            return await request('POST', '/artes', payload);
        } else {
            return await request('PATCH', `/artes?id=eq.${arte.id}`, payload);
        }
    },

    deleteArte: async function(id) {
        return await request('DELETE', `/artes?id=eq.${id}`);
    },

    // --- EXPERTISE ---
    getExpertise: async function() {
        const data = await request('GET', '/expertise?order=created_at.desc');
        return data.map(row => ({
            id: row.id,
            title: row.title,
            description: row.description,
            createdAt: new Date(row.created_at).getTime()
        }));
    },

    getExpertiseItem: async function(id) {
        const data = await request('GET', `/expertise?id=eq.${id}`);
        if (!data || data.length === 0) return null;
        const row = data[0];
        return {
            id: row.id,
            title: row.title,
            description: row.description,
            createdAt: new Date(row.created_at).getTime()
        };
    },

    saveExpertise: async function(exp) {
        const payload = {
            title: exp.title,
            description: exp.description || ''
        };

        if (!exp.id || exp.id.startsWith('exp_')) {
            payload.id = generateUUID();
            return await request('POST', '/expertise', payload);
        } else {
            return await request('PATCH', `/expertise?id=eq.${exp.id}`, payload);
        }
    },

    deleteExpertise: async function(id) {
        return await request('DELETE', `/expertise?id=eq.${id}`);
    },

    // --- SOBRE NOS ---
    getSobreNosPages: async function() {
        const data = await request('GET', '/sobrenos_pages?order=last_updated.desc');
        return data.map(row => ({
            id: row.id,
            title: row.title,
            content: row.content,
            lastUpdated: new Date(row.last_updated).getTime()
        }));
    },

    getSobreNosPage: async function(id) {
        const data = await request('GET', `/sobrenos_pages?id=eq.${id}`);
        if (!data || data.length === 0) return null;
        const row = data[0];
        return {
            id: row.id,
            title: row.title,
            content: row.content,
            lastUpdated: new Date(row.last_updated).getTime()
        };
    },

    saveSobreNosPage: async function(page) {
        const payload = {
            title: page.title,
            content: page.content || ''
        };

        const existing = await request('GET', `/sobrenos_pages?id=eq.${page.id}`);
        
        if (!existing || existing.length === 0) {
            payload.id = page.id;
            return await request('POST', '/sobrenos_pages', payload);
        } else {
            payload.last_updated = new Date().toISOString();
            return await request('PATCH', `/sobrenos_pages?id=eq.${page.id}`, payload);
        }
    },

    // --- ESTATISTICAS ---
    getStats: async function() {
        var data = localStorage.getItem('mj_site_stats');
        if (!data) return { pessoas: 550, advogados: 9, jurisdicoes: 21 };
        return JSON.parse(data);
    },

    saveStats: async function(stats) {
        localStorage.setItem('mj_site_stats', JSON.stringify(stats));
        return stats;
    },

    // --- CONTACTOS ---
    sendContact: async function(contactData) {
        const payload = {
            id: generateUUID(),
            nome: contactData.nome,
            email: contactData.email,
            telefone: contactData.telefone || '',
            empresa: contactData.empresa || '',
            assunto: contactData.assunto,
            mensagem: contactData.mensagem
        };
        return await request('POST', '/contacts', payload);
    }
};

window.API = API;
