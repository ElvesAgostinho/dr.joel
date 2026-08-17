// Translations Dictionary
const translations = {
    pt: {
        brand: "Mário & Joel",
        subtitle: "Sociedade de Advogados, RL",
        nav_team: "Equipa",
        nav_team_partners: "Sócios",
        nav_team_lawyers: "Advogados",
        nav_team_consultants: "Consultores",
        nav_expertise: "Áreas de Prática",
        nav_exp_corp: "Corporate & M&A",
        nav_exp_bank: "Banking & Finance",
        nav_exp_tax: "Tax",
        nav_exp_real: "Real Estate",
        nav_partners: "M&J Legal Partners",
        nav_part_africa: "África",
        nav_part_latam: "América Latina",
        nav_part_asia: "Ásia",
        nav_insights: "Insights & Media",
        nav_ins_news: "Newsletters",
        nav_ins_pub: "Publicações",
        nav_ins_press: "Imprensa",
        nav_about: "Sobre Nós",
        nav_about_firm: "A Firma",
        nav_about_awards: "Prémios e Reconhecimento",
        nav_about_careers: "Carreiras",
        search_title: "Pesquisar",
        search_placeholder: "O que procura?",
        search_btn: "Procurar",
        contact_title: "Contacte-nos",
        contact_desc: "Estamos à sua disposição globalmente."
    },
    en: {
        brand: "Mário & Joel",
        subtitle: "Law Firm, RL",
        nav_team: "Team",
        nav_team_partners: "Partners",
        nav_team_lawyers: "Lawyers",
        nav_team_consultants: "Consultants",
        nav_expertise: "Practice Areas",
        nav_exp_corp: "Corporate & M&A",
        nav_exp_bank: "Banking & Finance",
        nav_exp_tax: "Tax",
        nav_exp_real: "Real Estate",
        nav_partners: "M&J Legal Partners",
        nav_part_africa: "Africa",
        nav_part_latam: "Latin America",
        nav_part_asia: "Asia",
        nav_insights: "Insights & Media",
        nav_ins_news: "Newsletters",
        nav_ins_pub: "Publications",
        nav_ins_press: "Press",
        nav_about: "About Us",
        nav_about_firm: "The Firm",
        nav_about_awards: "Awards & Recognition",
        nav_about_careers: "Careers",
        search_title: "Search",
        search_placeholder: "What are you looking for?",
        search_btn: "Search",
        contact_title: "Contact Us",
        contact_desc: "We are at your disposal globally."
    }
};

// CSS de ocultação da barra de tradução do Google Translate
(function injectTranslateStyles() {
    var style = document.createElement('style');
    style.innerHTML = `
        .goog-te-banner-frame.skiptranslate, .goog-te-banner-frame, iframe.goog-te-banner-frame { 
            display: none !important; 
        }
        body { 
            top: 0px !important; 
        }
        #goog-gt-tt, .goog-te-balloon-frame, .placeholder { 
            display: none !important; 
        }
        .goog-text-highlight { 
            background-color: transparent !important; 
            border: none !important; 
            box-shadow: none !important; 
        }
    `;
    document.head.appendChild(style);
})();

// Injeção dinâmica do widget de tradução do Google
(function injectGoogleTranslate() {
    var translateDiv = document.createElement('div');
    translateDiv.id = 'google_translate_element';
    translateDiv.style.display = 'none';
    document.body.appendChild(translateDiv);

    window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({
            pageLanguage: 'pt',
            includedLanguages: 'pt,en',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
        }, 'google_translate_element');
    };

    var script = document.createElement('script');
    script.id = 'google-translate-script';
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);
})();

function changeLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(translations[lang][key]) el.textContent = translations[lang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if(translations[lang][key]) el.setAttribute('placeholder', translations[lang][key]);
    });
    const langText = document.getElementById('active-lang-text');
    if(langText) langText.textContent = lang.toUpperCase();

    // Guardar preferência no localStorage
    localStorage.setItem('mj_lang', lang);

    // Definir cookie para o Google Translate traduzir conteúdos dinâmicos da DB
    var cookieVal = "googtrans=/pt/" + lang;
    document.cookie = cookieVal + "; path=/;";
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle hamburger to cross animation
            const spans = mobileBtn.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'translateY(7px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                mobileBtn.click();
            }
        });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 3. Scroll Reveal Animation (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // 6. Search overlay
    const btnSearch = document.getElementById('btn-search');
    if(btnSearch) {
        btnSearch.addEventListener('click', (e) => {
            e.preventDefault();
            const overlay = document.getElementById('search-overlay');
            if (overlay) {
                overlay.style.display = 'flex';
                setTimeout(() => document.getElementById('site-search-input')?.focus(), 100);
            } else {
                // Fallback: search overlay not in this page, add it dynamically
                const overlayHtml = `
                <div id="search-overlay" style="display:flex; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:9999; align-items:flex-start; justify-content:center; padding-top:120px;">
                    <div style="background:#fff; border-radius:12px; padding:30px; width:90%; max-width:600px; position:relative;">
                        <button onclick="document.getElementById('search-overlay').style.display='none'" style="position:absolute; top:15px; right:15px; background:none; border:none; font-size:1.5rem; cursor:pointer; color:#666;">&times;</button>
                        <h3 style="margin-bottom:20px; font-family:var(--font-heading); color:var(--color-primary);">Pesquisar no site</h3>
                        <div style="display:flex; gap:10px;">
                            <input type="text" id="site-search-input" placeholder="O que procura?" style="flex:1; padding:12px 16px; border:1px solid #ddd; border-radius:8px; font-size:1rem; outline:none;" onkeydown="if(event.key==='Enter') doSiteSearch()">
                            <button onclick="doSiteSearch()" style="padding:12px 20px; background:var(--color-accent); color:#fff; border:none; border-radius:8px; cursor:pointer; font-size:1rem;">Pesquisar</button>
                        </div>
                        <div id="search-results" style="margin-top:20px;"></div>
                    </div>
                </div>`;
                document.body.insertAdjacentHTML('beforeend', overlayHtml);
                setTimeout(() => document.getElementById('site-search-input')?.focus(), 100);
            }
        });
    }

    // Close search overlay with Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const overlay = document.getElementById('search-overlay');
            if (overlay) overlay.style.display = 'none';
        }
    });

    // 7. Language Toggle
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = opt.getAttribute('data-lang');
            const currentLang = localStorage.getItem('mj_lang') || 'pt';
            if (lang !== currentLang) {
                changeLanguage(lang);
                // Forçar recarga para que o Google Translate corra em todo o DOM (incluindo dados da BD)
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            }
            const parent = opt.closest('.nav-item');
            if(parent) parent.classList.remove('active');
        });
    });

    // Apply saved language preference on load
    const savedLang = localStorage.getItem('mj_lang');
    if (savedLang) {
        changeLanguage(savedLang);
    }

    // 8. Elegant Wave Background
    if (typeof initParticleAnimation === 'function') {
        initParticleAnimation();
    }

    // --- Dynamic Rendering: Expertise ---
    const expertiseContainer = document.getElementById('expertise-container');
    if (expertiseContainer && typeof MockDB !== 'undefined') {
        const items = MockDB.getExpertise();
        if (items.length > 0) {
            expertiseContainer.innerHTML = '';
            items.forEach(item => {
                const div = document.createElement('div');
                div.className = 'accordion-item';
                div.id = item.id;
                div.style = 'background: var(--color-bg); padding: 20px; border-radius: 8px; border-left: 4px solid var(--color-accent); box-shadow: 0 4px 10px rgba(0,0,0,0.05);';
                
                div.innerHTML = `
                    <div class="accordion-header" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; padding-bottom: 10px; border-bottom: 1px solid #eaeaea; transition: opacity 0.2s;">
                        <h3 style="margin: 0; color: var(--color-primary); font-size: 1.4rem;">${item.title}</h3>
                        <span class="accordion-icon" style="font-size: 1.8rem; color: var(--color-accent); font-weight: 300; transition: transform 0.3s ease;">+</span>
                    </div>
                    <div class="accordion-content" style="display: none; padding-top: 20px; font-size: 1.1rem; line-height: 1.8; color: #444; animation: fadeIn 0.3s ease;">${item.description}</div>
                `;
                
                const header = div.querySelector('.accordion-header');
                const content = div.querySelector('.accordion-content');
                const icon = div.querySelector('.accordion-icon');
                
                header.addEventListener('click', () => {
                    const isExpanded = content.style.display === 'block';
                    
                    // Close all other accordions
                    document.querySelectorAll('.accordion-content').forEach(c => c.style.display = 'none');
                    document.querySelectorAll('.accordion-icon').forEach(i => {
                        i.textContent = '+';
                        i.style.transform = 'rotate(0deg)';
                    });
                    
                    // Toggle current
                    if (!isExpanded) {
                        content.style.display = 'block';
                        icon.textContent = '−';
                        icon.style.transform = 'rotate(180deg)';
                    }
                });
                
                // Add hover effect via JS since it's inline styled
                header.addEventListener('mouseover', () => header.style.opacity = '0.7');
                header.addEventListener('mouseout', () => header.style.opacity = '1');

                expertiseContainer.appendChild(div);
            });
            
            // Check if there is a hash in the URL and scroll to it
            if (window.location.hash) {
                setTimeout(() => {
                    const target = document.querySelector(window.location.hash);
                    if (target) {
                        const header = target.querySelector('.accordion-header');
                        if (header) header.click(); // Expand it
                        setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
                    }
                }, 100);
            }
        }
    }

    // --- Dynamic Rendering: Sobre Nós (Institucional) ---
    const sobrenosContainer = document.getElementById('sobrenos-container');
    if (sobrenosContainer && typeof MockDB !== 'undefined') {
        const pageId = sobrenosContainer.getAttribute('data-page');
        if (pageId) {
            const pageData = MockDB.getSobreNosPage(pageId);
            if (pageData) {
                // Remove the "Página em Atualização" title
                const headerSection = document.querySelector('.sub-header h1');
                if (headerSection && pageData.title) {
                    headerSection.textContent = pageData.title;
                }
                
                sobrenosContainer.innerHTML = `
                    <div style="max-width: 900px; margin: 0 auto; padding: 0 20px;">
                        <div style="text-align: left; font-size: 1.1rem; line-height: 1.8; color: #444;">
                            ${pageData.content}
                        </div>
                    </div>
                `;
            }
        }
    }
});

