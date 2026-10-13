import { storeConfig } from '../config/storeConfig.js'

export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

// 1. Categories Data (Factual, parent-friendly, zero unconfirmed delivery/fabric claims)
export const CATEGORIES_DATA = {
  'girls-party-wear-pune': {
    slug: 'girls-party-wear-pune',
    title: 'Girls Party Wear in Pune | Kids City, Wakad',
    h1: 'Girls Party Wear & Birthday Dresses in Pune',
    metaTitle: 'Girls Party Wear in Pune | Kids City, Wakad',
    metaDescription: 'Shop girls party wear dresses, gowns & frocks in Pune from ₹499. Visit Kids City boutique in Wakad or inquire on WhatsApp.',
    intro: 'Looking for party wear dresses for your daughter in Pune? At Kids City, we curate birthday gowns, tiered party frocks, and celebration wear with soft inner lining for children from newborn to 14 years.',
    priceRange: 'Starting from ₹499 [Inquire for current collection pricing]',
    filterCategory: 'Birthday',
    relatedCategories: ['birthday-dresses-pune', 'kids-ethnic-wear-pune', 'kids-accessories-pune'],
    faqs: [
      { q: 'What sizes are available for girls party dresses?', a: 'We carry girls party dresses from infant sizes (0-6 months) up to 14 years. Sizing assistance is available in-store or on WhatsApp.' },
      { q: 'Can I visit the store to try on dresses?', a: 'Yes! Our boutique is located at Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Road, Wakad, Pune, with trial facilities.' },
      { q: 'Do you deliver party dresses across Pune?', a: 'Yes, delivery is available across Pune and PCMC. Please message us on WhatsApp with your pincode to confirm delivery time and charges.' },
      { q: 'What is your exchange policy?', a: 'We support size exchanges for unworn garments with original tags and purchase receipt intact.' }
    ]
  },
  'boys-party-wear-pune': {
    slug: 'boys-party-wear-pune',
    title: 'Boys Party Wear in Pune | Kids City, Wakad',
    h1: 'Boys Party Wear & Smart Outfits in Pune',
    metaTitle: 'Boys Party Wear in Pune | Kids City, Wakad',
    metaDescription: 'Boys party wear, denim sets & smart casual outfits in Pune from ₹549. Visit Kids City Wakad or order on WhatsApp.',
    intro: 'Dress your boy in smart, stylish outfits for family gatherings and celebrations. Kids City offers denim coordinates, shirts, and party sets designed for comfortable movement.',
    priceRange: 'Starting from ₹549 [Inquire for current collection pricing]',
    filterCategory: 'Casual',
    relatedCategories: ['boys-ethnic-wear-pune', 'kids-daily-wear-pune', 'kids-night-suits-pune'],
    faqs: [
      { q: 'What styles of boys party wear do you carry?', a: 'We stock denim sets, shirt-and-trouser coordinates, polo sets, and smart party wear for boys.' },
      { q: 'Can I order boys clothes on WhatsApp?', a: 'Yes! Message us on WhatsApp (+91 78916 72762) with your requirements, and our Wakad team will share available designs.' },
      { q: 'Do you deliver to PCMC and Pune areas?', a: 'Yes, delivery is available across Pune and PCMC. Contact us for courier dispatch details.' },
      { q: 'What are your store hours?', a: 'We are open 7 days a week. Please call or WhatsApp before visiting to confirm today\'s hours.' }
    ]
  },
  'kids-ethnic-wear-pune': {
    slug: 'kids-ethnic-wear-pune',
    title: 'Kids Ethnic Wear in Pune | Kids City, Wakad',
    h1: 'Kids Ethnic & Festive Wear in Pune',
    metaTitle: 'Kids Ethnic Wear in Pune | Kids City, Wakad',
    metaDescription: 'Kids traditional wear, Navratri lehengas & Diwali kurtas in Pune from ₹699. Visit Kids City Wakad or inquire on WhatsApp.',
    intro: 'Celebrate Diwali, Navratri, weddings, and cultural days with traditional children\'s clothing. Kids City carries Chaniya Cholis, kurtas, and festive sets with child-friendly linings.',
    priceRange: 'Starting from ₹699 [Inquire for current collection pricing]',
    filterCategory: 'Festival Wear',
    relatedCategories: ['boys-ethnic-wear-pune', 'girls-party-wear-pune', 'birthday-dresses-pune'],
    faqs: [
      { q: 'Which festivals do you have traditional wear for?', a: 'We stock outfits for Diwali, Navratri, Ganesh Chaturthi, Eid, weddings, and school ethnic days.' },
      { q: 'Can you share photos of ethnic wear on WhatsApp?', a: 'Yes! WhatsApp us at +91 78916 72762 and we will share current boutique stock photos and videos.' },
      { q: 'Do you offer home delivery in Pune?', a: 'Yes, delivery is available across Pune and PCMC. Timelines depend on destination.' },
      { q: 'What sizes are available in kids ethnic wear?', a: 'Sizes range from 6 months up to 14 years for boys and girls.' }
    ]
  },
  'boys-ethnic-wear-pune': {
    slug: 'boys-ethnic-wear-pune',
    title: 'Boys Ethnic Wear in Pune | Kids City, Wakad',
    h1: 'Boys Ethnic Wear, Kurta Pajama & Sherwanis in Pune',
    metaTitle: 'Boys Ethnic Wear in Pune | Kids City, Wakad',
    metaDescription: 'Boys kurta pajama, sherwani sets & festive outfits in Pune from ₹699. Visit Kids City Wakad or order on WhatsApp.',
    intro: 'Traditional festive sets for boys in Pune. Handpicked kurta pajama sets, festive jackets, and ethnic coordinates crafted for celebration comfort.',
    priceRange: 'Starting from ₹699 [Inquire for current collection pricing]',
    filterCategory: 'Traditional',
    relatedCategories: ['kids-ethnic-wear-pune', 'boys-party-wear-pune', 'kids-daily-wear-pune'],
    faqs: [
      { q: 'What age groups do you cater to for boys ethnic wear?', a: 'From 6 months infants to 14 years old boys.' },
      { q: 'Can we visit your Wakad shop to try sizes?', a: 'Yes, our store is at Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Road, Wakad.' },
      { q: 'How do I place an order for delivery?', a: 'Click the "Order on WhatsApp" button or message +91 78916 72762 with your chosen design.' },
      { q: 'How should ethnic outfits be cleaned?', a: 'Care instructions depend on fabric; dry clean or gentle hand wash is generally recommended for embellished items.' }
    ]
  },
  'birthday-dresses-pune': {
    slug: 'birthday-dresses-pune',
    title: 'Birthday Dresses in Pune | Kids City, Wakad',
    h1: 'Kids Birthday Dresses & 1st Birthday Outfits in Pune',
    metaTitle: 'Birthday Dresses in Pune | Kids City, Wakad',
    metaDescription: '1st birthday frocks, prince suits & party gowns in Pune from ₹649. Visit Kids City Wakad or order on WhatsApp.',
    intro: 'Celebrate your child\'s special birthday with photo-ready party outfits. From 1st birthday frocks with soft underskirts to dapper boy suits, find celebration styles at Kids City.',
    priceRange: 'Starting from ₹649 [Inquire for current collection pricing]',
    filterCategory: 'Birthday',
    relatedCategories: ['girls-party-wear-pune', 'boys-party-wear-pune', 'baby-clothes-pune'],
    faqs: [
      { q: 'Do you carry 1st birthday dresses for babies?', a: 'Yes, we have specialized 1st birthday frocks and suits designed with soft inner linings for toddler comfort.' },
      { q: 'Can you deliver for an upcoming birthday?', a: 'Message us on WhatsApp (+91 78916 72762) and our team will check available delivery options to your location.' },
      { q: 'Do birthday dresses include accessories?', a: 'Select dresses include matching hair accessories or bow ties. Details are specified on each piece.' },
      { q: 'Where is your shop located?', a: 'In Wakad, Pune at Mahalaxmi Complex, Chatrapati Chowk Road.' }
    ]
  },
  'kids-night-suits-pune': {
    slug: 'kids-night-suits-pune',
    title: 'Kids Night Suits in Pune | Kids City, Wakad',
    h1: 'Kids Cotton Night Suits & Sleepwear in Pune',
    metaTitle: 'Kids Night Suits in Pune | Kids City, Wakad',
    metaDescription: 'Cotton kids night suits in Pune from ₹399. Comfortable, breathable sleepwear for boys & girls. Visit Kids City or WhatsApp order.',
    intro: 'Comfortable cotton night suits and sleepwear sets for children in Pune. Soft, breathable fabrics designed for restful sleep and everyday relaxation at home.',
    priceRange: 'Starting from ₹399 [Inquire for current collection pricing]',
    filterCategory: 'Night Suits',
    relatedCategories: ['baby-clothes-pune', 'kids-daily-wear-pune', 'boys-party-wear-pune'],
    faqs: [
      { q: 'What fabric are the night suits made of?', a: 'Our sleepwear collection features soft, breathable cotton fabrics suitable for children.' },
      { q: 'What sizes are available in kids night suits?', a: 'From infant sleep sets (0-6 months) up to 12-14 years.' },
      { q: 'Can I order multiple night suits on WhatsApp?', a: 'Yes, WhatsApp us at +91 78916 72762 to browse current prints and patterns.' },
      { q: 'Do you deliver across Pune?', a: 'Yes, delivery is available across Pune and PCMC.' }
    ]
  },
  'baby-clothes-pune': {
    slug: 'baby-clothes-pune',
    title: 'Baby Clothes Shop in Pune | Kids City, Wakad',
    h1: 'Baby Clothes & Co-Ord Sets in Pune (0–2 Years)',
    metaTitle: 'Baby Clothes Shop in Pune | Kids City, Wakad',
    metaDescription: 'Soft baby clothes, rompers & cotton co-ord sets in Pune from ₹299. Visit Kids City Wakad or order on WhatsApp.',
    intro: 'Gentle everyday clothing for babies and toddlers aged 0 to 24 months. Kids City carries button-up co-ord sets, rompers, and playwear in soft cotton weaves.',
    priceRange: 'Starting from ₹299 [Inquire for current collection pricing]',
    filterCategory: 'Baby',
    relatedCategories: ['kids-night-suits-pune', 'birthday-dresses-pune', 'kids-daily-wear-pune'],
    faqs: [
      { q: 'What sizes are available for newborn babies?', a: 'Sizes include 0-3m, 3-6m, 6-9m, 9-12m, 12-18m, and 18-24m.' },
      { q: 'Can I purchase baby clothing gift sets?', a: 'Yes, we carry co-ord sets and baby hampers suitable for gifting.' },
      { q: 'Do you deliver baby clothes in Pune?', a: 'Yes, delivery is available across Pune and PCMC upon inquiry.' },
      { q: 'Can I visit the store to inspect fabric quality?', a: 'Yes! Visit us at Shop 12, Mahalaxmi Complex, Chatrapati Chowk Road, Wakad.' }
    ]
  },
  'kids-daily-wear-pune': {
    slug: 'kids-daily-wear-pune',
    title: 'Kids Daily Wear in Pune | Kids City, Wakad',
    h1: 'Kids Daily Wear, T-Shirts & Shorts in Pune',
    metaTitle: 'Kids Daily Wear in Pune | Kids City, Wakad',
    metaDescription: 'Durable everyday kids clothing in Pune from ₹299. T-shirts, shorts & playwear sets. Visit Kids City Wakad or order on WhatsApp.',
    intro: 'Everyday playwear, t-shirts, shorts, and casual sets for boys and girls in Pune. Durable stitching and comfortable fabrics built for active children.',
    priceRange: 'Starting from ₹299 [Inquire for current collection pricing]',
    filterCategory: 'Casual',
    relatedCategories: ['boys-party-wear-pune', 'kids-night-suits-pune', 'baby-clothes-pune'],
    faqs: [
      { q: 'Are daily wear clothes machine washable?', a: 'Yes, daily wear cotton pieces are machine washable on regular gentle wash cycles.' },
      { q: 'What is the starting price for daily wear?', a: 'Daily wear sets start from ₹299.' },
      { q: 'Can I get delivery in PCMC and Pune?', a: 'Yes, delivery is available across Pune and PCMC upon inquiry.' },
      { q: 'Where can I see available daily wear designs?', a: 'Visit our Wakad boutique or message us on WhatsApp (+91 78916 72762).' }
    ]
  },
  'kids-accessories-pune': {
    slug: 'kids-accessories-pune',
    title: 'Kids Accessories in Pune | Kids City, Wakad',
    h1: 'Kids Accessories, Caps & Headbands in Pune',
    metaTitle: 'Kids Accessories in Pune | Kids City, Wakad',
    metaDescription: 'Children hair accessories, caps, socks & birthday tiaras in Pune. Visit Kids City Wakad or order on WhatsApp.',
    intro: 'Complete your child\'s outfit with matching accessories. Kids City carries bow headbands, festive hair accessories, caps, and socks for boys and girls.',
    priceRange: 'Starting from ₹99 [Inquire for current collection pricing]',
    filterCategory: 'Birthday',
    relatedCategories: ['girls-party-wear-pune', 'birthday-dresses-pune', 'kids-ethnic-wear-pune'],
    faqs: [
      { q: 'Do you carry birthday hairbands and tiaras?', a: 'Yes, we stock festive headbands, princess crowns, and hair clips.' },
      { q: 'Can accessories be added to clothing delivery orders?', a: 'Yes, accessories can be bundled into any clothing order dispatched to your address.' },
      { q: 'What accessories are available for boys?', a: 'Caps, bow ties, socks, and suspender sets.' },
      { q: 'How do I check available accessories?', a: 'WhatsApp us at +91 78916 72762 for live store photos.' }
    ]
  }
}

