import os
import re

dir_path = r'c:\Users\DELL\Desktop\Dr. Joel\frontend'

# Get the new footer from index.html
with open(os.path.join(dir_path, 'index.html'), 'r', encoding='utf-8') as f:
    index_content = f.read()

match = re.search(r'<footer class="site-footer">.*?</footer>', index_content, re.DOTALL)
if not match:
    print("Could not find site-footer in index.html")
    exit(1)

new_footer = match.group(0)

# Apply to all other html files
for filename in os.listdir(dir_path):
    if filename.endswith('.html') and filename != 'index.html':
        filepath = os.path.join(dir_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Check if it has the old footer
        if '<footer class="footer">' in content:
            new_content = re.sub(r'<footer class="footer">.*?</footer>', new_footer, content, flags=re.DOTALL)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated footer in {filename}")
        else:
            print(f"Skipped {filename} (no old footer found)")
