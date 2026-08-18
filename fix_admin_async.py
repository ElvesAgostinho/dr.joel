import os

base_dir = r'c:\Users\DELL\Desktop\Dr. Joel\frontend\admin\js'

def read_f(name):
    with open(os.path.join(base_dir, name), 'r', encoding='utf-8') as f: return f.read()

def write_f(name, content):
    with open(os.path.join(base_dir, name), 'w', encoding='utf-8') as f: f.write(content)

content = read_f('dashboard.js')
content = content.replace('document.addEventListener("DOMContentLoaded", () => {', 'document.addEventListener("DOMContentLoaded", async () => {')
content = content.replace('function renderPosts() {', 'async function renderPosts() {')
content = content.replace('const posts = API.getPosts();', 'const posts = await API.getPosts();')
write_f('dashboard.js', content)

content = read_f('editor.js')
content = content.replace('document.addEventListener(\'DOMContentLoaded\', function() {', 'document.addEventListener(\'DOMContentLoaded\', async function() {')
content = content.replace('document.addEventListener("DOMContentLoaded", () => {', 'document.addEventListener("DOMContentLoaded", async () => {')
write_f('editor.js', content)

