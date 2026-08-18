import os
import re

app_js = r'c:\Users\DELL\Desktop\Dr. Joel\frontend\assets\js\app.js'
with open(app_js, 'r', encoding='utf-8') as f:
    content = f.read()

# Hardcode the categories so they always show
old_cat_logic = '''        const categoriesSet = new Set();
        categoriesSet.add('TODOS');
        allPosts.forEach(p => {
            if (p.category) {
                categoriesSet.add(p.category.toUpperCase().trim());
            } else {
                categoriesSet.add('ARTIGO');
            }
        });'''

new_cat_logic = '''        const categoriesSet = new Set();
        categoriesSet.add('TODOS');
        categoriesSet.add('NOTÍCIAS & IMPRENSA');
        categoriesSet.add('EVENTOS');
        categoriesSet.add('PUBLICAÇÕES');
        categoriesSet.add('VÍDEO');
        categoriesSet.add('ARTIGOS');
        
        allPosts.forEach(p => {
            if (p.category) {
                categoriesSet.add(p.category.toUpperCase().trim());
            }
        });'''

content = content.replace(old_cat_logic, new_cat_logic)

with open(app_js, 'w', encoding='utf-8') as f:
    f.write(content)
print("Categories hardcoded.")
