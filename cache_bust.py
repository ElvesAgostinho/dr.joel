import os
import re

base_dir = r'c:\Users\DELL\Desktop\Dr. Joel\frontend'

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Increment version to v=18
            content = re.sub(r'\?v=\d+', '?v=18', content)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
print("Cache busted to v=18")
