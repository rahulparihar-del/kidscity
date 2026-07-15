import { useState, useMemo, useEffect } from 'react'
import { Search, SlidersHorizontal, ArrowUpDown, Star, Heart, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const PRODUCTS = [
  {
    id: 1,
    name: 'Navratri Lehenga Set',
    category: 'Festival Wear',
    priceVal: 899,
    price: '₹899',
    tag: 'Bestseller',
    tagColor: '#E07A5F',
    img: '/images/festival_wear.webp',
    rating: 4.9,
    reviews: 42,
    sizes: ['2-4y', '4-6y', '6-8y', '8-10y'],
    desc: 'Traditional high-quality Chaniya Choli with heavy mirror work and vibrant threads, perfect for Garba nights. Soft inner lining for maximum comfort while dancing.',
    specs: { Fabric: 'Premium Cotton Silk', Wash: 'Dry Clean Only', Set: 'Lehenga, Choli & Dupatta' },
    gallery: ['/images/festival_wear.webp', '/images/hero_girl.webp', '/images/birthday_dress.webp']
  },
  {
    id: 2,
    name: 'Birthday Princess Dress',
    category: 'Birthday',
    priceVal: 749,
    price: '₹749',
    tag: 'Trending',
    tagColor: '#F28482',
    img: '/images/birthday_dress.webp',
    rating: 4.8,
    reviews: 36,
    sizes: ['0-2y', '2-4y', '4-6y', '6-8y'],
    desc: 'Gorgeous layered tulle gown with soft satin lining and butterfly embellishments. Makes your little girl feel like a real princess on her special day.',
    specs: { Fabric: 'Tulle & Satin', Wash: 'Gentle Hand Wash', Set: 'Single Dress with Bow Headband' },
    gallery: ['/images/birthday_dress.webp', '/images/hero_girl.webp', '/images/festival_wear.webp']
  },
  {
    id: 3,
    name: 'Boys Casual Denim Set',
    category: 'Casual',
    priceVal: 549,
    price: '₹549',
    tag: 'New',
    tagColor: '#81B29A',
    img: '/images/casual_boys.webp',
    rating: 4.9,
    reviews: 28,
    sizes: ['2-4y', '4-6y', '6-8y', '8-10y', '10-12y'],
    desc: 'Trendy dynamic casual set featuring a breathable cotton t-shirt and premium stretchable denim shorts. Durable stitch detailing for active play.',
    specs: { Fabric: '100% Breathable Cotton & Denim', Wash: 'Machine Washable', Set: 'T-Shirt & Shorts' },
    gallery: ['/images/casual_boys.webp', '/images/festival_wear.webp']
  },
  {
    id: 4,
    name: 'Diwali Traditional Kurta',
    category: 'Traditional',
    priceVal: 699,
    price: '₹699',
    tag: 'Festival',
    tagColor: '#F4A261',
    img: '/images/festival_wear.webp',
    rating: 4.7,
    reviews: 19,
    sizes: ['2-4y', '4-6y', '6-8y', '8-10y', '10-12y', '12-14y'],
    desc: 'Classy ethnic silk-blend kurta with gold embroidery around the collar. Paired with a comfortable elasticized pajama for hassle-free styling.',
    specs: { Fabric: 'Banarasi Art Silk', Wash: 'Dry Clean Recommended', Set: 'Kurta & Pajama' },
    gallery: ['/images/festival_wear.webp', '/images/casual_boys.webp']
  },
  {
    id: 5,
    name: 'Girls Fancy Peach Frock',
    category: 'Birthday',
    priceVal: 649,
    price: '₹649',
    tag: 'Popular',
    tagColor: '#F28482',
    img: '/images/hero_girl.webp',
    rating: 4.8,
    reviews: 31,
    sizes: ['0-2y', '2-4y', '4-6y', '6-8y'],
    desc: 'Delightful tiered designer frock in peach, accented with elegant floral lace details. Highly breathable fabric structure perfect for summer celebrations.',
    specs: { Fabric: 'Organza & Soft Voile', Wash: 'Hand Wash', Set: 'Frock Only' },
    gallery: ['/images/hero_girl.webp', '/images/birthday_dress.webp']
  },
  {
    id: 6,
    name: 'Boys Ethnic Sherwani',
    category: 'Traditional',
    priceVal: 899,
    price: '₹899',
    tag: 'Premium',
    tagColor: '#3D405B',
    img: '/images/casual_boys.webp',
    rating: 4.9,
    reviews: 24,
    sizes: ['4-6y', '6-8y', '8-10y', '10-12y'],
    desc: 'Luxurious jacquard sherwani set styled with premium gold piping and brocade work. Ideal for weddings and high-profile festive family occasions.',
    specs: { Fabric: 'Jacquard Silk', Wash: 'Dry Clean Only', Set: 'Sherwani jacket & churidar pajama' },
    gallery: ['/images/casual_boys.webp', '/images/festival_wear.webp']
  },
  {
    id: 7,
    name: 'Floral Cotton Summer Dress',
    category: 'Casual',
    priceVal: 499,
    price: '₹499',
    tag: 'Cotton',
    tagColor: '#81B29A',
    img: '/images/hero_girl.webp',
    rating: 4.6,
    reviews: 14,
    sizes: ['2-4y', '4-6y', '6-8y', '8-10y'],
    desc: 'Lightweight flowy summer dress in a gorgeous wildflower print. Breathable and gentle on children\'s sensitive skin.',
    specs: { Fabric: '100% Organic Cotton', Wash: 'Machine Wash cold', Set: 'Dress Only' },
    gallery: ['/images/hero_girl.webp', '/images/birthday_dress.webp']
  },
  {
    id: 8,
    name: 'Boys Polo T-Shirt & Cargo',
    category: 'Casual',
    priceVal: 599,
    price: '₹599',
    tag: 'Practical',
    tagColor: '#3D405B',
    img: '/images/casual_boys.webp',
    rating: 4.7,
    reviews: 22,
    sizes: ['4-6y', '6-8y', '8-10y', '10-12y', '12-14y'],
    desc: 'Classic smart-casual outfit including a pique cotton polo shirt and multi-pocket cargo pants. Designed for rugged use and comfort.',
    specs: { Fabric: 'Pique Cotton & Twill', Wash: 'Machine Wash', Set: 'Polo Shirt & Cargo Pants' },
    gallery: ['/images/casual_boys.webp']
  },
  {
    id: 9,
    name: 'Organic Cotton Baby Rompers',
    category: 'Baby',
    priceVal: 399,
    price: '₹399',
    tag: 'Organic',
    tagColor: '#81B29A',
    img: '/images/birthday_dress.webp',
    rating: 4.9,
    reviews: 35,
    sizes: ['0-2y'],
    desc: 'Super soft, chemical-free organic cotton sleep-n-play romper with dual security snaps for quick diaper checks.',
    specs: { Fabric: '100% Organic Cotton (GOTS Certified)', Wash: 'Machine Wash Warm', Set: '2-Pack Romper Set' },
    gallery: ['/images/birthday_dress.webp', '/images/hero_girl.webp']
  },
  {
    id: 10,
    name: 'Royal Velvet Kids Sherwani',
    category: 'Traditional',
    priceVal: 1299,
    price: '₹1299',
    tag: 'Luxury',
    tagColor: '#3D405B',
    img: '/images/casual_boys.webp',
    rating: 5.0,
    reviews: 12,
    sizes: ['4-6y', '6-8y', '8-10y', '10-12y', '12-14y'],
    desc: 'Stunning premium deep navy velvet sherwani jacket with zardozi hand embroidery. Complemented by designer dhoti pants.',
    specs: { Fabric: 'Micro-Velvet & Silk Blend', Wash: 'Dry Clean Only', Set: 'Sherwani & Dhoti Pants' },
    gallery: ['/images/casual_boys.webp', '/images/festival_wear.webp']
  },
  {
    id: 11,
    name: 'Vibrant Starry Party Gown',
    category: 'Birthday',
    priceVal: 999,
    price: '₹999',
    tag: 'Star Pick',
    tagColor: '#F4A261',
    img: '/images/birthday_dress.webp',
    rating: 4.8,
    reviews: 18,
    sizes: ['2-4y', '4-6y', '6-8y', '8-10y'],
    desc: 'Make her feel like a star! Sparkly tulle ball gown embedded with shiny gold constellations, layered beautifully.',
    specs: { Fabric: 'Sequined Tulle & Silk Ribbon', Wash: 'Hand Wash Only', Set: 'Gown & Matching Tiara' },
    gallery: ['/images/birthday_dress.webp', '/images/hero_girl.webp']
  },
  {
    id: 12,
    name: 'Cosy Sherpa Fleece Hoody',
    category: 'Casual',
    priceVal: 799,
    price: '₹799',
    tag: 'Winter',
    tagColor: '#81B29A',
    img: '/images/casual_boys.webp',
    rating: 4.8,
    reviews: 15,
    sizes: ['2-4y', '4-6y', '6-8y', '8-10y', '10-12y'],
    desc: 'Plush high-loft sherpa fleece hoody with soft cotton lining. Features cute bear ears on the hood for adorable style.',
    specs: { Fabric: 'Sherpa Fleece & Jersey Lining', Wash: 'Gentle Machine Wash', Set: 'Hoodie Jacket' },
    gallery: ['/images/casual_boys.webp']
  },
  {
    id: 13,
    name: 'Hosiery Cotton Night Suit - Cartoon Print',
    category: 'Night Suits',
    priceVal: 399,
    price: '₹399',
    tag: 'Bestseller',
    tagColor: '#E07A5F',
    img: '/images/nightsuit-hosiery-1-1.webp',
    rating: 4.9,
    reviews: 68,
    sizes: ['0-6m', '6-12m', '12-18m'],
    desc: 'The night suit every Pune mom recommends! Premium hosiery cotton, gentle on sensitive skin, easy to wash, keeps kids cozy all night.\n\nWhy Parents Love It:\n100% pure hosiery combed cotton - ultra-soft & non-irritating\nBreathable & lightweight - perfect for India\'s climate\nFun cartoon prints kids adore\nElastic waistband - easy on, easy off\nMachine washable - stays soft after 100+ washes\nFull sleeve + full length for complete comfort\n\nVery popular - limited stock! Order via WhatsApp.\n\nCOD Available | Free Delivery in Wakad | Easy 7-Day Exchange',
    specs: { Fabric: '100% Hosiery Cotton', Wash: 'Machine Washable', Set: 'Top + Pyjama Set', Origin: 'Made in India' },
    gallery: ['/images/nightsuit-hosiery-1-1.webp', '/images/nightsuit-hosiery-1-2.webp', '/images/nightsuit-hosiery-1-3.webp', '/images/nightsuit-hosiery-1-4.webp', '/images/nightsuit-hosiery-1-5.webp']
  },
  {
    id: 14,
    name: 'Hosiery Night Suit - Animal Friends Print',
    category: 'Night Suits',
    priceVal: 399,
    price: '₹399',
    tag: 'Trending',
    tagColor: '#81B29A',
    img: '/images/nightsuit-hosiery-2-1.webp',
    rating: 4.8,
    reviews: 44,
    sizes: ['0-6m', '6-12m', '12-18m'],
    desc: 'Super soft hosiery night suit with adorable animal prints - kids absolutely love it!\n\nFeatures:\n100% pure hosiery cotton - skin-safe & breathable\nMachine washable, retains softness\nElastic waist for easy bedtime dressing\nSizes 1-8 years\n\nCOD Available | Free Delivery within Wakad',
    specs: { Fabric: '100% Hosiery Cotton', Wash: 'Machine Washable', Set: 'Top + Pyjama Set', Origin: 'Made in India' },
    gallery: ['/images/nightsuit-hosiery-2-1.webp', '/images/nightsuit-hosiery-2-2.webp', '/images/nightsuit-hosiery-2-4.webp', '/images/nightsuit-hosiery-2-5.webp']
  },
  {
    id: 15,
    name: 'Kids Premium Night Suit - Stripes & Checks',
    category: 'Night Suits',
    priceVal: 449,
    price: '₹449',
    tag: 'Popular',
    tagColor: '#F4A261',
    img: '/images/nightsuit-hosiery-3-1.webp',
    rating: 4.9,
    reviews: 31,
    sizes: ['0-6m', '6-12m', '12-18m'],
    desc: 'Classic stripe and check patterns in premium hosiery cotton. Smart, neat and incredibly comfortable for kids 2-10 years.\n\nFeatures:\nPremium hosiery combed cotton\nClassic patterns loved by parents & kids\nMachine washable, colour-fast\nElastic waistband for all-night comfort\n\nCOD Available | Easy 7-Day Exchange',
    specs: { Fabric: '100% Combed Hosiery Cotton', Wash: 'Machine Washable', Set: 'Full Sleeve Top + Pyjama', Origin: 'Made in India' },
    gallery: ['/images/nightsuit-hosiery-3-1.webp', '/images/nightsuit-hosiery-3-2.webp', '/images/nightsuit-hosiery-3-4.webp', '/images/nightsuit-hosiery-3-5.webp']
  },
  {
    id: 16,
    name: 'Kids Soft Cotton Night Suit - Floral Print',
    category: 'Night Suits',
    priceVal: 399,
    price: '₹399',
    tag: 'New',
    tagColor: '#F28482',
    img: '/images/nightsuit-hosiery-4-1.webp',
    rating: 4.8,
    reviews: 19,
    sizes: ['0-6m', '6-12m', '12-18m'],
    desc: 'Beautiful floral print hosiery night suit - perfect for your little girl! Adorable pastel patterns on premium soft cotton.\n\nFeatures:\n100% hosiery cotton - skin-safe & cozy\nSweet floral patterns girls adore\nMachine washable\nElastic waist - comfortable all night\n\nCOD Available | Free Delivery in Wakad',
    specs: { Fabric: '100% Hosiery Cotton', Wash: 'Machine Washable', Set: 'Top + Pyjama Set', Origin: 'Made in India' },
    gallery: ['/images/nightsuit-hosiery-4-1.webp', '/images/nightsuit-hosiery-4-2.webp', '/images/nightsuit-hosiery-4-4.webp', '/images/nightsuit-hosiery-4-5.webp']
  },
  {
    id: 17,
    name: 'Premium Kids Night Suit - Solid Colors',
    category: 'Night Suits',
    priceVal: 449,
    price: '₹449',
    tag: 'Classic',
    tagColor: '#3D405B',
    img: '/images/nightsuit-hosiery-5-1.webp',
    rating: 4.7,
    reviews: 22,
    sizes: ['0-6m', '6-12m', '12-18m'],
    desc: 'Clean, classic solid-color night suit in premium hosiery cotton. Timeless design for everyday bedtime comfort.\n\nFeatures:\nPremium quality hosiery cotton\nSolid rich colours - easy to mix & match\nAvailable up to 12 years (biggest size range!)\nMachine washable, colour-fast\n\nCOD Available | Easy 7-Day Exchange',
    specs: { Fabric: '100% Hosiery Cotton', Wash: 'Machine Washable', Set: 'Full Sleeve Top + Pyjama', Origin: 'Made in India' },
    gallery: ['/images/nightsuit-hosiery-5-1.webp', '/images/nightsuit-hosiery-5-2.webp', '/images/nightsuit-hosiery-5-4.webp', '/images/nightsuit-hosiery-5-5.webp']
  },
  {
    id: 18,
    name: 'Kids Premium Cotton Animal Safari Print T-Shirt & Shorts Co-Ord Set',
    category: 'Baby',
    priceVal: 399,
    price: '₹399',
    tag: 'New',
    tagColor: '#81B29A',
    img: '/images/baby-animal-coord-model1.webp',
    rating: 4.9,
    reviews: 15,
    sizes: ['0-6m', '6-12m', '12-18m'],
    desc: 'Dress your little one in comfort with this premium baby co-ord set, crafted from 100% soft combed cotton. Featuring a cute safari animal print (lions, giraffes, elephants, zebras) on a lightweight button-up shirt and elasticized shorts, it is perfect for active play and summer outings.\n\nWhy Parents Love This Baby Co-Ord Set:\n- 100% Pure Combed Cotton: Hypoallergenic, breathable, and ultra-soft on delicate baby skin.\n- Cozy Matching T-Shirt & Shorts Set: Perfect for summer styling and active playtime.\n- Safari Animal Cartoon Prints: Giraffe, lion, elephant, and zebra designs your child will adore.\n- Worry-Free Bedtime or Playtime: Soft elastic waistband ensures easy styling and diaper changes.\n- India\'s Best Kids Fashion Shop: Premium quality clothing from Kids City Wakad, Pune, now available online!\n\nBuy children\'s clothes online India. Cash on Delivery (COD) available | Free local delivery in Wakad | Easy 7-day exchange.',
    specs: { Fabric: '100% Premium Combed Cotton', Wash: 'Machine Wash Cold, Gentle Cycle', Set: 'Button-up Short Sleeve Shirt & Shorts Set', Origin: 'Made in India' },
    gallery: [
      '/images/baby-animal-coord-model1.webp',
      '/images/baby-animal-coord-model2.webp',
      '/images/baby-animal-coord-hanger.webp',
      '/images/baby-animal-coord-label.webp'
    ]
  },
  {
    id: 19,
    name: 'Kids Premium Cotton Blue Teddy Bear Print T-Shirt & Shorts Co-Ord Set',
    category: 'Baby',
    priceVal: 399,
    price: '₹399',
    tag: 'Trending',
    tagColor: '#81B29A',
    img: '/images/baby-teddy-coord-model1.webp',
    rating: 4.8,
    reviews: 12,
    sizes: ['0-6m', '6-12m', '12-18m'],
    desc: 'Dress your baby in ultimate comfort with our Kids Premium Cotton Blue Teddy Bear Co-Ord Set. Made from 100% pure combed cotton, this matching button-front shirt and shorts set features a cute, playful blue teddy bear print. Highly breathable, lightweight, and hypoallergenic, it is perfect for summer playtime, casual outings, or daytime naps.\n\nWhy Parents Love This Teddy Bear Baby Set:\n- 100% Pure Combed Cotton: Skin-friendly and ultra-soft on delicate baby skin.\n- Cute Blue Teddy Bear Prints: A charming design that looks adorable on boys and girls.\n- Comfort-Fit Elastic Shorts: Ensures hassle-free diaper checks and all-day active comfort.\n- Premium Stitch Durability: Long-lasting quality that holds its shape wash after wash.\n- Trusted Kids Wear Store: Handpicked quality from Kids City Wakad, Pune, now shipping across India.\n\nBuy baby clothes online India from ₹399. Cash on Delivery (COD) available | Free local delivery in Wakad | Easy 7-day exchange.',
    specs: { Fabric: '100% Premium Combed Cotton', Wash: 'Machine Wash Cold, Gentle Cycle', Set: 'Button-up Short Sleeve Shirt & Shorts Set', Origin: 'Made in India' },
    gallery: [
      '/images/baby-teddy-coord-model1.webp',
      '/images/baby-teddy-coord-model2.webp',
      '/images/baby-teddy-coord-hanger-front.webp',
      '/images/baby-teddy-coord-hanger-back.webp',
      '/images/baby-teddy-coord-label.webp'
    ]
  },
  {
    id: 20,
    name: 'Kids Premium Cotton Balloon Print Co-Ord Set - Soft & Breathable Unisex Baby T-Shirt & Shorts Playwear Set for Daily Home Wear & Travel',
    category: 'Baby',
    priceVal: 299,
    price: '₹299',
    tag: 'Trending',
    tagColor: '#81B29A',
    img: '/images/baby-balloon-coord-1.webp',
    rating: 4.8,
    reviews: 14,
    sizes: ['3-6m', '6-9m', '9-12m'],
    desc: 'Dress your baby in ultimate comfort with our Kids Premium Cotton Balloon Print Co-Ord Set. Made from 100% pure combed cotton, this matching t-shirt and shorts set features a cute, playful balloon print. Highly breathable, lightweight, and hypoallergenic, it is perfect for casual outings, home wear, holiday wear, and active playtime.\n\nWhy Parents Love This Balloon Baby Set:\n- 100% Pure Combed Cotton: Skin-friendly, soft, and breathable on baby\'s delicate skin.\n- Playful Balloon Prints: A charming design that looks adorable on both boys and girls.\n- Comfort-Fit Elastic Waistband: Ensures hassle-free styling and comfortable all-day playwear.\n- Versatile Layering Outfit: Lightweight design suitable for layering in cooler weather.\n- India\'s Best Kids Fashion Shop: Premium quality clothing from Kids City Wakad, Pune, now available online!\n\nBuy children\'s clothes online India. Cash on Delivery (COD) available | Free local delivery in Wakad | Easy 7-day exchange.',
    specs: { Fabric: '100% Premium Combed Cotton', Wash: 'Machine Wash Cold, Gentle Cycle', Set: 'Unisex T-Shirt & Shorts Co-Ord Set', Origin: 'Made in India' },
    gallery: [
      '/images/baby-balloon-coord-1.webp',
      '/images/baby-balloon-coord-2.webp',
      '/images/baby-balloon-coord-3.webp',
      '/images/baby-balloon-coord-4.webp',
      '/images/baby-balloon-coord-5.webp',
      '/images/baby-balloon-coord-6.webp'
    ]
  },
  {
    id: 21,
    name: 'Kids Premium Cotton Deer Print Co-Ord Set - Lightweight & Breathable Unisex Baby T-Shirt & Shorts Playwear Set for Daily Home Wear & Travel Wear',
    category: 'Baby',
    priceVal: 299,
    price: '₹299',
    tag: 'New',
    tagColor: '#81B29A',
    img: '/images/baby-deer-coord-1.webp',
    rating: 4.9,
    reviews: 11,
    sizes: ['3-6m', '6-9m', '9-12m'],
    desc: 'Dress your baby in ultimate comfort with our Kids Premium Cotton Deer Print Co-Ord Set. Made from 100% pure combed cotton, this matching t-shirt and shorts set features a cute, playful forest deer cartoon print. Highly breathable, lightweight, and hypoallergenic, it is perfect for casual playwear, daily wear, travel wear, and holiday outfits.\n\nWhy Parents Love This Deer Baby Set:\n- 100% Pure Combed Cotton: Skin-friendly, soft, and breathable on baby\'s delicate skin.\n- Adorable Deer Cartoon Prints: A cute wildlife theme that looks charming on both boys and girls.\n- Comfort-Fit Elastic Waistband: Ensures hassle-free styling and comfortable all-day playwear.\n- Versatile Layering Outfit: Lightweight design suitable for layering in cooler weather.\n- India\'s Best Kids Fashion Shop: Premium quality clothing from Kids City Wakad, Pune, now available online!\n\nBuy children\'s clothes online India. Cash on Delivery (COD) available | Free local delivery in Wakad | Easy 7-day exchange.',
    specs: { Fabric: '100% Premium Combed Cotton', Wash: 'Machine Wash Cold, Gentle Cycle', Set: 'Unisex T-Shirt & Shorts Co-Ord Set', Origin: 'Made in India' },
    gallery: [
      '/images/baby-deer-coord-1.webp',
      '/images/baby-deer-coord-2.webp',
      '/images/baby-deer-coord-3.webp',
      '/images/baby-deer-coord-4.webp',
      '/images/baby-deer-coord-5.webp'
    ]
  },
  {
    id: 22,
    name: 'Kids Premium Cotton Dinosaur Print Co-Ord Set - Skin-Friendly & Soft Unisex Baby T-Shirt & Shorts Set for Cozy Playwear, Daily Wear & Travel',
    category: 'Baby',
    priceVal: 299,
    price: '₹299',
    tag: 'Bestseller',
    tagColor: '#E07A5F',
    img: '/images/baby-dino-coord-1.webp',
    rating: 4.9,
    reviews: 18,
    sizes: ['3-6m', '6-9m', '9-12m'],
    desc: 'Dress your baby in ultimate comfort with our Kids Premium Cotton Dinosaur Print Co-Ord Set. Made from 100% pure combed cotton, this matching t-shirt and shorts set features a cute, playful dinosaur print. Highly breathable, lightweight, and hypoallergenic, it is perfect for daily wear, playwear, home wear, and travel wear.\n\nWhy Parents Love This Dino Baby Set:\n- 100% Pure Combed Cotton: Skin-friendly, soft, and breathable on baby\'s delicate skin.\n- Playful Dinosaur Cartoon Prints: A popular print that looks adorable on boys and girls.\n- Comfort-Fit Elastic Waistband: Ensures hassle-free styling and comfortable all-day playwear.\n- Autumn Winter Collection Layering: Warm & comfortable when layered under kids sweaters and winter wear.\n- India\'s Best Kids Fashion Shop: Premium quality clothing from Kids City Wakad, Pune, now available online!\n\nBuy children\'s clothes online India. Cash on Delivery (COD) available | Free local delivery in Wakad | Easy 7-day exchange.',
    specs: { Fabric: '100% Premium Combed Cotton', Wash: 'Machine Wash Cold, Gentle Cycle', Set: 'Unisex T-Shirt & Shorts Co-Ord Set', Origin: 'Made in India' },
    gallery: [
      '/images/baby-dino-coord-1.webp',
      '/images/baby-dino-coord-2.webp',
      '/images/baby-dino-coord-3.webp',
      '/images/baby-dino-coord-4.webp',
      '/images/baby-dino-coord-5.webp'
    ]
  },
  {
    id: 23,
    name: 'Kids Premium Cotton Sweet Donut Print Co-Ord Set - Soft & Breathable Unisex Baby T-Shirt & Shorts Set for Cozy Playwear, Daily Wear & Home Wear',
    category: 'Baby',
    priceVal: 299,
    price: '₹299',
    tag: 'New',
    tagColor: '#81B29A',
    img: '/images/baby-donut-coord-1.webp',
    rating: 4.7,
    reviews: 9,
    sizes: ['3-6m', '6-9m', '9-12m'],
    desc: 'Dress your baby in ultimate comfort with our Kids Premium Cotton Sweet Donut Print Co-Ord Set. Made from 100% pure combed cotton, this matching t-shirt and shorts set features a cute, playful sweet donut print. Highly breathable, lightweight, and hypoallergenic, it is perfect for casual playwear, daily wear, home wear, and holiday outfits.\n\nWhy Parents Love This Donut Baby Set:\n- 100% Pure Combed Cotton: Skin-friendly, soft, and breathable on baby\'s delicate skin.\n- Sweet Donut Cartoon Prints: A cute, colorful print that looks charming on boys and girls.\n- Comfort-Fit Elastic Waistband: Ensures hassle-free styling and comfortable all-day playwear.\n- Versatile Layering Outfit: Lightweight design suitable for layering in cooler weather.\n- India\'s Best Kids Fashion Shop: Premium quality clothing from Kids City Wakad, Pune, now available online!\n\nBuy children\'s clothes online India. Cash on Delivery (COD) available | Free local delivery in Wakad | Easy 7-day exchange.',
    specs: { Fabric: '100% Premium Combed Cotton', Wash: 'Machine Wash Cold, Gentle Cycle', Set: 'Unisex T-Shirt & Shorts Co-Ord Set', Origin: 'Made in India' },
    gallery: [
      '/images/baby-donut-coord-1.webp',
      '/images/baby-donut-coord-2.webp',
      '/images/baby-donut-coord-3.webp',
      '/images/baby-donut-coord-4.webp',
      '/images/baby-donut-coord-5.webp'
    ]
  },
  {
    id: 24,
    name: 'Kids Premium Cotton Sun Print Co-Ord Set - Lightweight & Breathable Unisex Baby T-Shirt & Shorts Playwear Set for Daily Home Wear, Travel & Holidays',
    category: 'Baby',
    priceVal: 299,
    price: '₹299',
    tag: 'Trending',
    tagColor: '#81B29A',
    img: '/images/baby-sun-coord-1.webp',
    rating: 4.8,
    reviews: 13,
    sizes: ['3-6m', '6-9m', '9-12m'],
    desc: 'Dress your baby in ultimate comfort with our Kids Premium Cotton Sun Print Co-Ord Set. Made from 100% pure combed cotton, this matching t-shirt and shorts set features a bright, sunny cartoon print. Highly breathable, lightweight, and hypoallergenic, it is perfect for daily home wear, active playwear, travel, and holiday outfits.\n\nWhy Parents Love This Sun Baby Set:\n- 100% Pure Combed Cotton: Skin-friendly, soft, and breathable on baby\'s delicate skin.\n- Sunny Cartoon Prints: A bright and positive yellow print that looks adorable on boys and girls.\n- Comfort-Fit Elastic Waistband: Ensures hassle-free styling and comfortable all-day playwear.\n- Versatile Layering Outfit: Lightweight design suitable for layering in cooler weather.\n- India\'s Best Kids Fashion Shop: Premium quality clothing from Kids City Wakad, Pune, now available online!\n\nBuy children\'s clothes online India. Cash on Delivery (COD) available | Free local delivery in Wakad | Easy 7-day exchange.',
    specs: { Fabric: '100% Premium Combed Cotton', Wash: 'Machine Wash Cold, Gentle Cycle', Set: 'Unisex T-Shirt & Shorts Co-Ord Set', Origin: 'Made in India' },
    gallery: [
      '/images/baby-sun-coord-1.webp',
      '/images/baby-sun-coord-2.webp',
      '/images/baby-sun-coord-3.webp',
      '/images/baby-sun-coord-4.webp',
      '/images/baby-sun-coord-5.webp'
    ]
  },
  {
    id: 25,
    name: 'Kids Premium Cotton Train Print Co-Ord Set - Soft & Breathable Boys & Girls Baby T-Shirt & Shorts Playwear Set for Daily Home Wear & Travel Wear',
    category: 'Baby',
    priceVal: 299,
    price: '₹299',
    tag: 'Trending',
    tagColor: '#81B29A',
    img: '/images/baby-train-coord-1.webp',
    rating: 4.9,
    reviews: 16,
    sizes: ['3-6m', '6-9m', '9-12m'],
    desc: 'Dress your baby in ultimate comfort with our Kids Premium Cotton Train Print Co-Ord Set. Made from 100% pure combed cotton, this matching t-shirt and shorts set features a cute, playful train cartoon print. Highly breathable, lightweight, and hypoallergenic, it is perfect for casual playwear, travel outfits, daily home wear, and outdoor travel.\n\nWhy Parents Love This Train Baby Set:\n- 100% Pure Combed Cotton: Skin-friendly, soft, and breathable on baby\'s delicate skin.\n- Playful Train Cartoon Prints: A cute and adventurous transport theme that looks adorable on boys and girls.\n- Comfort-Fit Elastic Waistband: Ensures hassle-free styling and comfortable all-day playwear.\n- Versatile Layering Outfit: Lightweight design suitable for layering in cooler weather.\n- India\'s Best Kids Fashion Shop: Premium quality clothing from Kids City Wakad, Pune, now available online!\n\nBuy children\'s clothes online India. Cash on Delivery (COD) available | Free local delivery in Wakad | Easy 7-day exchange.',
    specs: { Fabric: '100% Premium Combed Cotton', Wash: 'Machine Wash Cold, Gentle Cycle', Set: 'Unisex T-Shirt & Shorts Co-Ord Set', Origin: 'Made in India' },
    gallery: [
      '/images/baby-train-coord-1.webp',
      '/images/baby-train-coord-2.webp',
      '/images/baby-train-coord-3.webp',
      '/images/baby-train-coord-4.webp',
      '/images/baby-train-coord-5.webp',
      '/images/baby-train-coord-6.webp',
      '/images/baby-train-coord-7.webp'
    ]
  }
]

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: 2000 },
  { label: 'Under ₹600', min: 0, max: 600 },
  { label: '₹600 - ₹900', min: 600, max: 900 },
  { label: '₹900+', min: 900, max: 2000 }
]

