import glob
import re

files = glob.glob('c:/Users/DELL/Desktop/Dr. Joel/frontend/*.html')

count = 0
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read()
    
    if 'href="arte.html"' in text:
        continue
        
    pattern = r'(</li>\s*)(</ul>\s*<div class="nav-actions">)'
    replacement = r'\g<1>    <li class="nav-item">\n                        <a href="arte.html">Arte</a>\n                    </li>\n                \g<2>'
    
    new_text, subs = re.subn(pattern, replacement, text)
    
    if subs > 0:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_text)
        count += 1

print('Files updated with Arte link:', count)
