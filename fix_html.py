import os

base_dir = r'c:\Users\DELL\Desktop\Dr. Joel\frontend'

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            if 'js/mockDB.js' in content:
                content = content.replace('js/mockDB.js', 'js/api.js')
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated {filepath}")
