import os

base_dir = r'c:\Users\DELL\Desktop\Dr. Joel\frontend'

def replace_in_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        content = content.replace(old, new)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# 1. Update HTML files in frontend (and subdirs)
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            replace_in_file(filepath, [
                ('js/mockDB.js', 'js/api.js')
            ])

# 2. Refactor app.js
app_js = os.path.join(base_dir, 'assets', 'js', 'app.js')
replace_in_file(app_js, [
    ('typeof MockDB', 'typeof API'),
    ('window.MockDB', 'window.API'),
    ('MockDB.getExpertise()', 'await API.getExpertise()'),
    ('function renderExpertise()', 'async function renderExpertise()'),
    ('MockDB.getSobreNosPage(', 'await API.getSobreNosPage('),
    ('function renderSobreNos()', 'async function renderSobreNos()'),
    ('MockDB.getPosts()', 'await API.getPosts()'),
    ('function renderBlogPosts()', 'async function renderBlogPosts()'),
    ('function filterInsights(category)', 'async function filterInsights(category)'),
    ('MockDB.getPost(', 'await API.getPost('),
    ('function openPostModal(id)', 'async function openPostModal(id)'),
    ('MockDB.getArtes()', 'await API.getArtes()'),
    ('function renderArtePage()', 'async function renderArtePage()'),
    ('MockDB.getMember(', 'await API.getMember('),
    ('function renderMemberPage()', 'async function renderMemberPage()'),
    ('MockDB.getTeam()', 'await API.getTeam()'),
    ('function renderTeamPage()', 'async function renderTeamPage()'),
    ('function updateStats()', 'async function updateStats()'),
    ('MockDB.getStats()', 'await API.getStats()'),
    ('function animateStats()', 'async function animateStats()')
])

# 3. Refactor dashboard.js
dash_js = os.path.join(base_dir, 'admin', 'js', 'dashboard.js')
replace_in_file(dash_js, [
    ('MockDB.', 'API.'),
    ('API.getPosts()', 'await API.getPosts()'),
    ('function renderTable()', 'async function renderTable()'),
    ('function togglePublish(id)', 'async function togglePublish(id)'),
    ('function deletePost(id)', 'async function deletePost(id)'),
    ('function renderStats()', 'async function renderStats()'),
    ('API.getStats()', 'await API.getStats()'),
    ('window.addEventListener(\'mj:db-updated\'', '// window.addEventListener(\'mj:db-updated\'')
])

# 4. Refactor artes.js
artes_js = os.path.join(base_dir, 'admin', 'js', 'artes.js')
replace_in_file(artes_js, [
    ('typeof MockDB', 'typeof API'),
    ('MockDB.', 'API.'),
    ('API.getArtes()', 'await API.getArtes()'),
    ('function renderArtesTable()', 'async function renderArtesTable()'),
    ('function deleteArte(id)', 'async function deleteArte(id)'),
    ('window.addEventListener(\'mj:db-updated\'', '// window.addEventListener(\'mj:db-updated\'')
])

# 5. Refactor expertise.js
exp_js = os.path.join(base_dir, 'admin', 'js', 'expertise.js')
replace_in_file(exp_js, [
    ('typeof MockDB', 'typeof API'),
    ('MockDB.', 'API.'),
    ('API.getExpertise()', 'await API.getExpertise()'),
    ('function renderExpertiseTable()', 'async function renderExpertiseTable()'),
    ('function deleteExpertise(id)', 'async function deleteExpertise(id)'),
    ('window.addEventListener(\'mj:db-updated\'', '// window.addEventListener(\'mj:db-updated\'')
])

# 6. Refactor sobrenos.js
sobrenos_js = os.path.join(base_dir, 'admin', 'js', 'sobrenos.js')
replace_in_file(sobrenos_js, [
    ('typeof MockDB', 'typeof API'),
    ('MockDB.', 'API.'),
    ('API.getSobreNosPages()', 'await API.getSobreNosPages()'),
    ('function renderSobreNosTable()', 'async function renderSobreNosTable()'),
    ('window.addEventListener(\'mj:db-updated\'', '// window.addEventListener(\'mj:db-updated\'')
])

