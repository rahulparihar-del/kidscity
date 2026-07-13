const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase
const supabaseUrl = 'https://ktravgseczesbdvfjvad.supabase.co';
const supabaseKey = 'sb_publishable_Pu3CehjU4Dfer5iQcbQM6w_-cg_v7vs';
const supabase = createClient(supabaseUrl, supabaseKey);

const newProduct = {
  name: 'Kids Premium Cotton Blue Teddy Bear Print T-Shirt & Shorts Co-Ord Set',
  category: 'Baby',
  price_val: 399,
  price: '₹399',
  tag: 'Trending',
  tag_color: '#81B29A',
  img: '/images/baby-teddy-coord-model1.webp',
  rating: 4.8,
  reviews: 12,
  sizes: ['0-6m', '6-12m', '12-18m'],
  description: 'Dress your baby in ultimate comfort with our Kids Premium Cotton Blue Teddy Bear Co-Ord Set. Made from 100% pure combed cotton, this matching button-front shirt and shorts set features a cute, playful blue teddy bear print. Highly breathable, lightweight, and hypoallergenic, it is perfect for summer playtime, casual outings, or daytime naps.\n\nWhy Parents Love This Teddy Bear Baby Set:\n- 100% Pure Combed Cotton: Skin-friendly and ultra-soft on delicate baby skin.\n- Cute Blue Teddy Bear Prints: A charming design that looks adorable on boys and girls.\n- Comfort-Fit Elastic Shorts: Ensures hassle-free diaper checks and all-day active comfort.\n- Premium Stitch Durability: Long-lasting quality that holds its shape wash after wash.\n- Trusted Kids Wear Store: Handpicked quality from Kids City Wakad, Pune, now shipping across India.\n\nBuy baby clothes online India from ₹399. Cash on Delivery (COD) available | Free local delivery in Wakad | Easy 7-day exchange.',
  specs: {
    Fabric: '100% Premium Combed Cotton',
    Wash: 'Machine Wash Cold, Gentle Cycle',
    Set: 'Button-up Short Sleeve Shirt & Shorts Set',
    Origin: 'Made in India'
  },
  gallery: [
    '/images/baby-teddy-coord-model1.webp',
    '/images/baby-teddy-coord-model2.webp',
    '/images/baby-teddy-coord-hanger-front.webp',
    '/images/baby-teddy-coord-hanger-back.webp',
    '/images/baby-teddy-coord-label.webp'
  ],
  discount: 50 // 50% discount off MRP (MRP would be 799, selling price is 399)
};

async function run() {
  console.log("Inserting new Blue Teddy Bear Co-Ord Set product into Supabase database...");
  const { data, error } = await supabase
    .from('products')
    .insert([newProduct]);

  if (error) {
    console.error("Error inserting product:", error.message);
  } else {
    console.log("Successfully inserted the blue teddy bear co-ord set product!");
  }
}

run().catch(console.error);
