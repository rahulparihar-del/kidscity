const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase
const supabaseUrl = 'https://ktravgseczesbdvfjvad.supabase.co';
const supabaseKey = 'sb_publishable_Pu3CehjU4Dfer5iQcbQM6w_-cg_v7vs';
const supabase = createClient(supabaseUrl, supabaseKey);

const targetIds = [23, 24, 25, 26, 27, 28];

async function run() {
  console.log("Updating prices and sizes for product IDs 23-28 in Supabase database...");
  
  for (const id of targetIds) {
    const { data, error } = await supabase
      .from('products')
      .update({
        price_val: 299,
        price: '₹299',
        sizes: ['3-6m', '6-9m', '9-12m']
      })
      .eq('id', id);

    if (error) {
      console.error(`Error updating product ID ${id}:`, error.message);
    } else {
      console.log(`Successfully updated product ID ${id} (Price: ₹299, Sizes: 3-6m, 6-9m, 9-12m)`);
    }
  }
}

run().catch(console.error);
