import os
import re

app_js = r'c:\Users\DELL\Desktop\Dr. Joel\frontend\assets\js\app.js'
with open(app_js, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the specific block of code
old_block = '''        window.filterInsights = function(category, event) {
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
                
                item.innerHTML = 
                    <div class="insight-list-img" style="flex: 0 0 250px;">
                        <img src="" style="width: 100%; height: 160px; object-fit: cover; border-radius: 4px;">
                    </div>
                    <div class="insight-list-content">
                        <span class="category" style="color: #c9002b; font-weight: bold; font-size: 0.9rem;"></span>
                        <h3 style="margin: 10px 0;"></h3>
                        <p style="color: #666; margin-bottom: 15px;"></p>
                        <span class="date" style="color: #999; font-size: 0.85rem;"></span>
                    </div>
                ;
                insightsContainer.appendChild(item);
            });
        };'''

if old_block in content:
    content = content.replace(old_block, "")
    content = content.replace("filterInsights('TODOS');", "window.filterInsights('TODOS');")
    with open(app_js, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed!")
else:
    print("Block not found!")
