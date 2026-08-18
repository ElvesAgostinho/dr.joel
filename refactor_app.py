import os

app_js = r'c:\Users\DELL\Desktop\Dr. Joel\frontend\assets\js\app.js'
with open(app_js, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace MockDB -> API
content = content.replace("MockDB", "API")

# Make functions async
content = content.replace("function renderBlogPosts()", "async function renderBlogPosts()")
content = content.replace("const posts = API.getPosts().filter(p => p.published).slice(0, 3);", "const posts = (await API.getPosts()).filter(p => p.published).slice(0, 3);")

content = content.replace("function renderMemberPage()", "async function renderMemberPage()")
content = content.replace("const member = API.getMember(memberId);", "const member = await API.getMember(memberId);")

content = content.replace("function renderInsightsPage(categoryFilter = null)", "async function renderInsightsPage(categoryFilter = null)")
content = content.replace("const allPosts = API.getPosts().filter(p => p.published);", "const allPosts = (await API.getPosts()).filter(p => p.published);")
content = content.replace("let posts = API.getPosts().filter(p => p.published);", "let posts = (await API.getPosts()).filter(p => p.published);")

content = content.replace("function animateStats()", "async function animateStats()")
content = content.replace("const stats = API.getStats();", "const stats = await API.getStats();")

content = content.replace("function renderTeamPage()", "async function renderTeamPage()")
content = content.replace("function renderTeamMembers(searchQuery = '')", "async function renderTeamMembers(searchQuery = '')")
content = content.replace("const teamMembers = window.API ? API.getTeam() : [];", "const teamMembers = window.API ? await API.getTeam() : [];")

content = content.replace("function initMegaMenuTeam()", "async function initMegaMenuTeam()")
content = content.replace("const teamCount = API.getTeam().length;", "const teamCount = (await API.getTeam()).length;")

# Make DOMContentLoaded async where API is called
content = content.replace("document.addEventListener('DOMContentLoaded', () => {\n    initConciergeSearch();\n});", "document.addEventListener('DOMContentLoaded', async () => {\n    initConciergeSearch();\n});")
content = content.replace("document.addEventListener('DOMContentLoaded', () => {\n    // Inject Team count", "document.addEventListener('DOMContentLoaded', async () => {\n    // Inject Team count")
content = content.replace("document.addEventListener('DOMContentLoaded', () => {\n    // Insights Page Dynamic Rendering", "document.addEventListener('DOMContentLoaded', async () => {\n    // Insights Page Dynamic Rendering")

# Hardcode category tabs in the correct UTF-8 encoding
old_cat_logic = """        const categoriesSet = new Set();
        categoriesSet.add('TODOS');
        allPosts.forEach(p => {
            if (p.category) {
                categoriesSet.add(p.category.toUpperCase().trim());
            } else {
                categoriesSet.add('ARTIGO');
            }
        });"""

new_cat_logic = """        const categoriesSet = new Set();
        categoriesSet.add('TODOS');
        categoriesSet.add('NOTÍCIAS & IMPRENSA');
        categoriesSet.add('EVENTOS');
        categoriesSet.add('PUBLICAÇÕES');
        categoriesSet.add('VÍDEO');
        categoriesSet.add('ARTIGOS');
        
        allPosts.forEach(p => {
            if (p.category) {
                categoriesSet.add(p.category.toUpperCase().trim());
            }
        });"""

content = content.replace(old_cat_logic, new_cat_logic)

# Remove the duplicate window.filterInsights inside DOMContentLoaded
start_str = "        window.filterInsights = function(category, event) {\n            if(event) event.preventDefault();"
end_str = "        // Load TODOS by default"

start_idx = content.find(start_str)
end_idx = content.find(end_str)

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + content[end_idx:]
    print("Duplicate filterInsights removed.")
else:
    print("WARNING: Could not find duplicate filterInsights to remove!")

# Fix the initial DOMContentLoaded load function call
content = content.replace("filterInsights('TODOS');", "window.filterInsights('TODOS');")

with open(app_js, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done refactoring app.js with UTF-8 preserved!")
