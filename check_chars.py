with open(r'c:\Users\DELL\Desktop\Dr. Joel\frontend\assets\js\app.js', 'r', encoding='utf-8') as f:
    content = f.read()
    start = content.find('brand:')
    print(repr(content[start:start+100]))
