import styles from './PolicyView.module.css'
import { ArrowLeft } from 'lucide-react'

const POLICIES = {
  'privacy-policy': {
    title: 'Privacy Policy',
    lastUpdated: '10 July 2026',
    sections: [
      {
        heading: 'Introduction',
        content: 'Kids City ("we", "our", "us") operates the website kidscity.online. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or contact our store in Wakad, Pune, Maharashtra.'
      },
      {
        heading: 'Information We Collect',
        content: 'We may collect: (1) Contact information such as name, phone number, or WhatsApp number when you submit our inquiry form or contact us directly. (2) Usage data such as pages visited, browser type, and device type through standard web analytics. (3) Location data only when you use our store direction feature.'
      },
      {
        heading: 'How We Use Your Information',
        content: 'We use the collected information to: respond to your inquiries about kids clothing, sizes, or stock; send you information about promotions and new collections at Kids City Wakad; improve our website and in-store services; and comply with legal obligations as required under Indian law.'
      },
      {
        heading: 'Data Security',
        content: 'We take reasonable measures to protect your personal information from unauthorized access or disclosure. We do not sell, trade, or transfer your personal information to third parties without your consent, except as required by law.'
      },
      {
        heading: 'Cookies',
        content: 'Our website may use cookies to enhance your browsing experience and analyze site traffic. You can disable cookies in your browser settings, though this may affect some website functionality.'
      },
      {
        heading: 'Contact Us',
        content: 'If you have questions about this Privacy Policy, please contact us at kidscitywakad@gmail.com or WhatsApp us at +91 78916 72762. You can also visit us at Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Road, Wakad, Pune, Maharashtra 411057.'
      },
    ]
  },
  'terms': {
    title: 'Terms & Conditions',
    lastUpdated: '10 July 2026',
    sections: [
      {
        heading: 'Acceptance of Terms',
        content: 'By visiting kidscity.online or our physical store at Shop No 12, Mahalaxmi Complex, Wakad, Pune, you agree to be bound by these Terms and Conditions. Please read them carefully before using our website or services.'
      },
      {
        heading: 'Products & Pricing',
        content: 'All prices displayed on our website are in Indian Rupees (₹) and are inclusive of applicable taxes. Prices are subject to change without prior notice. Kids City reserves the right to limit quantities or refuse orders in certain circumstances.'
      },
      {
        heading: 'In-Store Purchases',
        content: 'All in-store purchases at our Wakad store are final. Exchanges are permitted within 7 days of purchase for size-related issues, subject to stock availability. The original bill and intact tags must be presented for all exchanges.'
      },
      {
        heading: 'Website Use',
        content: 'You may use kidscity.online only for lawful purposes and in accordance with these Terms. You agree not to use the website in any way that could damage, disable, or impair the website, or interfere with any other user\'s use of the website.'
      },
      {
        heading: 'Intellectual Property',
        content: 'All content on kidscity.online, including text, graphics, logos, images, and software, is the property of Kids City and protected by Indian copyright law. You may not reproduce, distribute, or create derivative works without explicit written permission.'
      },
      {
        heading: 'Limitation of Liability',
        content: 'Kids City shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of the website or our products, except as required under applicable Indian consumer protection law.'
      },
      {
        heading: 'Governing Law',
        content: 'These Terms shall be governed by and construed in accordance with the laws of India, with disputes subject to the jurisdiction of courts in Pune, Maharashtra.'
      },
    ]
  },
  'shipping-policy': {
    title: 'Shipping Policy',
    lastUpdated: '10 July 2026',
    sections: [
      {
        heading: 'Local Delivery — Wakad & Hinjewadi',
        content: 'Kids City offers same-day or next-day local home delivery for orders from Wakad, Hinjewadi, and Baner. Delivery charges may apply depending on distance. Please WhatsApp us at +91 78916 72762 to arrange local delivery.'
      },
      {
        heading: 'Pune & Pimpri-Chinchwad Delivery',
        content: 'For orders within Pune and Pimpri-Chinchwad (including Balewadi, Pimple Saudagar, Ravet, Tathawade, Aundh, and Pimpri), we coordinate shipping via trusted local courier services. Estimated delivery time: 1–3 business days.'
      },
      {
        heading: 'Pan-India Shipping',
        content: 'We ship kids clothing across India via reputed courier partners (DTDC, Delhivery, etc.). Shipping charges are calculated based on product weight and delivery pincode. Estimated delivery: 4–7 business days.'
      },
      {
        heading: 'Order Confirmation',
        content: 'After placing an order via WhatsApp or our inquiry form, our team will confirm availability, sizes, and total amount (including shipping) within a few hours. Payment must be made before dispatch via UPI, bank transfer, or cash on delivery (selected pincodes).'
      },
      {
        heading: 'Delivery Delays',
        content: 'Delivery timelines may be affected by public holidays, festivals, or unforeseen circumstances. Kids City is not responsible for delays caused by courier companies once the order is dispatched. We will keep you updated via WhatsApp.'
      },
    ]
  },
  'return-policy': {
    title: 'Return & Exchange Policy',
    lastUpdated: '10 July 2026',
    sections: [
      {
        heading: 'Size Exchange Policy',
        content: 'If the size of a garment purchased at Kids City Wakad does not fit your child, you may exchange it for a different size within 7 days of purchase. The item must be unused, unwashed, and have all original tags intact. Please bring the original purchase bill.'
      },
      {
        heading: 'Eligible Items for Exchange',
        content: 'All regular-priced items purchased at our Wakad store are eligible for size exchanges. Sale items, festival-season special purchases, and custom-ordered items are not eligible for returns or exchanges unless there is a manufacturing defect.'
      },
      {
        heading: 'Defective or Damaged Items',
        content: 'If you receive a defective or damaged item, please contact us within 48 hours of purchase via WhatsApp at +91 78916 72762 with photos of the defect. We will arrange an exchange or store credit at our discretion.'
      },
      {
        heading: 'How to Initiate an Exchange',
        content: 'Step 1: WhatsApp us at +91 78916 72762 with your purchase details and reason for exchange. Step 2: Our team will confirm eligibility and advise the next steps. Step 3: Visit our Wakad store with the item and original bill for the in-store exchange.'
      },
      {
        heading: 'Refund Policy',
        content: 'Kids City does not offer cash refunds on in-store purchases. In exceptional cases (approved at management discretion), store credit may be issued. For online-coordinated orders with delivery, refunds are considered on a case-by-case basis.'
      },
      {
        heading: 'Contact for Returns',
        content: 'For any return or exchange queries, WhatsApp us at +91 78916 72762 or email kidscitywakad@gmail.com. You can also visit our store at Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Road, Wakad, Pune 411057.'
      },
    ]
  },
}

