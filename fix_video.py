import os

app_js = r'c:\Users\DELL\Desktop\Dr. Joel\frontend\assets\js\app.js'
with open(app_js, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update video inside renderBlogPosts (on home page)
old_home_video = '`<video src="${art.img}" style="width: 100%; height: 100%; object-fit: cover;" muted autoplay loop></video>`'
new_home_video = '`<video src="${art.img}" controls preload="metadata" style="width: 100%; height: 100%; object-fit: contain; background: #000;"></video>`'
content = content.replace(old_home_video, new_home_video)

# 2. Update video inside openPostModal (on modal popup)
old_modal_video = '`<video src="${post.coverImage}" controls style="width: 100%; height: 350px; object-fit: cover; border-radius: 8px; margin-bottom: 30px;" autoplay muted loop></video>`'
new_modal_video = '`<video src="${post.coverImage}" controls preload="metadata" style="width: 100%; height: 350px; object-fit: contain; background: #000; border-radius: 8px; margin-bottom: 30px;"></video>`'
content = content.replace(old_modal_video, new_modal_video)

# 3. Update video inside renderInsightsPage (on insights listing)
old_insights_video = '`<div class="card-horizontal-img" style="position:relative; overflow:hidden;"><video src="${bgImage}" style="position:absolute; width:100%; height:100%; object-fit:cover;" muted autoplay loop></video></div>`'
new_insights_video = '`<div class="card-horizontal-img" style="position:relative; overflow:hidden; background: #000;"><video src="${bgImage}" controls preload="metadata" style="position:absolute; width:100%; height:100%; object-fit:contain;"></video></div>`'
content = content.replace(old_insights_video, new_insights_video)

with open(app_js, 'w', encoding='utf-8') as f:
    f.write(content)

print("Video player styling successfully updated to professional mode!")
