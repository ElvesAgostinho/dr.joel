with open(r'c:\Users\DELL\Desktop\Dr. Joel\frontend\index.html', 'rb') as f:
    content = f.read()
    idx = content.find(b'M\xc3') # look for M followed by UTF8 starter for Mário
    if idx != -1:
        print(content[idx:idx+20])
    idx2 = content.find(b'M\xe1') # look for ANSI Mário
    if idx2 != -1:
        print('ANSI found:', content[idx2:idx2+20])
