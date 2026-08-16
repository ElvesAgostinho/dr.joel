import os

dir_path = r'c:\Users\DELL\Desktop\Dr. Joel\frontend'

for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        file_path = os.path.join(dir_path, filename)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Clean up stray div
        content = content.replace('</footer>\n    </div>\n\n    <script', '</footer>\n\n    <script')
        content = content.replace('</footer>\n</div>\n\n<script', '</footer>\n\n<script')
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
