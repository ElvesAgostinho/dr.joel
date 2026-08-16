import glob

files = glob.glob('c:/Users/DELL/Desktop/Dr. Joel/frontend/admin/*.html')

for file in files:
    if 'gestao' in file or 'editor-sobrenos' in file or 'editor-expertise' in file:
        continue
    
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read()
    
    text = text.replace('<a href="artes.html">Arte</a>', '<a href="artes.html">Arte</a>\n                <a href="gestao-expertise.html">Áreas de Prática</a>\n                <a href="gestao-sobrenos.html">Sobre Nós</a>')
    
    text = text.replace('<a href="artes.html" class="active">Arte</a>', '<a href="artes.html" class="active">Arte</a>\n                <a href="gestao-expertise.html">Áreas de Prática</a>\n                <a href="gestao-sobrenos.html">Sobre Nós</a>')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(text)
