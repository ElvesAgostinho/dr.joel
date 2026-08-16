import os
import re

base_path = 'c:/Users/DELL/Desktop/Dr. Joel/frontend/admin/'

editors = [
    {
        'file': 'editor-sobrenos.html',
        'js_file': 'js/sobrenos.js',
        'textarea_id': 'sobrenos-content',
        'js_var_load': "document.getElementById('sobrenos-content').value = pageData.content;",
        'js_var_load_quill': "quill.root.innerHTML = pageData.content || '';",
        'js_var_save': "document.getElementById('sobrenos-content').value"
    },
    {
        'file': 'editor-expertise.html',
        'js_file': 'js/expertise.js',
        'textarea_id': 'exp-desc',
        'js_var_load': "document.getElementById('exp-desc').value = item.description;",
        'js_var_load_quill': "quill.root.innerHTML = item.description || '';",
        'js_var_save': "document.getElementById('exp-desc').value"
    },
    {
        'file': 'editor-equipa.html',
        'js_file': 'js/equipa.js',
        'textarea_id': 'membro-bio',
        'js_var_load': "document.getElementById('membro-bio').value = item.bio || '';",
        'js_var_load_quill': "quill.root.innerHTML = item.bio || '';",
        'js_var_save': "document.getElementById('membro-bio').value"
    },
    {
        'file': 'editor-arte.html',
        'js_file': None, # JS is embedded
        'textarea_id': 'arte-desc',
        'js_var_load': "document.getElementById('arte-desc').value = arte.description;",
        'js_var_load_quill': "quill.root.innerHTML = arte.description || '';",
        'js_var_save': "document.getElementById('arte-desc').value"
    }
]

quill_css = '<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">\n    <link rel="stylesheet" href="css/admin.css">'
quill_js = '<script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>\n    <script src="js/mockDB.js">'
quill_init = """
    <script>
        var quill = new Quill('#quill-editor', {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'color': [] }, { 'background': [] }],
                    ['link', 'clean']
                ]
            }
        });
    </script>
</body>
"""

for ed in editors:
    html_path = os.path.join(base_path, ed['file'])
    
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # 1. Add CSS
    html = html.replace('<link rel="stylesheet" href="css/admin.css">', quill_css)
    
    # 2. Add JS
    html = html.replace('<script src="js/mockDB.js">', quill_js)
    
    # 3. Replace textarea
    textarea_pattern = f'<textarea id="{ed["textarea_id"]}".*?</textarea>'
    replacement = f'<div id="quill-editor" style="height: 300px; background: white;"></div>\n                    <input type="hidden" id="{ed["textarea_id"]}">'
    html = re.sub(textarea_pattern, replacement, html, flags=re.DOTALL)
    
    # 4. Add Quill init
    html = html.replace('</body>', quill_init)
    
    # 5. Handle Embedded JS for arte.html
    if ed['js_file'] is None:
        html = html.replace(ed['js_var_load'], ed['js_var_load_quill'])
        
        save_logic_pattern = f"const description = {ed['js_var_save']};"
        new_save_logic = f"const description = quill.root.innerHTML;"
        html = html.replace(save_logic_pattern, new_save_logic)
        
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html)
        
    # 6. Handle separate JS files
    if ed['js_file'] is not None:
        js_path = os.path.join(base_path, ed['js_file'])
        with open(js_path, 'r', encoding='utf-8') as f:
            js = f.read()
            
        js = js.replace(ed['js_var_load'], ed['js_var_load_quill'])
        
        # In JS, intercept form submit to move quill data to hidden input
        submit_pattern = "form.addEventListener('submit', (e) => {"
        submit_replacement = f"form.addEventListener('submit', (e) => {{\n            document.getElementById('{ed['textarea_id']}').value = quill.root.innerHTML;"
        js = js.replace(submit_pattern, submit_replacement)
        
        with open(js_path, 'w', encoding='utf-8') as f:
            f.write(js)

print("Quill JS successfully integrated.")
