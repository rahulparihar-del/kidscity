import os
import glob
from PIL import Image

src_root = "/Users/rahulparihar/Projects/Kids_City_Website/src/assets/Co-Ord_Set"
dest_dir = "/Users/rahulparihar/Projects/Kids_City_Website/public/images"

folders = ["Ballon", "Deer", "Dino", "Donut", "Sun", "Train"]

def run():
    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)
        print(f"Created destination directory: {dest_dir}")

    for folder in folders:
        folder_path = os.path.join(src_root, folder)
        if not os.path.exists(folder_path):
            print(f"Source folder not found: {folder_path}")
            continue

        png_pattern = os.path.join(folder_path, "*.png")
        png_files = glob.glob(png_pattern)
        # Sort files to ensure deterministic ordering (e.g. model photo first if sorted alphabetically)
        png_files.sort()

        print(f"\nProcessing {folder}: found {len(png_files)} files.")
        
        folder_lower = folder.lower()
        if folder_lower == "ballon":
            folder_lower = "balloon" # correct typo for URLs/filenames

        for idx, png_path in enumerate(png_files):
            webp_name = f"baby-{folder_lower}-coord-{idx + 1}.webp"
            webp_path = os.path.join(dest_dir, webp_name)
            
            try:
                with Image.open(png_path) as img:
                    # Convert to RGB mode and save as WebP
                    img.convert("RGB").save(webp_path, "WEBP", quality=85)
                    print(f"  Converted: {os.path.basename(png_path)} -> {webp_name}")
            except Exception as e:
                print(f"  Error converting {png_path}: {e}")

if __name__ == "__main__":
    run()
