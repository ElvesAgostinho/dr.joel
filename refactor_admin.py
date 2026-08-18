import os
import re

base_dir = r'c:\Users\DELL\Desktop\Dr. Joel\frontend\admin\js'

def read_f(name):
    with open(os.path.join(base_dir, name), 'r', encoding='utf-8') as f: return f.read()

def write_f(name, content):
    with open(os.path.join(base_dir, name), 'w', encoding='utf-8') as f: f.write(content)

# DASHBOARD.JS
content = read_f('dashboard.js')
content = content.replace('MockDB', 'API')
content = content.replace('document.addEventListener(\'DOMContentLoaded\', () => {', 'document.addEventListener(\'DOMContentLoaded\', async () => {')
content = content.replace('const posts = API.getPosts();', 'const posts = await API.getPosts();')
content = content.replace('const stats = API.getStats();', 'const stats = await API.getStats();')
content = content.replace('function renderTable() {', 'async function renderTable() {')
content = content.replace('function togglePublish(id) {', 'async function togglePublish(id) {')
content = content.replace('function deletePost(id) {', 'async function deletePost(id) {')
content = content.replace('function renderStats() {', 'async function renderStats() {')
content = re.sub(r'window\.addEventListener\(\'mj:db-updated\'.*?\}\);', '', content, flags=re.DOTALL)
write_f('dashboard.js', content)

# EDITOR.JS
content = read_f('editor.js')
content = content.replace('MockDB', 'API')
content = content.replace('document.addEventListener(\'DOMContentLoaded\', () => {', 'document.addEventListener(\'DOMContentLoaded\', async () => {')
content = content.replace('const post = API.getPost(postId);', 'const post = await API.getPost(postId);')
content = content.replace('input.onchange = () => {', 'input.onchange = async () => {')
content = re.sub(r'const reader = new FileReader\(\);\s*reader\.onload = \(e\) => \{\s*const range = quill\.getSelection\(true\);\s*quill\.insertEmbed\(range\.index, \'image\', e\.target\.result\);\s*quill\.setSelection\(range\.index \+ 1\);\s*\};\s*reader\.readAsDataURL\(file\);', 'try { const url = await API.uploadMedia(file); const range = quill.getSelection(true); quill.insertEmbed(range.index, "image", url); quill.setSelection(range.index + 1); } catch (err) { alert("Upload error: " + err.message); }', content)
content = re.sub(r'const reader = new FileReader\(\);\s*reader\.onload = \(e\) => \{\s*const range = quill\.getSelection\(true\);\s*const videoHtml = <video src="\$\{e\.target\.result\}" controls style="max-width:100%; border-radius:8px; display:block; margin:15px 0;" muted></video><p><br></p>;\s*quill\.clipboard\.dangerouslyPasteHTML\(range\.index, videoHtml\);\s*\};\s*reader\.readAsDataURL\(file\);', 'try { const url = await API.uploadMedia(file); const range = quill.getSelection(true); const videoHtml = <video src="" controls style="max-width:100%; border-radius:8px; display:block; margin:15px 0;" muted></video><p><br></p>; quill.clipboard.dangerouslyPasteHTML(range.index, videoHtml); } catch (err) { alert("Upload error: " + err.message); }', content)
write_f('editor.js', content)

# ARTES.JS
content = read_f('artes.js')
content = content.replace('MockDB', 'API')
content = content.replace('function renderArtesTable() {', 'async function renderArtesTable() {')
content = content.replace('const artes = API.getArtes();', 'const artes = await API.getArtes();')
content = content.replace('function deleteArte(id) {', 'async function deleteArte(id) {')
content = re.sub(r'window\.addEventListener\(\'mj:db-updated\'.*?\}\);', '', content, flags=re.DOTALL)
content = content.replace('document.addEventListener(\'DOMContentLoaded\', () => {', 'document.addEventListener(\'DOMContentLoaded\', async () => {')
write_f('artes.js', content)

# EXPERTISE.JS
content = read_f('expertise.js')
content = content.replace('MockDB', 'API')
content = content.replace('function renderExpertiseTable() {', 'async function renderExpertiseTable() {')
content = content.replace('const expertise = API.getExpertise();', 'const expertise = await API.getExpertise();')
content = content.replace('function deleteExpertise(id) {', 'async function deleteExpertise(id) {')
content = re.sub(r'window\.addEventListener\(\'mj:db-updated\'.*?\}\);', '', content, flags=re.DOTALL)
content = content.replace('document.addEventListener(\'DOMContentLoaded\', () => {', 'document.addEventListener(\'DOMContentLoaded\', async () => {')
write_f('expertise.js', content)

# SOBRENOS.JS
content = read_f('sobrenos.js')
content = content.replace('MockDB', 'API')
content = content.replace('function renderSobreNosTable() {', 'async function renderSobreNosTable() {')
content = content.replace('const pages = API.getSobreNosPages();', 'const pages = await API.getSobreNosPages();')
content = re.sub(r'window\.addEventListener\(\'mj:db-updated\'.*?\}\);', '', content, flags=re.DOTALL)
content = content.replace('document.addEventListener(\'DOMContentLoaded\', () => {', 'document.addEventListener(\'DOMContentLoaded\', async () => {')
write_f('sobrenos.js', content)

print("Admin scripts refactored.")
