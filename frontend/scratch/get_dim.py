from PIL import Image
import sys

try:
    img = Image.open(r"c:\Users\DELL\Desktop\Dr. Joel\frontend\assets\images\hero.jpeg")
    print(f"Width: {img.width}, Height: {img.height}, Ratio: {img.width/img.height}")
except Exception as e:
    print(e)
