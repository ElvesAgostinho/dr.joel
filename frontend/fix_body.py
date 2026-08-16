import os

dir_path = r'c:\Users\DELL\Desktop\Dr. Joel\frontend'
for f in os.listdir(dir_path):
    if f.endswith('.html'):
        filepath = os.path.join(dir_path, f)
        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()
        
        target = '<body>'
        replacement = '<body class="page-with-fixed-nav">'
        
        if target in content:
            content = content.replace(target, replacement)
            with open(filepath, 'w', encoding='utf-8') as file:
                file.write(content)
            print(f'Updated {f}')
