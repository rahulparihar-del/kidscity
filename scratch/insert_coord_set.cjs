const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase
const supabaseUrl = 'https://ktravgseczesbdvfjvad.supabase.co';
const supabaseKey = 'sb_publishable_Pu3CehjU4Dfer5iQcbQM6w_-cg_v7vs';
const supabase = createClient(supabaseUrl, supabaseKey);

const newProduct = {
  name: 'Kids Premium Cotton Animal Safari Print T-Shirt & Shorts Co-Ord Set',
  category: 'Baby',
  price_val: 399,
  price: '₹399',
  tag: 'New',
  tag_color: '#81B29A',
  img: '/images/baby-animal-coord-model1.webp',
  rating: 4.9,
  reviews: 15,
  sizes: ['0-6m', '6-12m', '12-18m'],
  description: 'Dress your little one in comfort with this premium baby co-ord set, crafted from 100% soft combed cotton. Featuring a cute safari animal print (lions, giraffes, elephants, zebras) on a lightweight button-up shirt and elasticized shorts, it is perfect for active play and summer outings.\n\nWhy Parents Love This Baby Co-Ord Set:\n- 100% Pure Combed Cotton: Hypoallergenic, breathable, and ultra-soft on delicate baby skin.\n- Cozy Matching T-Shirt & Shorts Set: Perfect for summer styling and active playtime.\n- Safari Animal Cartoon Prints: Giraffe, lion, elephant, and zebra designs your child will adore.\n- Worry-Free Bedtime or Playtime: Soft elastic waistband ensures easy styling and diaper changes.\n- India\'s Best Kids Fashion Shop: Premium quality clothing from Kids City Wakad, Pune, now available online!\n\nBuy children\'s clothes online India. Cash on Delivery (COD) available | Free local delivery in Wakad | Easy 7-day exchange.',
  specs: {
    Fabric: '100% Premium Combed Cotton',
    Wash: 'Machine Wash Cold, Gentle Cycle',
    Set: 'Button-up Short Sleeve Shirt & Shorts Set',
    Origin: 'Made in India'
  },
  gallery: [
    '/images/baby-animal-coord-model1.webp',
    '/images/baby-animal-coord-model2.webp',
    '/images/baby-animal-coord-hanger.webp',
    '/images/baby-animal-coord-label.webp'
  ],
  discount: 50 // 50% discount off MRP (MRP would be 799, selling price is 399)
};

async function run() {
  console.log("Inserting new Baby Co-Ord Set product into Supabase database...");
  const { data, error } = await supabase
    .from('products')
    .insert([newProduct]);

  if (error) {
    console.error("Error inserting product:", error.message);
  } else {
    console.log("Successfully inserted the baby co-ord set product!");
  }
}

run().catch(console.error);
