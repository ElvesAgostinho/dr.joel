// mockDB.js - Gestão de dados em LocalStorage simulando uma Base de Dados
const DB_KEY = 'mj_blog_posts';
const STATS_KEY = 'mj_site_stats';
const TEAM_KEY = 'mj_team';

// Estrutura de um Post:
// { id: string, title: string, content: string, coverImage: string, published: boolean, createdAt: number }

const MockDB = {
    getPosts: function() {
        const data = localStorage.getItem(DB_KEY);
        if (!data) return [];
        return JSON.parse(data).sort((a, b) => b.createdAt - a.createdAt);
    },
    
    getPost: function(id) {
        const posts = this.getPosts();
        return posts.find(p => p.id === id);
    },
    
    savePost: function(post) {
        const posts = this.getPosts();
        if (!post.id) {
            // Criar novo
            post.id = 'post_' + Date.now();
            post.createdAt = Date.now();
            posts.push(post);
        } else {
            // Atualizar existente
            const index = posts.findIndex(p => p.id === post.id);
            if (index !== -1) {
                posts[index] = { ...posts[index], ...post };
            } else {
                posts.push(post);
            }
        }
        localStorage.setItem(DB_KEY, JSON.stringify(posts));
        return post;
    },
    
    deletePost: function(id) {
        let posts = this.getPosts();
        posts = posts.filter(p => p.id !== id);
        localStorage.setItem(DB_KEY, JSON.stringify(posts));
    },

    togglePublish: function(id) {
        const posts = this.getPosts();
        const index = posts.findIndex(p => p.id === id);
        if (index !== -1) {
            posts[index].published = !posts[index].published;
            localStorage.setItem(DB_KEY, JSON.stringify(posts));
        }
    },

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

    // --- Gestão de Equipa ---
    getTeam: function() {
        const data = localStorage.getItem(TEAM_KEY);
        if (!data) {
            // Inicializar com os membros padrão se não existir
            const defaultTeam = [
                { id: "tm_1", name: "António Caxito Marques", role: "Sócio Internacional*", area: "Direito Público", img: "assets/images/bg-1.jpg", email: "amarques@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "António Caxito Marques tem uma vasta experiência...", habilitacoes: "Licenciatura em Direito", experiencia: "Mais de 20 anos de experiência", associacoes: "Ordem dos Advogados de Angola", linguas: "Português, Inglês, Francês", createdAt: Date.now() },
                { id: "tm_2", name: "Djamila Pinto de Andrade", role: "Sócia Internacional*", area: "Contencioso", img: "assets/images/bg-1.jpg", email: "dandrade@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "Djamila Pinto de Andrade integra a firma...", habilitacoes: "Licenciatura em Direito", experiencia: "15 anos de experiência", associacoes: "Ordem dos Advogados", linguas: "Português, Inglês", createdAt: Date.now() },
                { id: "tm_3", name: "António Penelas", role: "Sócio Internacional*", area: "Corporate", img: "assets/images/bg-1.jpg", email: "apenelas@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "Especialista em Corporate...", habilitacoes: "-", experiencia: "-", associacoes: "-", linguas: "-", createdAt: Date.now() },
                { id: "tm_4", name: "Américo Oliveira Fragoso", role: "Sócio Responsável da Área Laboral", area: "Laboral", img: "assets/images/bg-1.jpg", email: "afragoso@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "Especialista em Direito do Trabalho...", habilitacoes: "-", experiencia: "-", associacoes: "-", linguas: "-", createdAt: Date.now() },
                { id: "tm_5", name: "Assunção Cristas", role: "Sócia Co-Responsável da Área Ambiente & Clima", area: "Ambiente", img: "assets/images/bg-1.jpg", email: "acristas@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "Especialista em Ambiente...", habilitacoes: "-", experiencia: "-", associacoes: "-", linguas: "-", createdAt: Date.now() },
                { id: "tm_6", name: "António de Magalhães Cardoso", role: "Sócio Sénior do Grupo Contencioso", area: "Contencioso", img: "assets/images/bg-1.jpg", email: "acardoso@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "Sócio sénior...", habilitacoes: "-", experiencia: "-", associacoes: "-", linguas: "-", createdAt: Date.now() },
                { id: "tm_7", name: "Marta Alves Vieira", role: "Sócia Responsável da Área PI Contencioso", area: "Contencioso", img: "assets/images/bg-1.jpg", email: "mvieira@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "Especialista em PI...", habilitacoes: "-", experiencia: "-", associacoes: "-", linguas: "-", createdAt: Date.now() },
                { id: "tm_8", name: "André Gaspar Martins", role: "Sócio Responsável da Área Público", area: "Público", img: "assets/images/bg-1.jpg", email: "amartins@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "Especialista em Direito Público...", habilitacoes: "-", experiencia: "-", associacoes: "-", linguas: "-", createdAt: Date.now() },
                { id: "tm_9", name: "Ana Marta Castro", role: "Sócia Público", area: "Público", img: "assets/images/bg-1.jpg", email: "acastro@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "Especialista em Público...", habilitacoes: "-", experiencia: "-", associacoes: "-", linguas: "-", createdAt: Date.now() },
                { id: "tm_10", name: "Ana Luís de Sousa", role: "Sócia Executiva", area: "Energia", img: "assets/images/bg-1.jpg", email: "asousa@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "Especialista em Energia...", habilitacoes: "-", experiencia: "-", associacoes: "-", linguas: "-", createdAt: Date.now() },
                { id: "tm_11", name: "João Vieira de Almeida", role: "Senior Partner", area: "Corporate", img: "assets/images/bg-1.jpg", email: "jalmeida@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "Senior Partner...", habilitacoes: "-", experiencia: "-", associacoes: "-", linguas: "-", createdAt: Date.now() },
                { id: "tm_12", name: "Cláudia Cruz Almeida", role: "Sócia Responsável", area: "Corporate", img: "assets/images/bg-1.jpg", email: "calmeida@marioejoeladv.com", phone: "(+244) 928 186 060", bio: "Corporate...", habilitacoes: "-", experiencia: "-", associacoes: "-", linguas: "-", createdAt: Date.now() }
            ];
            localStorage.setItem(TEAM_KEY, JSON.stringify(defaultTeam));
            return defaultTeam;
        }
        return JSON.parse(data).sort((a, b) => b.createdAt - a.createdAt);
    },

    getMember: function(id) {
        const team = this.getTeam();
        return team.find(m => m.id === id);
    },

    saveMember: function(member) {
        const team = this.getTeam();
        if (!member.id) {
            member.id = 'tm_' + Date.now();
            member.createdAt = Date.now();
            team.push(member);
        } else {
            const index = team.findIndex(m => m.id === member.id);
            if (index !== -1) {
                team[index] = { ...team[index], ...member };
            } else {
                team.push(member);
            }
        }
        localStorage.setItem(TEAM_KEY, JSON.stringify(team));
        return member;
    },

    deleteMember: function(id) {
        let team = this.getTeam();
        team = team.filter(m => m.id !== id);
        localStorage.setItem(TEAM_KEY, JSON.stringify(team));
    },

    // --- Gestão de Artes ---
    getArtes: function() {
        const ARTES_KEY = 'mj_artes';
        const data = localStorage.getItem(ARTES_KEY);
        if (!data) {
            const defaultArtes = [
                { id: "art_1", title: "Estatueta Cokwe", image: "assets/images/abstract_sphere.png", description: "Uma representação clássica da arte tradicional angolana, simbolizando o poder e a sabedoria ancestral.", createdAt: Date.now() },
                { id: "art_2", title: "Máscara Mwana Pwo", image: "assets/images/dark_diamonds.png", description: "Máscara feminina utilizada em rituais, destacando-se pelos seus detalhes faciais minuciosos e escarificações.", createdAt: Date.now() - 1000 },
                { id: "art_3", title: "Pensador de Cokwe", image: "assets/images/bg-1.jpg", description: "A figura icónica nacional que expressa profunda reflexão e respeito pela cultura e tradições orais.", createdAt: Date.now() - 2000 }
            ];
            localStorage.setItem(ARTES_KEY, JSON.stringify(defaultArtes));
            return defaultArtes;
        }
        return JSON.parse(data).sort((a, b) => b.createdAt - a.createdAt);
    },

    getArte: function(id) {
        const artes = this.getArtes();
        return artes.find(a => a.id === id);
    },

    saveArte: function(arte) {
        const ARTES_KEY = 'mj_artes';
        const artes = this.getArtes();
        if (!arte.id) {
            arte.id = 'art_' + Date.now();
            arte.createdAt = Date.now();
            artes.push(arte);
        } else {
            const index = artes.findIndex(a => a.id === arte.id);
            if (index !== -1) {
                artes[index] = { ...artes[index], ...arte };
            } else {
                artes.push(arte);
            }
        }
        localStorage.setItem(ARTES_KEY, JSON.stringify(artes));
        return arte;
    },

    deleteArte: function(id) {
        const ARTES_KEY = 'mj_artes';
        let artes = this.getArtes();
        artes = artes.filter(a => a.id !== id);
        localStorage.setItem(ARTES_KEY, JSON.stringify(artes));
    },

    // --- Gestão de Áreas de Prática (Expertise) ---
    getExpertise: function() {
        const EXPERTISE_KEY = 'mj_expertise';
        const data = localStorage.getItem(EXPERTISE_KEY);
        if (!data) {
            const defaultExpertise = [
                { id: "financeiro", title: "Financeiro e Governance", description: "Assessoria jurídica integral em operações financeiras, corporate finance e na estruturação de modelos de Corporate Governance (Governação Societária). O nosso foco abrange o acompanhamento de financiamentos estruturados, emissão de dívida, capital markets e o cumprimento normativo e regulatório (Compliance) de entidades reguladas, com o objetivo de assegurar transparência, eficiência e mitigação de riscos estruturais.", createdAt: Date.now() },
                { id: "reestruturacao", title: "Reestruturação Empresarial e Privatizações", description: "Apoio altamente especializado em processos de reestruturação de grupos societários, recuperação de empresas e assessoria na compra e venda de ativos estatais. Representamos tanto entidades públicas como investidores privados em processos de reprivatização, delineando estratégias para maximizar a viabilidade financeira, otimizar operações e gerir passivos em contextos de insolvência ou redefinição estratégica.", createdAt: Date.now() - 1000 },
                { id: "comercial", title: "Comercial, Societário e M&A", description: "Prestamos assessoria transversal ao ciclo de vida das empresas, desde a sua constituição, estruturação de acordos parassociais, processos de fusão, cisão e aquisição (M&A). Apoiamos investidores na estruturação de joint-ventures, negociação de contratos comerciais complexos e planeamento sucessório em empresas familiares.", createdAt: Date.now() - 2000 },
                { id: "imobiliario", title: "Imobiliário", description: "Assessoria em todas as fases de operações imobiliárias, incluindo estruturação de fundos, promoção, transação e gestão de ativos imobiliários. Representamos promotores, investidores institucionais e fundos na aquisição de portfólios, negociação de contratos de empreitada, arrendamento comercial e licenciamento urbano.", createdAt: Date.now() - 3000 },
                { id: "laboral", title: "Laboral", description: "Aconselhamento estratégico e preventivo no âmbito das relações laborais, incluindo a elaboração de contratos de trabalho, destacamento de trabalhadores, negociação coletiva e acompanhamento de processos disciplinares e reestruturações com impacto laboral.", createdAt: Date.now() - 4000 },
                { id: "fiscal", title: "Fiscal", description: "Planeamento fiscal nacional e internacional, aconselhamento em operações de reestruturação, M&A e estruturação de patrimónios. O nosso serviço inclui também o patrocínio e acompanhamento de processos de contencioso tributário.", createdAt: Date.now() - 5000 },
                { id: "ppp", title: "Parcerias Público Privadas", description: "Assessoria na estruturação, financiamento e execução de projetos de Parcerias Público Privadas (PPP) e concessões de infraestruturas, cobrindo os setores de energia, transportes, águas e infraestruturas sociais.", createdAt: Date.now() - 6000 },
                { id: "contratacao", title: "Contratação Pública", description: "Aconselhamento jurídico em todas as fases de procedimentos de contratação pública, prestando apoio tanto a entidades adjudicantes na elaboração de peças de concurso, como a concorrentes privados na preparação de propostas e contencioso pré-contratual.", createdAt: Date.now() - 7000 },
                { id: "contencioso", title: "Contencioso e Arbitragem", description: "Representação em litígios cíveis, comerciais e societários de elevada complexidade perante tribunais estaduais e arbitrais. Atuamos também em litígios transnacionais, execução de sentenças estrangeiras e na conceção de estratégias de resolução alternativa de litígios.", createdAt: Date.now() - 8000 }
            ];
            localStorage.setItem(EXPERTISE_KEY, JSON.stringify(defaultExpertise));
            return defaultExpertise;
        }
        return JSON.parse(data).sort((a, b) => b.createdAt - a.createdAt);
    },

    getExpertiseItem: function(id) {
        const items = this.getExpertise();
        return items.find(i => i.id === id);
    },

    saveExpertiseItem: function(item) {
        const EXPERTISE_KEY = 'mj_expertise';
        const items = this.getExpertise();
        if (!item.id) {
            item.id = 'exp_' + Date.now();
            item.createdAt = Date.now();
            items.push(item);
        } else {
            const index = items.findIndex(i => i.id === item.id);
            if (index !== -1) {
                items[index] = { ...items[index], ...item };
            } else {
                items.push(item);
            }
        }
        localStorage.setItem(EXPERTISE_KEY, JSON.stringify(items));
        return item;
    },

    deleteExpertiseItem: function(id) {
        const EXPERTISE_KEY = 'mj_expertise';
        let items = this.getExpertise();
        items = items.filter(i => i.id !== id);
        localStorage.setItem(EXPERTISE_KEY, JSON.stringify(items));
    },

    // --- Gestão de Páginas "Sobre Nós" ---
    getSobreNosPages: function() {
        const SOBRENOS_KEY = 'mj_sobrenos';
        const data = localStorage.getItem(SOBRENOS_KEY);
        if (!data) {
            const defaultPages = [
                { id: "a-firma", title: "A Firma", content: "<p>A Mário & Joel - Sociedade de Advogados, RL é uma firma de referência, prestando serviços de elevada qualidade e rigor. O nosso compromisso é oferecer soluções jurídicas que acompanham a evolução dos negócios dos nossos clientes.</p>", lastUpdated: Date.now() },
                { id: "premios", title: "Prémios e Reconhecimento", content: "<p>A nossa dedicação tem sido sucessivamente reconhecida nos principais diretórios legais internacionais, refletindo a excelência do nosso trabalho.</p>", lastUpdated: Date.now() },
                { id: "carreiras", title: "Carreiras", content: "<p>Estamos sempre à procura de talentos excepcionais. Na M&J oferecemos um ambiente de crescimento e constante superação.</p>", lastUpdated: Date.now() }
            ];
            localStorage.setItem(SOBRENOS_KEY, JSON.stringify(defaultPages));
            return defaultPages;
        }
        return JSON.parse(data);
    },

    getSobreNosPage: function(id) {
        const pages = this.getSobreNosPages();
        return pages.find(p => p.id === id);
    },

    saveSobreNosPage: function(page) {
        const SOBRENOS_KEY = 'mj_sobrenos';
        const pages = this.getSobreNosPages();
        const index = pages.findIndex(p => p.id === page.id);
        
        page.lastUpdated = Date.now();
        
        if (index !== -1) {
            pages[index] = { ...pages[index], ...page };
        } else {
            pages.push(page);
        }
        
        localStorage.setItem(SOBRENOS_KEY, JSON.stringify(pages));
        return page;
    }
};

window.MockDB = MockDB;
