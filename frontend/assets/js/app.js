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
        /* Ocultar barra superior, iframes e balões de ajuda do Google Translate */
        iframe[class*="goog"], 
        iframe[id*="goog"], 
        iframe.skiptranslate,
        .goog-te-banner-frame, 
        .goog-te-banner,
        #goog-gt-tt, 
        .goog-te-balloon-frame, 
        .goog-tooltip,
        .goog-tooltip:hover { 
            display: none !important; 
            visibility: hidden !important; 
        }
        
        /* Impedir que o Google desloque o corpo da página para baixo */
        body { 
            top: 0px !important; 
            position: static !important;
        }
        html {
            margin-top: 0px !important;
            top: 0px !important;
        }
        
        /* Remover realce de texto traduzido */
        .goog-text-highlight { 
            background-color: transparent !important; 
            border: none !important; 
            box-shadow: none !important; 
            color: inherit !important;
        }
    `;
    document.head.appendChild(style);
})();

// Loop de segurança em Javascript para ocultação garantida e correção do topo da página
if (typeof window !== 'undefined') {
    setInterval(function() {
        var elementsToHide = [
            document.querySelector('.goog-te-banner-frame'),
            document.querySelector('iframe.skiptranslate'),
            document.querySelector('#goog-gt-tt'),
            document.querySelector('.goog-te-balloon-frame')
        ];
        elementsToHide.forEach(function(el) {
            if (el) {
                el.style.setProperty('display', 'none', 'important');
                el.style.setProperty('visibility', 'hidden', 'important');
            }
        });
        if (document.body && document.body.style.top !== '0px') {
            document.body.style.setProperty('top', '0px', 'important');
        }
        if (document.documentElement) {
            if (document.documentElement.style.marginTop !== '0px') {
                document.documentElement.style.setProperty('margin-top', '0px', 'important');
            }
            if (document.documentElement.style.top !== '0px') {
                document.documentElement.style.setProperty('top', '0px', 'important');
            }
        }
    }, 100);
}

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

    // Configurar Cookies do Google Translate
    var domain = window.location.hostname;
    var baseDomain = "." + domain.replace(/^www\./, "");
    
    if (lang === 'pt') {
        // Eliminar cookies do Google Translate para restaurar a língua original (Português)
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + domain + ";";
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + baseDomain + ";";
    } else {
        // Definir cookie para tradução (ex: Inglês)
        var cookieVal = "googtrans=/pt/" + lang;
        document.cookie = cookieVal + "; path=/;";
        document.cookie = cookieVal + "; path=/; domain=" + domain + ";";
        document.cookie = cookieVal + "; path=/; domain=" + baseDomain + ";";
    }
}

document.addEventListener('DOMContentLoaded', async () => {
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
    if (expertiseContainer && typeof API !== 'undefined') {
        const items = await API.getExpertise();
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
    if (sobrenosContainer && typeof API !== 'undefined') {
        const pageId = sobrenosContainer.getAttribute('data-page');
        if (pageId) {
            const pageData = await API.getSobreNosPage(pageId);
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

async function renderBlogPosts() {
    const container = document.getElementById('public-blog-container');
    if (!container) return;

    container.innerHTML = '';

    // Fonte única: API (sincronizado com Supabase via localStorage)
    let articles = [];
    if (typeof API !== 'undefined') {
        articles = (await API.getPosts())
            .filter(p => p.published)
            .map(p => ({
                id: p.id,
                title: p.title,
                category: p.category || 'ARTIGO',
                date: new Date(p.createdAt).toLocaleDateString('pt-PT', {day:'numeric', month:'long', year:'numeric'}),
                img: p.coverImage || '',
                content: p.content || ''
            }));
    }

    if (articles.length === 0) {
        container.innerHTML = '<p style="color:#999; font-style:italic; padding: 20px 0;">Nenhum artigo publicado de momento.</p>';
        return;
    }

    articles.forEach((art, index) => {
        const card = document.createElement('div');
        card.className = index === 0 ? 'blog-card-large fade-in visible' : 'blog-card-small fade-in visible';

        const isVideo = art.img && (art.img.startsWith('data:video/') || /\.(mp4|webm|ogg)$/i.test(art.img));
        const mediaHtml = art.img
            ? (isVideo
                ? `<video src="${art.img}" controls preload="metadata" style="width: 100%; height: 100%; object-fit: contain; background: #000;"></video>`
                : `<img src="${art.img}" alt="${art.title}">`)
            : '';

        const plainText = art.content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
        const excerpt = plainText.length > 120 ? plainText.substring(0, 120) + '...' : plainText;

        card.innerHTML = `
            <div class="blog-img-wrapper" style="background: #000;">
                ${mediaHtml}
            </div>
            <div class="blog-card-content">
                <div class="category">${art.category}</div>
                <h3>${art.title}</h3>
                ${excerpt ? `<p class="blog-card-excerpt" style="font-size: 0.95rem; color: #666; margin-bottom: 15px; line-height: 1.6;">${excerpt}</p>` : ''}
                <div class="date">${art.date}</div>
            </div>
        `;

        container.appendChild(card);
    });
}

window.modalMediaList = [];
window.modalMediaIdx = 0;

window.updateModalMediaDisplay = function() {
    if (!window.modalMediaList || window.modalMediaList.length === 0) return;
    const url = window.modalMediaList[window.modalMediaIdx];
    const isVideo = url.startsWith('data:video/') || /\.(mp4|webm|ogg)$/i.test(url);
    const wrapper = document.getElementById('modal-main-wrapper');
    const counter = document.getElementById('modal-media-counter');
    
    if (wrapper) {
        if (isVideo) {
            wrapper.innerHTML = `<video id="modal-main-media" src="${url}" controls autoplay preload="metadata" style="width: 100%; height: 440px; object-fit: contain; background: #111; display: block;"></video>`;
        } else {
            wrapper.innerHTML = `<img id="modal-main-media" src="${url}" style="width: 100%; height: 440px; object-fit: contain; background: #111; display: block;">`;
        }
    }
    
    if (counter) {
        counter.textContent = `📷 ${window.modalMediaIdx + 1} / ${window.modalMediaList.length}`;
    }

    const dots = document.querySelectorAll('#modal-media-dots span');
    dots.forEach((dot, idx) => {
        if (idx === window.modalMediaIdx) {
            dot.style.background = '#ffffff';
            dot.style.transform = 'scale(1.2)';
        } else {
            dot.style.background = 'rgba(255, 255, 255, 0.4)';
            dot.style.transform = 'scale(1)';
        }
    });
};

window.navigateModalMedia = function(direction) {
    if (!window.modalMediaList || window.modalMediaList.length === 0) return;
    window.modalMediaIdx = (window.modalMediaIdx + direction + window.modalMediaList.length) % window.modalMediaList.length;
    window.updateModalMediaDisplay();
};

window.setModalMediaIndex = function(idx) {
    window.modalMediaIdx = idx;
    window.updateModalMediaDisplay();
};

async function openPostModal(id) {
    const post = await API.getPost(id);
    if (!post) return;
    
    let modal = document.getElementById('post-modal');
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "post-modal";
        modal.className = "modal-overlay";
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 850px; width: 90%; max-height: 90vh; overflow-y: auto; text-align: left; padding: 40px;">
                <button class="close-modal" onclick="document.getElementById('post-modal').classList.remove('active')" style="position: absolute; right: 20px; top: 20px; background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
                <div id="post-modal-body" style="font-family: var(--font-body); color: var(--color-primary);"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    const body = document.getElementById('post-modal-body');
    const date = new Date(post.createdAt).toLocaleDateString('pt-PT');
    
    // Imagem/Vídeo de Capa Principal no topo
    let mediaHtml = "";
    if (post.coverImage) {
        const isVideo = post.coverImage.startsWith('data:video/') || /\.(mp4|webm|ogg)$/i.test(post.coverImage);
        mediaHtml = isVideo
            ? `<video src="${post.coverImage}" controls preload="metadata" style="width: 100%; height: 400px; object-fit: contain; background: #000; border-radius: 12px; margin-bottom: 25px;"></video>`
            : `<img src="${post.coverImage}" alt="Capa" style="width: 100%; max-height: 460px; object-fit: cover; border-radius: 12px; margin-bottom: 25px;">`;
    }

    // Galeria de fotografias do evento (Sem duplicar a imagem de capa!)
    let galleryGridHtml = "";
    if (Array.isArray(post.gallery) && post.gallery.length > 0) {
        const uniqueGallery = post.gallery.filter(url => url && url !== post.coverImage);
        if (uniqueGallery.length > 0) {
            const itemsHtml = uniqueGallery.map(url => {
                const isVid = url.startsWith('data:video/') || /\.(mp4|webm|ogg)$/i.test(url);
                return isVid
                    ? `<div style="border-radius: 12px; overflow: hidden; height: 220px; background: #000; box-shadow: 0 4px 15px rgba(0,0,0,0.06);"><video src="${url}" controls style="width: 100%; height: 100%; object-fit: cover;"></video></div>`
                    : `<div style="border-radius: 12px; overflow: hidden; height: 220px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); cursor: pointer;" onclick="window.open('${url}', '_blank')"><img src="${url}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'"></div>`;
            }).join('');

            galleryGridHtml = `
                <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #eaeaea;">
                    <h4 style="font-family: var(--font-heading); font-size: 1.3rem; color: var(--color-primary); margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
                        🖼️ Fotografias Adicionais do Evento (${uniqueGallery.length})
                    </h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
                        ${itemsHtml}
                    </div>
                </div>
            `;
        }
    }

    let pdfHtml = "";
    if (post.pdfUrl || post.isPaid) {
        if (post.isPaid) {
            pdfHtml = `
                <div style="margin-top: 30px; padding: 20px 24px; background: #fff8f6; border-left: 4px solid #e53e3e; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; gap: 15px; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div style="width: 44px; height: 44px; background: rgba(229, 62, 62, 0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1.2rem;">
                            💵
                        </div>
                        <div>
                            <strong style="display: block; font-size: 1.05rem; color: var(--color-primary); margin-bottom: 2px;">Artigo Premium (${post.price || 'Pago'})</strong>
                            <span style="font-size: 0.85rem; color: #666;">Adquira este artigo completo em documento PDF</span>
                        </div>
                    </div>
                    <button onclick="window.triggerArticlePdf('${post.id}')" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; background: #e53e3e; color: #fff; border: none; padding: 12px 22px; border-radius: 6px; font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: background 0.3s;" onmouseover="this.style.background='#c53030'" onmouseout="this.style.background='#e53e3e'">
                        🛒 Adquirir Artigo (${post.price || 'Pago'})
                    </button>
                </div>
            `;
        } else {
            pdfHtml = `
                <div style="margin-top: 30px; padding: 20px 24px; background: #f8f9fa; border-left: 4px solid var(--color-accent); border-radius: 8px; display: flex; align-items: center; justify-content: space-between; gap: 15px; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div style="width: 44px; height: 44px; background: rgba(197, 168, 128, 0.15); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--color-accent)" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                            </svg>
                        </div>
                        <div>
                            <strong style="display: block; font-size: 1.05rem; color: var(--color-primary); margin-bottom: 2px;">Documento Anexo (PDF)</strong>
                            <span style="font-size: 0.85rem; color: #666;">Descarregue a versão integral deste documento em PDF</span>
                        </div>
                    </div>
                    <a href="${post.pdfUrl}" target="_blank" download class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; background: var(--color-primary); color: #fff; text-decoration: none; padding: 12px 22px; border-radius: 6px; font-weight: 600; font-size: 0.95rem; transition: background 0.3s;" onmouseover="this.style.background='var(--color-accent)'" onmouseout="this.style.background='var(--color-primary)'">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        Baixar PDF
                    </a>
                </div>
            `;
        }
    }

    body.innerHTML = `
        ${mediaHtml}
        <small style="color: var(--color-accent); font-weight: 600;">${date}</small>
        <h2 style="font-family: var(--font-heading); font-size: 2.3rem; margin: 12px 0 25px;">${post.title}</h2>
        ${pdfHtml}
        <div style="line-height: 1.8; font-size: 1.1rem; margin-top: 25px;" class="post-content-html">${post.content}</div>
        ${galleryGridHtml}
    `;
    
    modal.classList.add('active');
}

window.triggerArticlePdf = async function(postId) {
    const post = await API.getPost(postId);
    if (!post) return;
    if (post.isPaid) {
        openPurchaseModal(post);
    } else if (post.pdfUrl) {
        window.open(post.pdfUrl, '_blank');
    }
};

function openLeadModal(post) {
    let modal = document.getElementById('article-lead-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'article-lead-modal';
        modal.className = 'modal-overlay';
        document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 520px; width: 90%; text-align: left; padding: 35px; border-radius: 12px; background: #fff; position: relative;">
            <button class="close-modal" onclick="document.getElementById('article-lead-modal').classList.remove('active')" style="position: absolute; right: 20px; top: 20px; background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
            
            <div style="margin-bottom: 20px;">
                <span style="background: rgba(197, 168, 128, 0.15); color: var(--color-accent); font-weight: 600; font-size: 0.8rem; padding: 3px 8px; border-radius: 4px;">PDF GRATUITO</span>
                <h3 style="font-family: var(--font-heading); font-size: 1.4rem; margin: 10px 0 5px; color: var(--color-primary);">${post.title}</h3>
                <p style="font-size: 0.9rem; color: #666;">Preencha os seus dados para descarregar o documento integral em PDF.</p>
            </div>

            <form id="lead-download-form" onsubmit="window.handleLeadDownload(event, '${post.id}', '${encodeURIComponent(post.pdfUrl)}')">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; font-weight: 600; font-size: 0.88rem; margin-bottom: 5px; color: #333;">Nome Completo *</label>
                    <input type="text" id="lead-name" required placeholder="O seu nome completo" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 0.95rem;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; font-weight: 600; font-size: 0.88rem; margin-bottom: 5px; color: #333;">E-mail *</label>
                    <input type="email" id="lead-email" required placeholder="seu.email@exemplo.com" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 0.95rem;">
                </div>
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: 600; font-size: 0.88rem; margin-bottom: 5px; color: #333;">Telefone / WhatsApp (Opcional)</label>
                    <input type="tel" id="lead-phone" placeholder="(+244) 9XX XXX XXX" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 0.95rem;">
                </div>
                <div id="lead-feedback" style="display:none; padding:10px; border-radius:6px; margin-bottom:15px; font-size:0.9rem;"></div>
                <button type="submit" id="btn-lead-submit" style="width: 100%; padding: 14px; background: var(--color-primary); color: #fff; border: none; border-radius: 6px; font-weight: 600; font-size: 1rem; cursor: pointer;">
                    🚀 Descarregar PDF Agora
                </button>
            </form>
        </div>
    `;
    modal.classList.add('active');
}

