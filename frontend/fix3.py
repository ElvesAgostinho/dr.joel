import os

dir_path = r'c:\Users\DELL\Desktop\Dr. Joel\frontend'

for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        file_path = os.path.join(dir_path, filename)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace hrefs
        content = content.replace('<a href="#">Política de Segurança de Informação</a>', '<a href="politica-seguranca.html">Política de Segurança de Informação</a>')
        content = content.replace('<a href="#">Política de Privacidade</a>', '<a href="politica-privacidade.html">Política de Privacidade</a>')
        content = content.replace('<a href="#">Termos de Utilização</a>', '<a href="termos-utilizacao.html">Termos de Utilização</a>')
        content = content.replace('<a href="#">Política de Cookies</a>', '<a href="politica-cookies.html">Política de Cookies</a>')
        content = content.replace('<a href="#">Definições de cookies</a>', '<a href="definicoes-cookies.html">Definições de cookies</a>')
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
