import chardet
with open(r'c:\Users\DELL\Desktop\Dr. Joel\frontend\assets\js\app.js', 'rb') as f:
    print(chardet.detect(f.read()))