window.handleLeadDownload = async function(e, postId, encodedPdfUrl) {
    e.preventDefault();
    const pdfUrl = decodeURIComponent(encodedPdfUrl);
    const name = document.getElementById('lead-name').value.trim();
    const email = document.getElementById('lead-email').value.trim();
    const phone = document.getElementById('lead-phone').value.trim();
    const feedback = document.getElementById('lead-feedback');
    const btn = document.getElementById('btn-lead-submit');

    if (!name || !email) return;

    btn.disabled = true;
    btn.textContent = 'A processar...';

    const post = await API.getPost(postId);
    const postTitle = post ? post.title : 'Artigo';

    // 1. Guardar lead no Supabase
    try {
        if (typeof API !== 'undefined' && API.sendContact) {
            await API.sendContact({
                nome: name,
                email: email,
                telefone: phone,
                empresa: 'Download PDF Grátis',
                assunto: '[Download PDF Grátis] ' + postTitle,
                mensagem: 'Visitante efetuou download do PDF gratuito do artigo: ' + postTitle
            });
        }
    } catch(err) {}

    // 2. Enviar notificação de e-mail por FormSubmit
    try {
        await fetch('https://formsubmit.co/ajax/geral@marioejoeladv.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                _subject: 'Novo Download de PDF Grátis: ' + postTitle,
                Nome: name,
                Email: email,
                Telefone: phone || 'N/A',
                Artigo: postTitle
            })
        });
    } catch(err) {}

    // 3. Iniciar download do PDF
    window.open(pdfUrl, '_blank');

    feedback.style.display = 'block';
    feedback.style.background = '#e6fffa';
    feedback.style.color = '#234e52';
    feedback.innerHTML = '✅ O seu download iniciou-se! Obrigado pelo seu interesse.';
    btn.disabled = false;
    btn.textContent = '🚀 Descarregar Novamente';
};