# 7. Refactor equipa.js
equipa_js = os.path.join(base_dir, 'admin', 'js', 'equipa.js')
replace_in_file(equipa_js, [
    ('typeof MockDB', 'typeof API'),
    ('MockDB.', 'API.'),
    ('API.getTeam()', 'await API.getTeam()'),
    ('function renderTable()', 'async function renderTable()'),
    ('function deleteMembro(id)', 'async function deleteMembro(id)'),
    ('API.getMember(editId)', 'await API.getMember(editId)'),
    ('document.addEventListener(\'DOMContentLoaded\', () => {', 'document.addEventListener(\'DOMContentLoaded\', async () => {'),
    ('photoFile.addEventListener(\'change\', function() {', 'photoFile.addEventListener(\'change\', async function() {'),
    ('cvFile.addEventListener(\'change\', function() {', 'cvFile.addEventListener(\'change\', async function() {')
])
# Custom replacement for file uploads in equipa.js
import re
with open(equipa_js, 'r', encoding='utf-8') as f:
    content = f.read()
content = re.sub(r'const reader = new FileReader\(\);\s*reader\.onload = function\(e\) \{\s*photoHidden\.value = e\.target\.result;\s*if \(photoPreview && photoPreviewWrapper\) \{\s*photoPreview\.src = e\.target\.result;\s*photoPreviewWrapper\.style\.display = \'block\';\s*\}\s*\};\s*reader\.readAsDataURL\(file\);', 'try { const url = await API.uploadMedia(file); photoHidden.value = url; if (photoPreview && photoPreviewWrapper) { photoPreview.src = url; photoPreviewWrapper.style.display = "block"; } } catch(err) { alert("Erro no upload da foto: " + err.message); }', content)
content = re.sub(r'const reader = new FileReader\(\);\s*reader\.onload = function\(e\) \{\s*cvHidden\.value = e\.target\.result;\s*\};\s*reader\.readAsDataURL\(file\);', 'try { const url = await API.uploadMedia(file); cvHidden.value = url; alert("CV carregado com sucesso!"); } catch(err) { alert("Erro no upload do CV: " + err.message); }', content)
with open(equipa_js, 'w', encoding='utf-8') as f:
    f.write(content)

# 8. Refactor editor.js
editor_js = os.path.join(base_dir, 'admin', 'js', 'editor.js')
replace_in_file(editor_js, [
    ('typeof MockDB', 'typeof API'),
    ('MockDB.', 'API.'),
    ('document.addEventListener(\'DOMContentLoaded\', () => {', 'document.addEventListener(\'DOMContentLoaded\', async () => {'),
    ('API.getPost(postId)', 'await API.getPost(postId)'),
    ('input.onchange = () => {', 'input.onchange = async () => {')
])
with open(editor_js, 'r', encoding='utf-8') as f:
    content = f.read()
content = re.sub(r'const reader = new FileReader\(\);\s*reader\.onload = \(e\) => \{\s*const range = quill\.getSelection\(true\);\s*quill\.insertEmbed\(range\.index, \'image\', e\.target\.result\);\s*quill\.setSelection\(range\.index \+ 1\);\s*\};\s*reader\.readAsDataURL\(file\);', 'try { const url = await API.uploadMedia(file); const range = quill.getSelection(true); quill.insertEmbed(range.index, "image", url); quill.setSelection(range.index + 1); } catch (err) { alert("Upload error: " + err.message); }', content)
content = re.sub(r'const reader = new FileReader\(\);\s*reader\.onload = \(e\) => \{\s*const range = quill\.getSelection\(true\);\s*const videoHtml = <video src="\$\{e\.target\.result\}" controls style="max-width:100%; border-radius:8px; display:block; margin:15px 0;" muted></video><p><br></p>;\s*quill\.clipboard\.dangerouslyPasteHTML\(range\.index, videoHtml\);\s*\};\s*reader\.readAsDataURL\(file\);', 'try { const url = await API.uploadMedia(file); const range = quill.getSelection(true); const videoHtml = <video src="" controls style="max-width:100%; border-radius:8px; display:block; margin:15px 0;" muted></video><p><br></p>; quill.clipboard.dangerouslyPasteHTML(range.index, videoHtml); } catch (err) { alert("Upload error: " + err.message); }', content)
with open(editor_js, 'w', encoding='utf-8') as f:
    f.write(content)

