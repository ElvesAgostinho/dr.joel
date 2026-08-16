import os
import re

files_pages = {
    'premios-reconhecimento.html': 'premios',
    'carreiras.html': 'carreiras'
}

base_path = 'c:/Users/DELL/Desktop/Dr. Joel/frontend/'

for file, page_id in files_pages.items():
    path = os.path.join(base_path, file)
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    
    text = re.sub(
        r'<!-- Main Content -->.*?<main class="container section-padding fade-in"[^>]*>.*?</main>',
        f'<!-- Main Content -->\n    <main class="container section-padding fade-in" style="min-height: 50vh;">\n        <div id="sobrenos-container" data-page="{page_id}">\n            <!-- Dynamic content loaded here -->\n        </div>\n    </main>',
        text,
        flags=re.DOTALL
    )
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)