function openPurchaseModal(post) {
    let modal = document.getElementById('article-purchase-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'article-purchase-modal';
        modal.className = 'modal-overlay';
        document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 580px; width: 90%; text-align: left; padding: 35px; border-radius: 12px; background: #fff; position: relative;">
            <button class="close-modal" onclick="document.getElementById('article-purchase-modal').classList.remove('active')" style="position: absolute; right: 20px; top: 20px; background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
            
            <div style="margin-bottom: 20px;">
                <span style="background: #e53e3e; color: #fff; font-weight: 700; font-size: 0.8rem; padding: 3px 8px; border-radius: 4px;">ARTIGO PREMIUM — ${post.price || 'PAGO'}</span>
                <h3 style="font-family: var(--font-heading); font-size: 1.4rem; margin: 10px 0 5px; color: var(--color-primary);">${post.title}</h3>
                <p style="font-size: 0.9rem; color: #666;">Efetue o pagamento e envie o seu pedido para receber o artigo completo em PDF.</p>
            </div>

            <div style="background: #fff8f6; padding: 16px 20px; border-left: 4px solid #e53e3e; border-radius: 6px; margin-bottom: 20px;">
                <strong style="display: block; color: #c53030; font-size: 0.95rem; margin-bottom: 6px;">💳 Dados para Pagamento / IBAN:</strong>
                <div style="white-space: pre-wrap; font-size: 0.9rem; color: #2d3748; line-height: 1.5; font-family: monospace;">${post.paymentInfo || 'IBAN: AO06.0040.0000.1234.5678.9012.3 (Mário & Joel - Advogados)\nMulticaixa Express: 928 186 060'}</div>
            </div>

            <form id="purchase-form" onsubmit="window.handlePurchaseOrder(event, '${post.id}', '${post.price || ''}')">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div>
                        <label style="display: block; font-weight: 600; font-size: 0.88rem; margin-bottom: 5px; color: #333;">Nome Completo *</label>
                        <input type="text" id="purchase-name" required placeholder="O seu nome" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 0.95rem;">
                    </div>
                    <div>
                        <label style="display: block; font-weight: 600; font-size: 0.88rem; margin-bottom: 5px; color: #333;">E-mail *</label>
                        <input type="email" id="purchase-email" required placeholder="seu.email@exemplo.com" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 0.95rem;">
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                    <div>
                        <label style="display: block; font-weight: 600; font-size: 0.88rem; margin-bottom: 5px; color: #333;">Telefone / WhatsApp *</label>
                        <input type="tel" id="purchase-phone" required placeholder="(+244) 9XX XXX XXX" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 0.95rem;">
                    </div>
                    <div>
                        <label style="display: block; font-weight: 600; font-size: 0.88rem; margin-bottom: 5px; color: #333;">Comprovativo / N.º Ref (Opcional)</label>
                        <input type="text" id="purchase-ref" placeholder="N.º da transferência / Ref" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 0.95rem;">
                    </div>
                </div>

                <div id="purchase-feedback" style="display:none; padding:12px; border-radius:6px; margin-bottom:15px; font-size:0.9rem;"></div>
                <button type="submit" id="btn-purchase-submit" style="width: 100%; padding: 14px; background: #e53e3e; color: #fff; border: none; border-radius: 6px; font-weight: 600; font-size: 1rem; cursor: pointer;">
                    🛒 Confirmar Pedido de Compra
                </button>
            </form>
        </div>
    `;
    modal.classList.add('active');
}

window.handlePurchaseOrder = async function(e, postId, price) {
    e.preventDefault();
    const name = document.getElementById('purchase-name').value.trim();
    const email = document.getElementById('purchase-email').value.trim();
    const phone = document.getElementById('purchase-phone').value.trim();
    const ref = document.getElementById('purchase-ref').value.trim();
    const feedback = document.getElementById('purchase-feedback');
    const btn = document.getElementById('btn-purchase-submit');

    if (!name || !email || !phone) return;

    btn.disabled = true;
    btn.textContent = 'A submeter pedido...';

    const post = await API.getPost(postId);
    const postTitle = post ? post.title : 'Artigo Pago';

    const fullSubject = '[Pedido de Compra de Artigo] ' + postTitle + (price ? ' [Valor: ' + price + ']' : '');
    const messageDetails = 'Solicitação de compra do artigo pago em PDF.\nArtigo: ' + postTitle + '\nPreço: ' + (price || 'N/A') + '\nComprovativo/Ref: ' + (ref || 'Pendente');

    // 1. Guardar no Supabase
    try {
        if (typeof API !== 'undefined' && API.sendContact) {
            await API.sendContact({
                nome: name,
                email: email,
                telefone: phone,
                empresa: ref ? 'Ref: ' + ref : 'Pedido de Compra',
                assunto: fullSubject,
                mensagem: messageDetails
            });
        }
    } catch(err) {}

    // 2. Enviar e-mail via FormSubmit
    try {
        await fetch('https://formsubmit.co/ajax/geral@marioejoeladv.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                _subject: fullSubject,
                Nome: name,
                Email: email,
                Telefone: phone,
                Comprovativo_Ref: ref || 'Pendente',
                Artigo: postTitle,
                Valor: price || 'N/A'
            })
        });
    } catch(err) {}

    feedback.style.display = 'block';
    feedback.style.background = '#e6fffa';
    feedback.style.color = '#234e52';
    feedback.innerHTML = '<strong>✅ O seu pedido de compra foi submetido com sucesso!</strong><br>A nossa equipa irá validar o pagamento e enviar o ficheiro PDF para <u>' + email + '</u>.';
    btn.disabled = false;
    btn.textContent = 'Pedido Registado';
};

document.addEventListener('DOMContentLoaded', () => {
    Promise.all([
        renderBlogPosts(),
        renderInsightsPage(),
        renderArtePage(),
        renderTeamPage(),
        renderMemberPage()
    ]).catch(err => console.warn('Render notice:', err));

    animateStats();
    initMegaMenuTeam();
});

// Arte Page Logic
async function renderArtePage() {
    const container = document.getElementById('arte-page-container');
    if (!container || typeof API === 'undefined') return;

    const artes = await API.getArtes();
    container.innerHTML = '';

    if (artes.length === 0) {
        container.innerHTML = '<p style="text-align:center; width:100%; color:#666;">Ainda não existem peças de arte publicadas.</p>';
        return;
    }

    artes.forEach(arte => {
        const card = document.createElement('div');
        card.className = 'art-card';
        card.style.cssText = 'border-radius: 12px; overflow: hidden; background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.06); transition: all 0.3s ease; cursor: pointer; display: flex; flex-direction: column; border: 1px solid #eaeaea;';
        
        // Efeito de elevação ao passar o rato (Hover)
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
            card.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
        });

        // Detectar se é vídeo ou imagem pelo data URI ou extensão
        const isVideo = (arte.image && (arte.image.startsWith('data:video/') || /\.(mp4|webm|ogg)$/i.test(arte.image)));
        const mediaHtml = isVideo
            ? `<video src="${arte.image}" style="max-width: 100%; max-height: 100%; object-fit: contain; box-shadow: 0 8px 24px rgba(0,0,0,0.15); border: 5px solid #fff;" controls muted></video>`
            : `<img src="${arte.image}" alt="${arte.title}" style="max-width: 100%; max-height: 100%; object-fit: contain; box-shadow: 0 8px 24px rgba(0,0,0,0.15); border: 5px solid #fff; transition: transform 0.5s ease;">`;

        card.innerHTML = `
            <div class="art-media-wrapper" style="height: 280px; padding: 25px; background: #f5f6f8; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative;">
                ${mediaHtml}
            </div>
            <div style="padding: 25px; text-align: left; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <h3 style="font-family: 'Cinzel', serif; color: var(--color-primary); margin: 0 0 10px 0; font-size: 1.25rem; font-weight: 600; letter-spacing: 0.5px; border-bottom: 2px solid var(--color-accent); padding-bottom: 8px; display: inline-block;">${arte.title}</h3>
                    <p style="color: #555; font-size: 0.95rem; line-height: 1.6; margin: 12px 0 0 0;">${arte.description}</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Member Page Logic
async function renderMemberPage() {
    const memberNameEl = document.getElementById('member-name');
    if (!memberNameEl) return; // Only run on membro.html

    const urlParams = new URLSearchParams(window.location.search);
    const memberId = urlParams.get('id');

    if (!memberId || !window.API) {
        memberNameEl.textContent = "Membro não encontrado";
        return;
    }

    const member = await API.getMember(memberId);
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

async function renderInsightsPage(categoryFilter = null) {
    const container = document.getElementById('insights-page-container');
    if (!container || typeof API === 'undefined') return;

    if (!categoryFilter || typeof categoryFilter !== 'string') {
        const urlParams = new URLSearchParams(window.location.search);
        categoryFilter = urlParams.get('category') || 'TODOS';
    }

    function normalizeCat(cat) {
        if (!cat) return 'ARTIGOS';
        let c = cat.toUpperCase().trim();
        if (c === 'ARTIGO') return 'ARTIGOS';
        return c;
    }

    // Gerar dinamicamente as categorias na sub-navegação caso o container exista
    const subnavContainer = document.querySelector('.insights-subnav');
    if (subnavContainer) {
        const allPosts = (await API.getPosts()).filter(p => p.published);
        const categoriesSet = new Set();
        categoriesSet.add('TODOS');
        categoriesSet.add('NOTÍCIAS & IMPRENSA');
        categoriesSet.add('EVENTOS');
        categoriesSet.add('PUBLICAÇÕES');
        categoriesSet.add('VÍDEO');
        categoriesSet.add('ARTIGOS');
        
        allPosts.forEach(p => {
            if (p.category) {
                categoriesSet.add(normalizeCat(p.category));
            }
        });
        
        const uniqueCategories = Array.from(categoriesSet);
        subnavContainer.innerHTML = '';
        uniqueCategories.forEach(cat => {
            const a = document.createElement('a');
            a.href = '#';
            a.setAttribute('data-filter', cat);
            a.textContent = cat;
            if (normalizeCat(categoryFilter) === cat) {
                a.className = 'active';
            }
            a.onclick = (e) => {
                e.preventDefault();
                filterInsights(cat, e);
            };
            subnavContainer.appendChild(a);
        });
    }

    let posts = (await API.getPosts()).filter(p => p.published);
    if (categoryFilter !== 'TODOS') {
        const targetCat = normalizeCat(categoryFilter);
        posts = posts.filter(p => normalizeCat(p.category) === targetCat);
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
        
        const isVideo = bgImage.startsWith('data:video/') || /\.(mp4|webm|ogg)$/i.test(bgImage);
        const mediaHtml = isVideo
            ? `<div class="card-horizontal-img" style="position:relative; overflow:hidden; background: #000;"><video src="${bgImage}" controls preload="metadata" style="position:absolute; width:100%; height:100%; object-fit:contain;"></video></div>`
            : `<div class="card-horizontal-img" style="background-image: url('${bgImage}');"></div>`;

        let pdfBadge = '';
        let cardAction = '';
        if (post.isPaid) {
            pdfBadge = `<span style="display:inline-flex; align-items:center; gap:4px; background:#e53e3e; color:#fff; font-size:0.75rem; font-weight:700; padding:3px 8px; border-radius:4px; letter-spacing:0;">💵 ${post.price || 'PAGO'}</span>`;
            cardAction = `<span style="display:inline-flex; align-items:center; gap:6px; background:#e53e3e; color:#fff; font-size:0.82rem; font-weight:700; padding:6px 14px; border-radius:6px;">🛒 Adquirir (${post.price || 'Pago'})</span>`;
        } else if (post.pdfUrl) {
            pdfBadge = `<span style="display:inline-flex; align-items:center; gap:4px; background:rgba(197, 168, 128, 0.15); color:var(--color-accent); font-size:0.75rem; font-weight:600; padding:3px 8px; border-radius:4px; letter-spacing:0;">📄 PDF GRÁTIS</span>`;
            cardAction = `<span style="display:inline-flex; align-items:center; gap:6px; background:var(--color-primary); color:#fff; font-size:0.82rem; font-weight:600; padding:6px 14px; border-radius:6px;">📄 Baixar PDF</span>`;
        }

        card.innerHTML = `
            ${mediaHtml}
            <div class="card-horizontal-content">
                <div class="category" style="color:var(--color-accent); font-weight:600; display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
                    <span style="letter-spacing:1px; text-transform:uppercase;">${category}</span>
                    ${pdfBadge}
                </div>
                <h3 style="margin-bottom:15px; color:var(--color-primary);">${post.title}</h3>
                <div style="margin-top:auto; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
                    <span class="date">${date}</span>
                    ${cardAction}
                </div>
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

async function animateStats() {
    if (typeof API === 'undefined') return;
    const stats = await API.getStats();
    
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

async function renderTeamPage() {
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

async function renderTeamMembers(searchQuery = '') {
    const container = document.getElementById('team-page-container');
    if (!container) return;

    container.innerHTML = "";
    
    const teamMembers = window.API ? await API.getTeam() : [];
    
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

async function initMegaMenuTeam() {
    // Dynamic Stats
    const statsElements = document.querySelectorAll('.mega-menu-content .team-stats');
    if (typeof API !== 'undefined' && statsElements.length > 0) {
        const teamCount = (await API.getTeam()).length;
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
document.addEventListener('DOMContentLoaded', async () => {
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



document.addEventListener('DOMContentLoaded', async () => {
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

document.addEventListener('DOMContentLoaded', async () => {
    // Insights Page Dynamic Rendering
    const insightsContainer = document.getElementById('insights-page-container');
    if (insightsContainer) {
        // Load TODOS by default
        window.filterInsights('TODOS');
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