function AutoScrollingImage({ img, gallery, alt, className }) {
  const images = gallery && gallery.length > 0 ? gallery : [img]
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % images.length)
    }, 3500)

    return () => clearInterval(timer)
  }, [images])

  if (images.length === 0 || !images[0]) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#fafaf6] text-text-muted text-[0.82rem] font-semibold">
        <span>No Image</span>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={images[idx]}
          src={images[idx]}
          alt={alt}
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </AnimatePresence>
    </div>
  )
}

export default function ShopView({ products, onSelectProduct }) {
  const catalogSource = products && products.length > 0 ? products : PRODUCTS

  const CATEGORIES = useMemo(() => {
    const cats = new Set(catalogSource.map(p => p.category).filter(Boolean))
    return ['All', ...Array.from(cats)]
  }, [catalogSource])

  const [search, setSearch] = useState('')
  const [selectedCat, setSelectedCat] = useState('All')
  const [selectedSize, setSelectedSize] = useState('All')
  const [selectedPrice, setSelectedPrice] = useState(PRICE_RANGES[0])
  const [sortBy, setSortBy] = useState('popular')
  const [wishlisted, setWishlisted] = useState({})
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const getGlowColor = (cat) => {
    switch (cat) {
      case 'Birthday': return 'rgba(255, 75, 114, 0.15)'
      case 'Casual': return 'rgba(0, 168, 232, 0.15)'
      case 'Festival Wear':
      case 'Traditional': return 'rgba(224, 122, 95, 0.15)'
      default: return 'rgba(46, 196, 182, 0.15)'
    }
  }

  const getHoverBorderColor = (cat) => {
    switch (cat) {
      case 'Birthday': return '#FF4B72'
      case 'Casual': return '#00A8E8'
      case 'Festival Wear':
      case 'Traditional': return '#E07A5F'
      default: return '#2EC4B6'
    }
  }

  const toggleWishlist = (id, e) => {
    e.stopPropagation()
    setWishlisted(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const derivedSizes = useMemo(() => {
    const unique = new Set()
    catalogSource.forEach(p => {
      if (p.sizes && Array.isArray(p.sizes)) {
        p.sizes.forEach(sz => {
          if (sz) unique.add(sz)
        })
      }
    })
    
    const sorted = Array.from(unique).sort((a, b) => {
      const letterOrder = { 'XS': 1, 'S': 2, 'M': 3, 'L': 4, 'XL': 5, 'XXL': 6 }
      if (letterOrder[a] && letterOrder[b]) return letterOrder[a] - letterOrder[b]
      if (letterOrder[a]) return 1
      if (letterOrder[b]) return -1

      const numA = parseInt(a)
      const numB = parseInt(b)
      if (!isNaN(numA) && !isNaN(numB)) return numA - numB
      if (!isNaN(numA)) return 1
      if (!isNaN(numB)) return -1
      
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    })

    return ['All', ...sorted]
  }, [catalogSource])

  const filteredProducts = useMemo(() => {
    let items = [...catalogSource]

    if (search.trim() !== '') {
      const q = search.toLowerCase()
      items = items.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
    }

    if (selectedCat !== 'All') {
      items = items.filter(p => p.category === selectedCat)
    }

    if (selectedSize !== 'All') {
      items = items.filter(p => p.sizes.includes(selectedSize))
    }

    items = items.filter(p => p.priceVal >= selectedPrice.min && p.priceVal <= selectedPrice.max)

    if (sortBy === 'popular') {
      items.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
    } else if (sortBy === 'low-high') {
      items.sort((a, b) => a.priceVal - b.priceVal)
    } else if (sortBy === 'high-low') {
      items.sort((a, b) => b.priceVal - a.priceVal)
    } else if (sortBy === 'rating') {
      items.sort((a, b) => b.rating - a.rating)
    }

    return items
  }, [catalogSource, search, selectedCat, selectedSize, selectedPrice, sortBy])

  const renderFilters = () => (
    <>
      {/* Category Filter */}
      <div className="mb-8">
        <h4 className="font-[family-name:var(--font-head)] text-[0.95rem] font-bold text-brand-navy mb-4 uppercase tracking-[0.5px]">Category</h4>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-[50px] border border-border text-[0.82rem] font-semibold transition-all duration-150 ${selectedCat === cat ? 'bg-brand-terracotta border-brand-terracotta text-white' : 'bg-white text-brand-navy hover:border-brand-terracotta hover:bg-white'}`}
              onClick={() => setSelectedCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sizing Filter */}
      <div className="mb-8">
        <h4 className="font-[family-name:var(--font-head)] text-[0.95rem] font-bold text-brand-navy mb-4 uppercase tracking-[0.5px]">Age / Size</h4>
        <div className="grid grid-cols-3 gap-2">
          {derivedSizes.map(sz => (
            <button
              key={sz}
              className={`px-1 py-2.5 rounded-sm border border-border text-[0.8rem] font-bold text-center transition-all duration-150 ${selectedSize === sz ? 'bg-brand-sage border-brand-sage text-white' : 'bg-white text-brand-navy hover:border-brand-sage'}`}
              onClick={() => setSelectedSize(sz)}
            >
              {sz === 'All' ? 'All Sizes' : sz}
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-8 last:mb-0">
        <h4 className="font-[family-name:var(--font-head)] text-[0.95rem] font-bold text-brand-navy mb-4 uppercase tracking-[0.5px]">Price Range</h4>
        <div className="flex flex-col gap-3">
          {PRICE_RANGES.map((pr, idx) => {
            const isActive = selectedPrice.label === pr.label
            return (
              <button
                key={idx}
                className={`flex items-center gap-3 text-[0.9rem] font-semibold text-left transition-colors duration-150 group ${isActive ? 'text-brand-navy font-bold' : 'text-text-mid hover:text-brand-navy'}`}
                onClick={() => setSelectedPrice(pr)}
              >
                <span className={`w-[18px] h-[18px] rounded-full border-2 border-border relative transition-all duration-150 group-hover:border-brand-terracotta ${isActive ? 'border-brand-terracotta bg-brand-terracotta after:content-[""] after:absolute after:top-1 after:left-1 after:w-1.5 after:h-1.5 after:rounded-full after:bg-white' : 'bg-white'}`} />
                {pr.label}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-white pt-[130px] pb-[60px] text-center border-b border-border relative overflow-hidden">
        <div className="container">
          <div className="relative z-2 max-w-[600px] mx-auto">
            <span className="section-label" style={{ color: 'var(--brand-terracotta)' }}>Premium Wear</span>
            <h1 className="font-[family-name:var(--font-head)] text-[clamp(2.2rem,5vw,3rem)] font-black text-brand-navy my-1.5 mb-3 leading-[1.1] tracking-tighter">Explore <span className="serif-accent">Collections</span></h1>
            <p className="text-[1.05rem] text-text-mid leading-relaxed">
              Filter by size, category, and price to find the perfect outfit for your little star.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="py-[60px]">
        <div className="container">
          <div className="grid grid-cols-[280px_1fr] max-[991px]:grid-cols-1 gap-10 items-start">
            {/* Desktop Filters Sidebar (Hidden on mobile) */}
            <aside className="bg-white border border-border rounded-2xl p-[30px] sticky top-[100px] shadow-sm max-[991px]:hidden">
              <div className="flex items-center gap-2.5 border-b border-border pb-[18px] mb-6">
                <SlidersHorizontal size={18} className="text-brand-terracotta" />
                <h3 className="font-[family-name:var(--font-head)] text-[1.15rem] font-[800] text-brand-navy">Filters</h3>
              </div>
              {renderFilters()}
            </aside>

            {/* Catalog Grid */}
            <main className="flex flex-col gap-6">
              {/* Controls bar */}
              <div className="flex gap-5 justify-between items-center max-[600px]:flex-row max-[600px]:flex-wrap max-[600px]:items-stretch max-[600px]:gap-3">
                {/* Search */}
                <div className="flex-1 relative max-[600px]:w-full max-[600px]:flex-none">
                  <Search size={18} className="absolute top-[15px] left-5 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search dress, kurta, frocks..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full py-3.5 pl-[50px] pr-5 rounded-[50px] border-2 border-border bg-white text-[0.92rem] outline-none transition-all duration-150 shadow-sm focus:border-brand-terracotta focus:shadow-md"
                  />
                </div>

                {/* Mobile Filter Trigger Button */}
                <button
                  className="hidden max-[991px]:inline-flex items-center justify-center gap-2 bg-white border-2 border-border px-6 py-3 rounded-[50px] font-bold text-[0.88rem] text-brand-navy shadow-sm min-h-[50px] transition-all duration-150 hover:border-brand-terracotta hover:text-brand-terracotta max-[600px]:flex-1"
                  onClick={() => setIsMobileFiltersOpen(true)}
                >
                  <SlidersHorizontal size={16} /> Filters
                </button>

                {/* Sort */}
                <div className="flex items-center gap-2.5 bg-white border-2 border-border px-4 py-1 rounded-[50px] min-h-[50px] shadow-sm max-[600px]:flex-1 max-[600px]:justify-center">
                  <ArrowUpDown size={16} className="text-brand-navy" />
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="border-none bg-transparent outline-none font-bold text-[0.88rem] text-brand-navy cursor-pointer pr-2.5"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>

              {/* Products count */}
              <div className="text-[0.88rem] font-semibold text-text-muted">
                Showing {filteredProducts.length} of {catalogSource.length} styles
              </div>

              {/* Grid with animation */}
              <motion.div className="grid grid-cols-3 max-[1200px]:grid-cols-2 max-[600px]:grid-cols-1 gap-6" layout>
                <AnimatePresence mode="popLayout">
                  {filteredProducts.length === 0 ? (
                    <motion.div
                      className="col-span-full text-center px-10 py-20 bg-white border border-border rounded-2xl shadow-sm flex flex-col items-center gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key="no-results"
                    >
                      <h3 className="font-[family-name:var(--font-head)] text-[1.35rem] color-brand-navy font-extrabold">No items matched your filters</h3>
                      <p className="text-text-mid">Try clearing your search query or selecting a different age size.</p>
                      <button
                        className="btn btn-navy"
                        onClick={() => {
                          setSearch('')
                          setSelectedCat('All')
                          setSelectedSize('All')
                          setSelectedPrice(PRICE_RANGES[0])
                        }}
                      >
                        Reset All Filters
                      </button>
                    </motion.div>
                  ) : (
                    filteredProducts.map((p, idx) => (
                      <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.4) }}
                        className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm transition-all duration-350 cursor-pointer flex flex-col hover:-translate-y-1.5"
                        style={{
                          transitionProperty: 'transform, border-color, box-shadow'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = getHoverBorderColor(p.category);
                          e.currentTarget.style.boxShadow = `0 12px 30px ${getGlowColor(p.category)}`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '';
                          e.currentTarget.style.boxShadow = '';
                        }}
                        onClick={() => onSelectProduct(p)}
                      >
                        <div className="aspect-square bg-white relative overflow-hidden flex items-center justify-center p-2">
                          <AutoScrollingImage
                            img={p.img}
                            gallery={p.gallery}
                            alt={`${p.name} — ${p.category || 'Kids clothing'} at Kids City Wakad, Pune`}
                            className="w-full h-full object-contain transition-transform duration-[600ms] ease-out hover:scale-105"
                          />
                          {p.tag && (
                            <span
                              className="absolute top-4 left-4 px-3 py-1 rounded-[50px] text-[0.68rem] font-extrabold uppercase text-white tracking-[0.5px] shadow-md"
                              style={{ backgroundColor: p.tagColor }}
                            >
                              {p.tag}
                            </span>
                          )}
                          <button
                            className={`absolute top-4 right-4 w-[38px] h-[38px] rounded-full bg-white shadow-sm flex items-center justify-center transition-all duration-150 hover:scale-110 hover:shadow-md ${wishlisted[p.id] ? 'text-brand-terracotta' : 'text-text-muted hover:text-brand-terracotta'}`}
                            onClick={e => toggleWishlist(p.id, e)}
                            aria-label="Add to wishlist"
                          >
                            <Heart
                              size={18}
                              strokeWidth={2}
                              fill={wishlisted[p.id] ? 'currentColor' : 'none'}
                            />
                          </button>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <span className="text-[0.72rem] font-extrabold uppercase text-brand-sage tracking-[0.8px] mb-1.5">{p.category}</span>
                          <h3 className="font-[family-name:var(--font-head)] text-[1.05rem] font-extrabold text-brand-navy leading-tight mb-2 line-clamp-1 overflow-hidden">{p.name}</h3>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex gap-0.5 text-brand-orange">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={13}
                                  strokeWidth={0}
                                  fill={i < Math.round(p.rating) ? 'currentColor' : '#E6DFD3'}
                                />
                              ))}
                            </div>
                            <span className="text-[0.75rem] text-text-muted font-medium">({p.reviews})</span>
                          </div>
                          <div className="flex justify-between items-center mt-auto border-t border-border pt-3.5">
                            <span className="text-[1.15rem] font-extrabold text-brand-terracotta">{p.price}</span>
                            <span className="text-[0.72rem] font-bold text-text-muted bg-white border border-border px-2.5 py-1 rounded-[6px]">{p.sizes.join(', ')}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </motion.div>
            </main>
          </div>
        </div>
      </section>

      {/* Sliding Mobile Filters Drawer Overlay */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-[#2c2e43]/40 backdrop-blur-xs z-[1002]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
            />
            <motion.div
              className="fixed top-0 left-0 w-full max-w-[380px] h-full bg-white shadow-2xl flex flex-col z-[1003] border-r border-border"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            >
              <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <SlidersHorizontal size={18} className="text-brand-terracotta" />
                  <h3 className="font-[family-name:var(--font-head)] text-[1.25rem] font-extrabold text-brand-navy">Filters</h3>
                </div>
                <button
                  className="w-9 h-9 rounded-full flex items-center justify-center text-brand-navy bg-[#fafaf6] border border-border transition-all duration-150 hover:bg-brand-terracotta hover:text-white hover:rotate-90"
                  onClick={() => setIsMobileFiltersOpen(false)}
                  aria-label="Close filters"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {renderFilters()}
              </div>

              <div className="p-6 border-t border-border bg-white">
                <button
                  className="btn btn-terracotta w-full"
                  onClick={() => setIsMobileFiltersOpen(false)}
                >
                  Apply Filters ({filteredProducts.length} Items)
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
