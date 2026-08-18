import os
import re

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
# We must use replace carefully if it contains variable substitutions... wait! In python f string it's different.
# Let's use regex to replace safely.
pattern_img = re.compile(r'const reader = new FileReader\(\);\s*reader\.onload = \(e\) => \{\s*const range = quill\.getSelection\(true\);\s*quill\.insertEmbed\(range\.index, \'image\', e\.target\.result\);\s*\};\s*reader\.readAsDataURL\(file\);', re.DOTALL)
content = pattern_img.sub(img_new, content)

pattern_vid = re.compile(r'const reader = new FileReader\(\);\s*reader\.onload = \(e\) => \{\s*const range = quill\.getSelection\(true\);\s*const videoHtml = <video src="\$\{e\.target\.result\}" controls style="max-width:100%; border-radius:8px; display:block; margin:15px 0;" muted></video><p><br></p>;\s*quill\.clipboard\.dangerouslyPasteHTML\(range\.index, videoHtml\);\s*\};\s*reader\.readAsDataURL\(file\);', re.DOTALL)
content = pattern_vid.sub(vid_new, content)

with open(editor_js, 'w', encoding='utf-8') as f:
    f.write(content)
print("editor.js fixed")
