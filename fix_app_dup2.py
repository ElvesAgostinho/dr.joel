import os
import re

app_js = r'c:\Users\DELL\Desktop\Dr. Joel\frontend\assets\js\app.js'
with open(app_js, 'r', encoding='utf-8') as f:
    content = f.read()

start_str = "        window.filterInsights = function(category, event) {\n            if(event) event.preventDefault();"
end_str = "        // Load TODOS by default"

start_idx = content.find(start_str)
end_idx = content.find(end_str)

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + content[end_idx:]
    with open(app_js, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Duplicate successfully removed.")
else:
    print("Could not find start or end block.")
