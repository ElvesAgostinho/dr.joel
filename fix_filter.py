import os
import re

app_js = r'c:\Users\DELL\Desktop\Dr. Joel\frontend\assets\js\app.js'
with open(app_js, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the duplicate window.filterInsights block inside DOMContentLoaded
# Starts with window.filterInsights = function(category, event) { and ends before // Load TODOS by default
pattern = re.compile(r'window\.filterInsights = function\(category, event\) \{.*?(?=\s*// Load TODOS by default)', re.DOTALL)
content = pattern.sub('', content)

# Change filterInsights('TODOS') to window.filterInsights('TODOS') just in case
content = content.replace("filterInsights('TODOS');", "window.filterInsights('TODOS');")

with open(app_js, 'w', encoding='utf-8') as f:
    f.write(content)

# Fix editor.js FileReader Base64 conversion
editor_js = r'c:\Users\DELL\Desktop\Dr. Joel\frontend\admin\js\editor.js'
with open(editor_js, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace imageHandler FileReader with API.uploadMedia
img_old = '''const reader = new FileReader();
                reader.onload = (e) => {
                    const range = quill.getSelection(true);
                    quill.insertEmbed(range.index, 'image', e.target.result);
                };
                reader.readAsDataURL(file);'''
img_new = '''try {
                    const url = await API.uploadMedia(file);
                    const range = quill.getSelection(true);
                    quill.insertEmbed(range.index, 'image', url);
                    quill.setSelection(range.index + 1);
                } catch (err) { alert('Erro no upload da imagem: ' + err.message); }'''
content = content.replace(img_old, img_new)

# Replace videoHandler FileReader with API.uploadMedia
vid_old = '''const reader = new FileReader();
                reader.onload = (e) => {
                    const range = quill.getSelection(true);
                    const videoHtml = <video src="" controls style="max-width:100%; border-radius:8px; display:block; margin:15px 0;" muted></video><p><br></p>;
                    quill.clipboard.dangerouslyPasteHTML(range.index, videoHtml);
                };
                reader.readAsDataURL(file);'''
vid_new = '''try {
                    const url = await API.uploadMedia(file);
                    const range = quill.getSelection(true);
                    const videoHtml = <video src="" controls style="max-width:100%; border-radius:8px; display:block; margin:15px 0;" muted></video><p><br></p>;
                    quill.clipboard.dangerouslyPasteHTML(range.index, videoHtml);
                } catch (err) { alert('Erro no upload do vídeo: ' + err.message); }'''
content = content.replace(vid_old, vid_new)

with open(editor_js, 'w', encoding='utf-8') as f:
    f.write(content)

print("Duplicates removed and editor.js FileReader fixed")
