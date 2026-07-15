const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase
const supabaseUrl = 'https://ktravgseczesbdvfjvad.supabase.co';
const supabaseKey = 'sb_publishable_Pu3CehjU4Dfer5iQcbQM6w_-cg_v7vs';
const supabase = createClient(supabaseUrl, supabaseKey);

const newProducts = [
  {
    name: 'Kids Premium Cotton Balloon Print Co-Ord Set - Soft & Breathable Unisex Baby T-Shirt & Shorts Playwear Set for Daily Home Wear & Travel',
    category: 'Baby',
    price_val: 399,
    price: '₹399',
    tag: 'Trending',
    tag_color: '#81B29A',
    img: '/images/baby-balloon-coord-1.webp',
    rating: 4.8,
    reviews: 14,
    sizes: ['0-6m', '6-12m', '12-18m'],
    description: 'Dress your baby in ultimate comfort with our Kids Premium Cotton Balloon Print Co-Ord Set. Made from 100% pure combed cotton, this matching t-shirt and shorts set features a cute, playful balloon print. Highly breathable, lightweight, and hypoallergenic, it is perfect for casual outings, home wear, holiday wear, and active playtime.\n\nWhy Parents Love This Balloon Baby Set:\n- 100% Pure Combed Cotton: Skin-friendly, soft, and breathable on baby\'s delicate skin.\n- Playful Balloon Prints: A charming design that looks adorable on both boys and girls.\n- Comfort-Fit Elastic Waistband: Ensures hassle-free styling and comfortable all-day playwear.\n- Versatile Layering Outfit: Lightweight design suitable for layering in cooler weather.\n- India\'s Best Kids Fashion Shop: Premium quality clothing from Kids City Wakad, Pune, now available online!\n\nBuy children\'s clothes online India. Cash on Delivery (COD) available | Free local delivery in Wakad | Easy 7-day exchange.',
    specs: {
      Fabric: '100% Premium Combed Cotton',
      Wash: 'Machine Wash Cold, Gentle Cycle',
      Set: 'Unisex T-Shirt & Shorts Co-Ord Set',
      Origin: 'Made in India'
    },
    gallery: [
      '/images/baby-balloon-coord-1.webp',
      '/images/baby-balloon-coord-2.webp',
      '/images/baby-balloon-coord-3.webp',
      '/images/baby-balloon-coord-4.webp',
      '/images/baby-balloon-coord-5.webp',
      '/images/baby-balloon-coord-6.webp'
    ],
    discount: 50
  },
  {
    name: 'Kids Premium Cotton Deer Print Co-Ord Set - Lightweight & Breathable Unisex Baby T-Shirt & Shorts Playwear Set for Daily Home Wear & Travel Wear',
    category: 'Baby',
    price_val: 399,
    price: '₹399',
    tag: 'New',
    tag_color: '#81B29A',
    img: '/images/baby-deer-coord-1.webp',
    rating: 4.9,
    reviews: 11,
    sizes: ['0-6m', '6-12m', '12-18m'],
    description: 'Dress your baby in ultimate comfort with our Kids Premium Cotton Deer Print Co-Ord Set. Made from 100% pure combed cotton, this matching t-shirt and shorts set features a cute, playful forest deer cartoon print. Highly breathable, lightweight, and hypoallergenic, it is perfect for casual playwear, daily wear, travel wear, and holiday outfits.\n\nWhy Parents Love This Deer Baby Set:\n- 100% Pure Combed Cotton: Skin-friendly, soft, and breathable on baby\'s delicate skin.\n- Adorable Deer Cartoon Prints: A cute wildlife theme that looks charming on both boys and girls.\n- Comfort-Fit Elastic Waistband: Ensures hassle-free styling and comfortable all-day playwear.\n- Versatile Layering Outfit: Lightweight design suitable for layering in cooler weather.\n- India\'s Best Kids Fashion Shop: Premium quality clothing from Kids City Wakad, Pune, now available online!\n\nBuy children\'s clothes online India. Cash on Delivery (COD) available | Free local delivery in Wakad | Easy 7-day exchange.',
    specs: {
      Fabric: '100% Premium Combed Cotton',
      Wash: 'Machine Wash Cold, Gentle Cycle',
      Set: 'Unisex T-Shirt & Shorts Co-Ord Set',
      Origin: 'Made in India'
    },
    gallery: [
      '/images/baby-deer-coord-1.webp',
      '/images/baby-deer-coord-2.webp',
      '/images/baby-deer-coord-3.webp',
      '/images/baby-deer-coord-4.webp',
      '/images/baby-deer-coord-5.webp'
    ],
    discount: 50
  },
  {
    name: 'Kids Premium Cotton Dinosaur Print Co-Ord Set - Skin-Friendly & Soft Unisex Baby T-Shirt & Shorts Set for Cozy Playwear, Daily Wear & Travel',
    category: 'Baby',
    price_val: 399,
    price: '₹399',
    tag: 'Bestseller',
    tag_color: '#E07A5F',
    img: '/images/baby-dino-coord-1.webp',
    rating: 4.9,
    reviews: 18,
    sizes: ['0-6m', '6-12m', '12-18m'],
    description: 'Dress your baby in ultimate comfort with our Kids Premium Cotton Dinosaur Print Co-Ord Set. Made from 100% pure combed cotton, this matching t-shirt and shorts set features a cute, playful dinosaur print. Highly breathable, lightweight, and hypoallergenic, it is perfect for daily wear, playwear, home wear, and travel wear.\n\nWhy Parents Love This Dino Baby Set:\n- 100% Pure Combed Cotton: Skin-friendly, soft, and breathable on baby\'s delicate skin.\n- Playful Dinosaur Cartoon Prints: A popular print that looks adorable on boys and girls.\n- Comfort-Fit Elastic Waistband: Ensures hassle-free styling and comfortable all-day playwear.\n- Autumn Winter Collection Layering: Warm & comfortable when layered under kids sweaters and winter wear.\n- India\'s Best Kids Fashion Shop: Premium quality clothing from Kids City Wakad, Pune, now available online!\n\nBuy children\'s clothes online India. Cash on Delivery (COD) available | Free local delivery in Wakad | Easy 7-day exchange.',
    specs: {
      Fabric: '100% Premium Combed Cotton',
      Wash: 'Machine Wash Cold, Gentle Cycle',
      Set: 'Unisex T-Shirt & Shorts Co-Ord Set',
      Origin: 'Made in India'
    },
    gallery: [
      '/images/baby-dino-coord-1.webp',
      '/images/baby-dino-coord-2.webp',
      '/images/baby-dino-coord-3.webp',
      '/images/baby-dino-coord-4.webp',
      '/images/baby-dino-coord-5.webp'
    ],
    discount: 50
  },
  {
    name: 'Kids Premium Cotton Sweet Donut Print Co-Ord Set - Soft & Breathable Unisex Baby T-Shirt & Shorts Set for Cozy Playwear, Daily Wear & Home Wear',
    category: 'Baby',
    price_val: 399,
    price: '₹399',
    tag: 'New',
    tag_color: '#81B29A',
    img: '/images/baby-donut-coord-1.webp',
    rating: 4.7,
    reviews: 9,
    sizes: ['0-6m', '6-12m', '12-18m'],
    description: 'Dress your baby in ultimate comfort with our Kids Premium Cotton Sweet Donut Print Co-Ord Set. Made from 100% pure combed cotton, this matching t-shirt and shorts set features a cute, playful sweet donut print. Highly breathable, lightweight, and hypoallergenic, it is perfect for casual playwear, daily wear, home wear, and holiday outfits.\n\nWhy Parents Love This Donut Baby Set:\n- 100% Pure Combed Cotton: Skin-friendly, soft, and breathable on baby\'s delicate skin.\n- Sweet Donut Cartoon Prints: A cute, colorful print that looks charming on boys and girls.\n- Comfort-Fit Elastic Waistband: Ensures hassle-free styling and comfortable all-day playwear.\n- Versatile Layering Outfit: Lightweight design suitable for layering in cooler weather.\n- India\'s Best Kids Fashion Shop: Premium quality clothing from Kids City Wakad, Pune, now available online!\n\nBuy children\'s clothes online India. Cash on Delivery (COD) available | Free local delivery in Wakad | Easy 7-day exchange.',
    specs: {
      Fabric: '100% Premium Combed Cotton',
      Wash: 'Machine Wash Cold, Gentle Cycle',
      Set: 'Unisex T-Shirt & Shorts Co-Ord Set',
      Origin: 'Made in India'
    },
    gallery: [
      '/images/baby-donut-coord-1.webp',
      '/images/baby-donut-coord-2.webp',
      '/images/baby-donut-coord-3.webp',
      '/images/baby-donut-coord-4.webp',
      '/images/baby-donut-coord-5.webp'
    ],
    discount: 50
  },
  {
    name: 'Kids Premium Cotton Sun Print Co-Ord Set - Lightweight & Breathable Unisex Baby T-Shirt & Shorts Playwear Set for Daily Home Wear, Travel & Holidays',
    category: 'Baby',
    price_val: 399,
    price: '₹399',
    tag: 'Trending',
    tag_color: '#81B29A',
    img: '/images/baby-sun-coord-1.webp',
    rating: 4.8,
    reviews: 13,
    sizes: ['0-6m', '6-12m', '12-18m'],
    description: 'Dress your baby in ultimate comfort with our Kids Premium Cotton Sun Print Co-Ord Set. Made from 100% pure combed cotton, this matching t-shirt and shorts set features a bright, sunny cartoon print. Highly breathable, lightweight, and hypoallergenic, it is perfect for daily home wear, active playwear, travel, and holiday outfits.\n\nWhy Parents Love This Sun Baby Set:\n- 100% Pure Combed Cotton: Skin-friendly, soft, and breathable on baby\'s delicate skin.\n- Sunny Cartoon Prints: A bright and positive yellow print that looks adorable on boys and girls.\n- Comfort-Fit Elastic Waistband: Ensures hassle-free styling and comfortable all-day playwear.\n- Versatile Layering Outfit: Lightweight design suitable for layering in cooler weather.\n- India\'s Best Kids Fashion Shop: Premium quality clothing from Kids City Wakad, Pune, now available online!\n\nBuy children\'s clothes online India. Cash on Delivery (COD) available | Free local delivery in Wakad | Easy 7-day exchange.',
    specs: {
      Fabric: '100% Premium Combed Cotton',
      Wash: 'Machine Wash Cold, Gentle Cycle',
      Set: 'Unisex T-Shirt & Shorts Co-Ord Set',
      Origin: 'Made in India'
    },
    gallery: [
      '/images/baby-sun-coord-1.webp',
      '/images/baby-sun-coord-2.webp',
      '/images/baby-sun-coord-3.webp',
      '/images/baby-sun-coord-4.webp',
      '/images/baby-sun-coord-5.webp'
    ],
    discount: 50
  },
  {
    name: 'Kids Premium Cotton Train Print Co-Ord Set - Soft & Breathable Boys & Girls Baby T-Shirt & Shorts Playwear Set for Daily Home Wear & Travel Wear',
    category: 'Baby',
    price_val: 399,
    price: '₹399',
    tag: 'Trending',
    tag_color: '#81B29A',
    img: '/images/baby-train-coord-1.webp',
    rating: 4.9,
    reviews: 16,
    sizes: ['0-6m', '6-12m', '12-18m'],
    description: 'Dress your baby in ultimate comfort with our Kids Premium Cotton Train Print Co-Ord Set. Made from 100% pure combed cotton, this matching t-shirt and shorts set features a cute, playful train cartoon print. Highly breathable, lightweight, and hypoallergenic, it is perfect for casual playwear, travel outfits, daily home wear, and outdoor travel.\n\nWhy Parents Love This Train Baby Set:\n- 100% Pure Combed Cotton: Skin-friendly, soft, and breathable on baby\'s delicate skin.\n- Playful Train Cartoon Prints: A cute and adventurous transport theme that looks adorable on boys and girls.\n- Comfort-Fit Elastic Waistband: Ensures hassle-free styling and comfortable all-day playwear.\n- Versatile Layering Outfit: Lightweight design suitable for layering in cooler weather.\n- India\'s Best Kids Fashion Shop: Premium quality clothing from Kids City Wakad, Pune, now available online!\n\nBuy children\'s clothes online India. Cash on Delivery (COD) available | Free local delivery in Wakad | Easy 7-day exchange.',
    specs: {
      Fabric: '100% Premium Combed Cotton',
      Wash: 'Machine Wash Cold, Gentle Cycle',
      Set: 'Unisex T-Shirt & Shorts Co-Ord Set',
      Origin: 'Made in India'
    },
    gallery: [
      '/images/baby-train-coord-1.webp',
      '/images/baby-train-coord-2.webp',
      '/images/baby-train-coord-3.webp',
      '/images/baby-train-coord-4.webp',
      '/images/baby-train-coord-5.webp',
      '/images/baby-train-coord-6.webp',
      '/images/baby-train-coord-7.webp'
    ],
    discount: 50
  }
];

async function run() {
  console.log("Inserting 6 new Co-Ord Set products into Supabase database...");
  const { data, error } = await supabase
    .from('products')
    .insert(newProducts);

  if (error) {
    console.error("Error inserting products:", error.message);
  } else {
    console.log("Successfully inserted the 6 new co-ord set products!");
  }
}

run().catch(console.error);
