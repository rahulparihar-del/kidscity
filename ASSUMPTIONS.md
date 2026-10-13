# ASSUMPTIONS.md — Audit of Unconfirmed Information on Kids City

This document transparently audits every instance across the website codebase, metadata, structured data (schema), sitemap, blog posts, and marketing templates where information was assumed or estimated beyond the explicit facts provided by the business owner.

---

## 1. Summary of Business Facts (Confirmed vs Unconfirmed)

| Data Point | Status | Confirmed Fact / Value |
|---|---|---|
| **Business Name** | ✅ Verified | `Kids City` (strictly "Kids City") |
| **Store Address** | ✅ Verified | `Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Road, Wakad, Pune 411057, Maharashtra, India` |
| **Phone / WhatsApp** | ✅ Verified | `+91 78916 72762` |
| **Established Since** | ✅ Verified | `2018` |
| **Google Business Profile** | ✅ Verified | `4.9 rating, 141 reviews` |
| **Instagram Account** | ✅ Verified | `@kidscity____` (2 reels per day) |
| **Age Group & Offerings** | ✅ Verified | Ages 0–14 years, boys & girls: festive wear, birthday dresses, night suits, daily wear |
| **Opening Hours** | ⚠️ Unconfirmed | User provided `[FILL IN]. Open every day.` |
| **Delivery Charges & Timelines**| ⚠️ Unconfirmed | User provided `[FILL IN: areas, charges, delivery time, courier].` |
| **Courier Partners** | ⚠️ Unconfirmed | Not provided |
| **Return / Exchange Policy** | ⚠️ Unconfirmed | User provided `[FILL IN].` |
| **Payment Methods** | ⚠️ Unconfirmed | User provided `[FILL IN].` |
| **Owner / Founder Name** | ⚠️ Unconfirmed | Not provided (derived from workspace user name) |
| **Product Inventory & Prices** | ⚠️ Unconfirmed | Product photos were in repo, but prices/sizes/stock were placeholder |
| **Specific Delivery Localities**| ⚠️ Unconfirmed | Only Wakad is confirmed physical store location |

---

## 2. Exhaustive Audit by Category

### A. Opening Hours
- **What Was Assumed:** `10:00 AM – 9:30 PM`, open all 7 days a week (Monday to Sunday).
- **Where It Appeared:**
  - `index.html`: lines 150–156 (`OpeningHoursSpecification` schema: `Mo-Su 10:00-21:30`).
  - `src/components/AboutView.jsx`: "Open every day: 10:00 AM – 9:30 PM".
  - `src/components/ContactView.jsx`: Store hours section.
  - `scripts/prerender.js`: LocalBusiness schema.
- **Remediation Action:**
  - Moved hours into `src/config/storeConfig.js` with `confirmed: false` and notice: `"Open every day [TODO - confirm exact daily opening & closing hours]"`.
  - Removed `openingHoursSpecification` from JSON-LD schema until confirmed by owner.

---

### B. Delivery Charges, Timelines & Courier Partners
- **What Was Assumed:**
  - "Same-day express delivery across Wakad/PCMC, 24-hour delivery across Pune."
  - "Zone 1: Express 30–60 mins (Wakad, Hinjewadi, Baner, Balewadi), Free above ₹999 or ₹50 flat."
  - "Zone 2: PCMC / Western Pune (Aundh, Ravet), Flat ₹60."
  - "Zone 3: Central / Eastern Pune (Kothrud, Viman Nagar), Flat ₹70."
  - Specific courier names: Dunzo, Porter, Borzo, Shiprocket.
  - "Doorstep size trial service in Wakad."
- **Where It Appeared:**
  - `src/components/DeliveryHubView.jsx`: `AREA_ZONES` array and FAQ answers.
  - `src/components/AreaView.jsx`: `deliveryTime` strings (e.g., "25–40 mins express delivery to Pimple Saudagar").
  - `src/components/CategoryView.jsx`: Delivery FAQ answers ("same-day delivery in Pune").
  - `src/components/HeroBanner.jsx`: Trust bar ("Delivery in Pune · Same-day Wakad").
  - `src/data/products.js`: Product specifications (`Delivery: Same-day Wakad · 24h Pune`).
- **Remediation Action:**
  - Purged all unconfirmed same-day claims, courier brand names, and synthetic fee schedules.
  - Consolidated delivery settings into `storeConfig.js` under `delivery`.
  - Website and FAQ now consistently state: *"Delivery available across Pune & PCMC. Message on WhatsApp (+91 78916 72762) with your pincode to confirm current delivery timeline and charges."*

---

### C. Owner / Founder Name & Background
- **What Was Assumed:** Attributed store founder name as "Rahul Parihar" and referenced personal founder stories.
- **Where It Appeared:**
  - Git author commits and proposed About Us bio.
  - Social media bio templates.
