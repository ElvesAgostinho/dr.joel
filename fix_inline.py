import os
import re

base_dir = r'c:\Users\DELL\Desktop\Dr. Joel\frontend\admin'

# editor.html
editor_html = os.path.join(base_dir, 'editor.html')
with open(editor_html, 'r', encoding='utf-8') as f: content = f.read()
content = content.replace("coverFile.addEventListener('change', function() {", "coverFile.addEventListener('change', async function() {")
content = re.sub(r'const reader = new FileReader\(\);\s*reader\.onload = function\(e\) \{\s*coverHidden\.value = e\.target\.result;\s*window\.updateCoverPreview\(e\.target\.result\);\s*\};\s*reader\.readAsDataURL\(file\);', 'try { const url = await API.uploadMedia(file); coverHidden.value = url; window.updateCoverPreview(url); } catch(err) { alert("Erro de upload: " + err.message); }', content)
with open(editor_html, 'w', encoding='utf-8') as f: f.write(content)

# editor-arte.html
arte_html = os.path.join(base_dir, 'editor-arte.html')
with open(arte_html, 'r', encoding='utf-8') as f: content = f.read()
content = content.replace("imageFile.addEventListener('change', function() {", "imageFile.addEventListener('change', async function() {")
content = content.replace("document.addEventListener('DOMContentLoaded', function() {", "document.addEventListener('DOMContentLoaded', async function() {")
content = content.replace("MockDB.", "API.")
content = content.replace("var arte = API.getArte(arteId);", "var arte = await API.getArte(arteId);")
content = re.sub(r'var reader = new FileReader\(\);\s*reader\.onload = function\(e\) \{\s*imageHidden\.value = e\.target\.result;\s*updateArtePreview\(e\.target\.result\);\s*\};\s*reader\.readAsDataURL\(file\);', 'try { const url = await API.uploadMedia(file); imageHidden.value = url; updateArtePreview(url); } catch (err) { alert("Erro: " + err.message); }', content)
content = re.sub(r'\} else \{\s*// Aguardar sincronização.*?(?=\}\s*\})\}', '', content, flags=re.DOTALL)
with open(arte_html, 'w', encoding='utf-8') as f: f.write(content)

# editor-expertise.html
exp_html = os.path.join(base_dir, 'editor-expertise.html')
with open(exp_html, 'r', encoding='utf-8') as f: content = f.read()
content = content.replace("document.addEventListener('DOMContentLoaded', function() {", "document.addEventListener('DOMContentLoaded', async function() {")
content = content.replace("MockDB.", "API.")
content = content.replace("var exp = API.getExpertiseItem(expId);", "var exp = await API.getExpertiseItem(expId);")
content = re.sub(r'\} else \{\s*// Aguardar sincronização.*?(?=\}\s*\})\}', '', content, flags=re.DOTALL)
with open(exp_html, 'w', encoding='utf-8') as f: f.write(content)

# editor-sobrenos.html
sn_html = os.path.join(base_dir, 'editor-sobrenos.html')
with open(sn_html, 'r', encoding='utf-8') as f: content = f.read()
content = content.replace("document.addEventListener('DOMContentLoaded', function() {", "document.addEventListener('DOMContentLoaded', async function() {")
content = content.replace("MockDB.", "API.")
content = content.replace("var pageData = API.getSobreNosPage(pageId);", "var pageData = await API.getSobreNosPage(pageId);")
content = re.sub(r'\} else \{\s*// Aguardar sincronização.*?(?=\}\s*\})\}', '', content, flags=re.DOTALL)
with open(sn_html, 'w', encoding='utf-8') as f: f.write(content)

print("Inline HTML scripts refactored.")