// 2. Areas Data (Wakad is confirmed physical store; other 7 are pending owner confirmation)
export const AREAS_DATA = {
  'kids-clothes-wakad': {
    slug: 'kids-clothes-wakad',
    areaName: 'Wakad',
    confirmed: true, // Physical store location (Verified)
    metaTitle: 'Kids Clothes in Wakad, Pune | Kids City Boutique',
    metaDescription: 'Kids clothing store in Wakad, Pune. Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Rd. Party wear, ethnic wear & night suits. Open daily.',
    h1: 'Kids Clothes in Wakad, Pune — Kids City Store',
    introText: 'Kids City is your neighborhood children\'s clothing store in Wakad, Pune. Established in 2018 at Mahalaxmi Complex on Chatrapati Chowk Road, we carry clothing for boys and girls from newborn to 14 years.',
    deliveryStatusText: 'In-Store Shopping & Local Wakad Delivery Available',
    landmarks: 'Mahalaxmi Complex, Chatrapati Chowk Road, Kaspate Wasti, Wakad (beside Annapurna Veg Restaurant)',
    detailsParagraph1: 'Conveniently located for Wakad residents living along Chatrapati Chowk Road, Kaspate Wasti, Datta Mandir Road, and Bhumkar Chowk. Our store offers a relaxed, air-conditioned environment where parents and children can comfortably try on outfits.',
    detailsParagraph2: 'Whether you need a festival lehenga, a 1st birthday frock, or comfortable cotton night suits, our store team provides personal sizing assistance. In-store shopping, instant takeaway, and local delivery are available.',
    faqs: [
      { q: 'Where exactly is Kids City located in Wakad?', a: 'We are at Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Road, Wakad, Pune 411057 (near Annapurna Veg Restaurant, Kaspate Wasti).' },
      { q: 'Are trial rooms available at the Wakad store?', a: 'Yes, we have trial facilities so children can try outfits for fit and comfort before purchase.' },
      { q: 'Can I order via WhatsApp for delivery in Wakad?', a: 'Yes! Message us on WhatsApp (+91 78916 72762) with your requirements and address.' },
      { q: 'What payment modes are accepted at the store?', a: 'UPI, Cash, Debit and Credit cards are accepted.' }
    ]
  },
  'kids-clothes-hinjewadi': {
    slug: 'kids-clothes-hinjewadi',
    areaName: 'Hinjewadi',
    confirmed: false, // [Pending Confirmation]
    metaTitle: 'Kids Clothes Delivery Hinjewadi, Pune | Kids City Wakad',
    metaDescription: 'Kids clothes delivery for Hinjewadi Phase 1, 2, 3 from Kids City Wakad. Festival wear, birthday frocks & night suits. Inquire on WhatsApp.',
    h1: 'Kids Clothes Delivery for Hinjewadi, Pune',
    introText: 'Serving IT professionals and families living across Hinjewadi Phase 1, Phase 2, and Phase 3 from our nearby boutique in Wakad. Inquire on WhatsApp for current delivery service.',
    deliveryStatusText: 'Delivery Status: Pending Confirmation (Inquire on WhatsApp)',
    landmarks: 'Located 3–4 km from Hinjewadi Shivaji Chowk via Wakad flyover',
    detailsParagraph1: 'Many Hinjewadi parents prefer Kids City for convenient shopping after work or on weekends due to our close proximity just off the Mumbai-Pune highway near Chatrapati Chowk.',
    detailsParagraph2: 'We help busy IT parents select kids outfits over WhatsApp by sending photos and size charts, with courier dispatch options to major Hinjewadi residential townships.',
    faqs: [
      { q: 'How far is Kids City Wakad from Hinjewadi?', a: 'Kids City is approximately 3 to 4 km from Hinjewadi Shivaji Chowk, just a 10-minute drive across the highway.' },
      { q: 'Do you deliver to Hinjewadi societies?', a: 'Delivery is available upon inquiry. Please message on WhatsApp (+91 78916 72762) with your society name.' },
      { q: 'Can I exchange sizes if I order for Hinjewadi?', a: 'Yes, size exchanges are supported for unworn items with original bill and tags.' },
      { q: 'What are your store hours if I want to visit from Hinjewadi?', a: 'Open daily. Please check on WhatsApp before visiting.' }
    ]
  },
  'kids-clothes-baner': {
    slug: 'kids-clothes-baner',
    areaName: 'Baner',
    confirmed: false, // [Pending Confirmation]
    metaTitle: 'Kids Clothes Delivery Baner, Pune | Kids City Wakad',
    metaDescription: 'Kids clothing for Baner parents from Kids City Wakad. Festive wear, birthday dresses & daily cotton clothes. Inquire on WhatsApp.',
    h1: 'Kids Clothes Delivery for Baner, Pune',
    introText: 'Convenient kids clothing shopping for families along Baner Road, Pan Card Club Road, and Baner-Pashan Link Road from our Wakad store.',
    deliveryStatusText: 'Delivery Status: Pending Confirmation (Inquire on WhatsApp)',
    landmarks: 'Around 5 km from Baner High Street via Western bypass',
    detailsParagraph1: 'Baner families can easily access Kids City Wakad via the highway service road or order via WhatsApp with courier delivery right to your apartment complex.',
    detailsParagraph2: 'Explore birthday dresses, traditional kurtas, and cotton sleepwear without the premium boutique markups commonly found in high-street malls.',
    faqs: [
      { q: 'How can Baner residents order from Kids City?', a: 'You can visit our store in Mahalaxmi Complex, Wakad, or message +91 78916 72762 on WhatsApp for home delivery.' },
      { q: 'What is the delivery time to Baner?', a: 'Timelines depend on courier schedule. Inquire on WhatsApp for dispatch confirmation.' },
      { q: 'Are trial facilities available?', a: 'Yes, trials are available at our Wakad store.' },
      { q: 'Do you stock birthday party dresses?', a: 'Yes, we have an extensive collection of birthday gowns and frocks.' }
    ]
  },
  'kids-clothes-balewadi': {
    slug: 'kids-clothes-balewadi',
    areaName: 'Balewadi',
    confirmed: false, // [Pending Confirmation]
    metaTitle: 'Kids Clothes Delivery Balewadi, Pune | Kids City Wakad',
    metaDescription: 'Kids clothing for Balewadi & Balewadi High Street from Kids City Wakad. Party wear, night suits & baby wear. Inquire on WhatsApp.',
    h1: 'Kids Clothes Delivery for Balewadi, Pune',
    introText: 'Located just across the highway from Balewadi, Kids City provides kids clothing for families living in Balewadi High Street, Cummins area, and surrounding societies.',
    deliveryStatusText: 'Delivery Status: Pending Confirmation (Inquire on WhatsApp)',
    landmarks: 'Just 4 km from Balewadi High Street and Sports Complex',
    detailsParagraph1: 'Balewadi is situated right next to Wakad. Parents can reach our Mahalaxmi Complex store in roughly 10 minutes for quick shopping or size trials.',
    detailsParagraph2: 'We offer baby wear, cotton sleepwear, and festive outfits with convenient WhatsApp selection for parents who need delivery.',
    faqs: [
      { q: 'How close is Kids City to Balewadi High Street?', a: 'It is approximately 4 km away, about a 10 to 12 minute drive.' },
      { q: 'Can I get home delivery in Balewadi?', a: 'Yes, delivery is available upon inquiry. WhatsApp us with your building name.' },
      { q: 'What sizes are in stock?', a: 'We carry sizes from infant newborn to 14 years.' },
      { q: 'Can I exchange an item in-store?', a: 'Yes, size exchanges are accepted at the Wakad store.' }
    ]
  },
  'kids-clothes-aundh': {
    slug: 'kids-clothes-aundh',
    areaName: 'Aundh',
    confirmed: false, // [Pending Confirmation]
    metaTitle: 'Kids Clothes Delivery Aundh, Pune | Kids City Wakad',
    metaDescription: 'Kids clothing delivery for Aundh, Pune from Kids City Wakad. Ethnic kurtas, party frocks & cotton night suits. Inquire on WhatsApp.',
    h1: 'Kids Clothes Delivery for Aundh, Pune',
    introText: 'Kids clothing options for Aundh, DP Road, and Parihar Chowk families from Kids City Wakad. Browse festive wear and night suits with WhatsApp support.',
    deliveryStatusText: 'Delivery Status: Pending Confirmation (Inquire on WhatsApp)',
    landmarks: 'Directly connected via Aundh-Wakad BRTS corridor (6–7 km)',
    detailsParagraph1: 'Aundh parents can take advantage of the direct BRTS corridor road straight to Chatrapati Chowk in Wakad, or opt for convenient courier home delivery.',
    detailsParagraph2: 'We provide affordable, quality kids wear from newborn to 14 years with clear sizing help and WhatsApp customer support.',
    faqs: [
      { q: 'Do you deliver to societies in Aundh?', a: 'Yes, courier delivery is available across Aundh upon inquiry.' },
      { q: 'How long does delivery take to Aundh?', a: 'Typically 24 to 48 hours depending on time of order and courier dispatch.' },
      { q: 'Can I visit the store from Aundh?', a: 'Yes! It is a 15-minute drive via the Aundh-Wakad road.' },
      { q: 'How do I pay for home delivery?', a: 'Payment options include UPI and online payment upon confirmation.' }
    ]
  },
  'kids-clothes-pimple-saudagar': {
    slug: 'kids-clothes-pimple-saudagar',
    areaName: 'Pimple Saudagar',
    confirmed: false, // [Pending Confirmation]
    metaTitle: 'Kids Clothes Delivery Pimple Saudagar | Kids City Wakad',
    metaDescription: 'Kids clothes in Pimple Saudagar & Rahatani from Kids City Wakad. Party wear, night suits & baby wear. Inquire on WhatsApp.',
    h1: 'Kids Clothes Delivery for Pimple Saudagar, Pune',
    introText: 'Directly neighboring Wakad, Kids City serves families across Pimple Saudagar, Kunal Icon Road, Linear Garden, and Rahatani.',
    deliveryStatusText: 'Delivery Status: Pending Confirmation (Inquire on WhatsApp)',
    landmarks: 'Less than 3 km from Linear Garden and Kunal Icon Road via Kaspate Wasti',
    detailsParagraph1: 'Because Pimple Saudagar borders Wakad, residents are only 5 to 7 minutes away from our physical store in Mahalaxmi Complex.',
    detailsParagraph2: 'Parents frequently visit for festival shopping, birthday dress trials, and cotton night suits, or arrange quick local delivery on WhatsApp.',
    faqs: [
      { q: 'How far is Kids City Wakad from Pimple Saudagar?', a: 'It is less than 3 km—about 6 to 8 minutes drive from Kunal Icon Road.' },
      { q: 'Do you deliver to societies in Pimple Saudagar?', a: 'Delivery is available upon inquiry. WhatsApp us at +91 78916 72762.' },
      { q: 'Can we try clothes at your store?', a: 'Yes! Our air-conditioned Wakad store has trial facilities.' },
      { q: 'What is your exchange policy?', a: 'Size exchanges are supported with receipt and tags intact.' }
    ]
  },
  'kids-clothes-ravet': {
    slug: 'kids-clothes-ravet',
    areaName: 'Ravet',
    confirmed: false, // [Pending Confirmation]
    metaTitle: 'Kids Clothes Delivery Ravet, PCMC | Kids City Wakad',
    metaDescription: 'Kids clothing for Ravet & Kiwale families from Kids City Wakad. Birthday frocks, traditional kurtas & cotton sets. Inquire on WhatsApp.',
    h1: 'Kids Clothes Delivery for Ravet, PCMC Pune',
    introText: 'Kids fashion and festive wear for families residing in Ravet, Kiwale, and Punawale along the PCMC BRTS corridor from Kids City Wakad.',
    deliveryStatusText: 'Delivery Status: Pending Confirmation (Inquire on WhatsApp)',
    landmarks: 'Connected via Aundh-Ravet BRTS corridor and Mukai Chowk',
    detailsParagraph1: 'Ravet and Punawale residents can easily access Kids City by taking the BRTS road towards Chatrapati Chowk Wakad.',
    detailsParagraph2: 'Browse our complete catalog on WhatsApp and request parcel delivery directly to your society gate.',
    faqs: [
      { q: 'Do you deliver kids clothes to Ravet?', a: 'Yes, courier delivery is available across Ravet upon inquiry.' },
      { q: 'Can I check sizing on WhatsApp before ordering?', a: 'Yes! Our team will share exact measurements and photos.' },
      { q: 'What are your store hours?', a: 'Open 7 days a week. Please verify today\'s hours on WhatsApp.' },
      { q: 'What age groups do you cater to?', a: 'Ages 0 to 14 years for boys and girls.' }
    ]
  },
  'kids-clothes-tathawade': {
    slug: 'kids-clothes-tathawade',
    areaName: 'Tathawade',
    confirmed: false, // [Pending Confirmation]
    metaTitle: 'Kids Clothes Delivery Tathawade, Pune | Kids City Wakad',
    metaDescription: 'Kids clothing for Tathawade & Punawale families from Kids City Wakad. Baby sets, festival wear & night suits. Inquire on WhatsApp.',
    h1: 'Kids Clothes Delivery for Tathawade, Pune',
    introText: 'Neighboring Wakad, Kids City provides children\'s wear for families living in Tathawade, Indira College area, and surrounding societies.',
    deliveryStatusText: 'Delivery Status: Pending Confirmation (Inquire on WhatsApp)',
    landmarks: 'Just 2.5 km from JSPM College and Tathawade Chowk',
    detailsParagraph1: 'Tathawade is located immediately adjacent to Wakad, making it a brief 5-minute drive to our physical store at Mahalaxmi Complex.',
    detailsParagraph2: 'Explore everyday cotton co-ords, newborn gifts, and party wear with in-store trial facilities or WhatsApp delivery support.',
    faqs: [
      { q: 'How close is Kids City to Tathawade?', a: 'We are right next door in Wakad—less than 3 km from Tathawade Chowk.' },
      { q: 'Can I get home delivery in Tathawade?', a: 'Delivery is available upon inquiry. Message us on WhatsApp (+91 78916 72762).' },
      { q: 'Are trials available for kids?', a: 'Yes, our Wakad store has trial facilities.' },
      { q: 'What categories of clothing do you carry?', a: 'Party wear, festival ethnic outfits, night suits, daily wear, and baby sets.' }
    ]
  }
}

