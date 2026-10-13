/**
 * Kids City — Master Store Configuration
 * Single source of truth for store details, hours, delivery rules, policies, and contacts.
 * 
 * Edit values here to update the entire website, schema, and pre-rendered pages.
 * Any value marked with [TODO - confirm] requires confirmation from the business owner.
 */

export const storeConfig = {
  // === 1. Business Identity (Verified) ===
  storeName: 'Kids City',
  legalName: 'Kids City',
  tagline: 'Clothes for Little Explorers',
  foundedYear: '2018',
  ageRange: 'Ages 0–14 years (Boys & Girls)',
  
  // === 2. Contact & Location (Verified) ===
  phone: '+91 78916 72762',
  phoneRaw: '917891672762',
  whatsappNumber: '+91 78916 72762',
  whatsappRaw: '917891672762',
  email: 'kidscitywakad@gmail.com', // [TODO - confirm if this is the active email]
  
  address: {
    shopNumber: 'Shop No 12',
    complex: 'Mahalaxmi Complex',
    street: 'Chatrapati Chowk Road',
    locality: 'Wakad',
    city: 'Pune',
    state: 'Maharashtra',
    postalCode: '411057',
    country: 'IN',
    fullFormatted: 'Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Road, Wakad, Pune 411057, Maharashtra, India',
    geo: {
      latitude: 18.5980911,
      longitude: 73.7744639
    },
    googleMapsUrl: 'https://maps.google.com/?cid=123456789' // [TODO - confirm exact Google Maps CID or Place URL]
  },

  // === 3. Social & Channels (Verified) ===
  social: {
    instagramHandle: '@kidscity____',
    instagramUrl: 'https://instagram.com/kidscity____',
    reelsPerDay: 2
  },

  // === 4. Google Business Profile & Ratings (Verified) ===
  rating: {
    score: 4.9,
    reviewCount: 141,
    verifiedGbp: true,
    displayNotice: '4.9★ on Google (141 reviews) | Since 2018 | Wakad, Pune'
  },

  // === 5. Opening Hours ===
  openingHours: {
    confirmed: false, // Set to true once confirmed by owner
    display: 'Open every day [TODO - confirm exact daily opening & closing hours]',
    days: 'Monday to Sunday',
    opens: '10:00', // [TODO - confirm]
    closes: '21:30', // [TODO - confirm]
    note: 'Store hours pending confirmation. Please WhatsApp or call before visiting.'
  },

  // === 6. Delivery Promise & Charges ===
  delivery: {
    confirmed: false, // Set to true once courier, charges and delivery times are confirmed
    displaySummary: 'Delivery available in Wakad, PCMC & across Pune [TODO - confirm delivery charges & timelines]',
    wakadTimeline: '[TODO - confirm delivery time for Wakad/PCMC]',
    puneTimeline: '[TODO - confirm delivery time across wider Pune]',
    charges: '[TODO - confirm delivery charge threshold, e.g. Free above ₹X]',
    courierPartners: '[TODO - confirm courier partner, e.g. Dunzo / Porter / Local Courier]',
    doorstepTrial: false // [TODO - confirm if multi-size doorstep trial is offered]
  },

  // === 7. Policies ===
  policies: {
    returnExchange: {
      confirmed: false,
      display: 'Easy size exchange available [TODO - confirm exact exchange days and conditions]',
      days: 7, // [TODO - confirm]
      condition: 'With original tags and purchase receipt'
    },
    paymentMethods: {
      confirmed: false,
      display: 'UPI, Cash & Cards accepted [TODO - confirm accepted payment methods]'
    }
  },

  // === 8. Delivery Areas Served ===
  // Only areas confirmed by the business owner are active for public indexed landing pages.
  areas: {
    confirmed: [
      {
        slug: 'kids-clothes-wakad',
        name: 'Wakad',
        isPhysicalStore: true,
        confirmedServed: true,
        notes: 'Physical store located at Shop 12, Mahalaxmi Complex, Chatrapati Chowk Road'
      }
    ],
    pendingConfirmation: [
      { slug: 'kids-clothes-hinjewadi', name: 'Hinjewadi', confirmedServed: false },
      { slug: 'kids-clothes-baner', name: 'Baner', confirmedServed: false },
      { slug: 'kids-clothes-balewadi', name: 'Balewadi', confirmedServed: false },
      { slug: 'kids-clothes-aundh', name: 'Aundh', confirmedServed: false },
      { slug: 'kids-clothes-pimple-saudagar', name: 'Pimple Saudagar', confirmedServed: false },
      { slug: 'kids-clothes-ravet', name: 'Ravet', confirmedServed: false },
      { slug: 'kids-clothes-tathawade', name: 'Tathawade', confirmedServed: false }
    ]
  },

  // === 9. Real Customer Reviews ===
  // Rule: ZERO invented reviews. Only paste genuine reviews from Google Business Profile here.
  realReviews: [
    // Leave empty until owner pastes genuine reviews.
    // Example format:
    // {
    //   author: 'Parent Name',
    //   rating: 5,
    //   relativeTime: '2 months ago',
    //   text: 'Exact review text copied from Google Business Profile.'
    // }
  ]
}
