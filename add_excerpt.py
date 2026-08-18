import os

app_js = r'c:\Users\DELL\Desktop\Dr. Joel\frontend\assets\js\app.js'
with open(app_js, 'r', encoding='utf-8') as f:
    content = f.read()

# Let's add the content excerpt to the blog cards
old_rendering = '''        card.innerHTML = `
            <div class="blog-img-wrapper" style="background: #000;">
                ${mediaHtml}
            </div>
            <div class="blog-card-content">
                <div class="category">${art.category}</div>
                <h3>${art.title}</h3>
                <div class="date">${art.date}</div>
            </div>
        `;'''

new_rendering = '''        const plainText = art.content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
        const excerpt = plainText.length > 120 ? plainText.substring(0, 120) + '...' : plainText;

        card.innerHTML = `
            <div class="blog-img-wrapper" style="background: #000;">
                ${mediaHtml}
            </div>
            <div class="blog-card-content">
                <div class="category">${art.category}</div>
                <h3>${art.title}</h3>
                ${excerpt ? `<p class="blog-card-excerpt" style="font-size: 0.95rem; color: #666; margin-bottom: 15px; line-height: 1.6;">${excerpt}</p>` : ''}
                <div class="date">${art.date}</div>
            </div>
        `;'''

content = content.replace(old_rendering, new_rendering)

with open(app_js, 'w', encoding='utf-8') as f:
    f.write(content)

print("Blog cards updated to render the content excerpt.")
