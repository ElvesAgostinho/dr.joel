import os
import re

app_js = r'c:\Users\DELL\Desktop\Dr. Joel\frontend\assets\js\app.js'

with open(app_js, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Make DOMContentLoaded async
content = content.replace("document.addEventListener('DOMContentLoaded', () => {", "document.addEventListener('DOMContentLoaded', async () => {")

# 2. Fix renderTeamMembers to be async
content = content.replace("function renderTeamMembers(searchQuery = '') {", "async function renderTeamMembers(searchQuery = '') {")

# 3. Fix await promise property access errors
content = content.replace("await API.getPosts().filter", "(await API.getPosts()).filter")
content = content.replace("await API.getTeam().length", "(await API.getTeam()).length")

# 4. Make filterInsights call renderBlogPosts with await if it's called inside it
content = content.replace("renderBlogPosts();", "await renderBlogPosts();")

# 5. The search input event listener inside renderTeamPage might be calling renderTeamMembers without await
content = content.replace("renderTeamMembers(e.target.value);", "renderTeamMembers(e.target.value);")

with open(app_js, 'w', encoding='utf-8') as f:
    f.write(content)
print("app.js fixed")
