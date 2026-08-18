import os

app_js = r'c:\Users\DELL\Desktop\Dr. Joel\frontend\assets\js\app.js'
with open(app_js, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix expertise call (line 323)
content = content.replace("const items = API.getExpertise();", "const items = await API.getExpertise();")

# 2. Fix sobrenos call (line 388)
content = content.replace("const pageData = API.getSobreNosPage(pageId);", "const pageData = await API.getSobreNosPage(pageId);")

# 3. Fix renderBlogPosts (line 480 & 489)
content = content.replace("articles = API.getPosts()", "articles = (await API.getPosts())")

# 4. Fix openPostModal (line 532)
content = content.replace("function openPostModal(id) {\n    const post = API.getPost(id);", "async function openPostModal(id) {\n    const post = await API.getPost(id);")

# 5. Fix renderArtePage (line 583 & 588)
content = content.replace("function renderArtePage() {", "async function renderArtePage() {")
content = content.replace("const artes = API.getArtes();", "const artes = await API.getArtes();")

# 6. Make the DOMContentLoaded at line 572 async
content = content.replace("document.addEventListener('DOMContentLoaded', () => {\n    // Other existing code...", "document.addEventListener('DOMContentLoaded', async () => {\n    // Other existing code...")
content = content.replace("renderBlogPosts();", "await renderBlogPosts();")
content = content.replace("renderInsightsPage();", "await renderInsightsPage();")
content = content.replace("renderArtePage();", "await renderArtePage();")
content = content.replace("renderTeamPage();", "await renderTeamPage();")
content = content.replace("renderMemberPage();", "await renderMemberPage();")

with open(app_js, 'w', encoding='utf-8') as f:
    f.write(content)

print("All async/await calls in app.js successfully fixed!")
