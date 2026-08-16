import os
import re

dir_path = r'c:\Users\DELL\Desktop\Dr. Joel\frontend'

for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        filepath = os.path.join(dir_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Remove JUNTE-SE A NOS button
        content = re.sub(r'<a href="#" class="btn btn-primary junte-se">JUNTE-SE A NÓS</a>', '', content)
        
        # Remove Uso Fraudulento Nome/Marca block (including admin link if inside)
        content = re.sub(r'<div class="fraud-link">.*?</div>', '', content, flags=re.DOTALL)
        
        # Remove SIGA-NOS block
        content = re.sub(r'<div class="social-links">.*?</div>', '', content, flags=re.DOTALL)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print("Elements removed.")
