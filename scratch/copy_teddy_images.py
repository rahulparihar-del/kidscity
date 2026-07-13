import os
from PIL import Image

src_dir = "/Users/rahulparihar/.gemini/antigravity/brain/efd0c4ef-fa40-47b1-91a7-6820508053ff"
dest_dir = "/Users/rahulparihar/Projects/Kids_City_Website/public/images"

files_mapping = {
    "media__1783941513001.jpg": "baby-teddy-coord-hanger-front.webp",
    "media__1783941520245.jpg": "baby-teddy-coord-hanger-back.webp",
    "media__1783941525579.jpg": "baby-teddy-coord-label.webp",
    "media__1783941532723.jpg": "baby-teddy-coord-model1.webp",  # sitting model
    "media__1783941541104.jpg": "baby-teddy-coord-model2.webp",  # standing model
}

def process():
    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)
        print(f"Created destination directory: {dest_dir}")

    for src_name, dest_name in files_mapping.items():
        src_path = os.path.join(src_dir, src_name)
        dest_path = os.path.join(dest_dir, dest_name)
        
        if not os.path.exists(src_path):
            print(f"Source file not found: {src_path}")
            continue

        try:
            with Image.open(src_path) as img:
                img.convert("RGB").save(dest_path, "WEBP", quality=85)
                print(f"Converted and saved: {src_name} -> {dest_name}")
        except Exception as e:
            print(f"Error processing {src_name}: {e}")

if __name__ == "__main__":
    process()
