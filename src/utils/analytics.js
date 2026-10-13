/**
 * GA4 Event Tracking Helper for Kids City
 * Sends standard conversion events to Google Analytics
 */
export function trackEvent(eventName, params = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, {
        send_to: 'G-XXXXXXXXXX',
        ...params,
      })
    }
    // Also dispatch custom DOM event for debugging / external listeners
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('kc_analytics', { detail: { eventName, params } }))
    }
  } catch (err) {
    console.debug('[Analytics] Failed to track event:', eventName, err)
  }
}

export function trackWhatsAppClick(label, product = null, pageUrl = '') {
  trackEvent('whatsapp_click', {
    event_category: 'Conversion',
    event_label: label || 'WhatsApp Order Button',
    product_name: product?.name || 'General Inquiry',
    product_id: product?.id || null,
    price: product?.priceVal || null,
    page_url: pageUrl || (typeof window !== 'undefined' ? window.location.href : ''),
  })
}

export function trackCallClick(source = 'Header') {
  trackEvent('call_click', {
    event_category: 'Conversion',
    event_label: `Phone Call (${source})`,
    phone_number: '+91 78916 72762',
  })
}

export function trackDirectionsClick(source = 'Footer') {
  trackEvent('directions_click', {
    event_category: 'Conversion',
    event_label: `Store Directions (${source})`,
    store_location: 'Mahalaxmi Complex, Wakad, Pune',
  })
}

export function trackProductView(product) {
  if (!product) return
  trackEvent('product_view', {
    event_category: 'Ecommerce',
    product_id: product.id,
    product_name: product.name,
    category: product.category,
    price: product.priceVal || null,
    currency: 'INR',
  })
}

export function trackAddToBag(product, size = '') {
  if (!product) return
  trackEvent('add_to_cart', {
    event_category: 'Ecommerce',
    product_id: product.id,
    product_name: product.name,
    category: product.category,
    size: size,
    price: product.priceVal || null,
    currency: 'INR',
  })
}