// 3. Blog Posts Data (Factual, informative, zero unconfirmed promises)
export const BLOG_POSTS_DATA = {
  'best-diwali-dresses-kids-pune': {
    slug: 'best-diwali-dresses-kids-pune',
    title: 'Best Diwali Dresses for Kids in Pune: Boys & Girls Festive Wear Guide (2026)',
    metaTitle: 'Best Diwali Dresses for Kids in Pune (2026) | Kids City',
    metaDescription: 'Complete Pune guide to kids Diwali dresses: Chaniya cholis, kurtas & sherwanis. Sizing advice & Pune store info from Kids City.',
    h1: 'Best Diwali Dresses for Kids in Pune (2026 Festive Guide)',
    publishDate: '2026-10-10',
    modifiedDate: '2026-10-13',
    readTime: '6 min read',
    author: 'Kids City Pune Team',
    category: 'Festive Wear Guide',
    excerpt: 'Diwali falls in November. Discover traditional outfit trends for boys and girls in Pune, fabric comfort tips, and where to shop in Wakad.',
    featuredImage: '/images/festival_wear.webp'
  },
  'choose-1st-birthday-dress-baby-girl-boy': {
    slug: 'choose-1st-birthday-dress-baby-girl-boy',
    title: 'How to Choose the Perfect 1st Birthday Dress for Baby Girl or Boy in Pune',
    metaTitle: 'How to Choose 1st Birthday Dress for Baby in Pune | Kids City',
    metaDescription: 'Tips on choosing comfortable 1st birthday frocks & prince suits in Pune. Fabric comfort, photo colors & sizing advice from Kids City.',
    h1: 'How to Choose the Perfect 1st Birthday Dress for Baby in Pune',
    publishDate: '2026-10-08',
    modifiedDate: '2026-10-13',
    readTime: '5 min read',
    author: 'Kids City Pune Team',
    category: 'Birthday Guide',
    excerpt: 'Your baby\'s first birthday is a milestone. Learn how to pick an outfit that looks wonderful in photos while keeping your baby happy and comfortable.',
    featuredImage: '/images/birthday_dress.webp'
  },
  'kids-clothing-size-chart-india': {
    slug: 'kids-clothing-size-chart-india',
    title: 'Indian Kids Clothing Size Chart: Age, Height & Chest Guide for Parents',
    metaTitle: 'Indian Kids Clothing Size Chart (Age, Height & Chest) | Kids City',
    metaDescription: 'Indian kids size guide for ages 0–14 years. Easy measurement table for age, height in cm, and chest size from Kids City Pune.',
    h1: 'Indian Kids Clothing Size Chart: Age, Height & Chest Guide',
    publishDate: '2026-10-05',
    modifiedDate: '2026-10-13',
    readTime: '5 min read',
    author: 'Kids City Pune Team',
    category: 'Size & Fit Guide',
    excerpt: 'Find the right clothing size for your child with our Indian sizing reference table, covering ages 0 to 14 years with height and chest guidelines.',
    featuredImage: '/images/hero_girl.webp'
  },
  'kids-christmas-new-year-outfit-ideas': {
    slug: 'kids-christmas-new-year-outfit-ideas',
    title: 'Kids Christmas and New Year Party Outfits in Pune: Winter Trends 2026',
    metaTitle: 'Kids Christmas & New Year Party Outfits in Pune | Kids City',
    metaDescription: 'Kids Christmas & New Year party outfits in Pune: Warm winter frocks, jackets & celebration dresses at Kids City Wakad.',
    h1: 'Kids Christmas & New Year Outfit Ideas in Pune (2026 Trends)',
    publishDate: '2026-10-02',
    modifiedDate: '2026-10-13',
    readTime: '5 min read',
    author: 'Kids City Pune Team',
    category: 'Winter & Holiday Trends',
    excerpt: 'Get your children ready for winter gatherings, Christmas programs, and New Year celebrations with comfortable, warm festive wear.',
    featuredImage: '/images/casual_boys.webp'
  },
  'kids-wedding-season-outfits-pune': {
    slug: 'kids-wedding-season-outfits-pune',
    title: 'Kids Wedding-Season Outfit Ideas: Sherwanis, Lehengas & Gowns for Pune Celebrations',
    metaTitle: 'Kids Wedding Season Outfits in Pune (Nov–Feb) | Kids City',
    metaDescription: 'Kids wedding outfits in Pune: Boys sherwanis, girls lehengas & party gowns. Comfortable ethnic styles from Kids City Wakad.',
    h1: 'Kids Wedding-Season Outfits in Pune (Nov–Feb Guide)',
    publishDate: '2026-09-28',
    modifiedDate: '2026-10-13',
    readTime: '6 min read',
    author: 'Kids City Pune Team',
    category: 'Wedding Fashion',
    excerpt: 'From sangeet nights to family wedding receptions, explore how to dress kids in traditional wear that looks regal while staying comfortable.',
    featuredImage: '/images/festival_wear.webp'
  }
}