function initParticleAnimation() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width, height, particles;
    
    function init() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = document.querySelector('.hero').offsetHeight || window.innerHeight;
        particles = [];
        
        // Create particles based on screen size for optimal density
        const numParticles = Math.floor((width * height) / 12000);
        
        for(let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 1.5 + 0.5
            });
        }
    }
    
    window.addEventListener('resize', init);
    init();

    function animate() {
        // Make canvas transparent to show background image
        ctx.clearRect(0, 0, width, height);
        
        // Update and draw particles
        for(let i = 0; i < particles.length; i++) {
            let p = particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            
            // Bounce off edges smoothly
            if(p.x < 0 || p.x > width) p.vx *= -1;
            if(p.y < 0 || p.y > height) p.vy *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(212, 175, 55, 0.6)'; // Accent color (golden)
            ctx.fill();
            
            // Draw connecting lines
            for(let j = i + 1; j < particles.length; j++) {
                let p2 = particles[j];
                let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                
                if(dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(212, 175, 55, ${0.15 * (1 - dist/150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

function renderBlogPosts() {
    const container = document.getElementById('public-blog-container');
    if (!container) return;

    container.innerHTML = '';

    // Primary source: articles managed in admin via localStorage
    let articles = JSON.parse(localStorage.getItem('mj_articles')) || [];

    // Secondary fallback: MockDB (legacy) only if localStorage is empty and MockDB exists
    if (articles.length === 0 && typeof MockDB !== 'undefined') {
        const mockPosts = MockDB.getPosts().filter(p => p.published);
        articles = mockPosts.map((p, i) => ({
            id: p.id,
            title: p.title,
            category: p.category || 'ARTIGO',
            date: new Date(p.createdAt).toLocaleDateString('pt-PT', {day:'numeric', month:'long', year:'numeric'}),
            img: p.coverImage || '',
            content: p.excerpt || ''
        }));
    }

    // If still empty â show nothing
    if (articles.length === 0) {
        container.innerHTML = '<p style="color:#999; font-style:italic; padding: 20px 0;">Nenhum artigo publicado de momento. Aceda à  Área de Gestão para adicionar conteúdo.</p>';
        return;
    }

    articles.forEach((art, index) => {
        const card = document.createElement('div');
        card.className = index === 0 ? 'blog-card-large fade-in visible' : 'blog-card-small fade-in visible';

        card.innerHTML = `
            <div class="blog-img-wrapper">
                ${art.img ? `<img src="${art.img}" alt="${art.title}">` : ''}
            </div>
            <div class="blog-card-content">
                <div class="category">${art.category}</div>
                <h3>${art.title}</h3>
                <div class="date">${art.date}</div>
            </div>
        `;

        container.appendChild(card);
    });
}

function openPostModal(id) {
    const post = MockDB.getPost(id);
    if (!post) return;
    
    // Simple modal implementation for reading full post
    let modal = document.getElementById('post-modal');
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "post-modal";
        modal.className = "modal-overlay";
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px; width: 90%; max-height: 90vh; overflow-y: auto; text-align: left; padding: 40px;">
                <button class="close-modal" onclick="document.getElementById('post-modal').classList.remove('active')" style="position: absolute; right: 20px; top: 20px; background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
                <div id="post-modal-body" style="font-family: var(--font-body); color: var(--color-primary);"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    const body = document.getElementById('post-modal-body');
    const date = new Date(post.createdAt).toLocaleDateString('pt-PT');
    
    let mediaHtml = "";
    if (post.coverImage) {
        mediaHtml = `<img src="${post.coverImage}" alt="Capa" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 30px;">`;
    }

    body.innerHTML = `
        ${mediaHtml}
        <small style="color: var(--color-accent); font-weight: 600;">${date}</small>
        <h2 style="font-family: var(--font-heading); font-size: 2.5rem; margin: 15px 0 30px;">${post.title}</h2>
        <div style="line-height: 1.8; font-size: 1.1rem;" class="post-content-html">${post.content}</div>
    `;
    
    modal.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    // Other existing code...
    renderBlogPosts();
    renderInsightsPage();
    renderArtePage();
    renderTeamPage();
    renderMemberPage();
    animateStats();
    initMegaMenuTeam();
});

// Arte Page Logic
function renderArtePage() {
    const container = document.getElementById('arte-page-container');
    if (!container || typeof MockDB === 'undefined') return;

    const artes = MockDB.getArtes();
    container.innerHTML = '';

    if (artes.length === 0) {
        container.innerHTML = '<p style="text-align:center; width:100%; color:#666;">Ainda não existem peças de arte publicadas.</p>';
        return;
    }

    artes.forEach(arte => {
        const card = document.createElement('div');
        card.className = 'art-card';
        card.style.cssText = 'border-radius: 8px; overflow: hidden; background: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: transform 0.3s; cursor: pointer; display: flex; flex-direction: column;';
        
        // Detectar se é vídeo ou imagem pelo data URI ou extensão
        const isVideo = (arte.image && (arte.image.startsWith('data:video/') || /\.(mp4|webm|ogg)$/i.test(arte.image)));
        const mediaHtml = isVideo
            ? `<video src="${arte.image}" style="width: 100%; height: 250px; object-fit: cover;" controls muted></video>`
            : `<img src="${arte.image}" alt="${arte.title}" style="width: 100%; height: 250px; object-fit: cover;">`;

        card.innerHTML = `
            ${mediaHtml}
            <div style="padding: 20px; text-align: left; flex: 1;">
                <h3 style="color: var(--color-primary); margin-bottom: 10px; font-size: 1.3rem;">${arte.title}</h3>
                <p style="color: var(--color-secondary); font-size: 0.95rem; line-height: 1.5;">${arte.description}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Member Page Logic
function renderMemberPage() {
    const memberNameEl = document.getElementById('member-name');
    if (!memberNameEl) return; // Only run on membro.html

    const urlParams = new URLSearchParams(window.location.search);
    const memberId = urlParams.get('id');

    if (!memberId || !window.MockDB) {
        memberNameEl.textContent = "Membro não encontrado";
        return;
    }

    const member = MockDB.getMember(memberId);
    if (!member) {
        memberNameEl.textContent = "Membro não encontrado";
        return;
    }

    // Populate Data
    document.title = `${member.name} - Mário & Joel`;
    memberNameEl.textContent = member.name;
    document.getElementById('member-name-small').textContent = member.name;
    document.getElementById('member-role').textContent = member.role;
    document.getElementById('member-area').textContent = member.area;
    document.getElementById('member-phone').innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> ${member.phone}`;
    document.getElementById('member-phone').href = `tel:${member.phone.replace(/[^0-9+]/g, '')}`;
    
    document.getElementById('member-email').innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> ${member.email}`;
    document.getElementById('member-email').href = `mailto:${member.email}`;

    document.getElementById('member-photo-large').style.backgroundImage = `url('${member.img}')`;
    document.getElementById('member-bio').innerHTML = `<p>${(member.bio || '').replace(/\\n/g, '<br>')}</p>`;

    document.getElementById('member-habilitacoes').innerHTML = `<p>${(member.habilitacoes || '—').replace(/\\n/g, '<br>')}</p>`;
    document.getElementById('member-experiencia').innerHTML = `<p>${(member.experiencia || '—').replace(/\\n/g, '<br>')}</p>`;
    document.getElementById('member-associacoes').innerHTML = `<p>${(member.associacoes || '—').replace(/\\n/g, '<br>')}</p>`;
    document.getElementById('member-linguas').innerHTML = `<p>${(member.linguas || '—').replace(/\\n/g, '<br>')}</p>`;

    // CV Download - se o membro tem CV, apontar para download real
    const cvBtn = document.getElementById('member-cv-btn');
    if (cvBtn && member.cv) {
        cvBtn.href = member.cv;
        cvBtn.setAttribute('download', `CV_${member.name}.pdf`);
        cvBtn.removeAttribute('onclick');
        cvBtn.title = 'Baixar CV';
    }

    // Accordion Logic
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            const isOpen = body.style.display === 'block';
            
            // Close all
            document.querySelectorAll('.accordion-body').forEach(b => b.style.display = 'none');
            document.querySelectorAll('.accordion-header svg').forEach(svg => svg.style.transform = 'rotate(0deg)');
            
            // Open clicked
            if (!isOpen) {
                body.style.display = 'block';
                header.querySelector('svg').style.transform = 'rotate(180deg)';
                header.querySelector('svg').style.transition = 'transform 0.3s';
            }
        });
    });
}

function renderInsightsPage(categoryFilter = null) {
    const container = document.getElementById('insights-page-container');
    if (!container || typeof MockDB === 'undefined') return;

    if (!categoryFilter || typeof categoryFilter !== 'string') {
        const urlParams = new URLSearchParams(window.location.search);
        categoryFilter = urlParams.get('category') || 'TODOS';
    }

    // Update active class on subnav links
    document.querySelectorAll('.insights-subnav a').forEach(a => {
        a.classList.remove('active');
        // Decode URI component in case it's URL-encoded in the data-filter
        if (a.getAttribute('data-filter') && decodeURIComponent(categoryFilter).toUpperCase() === a.getAttribute('data-filter').toUpperCase()) {
            a.classList.add('active');
        }
    });

    let posts = MockDB.getPosts().filter(p => p.published);
    if (categoryFilter !== 'TODOS') {
        posts = posts.filter(p => (p.category || 'ARTIGO').toUpperCase() === categoryFilter.toUpperCase());
    }

    container.innerHTML = "";

    if (posts.length === 0) {
        container.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #999; padding: 40px;">Não foram encontrados artigos nesta categoria.</p>`;
        return;
    }

    const defaultCovers = ['assets/images/dark_diamonds.png', 'assets/images/abstract_sphere.png', 'assets/images/bg-1.jpg'];

    posts.forEach((post, index) => {
        const card = document.createElement("a");
        card.href = "#";
        card.className = "card-horizontal fade-in visible";
        
        const bgImage = post.coverImage || defaultCovers[index % defaultCovers.length];
        const date = new Date(post.createdAt).toLocaleDateString('pt-PT', {day:'numeric', month:'long', year:'numeric'});
        const category = post.category || 'ARTIGO';

        card.innerHTML = `
            <div class="card-horizontal-img" style="background-image: url('${bgImage}');"></div>
            <div class="card-horizontal-content">
                <div class="category" style="color:var(--color-accent);">${category}</div>
                <h3>${post.title}</h3>
                <div class="date">${date}</div>
            </div>
        `;
        
        card.onclick = (e) => {
            e.preventDefault();
            openPostModal(post.id);
        };
        
        container.appendChild(card);
    });
}

window.filterInsights = function(category, event) {
    if (event) {
        event.preventDefault();
        const links = document.querySelectorAll('.insights-subnav a');
        links.forEach(l => l.classList.remove('active'));
        event.target.classList.add('active');
    }
    renderInsightsPage(category);
}

function animateStats() {
    if (typeof MockDB === 'undefined') return;
    const stats = MockDB.getStats();
    
    const elements = {
        pessoas: document.getElementById('stat-pessoas'),
        advogados: document.getElementById('stat-advogados'),
        jurisdicoes: document.getElementById('stat-jurisdicoes')
    };

    if (!elements.pessoas || !elements.advogados || !elements.jurisdicoes) return;

    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentVal = Math.floor(progress * (end - start) + start);
            
            // Add a plus sign only if the number is large, maybe > 300, or just format normally.
            // As per the user, just dynamic counting. We will format with '+' if value > 300 just in case.
            obj.innerHTML = currentVal + (end > 300 && currentVal === end ? '+' : '');
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(elements.pessoas, 0, stats.pessoas, 2000);
                animateValue(elements.advogados, 0, stats.advogados, 2000);
                animateValue(elements.jurisdicoes, 0, stats.jurisdicoes, 2000);
                observer.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.equipa-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Equipa Page Logic
let activeLetter = null;

function renderTeamPage() {
    const container = document.getElementById('team-page-container');
    const filterContainer = document.getElementById('alphabet-filter-container');
    const searchInput = document.getElementById('team-search-input');
    
    if (!container || !filterContainer) return;

    // Check URL parameters for initial filters
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q') || '';
    const initialLetter = urlParams.get('letter');
    
    if (initialLetter) activeLetter = initialLetter;

    // Build Alphabet Filter
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    filterContainer.innerHTML = "";
    
    alphabet.forEach(letter => {
        const a = document.createElement('a');
        a.textContent = letter;
        if (letter === activeLetter) a.classList.add('active');
        a.onclick = (e) => {
            e.preventDefault();
            if (activeLetter === letter) {
                activeLetter = null;
                renderTeamMembers(searchInput ? searchInput.value : '');
                document.querySelectorAll('.letters-grid.page-filter a').forEach(el => el.classList.remove('active'));
            } else {
                activeLetter = letter;
                renderTeamMembers(searchInput ? searchInput.value : '');
                document.querySelectorAll('.letters-grid.page-filter a').forEach(el => el.classList.remove('active'));
                a.classList.add('active');
            }
        };
        filterContainer.appendChild(a);
    });

    if (searchInput) {
        if (initialQuery) searchInput.value = initialQuery;
        
        searchInput.addEventListener('input', (e) => {
            // Se o utilizador pesquisar por texto, limpamos a letra ativa
            if (e.target.value.trim() !== '') {
                activeLetter = null;
                document.querySelectorAll('.letters-grid.page-filter a').forEach(el => el.classList.remove('active'));
            }
            renderTeamMembers(e.target.value);
        });
    }

    renderTeamMembers(initialQuery);
}

function renderTeamMembers(searchQuery = '') {
    const container = document.getElementById('team-page-container');
    if (!container) return;

    container.innerHTML = "";
    
    const teamMembers = window.MockDB ? MockDB.getTeam() : [];
    
    let filtered = teamMembers;
    
    if (activeLetter) {
        filtered = teamMembers.filter(m => m.name.toUpperCase().startsWith(activeLetter));
    }
    
    if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        filtered = teamMembers.filter(m => 
            m.name.toLowerCase().includes(q) || 
            (m.area && m.area.toLowerCase().includes(q)) ||
            (m.role && m.role.toLowerCase().includes(q))
        );
    }

    if (filtered.length === 0) {
        if (activeLetter) {
            container.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #999; padding: 40px;">Nenhum membro encontrado com a letra "${activeLetter}".</p>`;
        } else if (searchQuery) {
            container.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #999; padding: 40px;">Nenhum membro encontrado para a pesquisa "${searchQuery}".</p>`;
        }
        return;
    }

    filtered.forEach(member => {
        const card = document.createElement("a");
        card.href = `membro.html?id=${member.id}`;
        card.className = "team-card-horizontal fade-in visible";
        card.innerHTML = `
            <div class="team-card-img-placeholder" style="background-image: url('${member.img}')"></div>
            <div class="team-card-content">
                <h4>${member.name}</h4>
                <p>${member.role}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

function initMegaMenuTeam() {
    // Dynamic Stats
    const statsElements = document.querySelectorAll('.mega-menu-content .team-stats');
    if (typeof MockDB !== 'undefined' && statsElements.length > 0) {
        const teamCount = MockDB.getTeam().length;
        statsElements.forEach(el => {
            el.innerHTML = `<span class="text-accent">${teamCount} profissionais</span> focados na excelência e rigor jurídico`;
        });
    }

    // Mega Menu Search Input
    const searchInputs = document.querySelectorAll('.mega-menu-content .input-group input[type="text"]');
    
    searchInputs.forEach(input => {
        // Find the adjacent search icon
        const icon = input.parentElement.querySelector('.search-icon');
        
        const triggerSearch = () => {
            const val = input.value.trim();
            if (val) {
                // If we are already on equipa.html, just filter directly without reload
                if (window.location.pathname.includes('equipa.html')) {
                    const pageSearchInput = document.getElementById('team-search-input');
                    if (pageSearchInput) {
                        pageSearchInput.value = val;
                        // Trigger input event
                        pageSearchInput.dispatchEvent(new Event('input'));
                        
                        // Close popup by removing hover/focus from nav item
                        document.body.click(); // Hacky way to lose focus
                    }
                } else {
                    window.location.href = `equipa.html?q=${encodeURIComponent(val)}`;
                }
            }
        };

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                triggerSearch();
            }
        });

        if (icon) {
            icon.style.cursor = 'pointer';
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                triggerSearch();
            });
        }
    });

    // Mega Menu Alphabet
    const alphabetLinks = document.querySelectorAll('.mega-menu-content .letters-grid a');
    alphabetLinks.forEach(link => {
        link.style.cursor = 'pointer';
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const letter = link.textContent.trim();
            if (window.location.pathname.includes('equipa.html')) {
                // Find corresponding letter on the page
                const pageLinks = document.querySelectorAll('#alphabet-filter-container a');
                let found = false;
                pageLinks.forEach(pageLink => {
                    if (pageLink.textContent.trim() === letter) {
                        pageLink.click();
                        found = true;
                    }
                });
            } else {
                window.location.href = `equipa.html?letter=${encodeURIComponent(letter)}`;
            }
        });
    });
}


function initConciergeSearch() {
    const selects = document.querySelectorAll('.concierge-select');
    const conciergeCard = document.querySelector('.concierge-card');
    
    if (selects.length >= 2 && conciergeCard) {
        const practiceSelect = selects[1]; // The second select is for "Práticas"
        const btn = conciergeCard.querySelector('.btn-primary');
        
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const practice = practiceSelect.value;
                if (practice) {
                    window.location.href = `expertise.html#${practice}`;
                } else {
                    window.location.href = `expertise.html`;
                }
            });
        }
    }
}

// Ensure it runs on load
document.addEventListener('DOMContentLoaded', () => {
    initConciergeSearch();
});

// Cookie Banner Logic
function initCookieBanner() {
    if (!localStorage.getItem('cookiesAccepted')) {
        const popup = document.createElement('div');
        popup.className = 'cookie-popup';
        popup.innerHTML = ` <div class="cookie-text">
                Utilizamos cookies para otimizar o nosso website e o nosso serviço, em conformidade com a LGPD e o RGPD. 
                Pode saber mais na nossa <a href="politica-cookies.html">Política de Cookies</a> e <a href="politica-privacidade.html">Política de Privacidade</a>.
            </div>
            <div class="cookie-actions">
                <button class="cookie-btn cookie-btn-settings" onclick="window.location.href='definicoes-cookies.html'">Definições</button>
                <button class="cookie-btn cookie-btn-accept" id="accept-cookies">Aceitar Tudo</button>
            </div>`; document.body.appendChild(popup);
        
        document.getElementById('accept-cookies').addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            popup.classList.add('hidden');
            setTimeout(() => popup.remove(), 500);
        });
    }
}
document.addEventListener('DOMContentLoaded', initCookieBanner);



document.addEventListener('DOMContentLoaded', () => {
    // Inject Team count if element exists
    const teamStatsText = document.getElementById('equipa-stats-text');
    if(teamStatsText) {
        const count = localStorage.getItem('mj_team_count') || '12';
        teamStatsText.textContent = count + ' profissionais focados na excelência e rigor jurídico.';
    }

    // Function to render galleries
    function renderPublicGallery(sectionKey, containerId) {
        const container = document.getElementById(containerId);
        if(!container) return;
        
        let images = JSON.parse(localStorage.getItem('mj_gallery_' + sectionKey));
        // Se não houver imagens, mostrar um texto ou vazio
        if(!images || images.length === 0) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = '';
        images.forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            img.style.width = '300px';
            img.style.height = '200px';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '8px';
            img.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            img.onerror = () => { img.src = 'assets/images/placeholder.jpg'; };
            container.appendChild(img);
        });
    }

    renderPublicGallery('firma', 'firma-gallery-container');
    renderPublicGallery('premios', 'premios-gallery-container');
    renderPublicGallery('carreiras', 'carreiras-gallery-container');
});

