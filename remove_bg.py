from rembg import remove
from PIL import Image
import io

input_path = "src/assets/herosection/new/ChatGPT Image Jul 15, 2026, 12_29_08 AM.png"
output_path = "src/assets/herosection/new/hero_nobg.png"

print("Loading image...")
with open(input_path, "rb") as f:
    input_data = f.read()

print("Removing background (this may take a moment on first run)...")
output_data = remove(input_data)

# Save the transparent result
img = Image.open(io.BytesIO(output_data))
print(f"Result size: {img.size}, mode: {img.mode}")

# Crop to the bounding box of non-transparent pixels to remove side whitespace
bbox = img.getbbox()
if bbox:
    cropped = img.crop(bbox)
    print(f"Cropped from {img.size} to {cropped.size}")
    cropped.save(output_path, "PNG")
else:
    img.save(output_path, "PNG")

print(f"Saved to {output_path}")
