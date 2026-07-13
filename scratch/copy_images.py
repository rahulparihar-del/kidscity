import os
from PIL import Image

src_dir = "/Users/rahulparihar/.gemini/antigravity/brain/efd0c4ef-fa40-47b1-91a7-6820508053ff"
dest_dir = "/Users/rahulparihar/Projects/Kids_City_Website/public/images"

files_mapping = {
    "media__1783940286850.jpg": "baby-animal-coord-hanger.webp",  # image 1: flat lay on hanger
    "media__1783940298477.jpg": "baby-animal-coord-label.webp",   # image 2: close-up of label
    "media__1783940305244.jpg": "baby-animal-coord-model1.webp",  # image 3: toddler standing
    "media__1783940309337.jpg": "baby-animal-coord-model2.webp",  # image 4: toddler model view 2
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
                # Convert to RGB and save as WEBP
                img.convert("RGB").save(dest_path, "WEBP", quality=85)
                print(f"Converted and saved: {src_name} -> {dest_name}")
        except Exception as e:
            print(f"Error processing {src_name}: {e}")

if __name__ == "__main__":
    process()
