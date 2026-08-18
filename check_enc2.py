try:
    with open(r'c:\Users\DELL\Desktop\Dr. Joel\frontend\assets\js\app.js', 'r', encoding='utf-8') as f:
        print(repr(f.read(150)))
except Exception as e:
    print('UTF-8 error:', e)

try:
    with open(r'c:\Users\DELL\Desktop\Dr. Joel\frontend\assets\js\app.js', 'r', encoding='cp1252') as f:
        print(repr(f.read(150)))
except Exception as e:
    print('CP1252 error:', e)
