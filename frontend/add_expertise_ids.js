const fs = require('fs');

let content = fs.readFileSync('expertise.html', 'utf8');

const ids = [
    'financeiro',
    'reestruturacao',
    'comercial',
    'imobiliario',
    'laboral',
    'fiscal',
    'ppp',
    'contratacao',
    'contencioso'
];

let index = 0;
// Replace <div class="accordion-item"> with <div class="accordion-item" id="the-id">
content = content.replace(/<div class="accordion-item">/g, (match) => {
    if (index < ids.length) {
        let replacement = `<div class="accordion-item" id="${ids[index]}">`;
        index++;
        return replacement;
    }
    return match;
});

const newScript = `<script>
        // Accordion functionality
        document.querySelectorAll('.accordion-header').forEach(button => {
            button.addEventListener('click', () => {
                const accordionContent = button.nextElementSibling;
                button.classList.toggle('active');
                
                if (button.classList.contains('active')) {
                    accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                } else {
                    accordionContent.style.maxHeight = 0;
                }
                
                // Close others
                document.querySelectorAll('.accordion-header').forEach(otherBtn => {
                    if (otherBtn !== button) {
                        otherBtn.classList.remove('active');
                        otherBtn.nextElementSibling.style.maxHeight = 0;
                    }
                });
            });
        });

        // Hash auto-open
        document.addEventListener('DOMContentLoaded', () => {
            function openFromHash() {
                if (window.location.hash) {
                    const id = window.location.hash.substring(1);
                    const target = document.getElementById(id);
                    if (target) {
                        const header = target.querySelector('.accordion-header');
                        if (header && !header.classList.contains('active')) {
                            header.click(); // Trigger the click to open
                        }
                        
                        setTimeout(() => {
                            // Smooth scroll with offset for fixed header
                            const headerOffset = 100;
                            const elementPosition = target.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                            
                            window.scrollTo({
                                 top: offsetPosition,
                                 behavior: "smooth"
                            });
                        }, 300); // slight delay to allow max-height transition
                    }
                }
            }
            openFromHash();
            window.addEventListener('hashchange', openFromHash);
        });
    </script>
</body>`;

content = content.replace(/<script>\s*\/\/\s*Accordion functionality[\s\S]*?<\/script>\s*<\/body>/, newScript);

fs.writeFileSync('expertise.html', content, 'utf8');
console.log('Added IDs and Hash script to expertise.html');
