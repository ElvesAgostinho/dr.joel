import os
import re

dir_path = r'c:\Users\DELL\Desktop\Dr. Joel\frontend'

for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        filepath = os.path.join(dir_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        content = re.sub(r'href="assets/css/main.css(\?v=\d+)?"', 'href="assets/css/main.css?v=2"', content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print("Cache bust applied to CSS.")