- **Remediation Action:**
  - Isolated owner name in `storeConfig.js` with `confirmed: false, name: "[TODO - confirm owner name]"`.
  - Removed personal founder quotes until the store owner provides their preferred public name and story.

---

### D. Product Names, Prices, Sizes, Stock & Fabric Claims
- **What Was Assumed:**
  - Prices: ₹299, ₹399, ₹449, ₹549, ₹649, ₹699, ₹749, ₹899, ₹1,299.
  - Fabric / Quality Claims: "100% combed cotton", "hypoallergenic", "pure Banarasi art silk", "handcrafted mirror work", "skin-safe voile lining", "non-pinching elastic", "fade-resistant pigment print".
  - Sizes: `0-2y, 2-4y, 4-6y, 6-8y, 8-10y, 10-12y, 12-14y`.
  - Stock: All items marked `InStock` in schema.
- **Where It Appeared:**
  - `src/data/products.js`: `PRODUCTS` array (25 products).
  - `src/components/ShopView.jsx`: Hardcoded `PRODUCTS` array.
  - `src/components/FeaturedProducts.jsx`: Product cards.
  - `scripts/prerender.js`: `Product` + `Offer` schemas.
- **Remediation Action:**
  - Created `products.csv` as the single source of truth for inventory.
  - Set all sample products to `is_published: false` with placeholders `TODO_CONFIRM` for price, fabric, and stock per size.
  - Product pages are **strictly built only from confirmed rows** where `is_published=true`.
  - Unconfirmed products are **not indexed, not in sitemap.xml, and not in schema**.

---

### E. Customer Review Text
- **What Was Assumed:** 6 synthetic customer review quotes ("Pooja Kulkarni", "Amitabh Sen", "Sneha Deshmukh", "Rohan Patil", "Meera Iyer", "Vikas Joshi") praising specific items and delivery times.
- **Where It Appeared:**
  - `src/components/ReviewsView.jsx`: `REVIEWS` array.
- **Remediation Action:**
  - Completely erased all synthetic review text.
  - `ReviewsView.jsx` now presents the verified fact: **4.9★ on Google (141 reviews)** with a direct link to the Google Business Profile, plus an empty array `storeConfig.realReviews` where only real reviews pasted by the owner will render.

---

### F. Local Landmarks & Area Pages
- **What Was Assumed:** Specific landmarks and distances for 7 surrounding areas:
  - Hinjewadi: "Shivaji Chowk, Phase 1 & 2 IT parks".
  - Baner: "High Street, Pan Card Club Road".
  - Balewadi: "Balewadi High Street, Sports Complex".
  - Aundh: "DP Road, Westend Mall, Parihar Chowk".
  - Pimple Saudagar: "Linear Garden, Kunal Icon Road, Govind Garden Chowk".
  - Ravet: "Aundh-Ravet BRTS, Bhakti Shakti Chowk, Celestial City".
  - Tathawade: "JSPM College, Indira Institute, Dange Chowk".
- **Where It Appeared:**
  - `src/data/products.js`: `AREAS_DATA` object.
  - `src/components/AreaView.jsx`.
- **Remediation Action:**
  - Wakad is confirmed as the physical store location.
  - The other 7 areas are marked `confirmed: false` in `storeConfig.js`.
  - In `prerender.js`, unconfirmed area pages are **excluded from sitemap.xml** and marked with `<meta name="robots" content="noindex, nofollow" />`.
  - Each area's text was rewritten to ensure under 30% text overlap and display a clear notice: *"Delivery to this locality is pending confirmation."*

---

### G. Search-Volume Numbers
- **What Was Assumed:** Monthly Pune search volume numbers (e.g., 1,600 for "kids clothes pune", 1,000 for "kids clothing store pune", 1,300 for "kids diwali dress pune").
- **Where It Appeared:**
  - Phase 10 measurement table in audit report.
- **Remediation Action:**
  - Labeled all search volume numbers as: **"Unverified model estimates (requires Google Keyword Planner / GSC verification)"**.

---

### H. Off-Site Listings & Social Templates
- **What Was Assumed:**
  - Recommended IndiaMART as a retail directory citation (IndiaMART is B2B/wholesale).
  - Used 11 hashtags on Instagram templates.
  - Missing sponsorship disclosure on influencer barter pitch.
- **Remediation Action:**
  - Removed IndiaMART from the citation matrix.
  - Reduced Instagram hashtags from 11 to 5 focused tags.
  - Added `#gifted / #ad` disclosure to influencer pitch template in compliance with ASCI guidelines.

---

### I. Business Schema Type
- **What Was Assumed:** `@type: ["Organization", "LocalBusiness", "ClothingStore"]` with placeholder opening hours.
- **Where It Appeared:**
  - `index.html` lines 114–178.
  - `scripts/prerender.js`.
- **Remediation Action:**
  - Changed schema strictly to `@type: "ClothingStore"`.
  - Matched address character-for-character with Google Business Profile.
  - Removed unconfirmed `openingHoursSpecification` until confirmed by owner.
