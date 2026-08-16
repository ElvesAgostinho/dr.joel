from PIL import Image

try:
    img = Image.open(r"c:\Users\DELL\Desktop\Dr. Joel\frontend\assets\images\principal.jpeg")
    left_color = img.getpixel((10, 10))
    right_color = img.getpixel((img.width - 10, 10))
    bottom_left = img.getpixel((10, img.height - 10))
    bottom_right = img.getpixel((img.width - 10, img.height - 10))
    print(f"Top-Left: {left_color}")
    print(f"Top-Right: {right_color}")
    print(f"Bottom-Left: {bottom_left}")
    print(f"Bottom-Right: {bottom_right}")
except Exception as e:
    print(e)
