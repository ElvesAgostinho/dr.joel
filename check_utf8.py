with open(r'c:\Users\DELL\Desktop\Dr. Joel\frontend\index.html', 'r', encoding='utf-8') as f:
    content = f.read()
    if 'Ã' in content:
        print('FOUND Ã IN UTF-8 READ!')
    else:
        print('No Ã found when reading as utf-8')