document.addEventListener('DOMContentLoaded', () => {
    // Insights Page Dynamic Rendering
    const insightsContainer = document.getElementById('insights-page-container');
    if (insightsContainer) {
        window.filterInsights = function(category, event) {
            if(event) event.preventDefault();
            
            // Update active state
            document.querySelectorAll('.insights-subnav a').forEach(a => a.classList.remove('active'));
            if(event && event.target) event.target.classList.add('active');

            let articles = JSON.parse(localStorage.getItem('mj_articles')) || [];
            
            if (category !== 'TODOS') {
                articles = articles.filter(a => a.category === category);
            }

            insightsContainer.innerHTML = '';

            if (articles.length === 0) {
                insightsContainer.innerHTML = '<p style="color:#666; text-align: center; padding: 40px 20px; font-size: 1.1rem; width: 100%;">Nenhum artigo encontrado nesta categoria.</p>';
                return;
            }

            articles.forEach(art => {
                const item = document.createElement('div');
                item.className = 'insight-list-item';
                item.style = "display: flex; gap: 20px; margin-bottom: 30px; align-items: flex-start;";
                
                item.innerHTML = `
                    <div class="insight-list-img" style="flex: 0 0 250px;">
                        <img src="${art.image}" style="width: 100%; height: 160px; object-fit: cover; border-radius: 4px;">
                    </div>
                    <div class="insight-list-content">
                        <span class="category" style="color: #c9002b; font-weight: bold; font-size: 0.9rem;">${art.category}</span>
                        <h3 style="margin: 10px 0;">${art.title}</h3>
                        <p style="color: #666; margin-bottom: 15px;">${art.excerpt}</p>
                        <span class="date" style="color: #999; font-size: 0.85rem;">${art.date}</span>
                    </div>
                `;
                insightsContainer.appendChild(item);
            });
        };

        // Load TODOS by default
        filterInsights('TODOS');
    }
});

