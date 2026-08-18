import os
import re

app_js = r'c:\Users\DELL\Desktop\Dr. Joel\frontend\assets\js\app.js'
with open(app_js, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r'window\.filterInsights = function\(category, event\) \{\s*if\(event\) event\.preventDefault\(\);\s*// Update active state.*?insightsContainer\.appendChild\(item\);\s*\}\s*\};\s*', re.DOTALL)
content = pattern.sub('', content)

with open(app_js, 'w', encoding='utf-8') as f:
    f.write(content)
print("Duplicate filterInsights removed from app.js")
