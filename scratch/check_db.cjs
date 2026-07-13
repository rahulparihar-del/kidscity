const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://ktravgseczesbdvfjvad.supabase.co';
const supabaseKey = 'sb_publishable_Pu3CehjU4Dfer5iQcbQM6w_-cg_v7vs';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, category, sizes, price_val');
  if (error) {
    console.error('Error:', error);
  } else {
    console.log(JSON.stringify(data, null, 2));
  }
}
run();
