import os
import re

base_path = 'c:/Users/DELL/Desktop/Dr. Joel/frontend/admin/'

# 1. Update editor-equipa.html
equipa_html_path = os.path.join(base_path, 'editor-equipa.html')
with open(equipa_html_path, 'r', encoding='utf-8') as f:
    equipa_html = f.read()

equipa_html = equipa_html.replace(
    '<input type="text" id="membro-photo" class="form-control" placeholder="Ex: assets/images/team/member.jpg">',
    '<input type="file" id="membro-photo-file" class="form-control" accept="image/*">\n                    <input type="hidden" id="membro-photo">'
)

equipa_html = equipa_html.replace(
    '<input type="text" id="membro-cv" class="form-control" placeholder="Ex: assets/docs/cv-joao.pdf">',
    '<input type="file" id="membro-cv-file" class="form-control" accept="application/pdf">\n                    <input type="hidden" id="membro-cv">'
)

with open(equipa_html_path, 'w', encoding='utf-8') as f:
    f.write(equipa_html)


# 2. Update js/equipa.js
equipa_js_path = os.path.join(base_path, 'js/equipa.js')
with open(equipa_js_path, 'r', encoding='utf-8') as f:
    equipa_js = f.read()

# Add FileReader logic for photo and cv
file_logic = """
        // Handle file uploads via Base64
        const photoFile = document.getElementById('membro-photo-file');
        const photoHidden = document.getElementById('membro-photo');
        if (photoFile) {
            photoFile.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        photoHidden.value = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
        
        const cvFile = document.getElementById('membro-cv-file');
        const cvHidden = document.getElementById('membro-cv');
        if (cvFile) {
            cvFile.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        cvHidden.value = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
"""

equipa_js = equipa_js.replace(
    "const urlParams = new URLSearchParams(window.location.search);",
    file_logic + "\n        const urlParams = new URLSearchParams(window.location.search);"
)

with open(equipa_js_path, 'w', encoding='utf-8') as f:
    f.write(equipa_js)

# 3. Update editor-arte.html
arte_html_path = os.path.join(base_path, 'editor-arte.html')
with open(arte_html_path, 'r', encoding='utf-8') as f:
    arte_html = f.read()

arte_html = arte_html.replace(
    '<input type="text" id="arte-image" class="form-control" required placeholder="Ex: assets/images/nova_arte.jpg">',
    '<input type="file" id="arte-image-file" class="form-control" accept="image/*,video/*" required>\n                    <input type="hidden" id="arte-image">'
)

arte_file_logic = """
        const imageFile = document.getElementById('arte-image-file');
        const imageHidden = document.getElementById('arte-image');
        
        imageFile.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imageHidden.value = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
"""

arte_html = arte_html.replace(
    "document.addEventListener('DOMContentLoaded', () => {",
    "document.addEventListener('DOMContentLoaded', () => {\n" + arte_file_logic
)

with open(arte_html_path, 'w', encoding='utf-8') as f:
    f.write(arte_html)

print("Updated uploads successfully.")
