import os
app_js = r'c:\Users\DELL\Desktop\Dr. Joel\frontend\assets\js\app.js'
with open(app_js, 'r', encoding='utf-8') as f: content = f.read()
content = content.replace("filterInsights('TODOS');", "window.filterInsights('TODOS');")
with open(app_js, 'w', encoding='utf-8') as f: f.write(content)
print('Done!')
