import os
import glob
from PIL import Image
from supabase import create_client

# Supabase details
SUPABASE_URL = "https://ktravgseczesbdvfjvad.supabase.co"
SUPABASE_KEY = "sb_publishable_Pu3CehjU4Dfer5iQcbQM6w_-cg_v7vs"
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Directories
images_dir = os.path.join(os.path.dirname(__file__), "..", "public", "images")

def run():
    # 1. Find all nightsuit hosiery PNG images
    png_pattern = os.path.join(images_dir, "nightsuit-hosiery-*.png")
    png_files = glob.glob(png_pattern)
    print(f"Found {len(png_files)} PNG files to convert to WebP.")

    for png_path in png_files:
        webp_path = png_path.rsplit(".", 1)[0] + ".webp"
        try:
            with Image.open(png_path) as img:
                # Convert to RGB mode if RGBA is not fully supported by target (WebP supports RGBA but let's keep it safe)
                if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                    # We can keep RGBA for webp transparency
                    img.save(webp_path, "WEBP", quality=85)
                else:
                    img.convert("RGB").save(webp_path, "WEBP", quality=85)
            
            # Delete original PNG
            os.remove(png_path)
            print(f"Converted: {os.path.basename(png_path)} -> {os.path.basename(webp_path)}")
        except Exception as e:
            print(f"Error converting {png_path}: {e}")

    # 2. Fetch the newly inserted Nightwear products from Supabase
    print("Updating database references...")
    response = supabase.table("products").select("id, img, gallery").eq("category", "Nightwear").execute()
    products = response.data

    for product in products:
        p_id = product["id"]
        # Replace .png with .webp
        old_img = product["img"]
        new_img = old_img.rsplit(".", 1)[0] + ".webp"

        old_gallery = product["gallery"]
        new_gallery = [g.rsplit(".", 1)[0] + ".webp" for g in old_gallery]

        # Update Supabase
        update_resp = supabase.table("products").update({
            "img": new_img,
            "gallery": new_gallery
        }).eq("id", p_id).execute()

        print(f"Updated product ID {p_id} in database to use WebP images.")

if __name__ == "__main__":
    run()
