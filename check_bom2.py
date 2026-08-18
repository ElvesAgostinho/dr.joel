with open(r'c:\Users\DELL\Desktop\Dr. Joel\frontend\index.html', 'rb') as f:
    content = f.read()
    idx = content.find(b'RIO & JOEL')
    print(content[max(0, idx-10):idx+15])
