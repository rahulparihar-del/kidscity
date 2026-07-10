const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ktravgseczesbdvfjvad.supabase.co';
const supabaseKey = 'sb_publishable_Pu3CehjU4Dfer5iQcbQM6w_-cg_v7vs';
const supabase = createClient(supabaseUrl, supabaseKey);

const UPDATES = [
  {
    id: 17, // Folder 2
    primary: '/images/nightsuit-hosiery-2-4.webp',
    gallery: [
      '/images/nightsuit-hosiery-2-4.webp',
      '/images/nightsuit-hosiery-2-5.webp',
      '/images/nightsuit-hosiery-2-6.webp',
      '/images/nightsuit-hosiery-2-1.webp',
      '/images/nightsuit-hosiery-2-2.webp',
      '/images/nightsuit-hosiery-2-3.webp'
    ]
  },
  {
    id: 18, // Folder 3
    primary: '/images/nightsuit-hosiery-3-6.webp',
    gallery: [
      '/images/nightsuit-hosiery-3-6.webp',
      '/images/nightsuit-hosiery-3-4.webp',
      '/images/nightsuit-hosiery-3-5.webp',
      '/images/nightsuit-hosiery-3-1.webp',
      '/images/nightsuit-hosiery-3-2.webp',
      '/images/nightsuit-hosiery-3-3.webp'
    ]
  },
  {
    id: 19, // Folder 4
    primary: '/images/nightsuit-hosiery-4-4.webp',
    gallery: [
      '/images/nightsuit-hosiery-4-4.webp',
      '/images/nightsuit-hosiery-4-5.webp',
      '/images/nightsuit-hosiery-4-6.webp',
      '/images/nightsuit-hosiery-4-1.webp',
      '/images/nightsuit-hosiery-4-2.webp',
      '/images/nightsuit-hosiery-4-3.webp'
    ]
  },
  {
    id: 20, // Folder 5
    primary: '/images/nightsuit-hosiery-5-4.webp',
    gallery: [
      '/images/nightsuit-hosiery-5-4.webp',
      '/images/nightsuit-hosiery-5-5.webp',
      '/images/nightsuit-hosiery-5-6.webp',
      '/images/nightsuit-hosiery-5-1.webp',
      '/images/nightsuit-hosiery-5-2.webp',
      '/images/nightsuit-hosiery-5-3.webp'
    ]
  }
];

async function run() {
  console.log("Updating primary images to be the baby model photos in Supabase...");
  for (const update of UPDATES) {
    const { error } = await supabase
      .from('products')
      .update({
        img: update.primary,
        gallery: update.gallery
      })
      .eq('id', update.id);

    if (error) {
      console.error(`Error updating product ID ${update.id}:`, error.message);
    } else {
      console.log(`Successfully updated product ID ${update.id} (primary: ${update.primary})`);
    }
  }
}

run().catch(console.error);
