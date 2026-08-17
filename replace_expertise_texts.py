import os
import re

directory = r'c:\Users\DELL\Desktop\Dr. Joel\frontend'

# Nova barra de menu com data-i18n
pattern_to_replace = r'<a href="expertise\.html">Expertise</a>'
replacement = r'<a href="expertise.html" data-i18n="nav_expertise">Áreas de Prática</a>'

# Encontrar também a lista dropdown inteira e garantir que tem data-i18n
for filename in os.listdir(directory):
    if filename.endswith('.html'):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Substituir link simples de Expertise
        content = re.sub(r'<a href="expertise\.html">Expertise</a>', replacement, content)
        content = re.sub(r'<a href="expertise\.html" data-i18n="nav_expertise">Expertise</a>', replacement, content)
        
        # Adicionar data-i18n para Insights & Media caso não tenha
        content = re.sub(r'<a href="insights\.html">Insights &amp; Media</a>', r'<a href="insights.html" data-i18n="nav_insights">Insights &amp; Media</a>', content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print("Menus updated to use Áreas de Prática and translation attributes.")
