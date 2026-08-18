import os

app_js = r'c:\Users\DELL\Desktop\Dr. Joel\frontend\assets\js\app.js'
with open(app_js, 'r', encoding='utf-8') as f:
    content = f.read()

# Make DOMContentLoaded at line 189 async
content = content.replace("document.addEventListener('DOMContentLoaded', () => {", "document.addEventListener('DOMContentLoaded', async () => {", 1)

with open(app_js, 'w', encoding='utf-8') as f:
    f.write(content)

print("Line 189 DOMContentLoaded callback is now async!")
