import os
import codecs

def fix_file(filepath):
    try:
        with codecs.open(filepath, 'r', 'utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        print(f"Skipping {filepath} (not utf-8)")
        return

    original_content = content
    
    replacements = {
        'JURISDIÃ‡Ã•ES': 'JURISDIÇÕES',
        'PolÃtica': 'Política',
        'InformaÃ§Ã£o': 'Informação',
        'UtilizaÃ§Ã£o': 'Utilização',
        'SeguranÃ§a': 'Segurança',
        'DefiniÃ§Ãµes': 'Definições',
        'MÃ¡rio': 'Mário',
        'PrÃ¡tica': 'Prática',
        'NÃ³s': 'Nós',
        'PrÃ©mios': 'Prémios',
        'PÃºblica': 'Pública',
        'PÃºblico': 'Público',
        'ContrataÃ§Ã£o': 'Contratação',
        'VÃ­deo': 'Vídeo',
        'VÃ DEO': 'VÍDEO',
        'NotÃ­cias': 'Notícias',
        'NOTÃ CIAS': 'NOTÍCIAS',
        'PublicaÃ§Ãµes': 'Publicações',
        'PUBLICAÃ‡Ã•ES': 'PUBLICAÇÕES',
        'Ãreas': 'Áreas',
        'Ã reas': 'Áreas',
        'associados Ã ': 'associados à',
        
        # General character fallback for things not caught above
        'Ã¡': 'á',
        'Ã¢': 'â',
        'Ã£': 'ã',
        'Ã§': 'ç',
        'Ã©': 'é',
        'Ãª': 'ê',
        'Ã­': 'í',
        'Ã³': 'ó',
        'Ã´': 'ô',
        'Ãµ': 'õ',
        'Ãº': 'ú',
        'Ã‡': 'Ç',
        'Ã•': 'Õ',
        'Ã‰': 'É',
        'Ã“': 'Ó',
        'Ãš': 'Ú',
        'Ã\x81': 'Á',
        'Ã\x80': 'À',
        'Ã\x82': 'Â',
        'Ã\x83': 'Ã',
        'Ã\x87': 'Ç',
        'Ã\x8a': 'Ê',
        'Ã\x8d': 'Í',
        'Ã\x93': 'Ó',
        'Ã\x94': 'Ô',
        'Ã\x95': 'Õ',
        'Ã\x9a': 'Ú'
    }

    for bad, good in replacements.items():
        content = content.replace(bad, good)
        
    if content != original_content:
        with codecs.open(filepath, 'w', 'utf-8') as f:
            f.write(content)
        print(f"Fixed {filepath}")

def process_dir(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.html', '.js', '.css', '.json')):
                filepath = os.path.join(root, file)
                fix_file(filepath)

if __name__ == '__main__':
    process_dir('c:/Users/DELL/Desktop/Dr. Joel/frontend')
    print("Done cleaning encoding errors.")
