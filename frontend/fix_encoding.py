import os

dir_path = r'c:\Users\DELL\Desktop\Dr. Joel\frontend'

def fix_mojibake(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if file has mojibake
    if 'Ã' in content:
        # We replace manually to be safe because sometimes it's double encoded or partially correct
        replacements = {
            'Ã£': 'ã', 'Ã§': 'ç', 'Ãµ': 'õ', 'Ãª': 'ê', 'Ã­': 'í', 
            'Ã¡': 'á', 'Ã¢': 'â', 'Ã©': 'é', 'Ã³': 'ó', 'Ãº': 'ú',
            'Ã€': 'À', 'Ã?': 'Á', 'Ã‰': 'É', 'Ã“': 'Ó', 'Ãš': 'Ú',
            'Ã‡': 'Ç', 'Ã”': 'Ô', 'ÃŠ': 'Ê', 'Ã‚': 'Â', 'Ã£o': 'ão',
            'Ã§Ã£o': 'ção', 'Ã§Ãµes': 'ções', 'Ãs': 'ás', 'Ã ': 'à',
            'Ã¡': 'á', 'Ã©': 'é', 'Ã-': 'í' # Need to be careful with 'í' which often appears as 'Ã\xad'
        }
        
        # A safer approach for exact mojibake
        try:
            # Let's try to encode back to latin1 and decode as utf8
            # This only works if all characters are mojibake, but if mixed, it fails.
            # So manual string replacement is safer for mixed files.
            pass
        except:
            pass

        content = content.replace('Ã§Ã£o', 'ção')
        content = content.replace('Ã§Ãµes', 'ções')
        content = content.replace('Ã§', 'ç')
        content = content.replace('Ã£', 'ã')
        content = content.replace('Ãµ', 'õ')
        content = content.replace('Ãª', 'ê')
        content = content.replace('Ã­', 'í')
        content = content.replace('Ã¡', 'á')
        content = content.replace('Ã¢', 'â')
        content = content.replace('Ã©', 'é')
        content = content.replace('Ã³', 'ó')
        content = content.replace('Ãº', 'ú')
        content = content.replace('Ã€', 'À')
        content = content.replace('Ã‡', 'Ç')
        content = content.replace('Ã”', 'Ô')
        content = content.replace('ÃŠ', 'Ê')
        content = content.replace('Ã‚', 'Â')
        content = content.replace('Ã\xad', 'í')
        content = content.replace('Ã‰', 'É')
        content = content.replace('Ã“', 'Ó')
        content = content.replace('Ãš', 'Ú')
        content = content.replace('Ã?ร', 'Á') # Sometimes Á
        content = content.replace('Ã ', 'à')
        content = content.replace('Ã•', 'Õ')
        content = content.replace('TÃtulo', 'Título')
        content = content.replace('EstatÃsticas', 'Estatísticas')
        content = content.replace('PÃ¡gina', 'Página')
        content = content.replace('MÃ¡rio', 'Mário')
        content = content.replace('AÃ§Ãµes', 'Ações')
        content = content.replace('ConfiguraÃ§Ãµes', 'Configurações')        
        # Fix specific known words
        content = content.replace('DefiniÃ§Ãµes', 'Definições')
        content = content.replace('NOTÃCIAS', 'NOTÍCIAS')
        content = content.replace('conferÃªncia', 'conferência')
        content = content.replace('PolÃtica', 'Política')
        content = content.replace('UtilizaÃ§Ã£o', 'Utilização')
        content = content.replace('InformaÃ§Ã£o', 'Informação')
        content = content.replace('serviÃ§o', 'serviço')
        content = content.replace('disposiÃ§Ã£o', 'disposição')
        
        # Another common one: 'Ã' followed by nothing is often í or à.
        # "NOTÃCIAS" -> "NOTÍCIAS" (already handled above)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed: {filepath}")

for root, dirs, files in os.walk(dir_path):
    for f in files:
        if f.endswith('.html') or f.endswith('.js'):
            filepath = os.path.join(root, f)
            fix_mojibake(filepath)
print("Encoding fixes complete.")
