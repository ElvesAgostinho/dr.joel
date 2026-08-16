import os
import re

dir_path = r'c:\Users\DELL\Desktop\Dr. Joel\frontend'

modal_regex = re.compile(r'(\s*<!-- Modals for Search -->\s*<div class="modal-overlay" id="search-modal">.*?</div>\s*</div>)', re.DOTALL)

for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        file_path = os.path.join(dir_path, filename)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace classes
        content = content.replace('class="footer-links"', 'class="footer-links-bar"')
        content = content.replace('class="footer-bottom"', 'class="footer-bottom-bar"')
        
        # Remove modal block
        content = modal_regex.sub('', content)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
