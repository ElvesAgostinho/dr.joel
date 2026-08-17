// mockDB.js - Ponte sincronizada entre LocalStorage (Offline Cache) e Supabase (Base de Dados Global)
const DB_KEY = 'mj_blog_posts';
const STATS_KEY = 'mj_site_stats';
const TEAM_KEY = 'mj_team';

const SUPABASE_URL = 'https://ulymellasjmsejgeutyt.supabase.co/rest/v1';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseW1lbGxhc2ptc2VqZ2V1dHl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NzU0NzQsImV4cCI6MjA4ODA1MTQ3NH0.wSa6XbIylhl7ChzeD9oqGu5NzN4_0E1cWHYeUmeBAkY';

// Helper de requisições síncronas para manter compatibilidade com o frontend síncrono
function makeRequest(method, path, body) {
    try {
        var xhr = new XMLHttpRequest();
        // Construir URL completa
        var url = SUPABASE_URL + path;
        
        xhr.open(method, url, false); // Síncrono
        xhr.setRequestHeader('apikey', SUPABASE_ANON_KEY);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        // Adicionar cabeçalho de autenticação do administrador logado, se existir
        var sessionRaw = localStorage.getItem('mj_admin_session');
        if (sessionRaw) {
            try {
                var session = JSON.parse(sessionRaw);
                if (session && session.access_token) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + session.access_token);
                }
            } catch(e) {}
        }
        
        if (body) {
            xhr.send(JSON.stringify(body));
        } else {
            xhr.send();
        }
        
        if (xhr.status >= 200 && xhr.status < 300) {
            return xhr.responseText ? JSON.parse(xhr.responseText) : [];
        } else {
            console.warn('Supabase request failed with status: ' + xhr.status, xhr.responseText);
            return null;
        }
    } catch (e) {
        console.error('Supabase network error:', e);
        return null;
    }
}