// Global search function for the search overlay
window.doSiteSearch = function() {
    const input = document.getElementById('site-search-input');
    const resultsDiv = document.getElementById('search-results');
    if (!input || !resultsDiv) return;

    const query = input.value.trim().toLowerCase();
    if (!query) {
        resultsDiv.innerHTML = '<p style="color:#999;">Introduza um termo de pesquisa.</p>';
        return;
    }

    // Search through all visible text content on the page
    const searchableElements = document.querySelectorAll('h1, h2, h3, h4, p, li, .blog-card-content h3, .team-card-name, .category');
    const matches = [];

    searchableElements.forEach(el => {
        const text = el.textContent.trim();
        if (text.toLowerCase().includes(query) && text.length > 5) {
            matches.push({
                text: text.substring(0, 120) + (text.length > 120 ? '...' : ''),
                tag: el.tagName,
                el: el
            });
        }
    });

    if (matches.length === 0) {
        resultsDiv.innerHTML = `<p style="color:#666;">Nenhum resultado encontrado para "<strong>${query}</strong>".</p>`;
        return;
    }

    const html = matches.slice(0, 8).map(m => `
        <div onclick="document.getElementById('search-overlay').style.display='none'; m.el ? m.el.scrollIntoView({behavior:'smooth'}) : null;" 
             style="padding:12px; border-bottom:1px solid #eee; cursor:pointer; border-radius:4px; transition:background 0.2s;"
             onmouseover="this.style.background='#f5f5f5'" onmouseout="this.style.background='none'">
            <span style="font-size:0.75rem; color:var(--color-accent); font-weight:600; text-transform:uppercase;">${m.tag}</span>
            <p style="margin:4px 0 0; color:var(--color-primary);">${m.text}</p>
        </div>
    `).join('');

    resultsDiv.innerHTML = `<p style="font-size:0.85rem; color:#999; margin-bottom:10px;">${matches.length} resultado(s) encontrado(s)</p>` + html;
};
