import os
import re

directories = [
    r'c:\Users\DELL\Desktop\Dr. Joel\frontend',
    r'c:\Users\DELL\Desktop\Dr. Joel\frontend\admin'
]

# Nova versão para cache bust
version = 'v=15'

for directory in directories:
    if not os.path.exists(directory):
        continue
    for filename in os.listdir(directory):
        if filename.endswith('.html'):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Substituir mockDB.js
            content = re.sub(r'src="(admin/)?js/mockDB\.js(\?v=[^"]+)?"', f'src="\\1js/mockDB.js?{version}"', content)
            
            # Substituir equipa.js
            content = re.sub(r'src="(admin/)?js/equipa\.js(\?v=[^"]+)?"', f'src="\\1js/equipa.js?{version}"', content)
            
            # Substituir app.js
            content = re.sub(r'src="assets/js/app\.js(\?v=[^"]+)?"', f'src="assets/js/app.js?{version}"', content)
            
            # Substituir auth.js
            content = re.sub(r'src="(admin/)?js/auth\.js(\?v=[^"]+)?"', f'src="\\1js/auth.js?{version}"', content)
            
            # Substituir editor.js
            content = re.sub(r'src="(admin/)?js/editor\.js(\?v=[^"]+)?"', f'src="\\1js/editor.js?{version}"', content)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Cache bust v=12 applied successfully to all HTML files.")
