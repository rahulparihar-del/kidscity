/**
 * Kids City — Master Store Configuration
 * Single source of truth for store details, hours, delivery rules, policies, and contacts.
 */

const isDev = Boolean(
  (typeof import.meta !== 'undefined' && import.meta.env?.DEV) ||
  (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development')
)

export const storeConfig = {
  // === 1. Business Identity (Verified) ===
  storeName: 'Kids City',
  legalName: 'Kids City',
  tagline: 'Clothes for Little Explorers',
  foundedYear: '2018',
  ageRange: 'Ages 0–15 (Boys & Girls)',
  ageSpan: '0–15 years',
  
  // === 2. Contact & Location (Verified) ===
  phone: '+91 78916 72762',
  phoneRaw: '917891672762',
  whatsappNumber: '+91 78916 72762',
  whatsappRaw: '917891672762',
  email: 'kidscitywakad@gmail.com',
  
  address: {
    shopNumber: 'Shop No 12',
    complex: 'Mahalaxmi Complex',
    street: 'Chatrapati Chowk Road',
    neighbourhood: 'Wakad',
    city: 'Pune',
    state: 'Maharashtra',
    postalCode: '411057',
    country: 'IN',
    fullFormatted: 'Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Road, Wakad, Pune 411057, Maharashtra, India',
    // Geo coordinates pending confirmation from owner (do not invent)
    geo: {
      confirmed: false,
      latitude: null,
      longitude: null
    },
    googleMapsUrl: 'https://www.google.com/maps/dir//Kids+City+Wakad'
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
    displayNotice: '4.9★ on Google (141 reviews) · Since 2018 · Wakad, Pune'
  },

  // === 5. Opening Hours (Pending Confirmation) ===
  openingHours: {
    confirmed: false,
    display: isDev 
      ? 'Open every day [TODO - confirm exact daily opening & closing hours]'
      : 'Open every day. Message or call on WhatsApp to confirm today\'s hours.',
    opens: null,
    closes: null
  },

  // === 6. Delivery Promise (Confirmed Wording) ===
  delivery: {
    confirmed: false,
    displaySummary: 'Delivery in Wakad and nearby areas. Message us on WhatsApp with your pincode to confirm.',
    charges: null,
    courierPartners: null
  },

  // === 7. Policies ===
  policies: {
    returnExchange: {
      confirmed: false,
      display: 'Size exchange available for unworn items with bill and tags intact. Contact store on WhatsApp for assistance.',
      days: null
    },
    paymentMethods: {
      confirmed: false,
      display: 'UPI, Cash and Cards accepted at store.'
    }
  },

  // === 8. Delivery Areas ===
  // Only Wakad is confirmed until owner confirms others.
  areas: {
    confirmed: [
      {
        slug: 'kids-clothes-wakad',
        name: 'Wakad',
        isPhysicalStore: true,
        confirmedServed: true,
        notes: 'Physical boutique located at Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Road'
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

  // === 9. Real Customer Reviews (Zero invented text) ===
  realReviews: []
}