# 9. Refactor inline editors html
editor_html = os.path.join(base_dir, 'admin', 'editor.html')
replace_in_file(editor_html, [
    ('coverFile.addEventListener(\'change\', function() {', 'coverFile.addEventListener(\'change\', async function() {')
])
with open(editor_html, 'r', encoding='utf-8') as f:
    content = f.read()
content = re.sub(r'const reader = new FileReader\(\);\s*reader\.onload = function\(e\) \{\s*coverHidden\.value = e\.target\.result;\s*window\.updateCoverPreview\(e\.target\.result\);\s*\};\s*reader\.readAsDataURL\(file\);', 'try { const url = await API.uploadMedia(file); coverHidden.value = url; window.updateCoverPreview(url); } catch(err) { alert("Erro de upload: " + err.message); }', content)
with open(editor_html, 'w', encoding='utf-8') as f:
    f.write(content)

arte_html = os.path.join(base_dir, 'admin', 'editor-arte.html')
replace_in_file(arte_html, [
    ('imageFile.addEventListener(\'change\', function() {', 'imageFile.addEventListener(\'change\', async function() {'),
    ('document.addEventListener(\'DOMContentLoaded\', function() {', 'document.addEventListener(\'DOMContentLoaded\', async function() {'),
    ('MockDB.', 'API.'),
    ('var arte = API.getArte(arteId);', 'var arte = await API.getArte(arteId);')
])
with open(arte_html, 'r', encoding='utf-8') as f:
    content = f.read()
content = re.sub(r'var reader = new FileReader\(\);\s*reader\.onload = function\(e\) \{\s*imageHidden\.value = e\.target\.result;\s*updateArtePreview\(e\.target\.result\);\s*\};\s*reader\.readAsDataURL\(file\);', 'try { const url = await API.uploadMedia(file); imageHidden.value = url; updateArtePreview(url); } catch (err) { alert("Erro: " + err.message); }', content)
content = re.sub(r'\} else \{\s*// Aguardar sincronização.*?(?=\}\s*\})\}', '', content, flags=re.DOTALL)
with open(arte_html, 'w', encoding='utf-8') as f:
    f.write(content)

exp_html = os.path.join(base_dir, 'admin', 'editor-expertise.html')
replace_in_file(exp_html, [
    ('document.addEventListener(\'DOMContentLoaded\', function() {', 'document.addEventListener(\'DOMContentLoaded\', async function() {'),
    ('MockDB.', 'API.'),
    ('var exp = API.getExpertiseItem(expId);', 'var exp = await API.getExpertiseItem(expId);')
])
with open(exp_html, 'r', encoding='utf-8') as f:
    content = f.read()
content = re.sub(r'\} else \{\s*// Aguardar sincronização.*?(?=\}\s*\})\}', '', content, flags=re.DOTALL)
with open(exp_html, 'w', encoding='utf-8') as f:
    f.write(content)

sn_html = os.path.join(base_dir, 'admin', 'editor-sobrenos.html')
replace_in_file(sn_html, [
    ('document.addEventListener(\'DOMContentLoaded\', function() {', 'document.addEventListener(\'DOMContentLoaded\', async function() {'),
    ('MockDB.', 'API.'),
    ('var pageData = API.getSobreNosPage(pageId);', 'var pageData = await API.getSobreNosPage(pageId);')
])
with open(sn_html, 'r', encoding='utf-8') as f:
    content = f.read()
content = re.sub(r'\} else \{\s*// Aguardar sincronização.*?(?=\}\s*\})\}', '', content, flags=re.DOTALL)
with open(sn_html, 'w', encoding='utf-8') as f:
    f.write(content)

print("ALL REPLACEMENTS DONE SECURELY IN UTF-8!")
