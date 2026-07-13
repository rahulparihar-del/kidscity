const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase
const supabaseUrl = 'https://ktravgseczesbdvfjvad.supabase.co';
const supabaseKey = 'sb_publishable_Pu3CehjU4Dfer5iQcbQM6w_-cg_v7vs';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Updating sizes for all Nightwear products in Supabase to: 0-6m, 6-12m, 12-18m...");
  
  // Update all products where category is 'Nightwear'
  const { data, error } = await supabase
    .from('products')
    .update({ sizes: ['0-6m', '6-12m', '12-18m'] })
    .eq('category', 'Nightwear');

  if (error) {
    console.error("Error updating sizes:", error.message);
  } else {
    console.log("Successfully updated all Nightwear products sizes in Supabase!");
  }
}

run().catch(console.error);