export default function PolicyView({ policyKey, onViewChange }) {
  const policy = POLICIES[policyKey] || POLICIES['privacy-policy']

  const handleBack = (e) => {
    e.preventDefault()
    onViewChange('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={styles.policyPage}>
      <div className={styles.banner}>
        <div className="container">
          <button onClick={handleBack} className={styles.backBtn} aria-label="Go back">
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className={styles.title}>{policy.title}</h1>
          <p className={styles.lastUpdated}>Last updated: {policy.lastUpdated}</p>
        </div>
      </div>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.contentGrid}>
            <article className={styles.article}>
              <p className={styles.intro}>
                This page outlines our {policy.title.toLowerCase()} for Kids City, Wakad's most trusted children's clothing store located at Mahalaxmi Complex, Chatrapati Chowk Road, Wakad, Pune, Maharashtra 411057.
              </p>

              {policy.sections.map((section, i) => (
                <div key={i} className={styles.policySection}>
                  <h2 className={styles.sectionHeading}>{section.heading}</h2>
                  <p className={styles.sectionContent}>{section.content}</p>
                </div>
              ))}

              <div className={styles.contactBox}>
                <h3>Need Help? Contact Kids City Wakad</h3>
                <p>📍 Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Road, Wakad, Pune 411057</p>
                <p>📞 <a href="tel:+917891672762">+91 78916 72762</a></p>
                <p>✉️ <a href="mailto:kidscitywakad@gmail.com">kidscitywakad@gmail.com</a></p>
                <p>🕙 Open Daily: 10:00 AM – 9:30 PM</p>
              </div>
            </article>

            <aside className={styles.toc}>
              <div className={styles.tocCard}>
                <h3 className={styles.tocTitle}>On This Page</h3>
                <ul className={styles.tocList}>
                  {policy.sections.map((section, i) => (
                    <li key={i}><a href={`#section-${i}`} className={styles.tocLink}>{section.heading}</a></li>
                  ))}
                </ul>
              </div>
              <div className={styles.tocCard} style={{ marginTop: 16 }}>
                <h3 className={styles.tocTitle}>Other Policies</h3>
                <ul className={styles.tocList}>
                  {Object.entries(POLICIES).filter(([k]) => k !== policyKey).map(([k, p]) => (
                    <li key={k}>
                      <a
                        href={`/${k}`}
                        className={styles.tocLink}
                        onClick={(e) => { e.preventDefault(); onViewChange(k); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                      >
                        {p.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
