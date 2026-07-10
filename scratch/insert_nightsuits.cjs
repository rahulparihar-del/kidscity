const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase
const supabaseUrl = 'https://ktravgseczesbdvfjvad.supabase.co';
const supabaseKey = 'sb_publishable_Pu3CehjU4Dfer5iQcbQM6w_-cg_v7vs';
const supabase = createClient(supabaseUrl, supabaseKey);

const srcDir = path.join(__dirname, '..', 'public', 'Cotton Hosiery');
const destDir = path.join(__dirname, '..', 'public', 'images');

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Custom titles for the 5 styles to make them look premium
const PRODUCT_NAMES = [
  "Kids Premium Cotton Hosiery Printed Night Suit — Cute Animals Print",
  "Soft Cotton Hosiery Kids Night Suit — Starry Night Blue",
  "Kids Breathable Cotton Night Suit — Playful Doodles Print",
  "Premium Cotton Hosiery Kids Sleepwear — Sweet Dreams Pastel",
  "Kids Cozy Hosiery Cotton Night Suit Set — Friendly Dino Print"
];

async function run() {
  const folders = ['1', '2', '3', '4', '5'];
  const productsToInsert = [];

  for (const folder of folders) {
    const folderPath = path.join(srcDir, folder);
    if (!fs.existsSync(folderPath)) {
      console.log(`Folder ${folder} not found, skipping.`);
      continue;
    }

    // Read files in folder
    const files = fs.readdirSync(folderPath).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.webp';
    });

    console.log(`Processing folder ${folder}: found ${files.length} images.`);

    const newPaths = [];
    files.forEach((file, index) => {
      const ext = path.extname(file);
      const newName = `nightsuit-hosiery-${folder}-${index + 1}${ext}`;
      const srcFile = path.join(folderPath, file);
      const destFile = path.join(destDir, newName);

      // Copy file
      fs.copyFileSync(srcFile, destFile);
      newPaths.push(`/images/${newName}`);
    });

    if (newPaths.length === 0) continue;

    // Construct product details
    const folderIndex = parseInt(folder) - 1;
    const name = PRODUCT_NAMES[folderIndex] || `Premium Cotton Hosiery Night Suit — Style ${folder}`;
    
    const product = {
      name: name,
      category: "Nightwear",
      price_val: 499,
      price: "₹499",
      discount: 50, // 50% off (MRP 999, Selling 499 is 50% discount)
      tag: folder === '1' ? 'Bestseller' : (folder === '3' ? 'New' : null),
      tag_color: folder === '1' ? '#E07A5F' : (folder === '3' ? '#81B29A' : null),
      img: newPaths[0],
      gallery: newPaths,
      rating: parseFloat((4.7 + Math.random() * 0.2).toFixed(1)),
      reviews: Math.floor(10 + Math.random() * 20),
      sizes: ['1-2Y', '2-3Y', '3-4Y', '4-5Y', '5-6Y'],
      description: "Super soft, breathable, and skin-friendly 100% cotton hosiery night suit set for boys and girls. Perfect for all seasons, featuring premium double-stitch durability, soft elastic waistbands, and adorable child-friendly prints for cozy sleep.",
      specs: {
        Fabric: "100% Premium Cotton Hosiery",
        Wash: "Machine Washable, Cold Cycle",
        Set: "Full Sleeve Top & Pajama Set"
      }
    };

    productsToInsert.push(product);
  }

  // Insert into Supabase
  console.log("Inserting products into Supabase...");
  const { data, error } = await supabase
    .from('products')
    .insert(productsToInsert);

  if (error) {
    console.error("Error inserting products:", error.message);
  } else {
    console.log("Successfully inserted 5 Cotton Hosiery Night Suit products!");
  }
}

run().catch(console.error);
