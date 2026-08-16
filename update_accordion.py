import os
import re

app_js_path = 'c:/Users/DELL/Desktop/Dr. Joel/frontend/assets/js/app.js'
with open(app_js_path, 'r', encoding='utf-8') as f:
    app_js = f.read()

old_render = """                div.innerHTML = `
                    <h3 style="margin-top: 0; color: var(--color-primary);">${item.title}</h3>
                    <div style="font-size: 1.1rem; line-height: 1.8; color: #444;">${item.description}</div>
                `;
                expertiseContainer.appendChild(div);"""

new_render = """                div.innerHTML = `
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

                expertiseContainer.appendChild(div);"""

app_js = app_js.replace(old_render, new_render)

# We also need to auto-expand if there's a hash match
hash_logic_old = """            // Check if there is a hash in the URL and scroll to it
            if (window.location.hash) {
                setTimeout(() => {
                    const target = document.querySelector(window.location.hash);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }"""

hash_logic_new = """            // Check if there is a hash in the URL and scroll to it
            if (window.location.hash) {
                setTimeout(() => {
                    const target = document.querySelector(window.location.hash);
                    if (target) {
                        const header = target.querySelector('.accordion-header');
                        if (header) header.click(); // Expand it
                        setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
                    }
                }, 100);
            }"""

app_js = app_js.replace(hash_logic_old, hash_logic_new)

with open(app_js_path, 'w', encoding='utf-8') as f:
    f.write(app_js)

print("Accordion successfully updated.")