// Gerador de UUID para chaves primárias compatíveis com Supabase
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const MockDB = {
    // --- GESTÃO DE POSTS (Publicações) ---
    getPosts: function() {
        var res = makeRequest('GET', '/posts?order=created_at.desc');
        if (res !== null) {
            var posts = res.map(function(row) {
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
            localStorage.setItem(DB_KEY, JSON.stringify(posts));
            return posts;
        }
        var local = localStorage.getItem(DB_KEY);
        return local ? JSON.parse(local) : [];
    },
    
    getPost: function(id) {
        var res = makeRequest('GET', '/posts?id=eq.' + id);
        if (res !== null && res.length > 0) {
            var row = res[0];
            return {
                id: row.id,
                title: row.title,
                content: row.content,
                coverImage: row.cover_image,
                published: row.published,
                createdAt: new Date(row.created_at).getTime(),
                category: row.category || 'ARTIGO'
            };
        }
        var posts = this.getPosts();
        return posts.find(p => p.id === id);
    },
    
    savePost: function(post) {
        var isNew = !post.id || post.id.startsWith('post_');
        var payload = {
            title: post.title,
            content: post.content,
            cover_image: post.coverImage,
            published: post.published === true || post.published === 'true',
            category: post.category || 'ARTIGO'
        };

        if (isNew) {
            payload.id = generateUUID();
            makeRequest('POST', '/posts', payload);
        } else {
            makeRequest('PATCH', '/posts?id=eq.' + post.id, payload);
        }
        this.getPosts(); // Atualizar cache local
        return post;
    },
    
    deletePost: function(id) {
        makeRequest('DELETE', '/posts?id=eq.' + id);
        this.getPosts();
    },

    togglePublish: function(id) {
        var post = this.getPost(id);
        if (post) {
            post.published = !post.published;
            this.savePost(post);
        }
    },

    // --- GESTÃO DE ESTATÍSTICAS ---
    getStats: function() {
        const data = localStorage.getItem(STATS_KEY);
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

    // --- GESTÃO DE EQUIPA (Advogados) ---
    getTeam: function() {
        var res = makeRequest('GET', '/team?order=created_at.desc');
        if (res !== null) {
            var team = res.map(function(row) {
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
            
            // Auto-inicializar com os membros padrão se o Supabase estiver vazio
            if (team.length === 0) {
                const defaultTeam = [
                    { name: "António Caxito Marques", role: "Sócio Internacional*", area: "Direito Público", img: "assets/images/bg-1.jpg", email: "amarques@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "António Caxito Marques tem uma vasta experiência...", habilitacoes: "Licenciatura em Direito", experiencia: "Mais de 20 anos de experiência", associacoes: "Ordem dos Advogados de Angola", linguas: "Português, Inglês, Francês" },
                    { name: "Djamila Pinto de Andrade", role: "Sócia Internacional*", area: "Contencioso", img: "assets/images/bg-1.jpg", email: "dandrade@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "Djamila Pinto de Andrade integra a firma...", habilitacoes: "Licenciatura em Direito", experiencia: "15 anos de experiência", associacoes: "Ordem dos Advogados", linguas: "Português, Inglês" },
                    { name: "António Penelas", role: "Sócio Internacional*", area: "Corporate", img: "assets/images/bg-1.jpg", email: "apenelas@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "Especialista em Corporate...", habilitacoes: "-", experiencia: "-", associacoes: "-", linguas: "-" },
                    { name: "Américo Oliveira Fragoso", role: "Sócio Responsável da Área Laboral", area: "Laboral", img: "assets/images/bg-1.jpg", email: "afragoso@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "Especialista em Direito do Trabalho...", habilitacoes: "-", experiencia: "-", associacoes: "-", linguas: "-" },
                    { name: "Assunção Cristas", role: "Sócia Co-Responsável da Área Ambiente & Clima", area: "Ambiente", img: "assets/images/bg-1.jpg", email: "acristas@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "Especialista em Ambiente...", habilitacoes: "-", experiencia: "-", associacoes: "-", linguas: "-" },
                    { name: "António de Magalhães Cardoso", role: "Sócio Sénior do Grupo Contencioso", area: "Contencioso", img: "assets/images/bg-1.jpg", email: "acardoso@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "Sócio sénior...", habilitacoes: "-", experiencia: "-", associacoes: "-", linguas: "-" },
                    { name: "Marta Alves Vieira", role: "Sócia Responsável da Área PI Contencioso", area: "Contencioso", img: "assets/images/bg-1.jpg", email: "mvieira@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "Especialista em PI...", habilitacoes: "-", experiencia: "-", associacoes: "-", linguas: "-" },
                    { name: "André Gaspar Martins", role: "Sócio Responsável da Área Público", area: "Público", img: "assets/images/bg-1.jpg", email: "amartins@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "Especialista em Direito Público...", habilitacoes: "-", experiencia: "-", associacoes: "-", linguas: "-" },
                    { name: "Ana Marta Castro", role: "Sócia Público", area: "Público", img: "assets/images/bg-1.jpg", email: "acastro@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "Especialista em Público...", habilitacoes: "-", experiencia: "-", associacoes: "-", linguas: "-" },
                    { name: "Ana Luís de Sousa", role: "Sócia Executiva", area: "Energia", img: "assets/images/bg-1.jpg", email: "asousa@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "Especialista em Energia...", habilitacoes: "-", experiencia: "-", associacoes: "-", linguas: "-" },
                    { name: "João Vieira de Almeida", role: "Senior Partner", area: "Corporate", img: "assets/images/bg-1.jpg", email: "jalmeida@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "Senior Partner...", habilitacoes: "-", experiencia: "-", associacoes: "-", linguas: "-" },
                    { name: "Cláudia Cruz Almeida", role: "Sócia Responsável", area: "Corporate", img: "assets/images/bg-1.jpg", email: "calmeida@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "Corporate...", habilitacoes: "-", experiencia: "-", associacoes: "-", linguas: "-" }
                ];
                defaultTeam.forEach(function(member) {
                    member.id = generateUUID();
                    makeRequest('POST', '/team', member);
                });
                return this.getTeam();
            }
            
            localStorage.setItem(TEAM_KEY, JSON.stringify(team));
            return team;
        }
        var local = localStorage.getItem(TEAM_KEY);
        return local ? JSON.parse(local) : [];
    },

    getMember: function(id) {
        var res = makeRequest('GET', '/team?id=eq.' + id);
        if (res !== null && res.length > 0) {
            var row = res[0];
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
        }
        var team = this.getTeam();
        return team.find(m => m.id === id);
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

        if (isNew) {
            payload.id = generateUUID();
            makeRequest('POST', '/team', payload);
        } else {
            makeRequest('PATCH', '/team?id=eq.' + member.id, payload);
        }
        this.getTeam();
        return member;
    },

    deleteMember: function(id) {
        makeRequest('DELETE', '/team?id=eq.' + id);
        this.getTeam();
    },

    // --- GESTÃO DE ARTES ---
    getArtes: function() {
        var res = makeRequest('GET', '/artes?order=created_at.desc');
        if (res !== null) {
            var artes = res.map(function(row) {
                return {
                    id: row.id,
                    title: row.title,
                    image: row.image,
                    description: row.description,
                    createdAt: new Date(row.created_at).getTime()
                };
            });
            
            if (artes.length === 0) {
                var defaultArtes = [
                    { title: "Estatueta Cokwe", image: "assets/images/abstract_sphere.png", description: "Uma representação clássica da arte tradicional angolana, simbolizando o poder e a sabedoria ancestral." },
                    { title: "Máscara Mwana Pwo", image: "assets/images/dark_diamonds.png", description: "Máscara feminina utilizada em rituais, destacando-se pelos seus detalhes faciais minuciosos e escarificações." },
                    { title: "Pensador de Cokwe", image: "assets/images/bg-1.jpg", description: "A figura icónica nacional que expressa profunda reflexão e respeito pela cultura e tradições orais." }
                ];
                defaultArtes.forEach(function(art) {
                    art.id = generateUUID();
                    makeRequest('POST', '/artes', art);
                });
                return this.getArtes();
            }
            
            localStorage.setItem('mj_artes', JSON.stringify(artes));
            return artes;
        }
        var local = localStorage.getItem('mj_artes');
        return local ? JSON.parse(local) : [];
    },

    getArte: function(id) {
        var res = makeRequest('GET', '/artes?id=eq.' + id);
        if (res !== null && res.length > 0) {
            var row = res[0];
            return {
                id: row.id,
                title: row.title,
                image: row.image,
                description: row.description,
                createdAt: new Date(row.created_at).getTime()
            };
        }
        var artes = this.getArtes();
        return artes.find(a => a.id === id);
    },

    saveArte: function(arte) {
        var isNew = !arte.id || arte.id.startsWith('art_');
        var payload = {
            title: arte.title,
            image: arte.image,
            description: arte.description
        };

        if (isNew) {
            payload.id = generateUUID();
            makeRequest('POST', '/artes', payload);
        } else {
            makeRequest('PATCH', '/artes?id=eq.' + arte.id, payload);
        }
        this.getArtes();
        return arte;
    },

    deleteArte: function(id) {
        makeRequest('DELETE', '/artes?id=eq.' + id);
        this.getArtes();
    },

    // --- GESTÃO DE EXPERTISE (Áreas de Prática) ---
    getExpertise: function() {
        var res = makeRequest('GET', '/expertise?order=created_at.desc');
        if (res !== null) {
            var items = res.map(function(row) {
                return {
                    id: row.id,
                    title: row.title,
                    description: row.description,
                    createdAt: new Date(row.created_at).getTime()
                };
            });
            
            if (items.length === 0) {
                var defaultExpertise = [
                    { id: "financeiro", title: "Financeiro e Governance", description: "Assessoria jurídica integral em operações financeiras, corporate finance e na estruturação de modelos de Corporate Governance (Governação Societária). O nosso foco abrange o acompanhamento de financiamentos estruturados, emissão de dívida, capital markets e o cumprimento normativo e regulatório (Compliance) de entidades reguladas, com o objetivo de assegurar transparência, eficiência e mitigação de riscos estruturais." },
                    { id: "reestruturacao", title: "Reestruturação Empresarial e Privatizações", description: "Apoio altamente especializado em processos de reestruturação de grupos societários, recuperação de empresas e assessoria na compra e venda de ativos estatais. Representamos tanto entidades públicas como investidores privados em processos de reprivatização, delineando estratégias para maximizar a viabilidade financeira, otimizar operações e gerir passivos em contextos de insolvência ou redefinição estratégica." },
                    { id: "comercial", title: "Comercial, Societário e M&A", description: "Prestamos assessoria transversal ao ciclo de vida das empresas, desde a sua constituição, estruturação de acordos parassociais, processos de fusão, cisão e aquisição (M&A). Apoiamos investidores na estruturação de joint-ventures, negociação de contratos comerciais complexos e planeamento sucessório em empresas familiares." },
                    { id: "imobiliario", title: "Imobiliário", description: "Assessoria em todas as fases de operações imobiliárias, incluindo estruturação de fundos, promoção, transação e gestão de ativos imobiliários. Representamos promotores, investidores institucionais e fundos na aquisição de portfólios, negociação de contratos de empreitada, arrendamento comercial e licenciamento urbano." },
                    { id: "laboral", title: "Laboral", description: "Aconselhamento estratégico e preventivo no âmbito das relações laborais, incluindo a elaboração de contratos de trabalho, destacamento de trabalhadores, negociação coletiva e acompanhamento de processos disciplinares e reestruturações com impacto laboral." },
                    { id: "fiscal", title: "Fiscal", description: "Planeamento fiscal nacional e internacional, aconselhamento em operações de reestruturação, M&A e estruturação de patrimónios. O nosso serviço inclui também o patrocínio e acompanhamento de processos de contencioso tributário." },
                    { id: "ppp", title: "Parcerias Público Privadas", description: "Assessoria na estruturação, financiamento e execução de projetos de Parcerias Público Privadas (PPP) e concessões de infraestruturas, cobrindo os setores de energia, transportes, águas e infraestruturas sociais." },
                    { id: "contratacao", title: "Contratação Pública", description: "Aconselhamento jurídico em todas as fases de procedimentos de contratação pública, prestando apoio tanto a entidades adjudicantes na elaboração de peças de concurso, como a concorrentes privados na preparação de propostas e contencioso pré-contratual." },
                    { id: "contencioso", title: "Contencioso e Arbitragem", description: "Representação em litígios cíveis, comerciais e societários de elevada complexidade perante tribunais estaduais e arbitrais. Atuamos também em litígios transnacionais, execução de sentenças estrangeiras e na conceção de estratégias de resolução alternativa de litígios." }
                ];
                defaultExpertise.forEach(function(item) {
                    makeRequest('POST', '/expertise', item);
                });
                return this.getExpertise();
            }
            
            localStorage.setItem('mj_expertise', JSON.stringify(items));
            return items;
        }
        var local = localStorage.getItem('mj_expertise');
        return local ? JSON.parse(local) : [];
    },

    getExpertiseItem: function(id) {
        var res = makeRequest('GET', '/expertise?id=eq.' + id);
        if (res !== null && res.length > 0) {
            var row = res[0];
            return {
                id: row.id,
                title: row.title,
                description: row.description,
                createdAt: new Date(row.created_at).getTime()
            };
        }
        var items = this.getExpertise();
        return items.find(i => i.id === id);
    },

    saveExpertiseItem: function(item) {
        var isNew = !item.id || item.id.startsWith('exp_');
        var payload = {
            title: item.title,
            description: item.description
        };

        if (isNew) {
            payload.id = generateUUID();
            makeRequest('POST', '/expertise', payload);
        } else {
            makeRequest('PATCH', '/expertise?id=eq.' + item.id, payload);
        }
        this.getExpertise();
        return item;
    },

    deleteExpertiseItem: function(id) {
        makeRequest('DELETE', '/expertise?id=eq.' + id);
        this.getExpertise();
    },

    // --- GESTÃO DE PÁGINAS SOBRE NÓS ---
    getSobreNosPages: function() {
        var res = makeRequest('GET', '/sobrenos_pages');
        if (res !== null) {
            var pages = res.map(function(row) {
                return {
                    id: row.id,
                    title: row.title,
                    content: row.content,
                    lastUpdated: new Date(row.last_updated).getTime()
                };
            });
            
            if (pages.length === 0) {
                var defaultPages = [
                    { id: "a-firma", title: "A Firma", content: "<p>A Mário & Joel - Sociedade de Advogados, RL é uma firma de referência, prestando serviços de elevada qualidade e rigor. O nosso compromisso é oferecer soluções jurídicas que acompanham a evolução dos negócios dos nossos clientes.</p>" },
                    { id: "premios", title: "Prémios e Reconhecimento", content: "<p>A nossa dedicação tem sido sucessivamente reconhecida nos principais diretórios legais internacionais, refletindo a excelência do nosso trabalho.</p>" },
                    { id: "carreiras", title: "Carreiras", content: "<p>Estamos sempre à procura de talentos excepcionais. Na M&J oferecemos um ambiente de crescimento e constante superação.</p>" }
                ];
                defaultPages.forEach(function(page) {
                    makeRequest('POST', '/sobrenos_pages', page);
                });
                return this.getSobreNosPages();
            }
            
            localStorage.setItem('mj_sobrenos', JSON.stringify(pages));
            return pages;
        }
        var local = localStorage.getItem('mj_sobrenos');
        return local ? JSON.parse(local) : [];
    },

    getSobreNosPage: function(id) {
        var res = makeRequest('GET', '/sobrenos_pages?id=eq.' + id);
        if (res !== null && res.length > 0) {
            var row = res[0];
            return {
                id: row.id,
                title: row.title,
                content: row.content,
                lastUpdated: new Date(row.last_updated).getTime()
            };
        }
        var pages = this.getSobreNosPages();
        return pages.find(p => p.id === id);
    },

    saveSobreNosPage: function(page) {
        var payload = {
            title: page.title,
            content: page.content,
            last_updated: new Date().toISOString()
        };
        makeRequest('PATCH', '/sobrenos_pages?id=eq.' + page.id, payload);
        this.getSobreNosPages();
        return page;
    }
};

window.MockDB = MockDB;
