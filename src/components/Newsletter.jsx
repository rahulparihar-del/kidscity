import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Navigation, MessageCircle } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

const CONTACT = [
  {
    icon: MapPin,
    label: 'Our Store',
    value: 'Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Rd, Wakad, Pune 411057',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91 78916 72762',
    href: 'tel:+917891672762',
  },
  {
    icon: Clock,
    label: 'Store Hours',
    value: 'Open Daily — Come Anytime!',
  },
]

export default function Newsletter() {
  return (
    <section id="contact" className="py-[88px] max-[900px]:py-16 max-[480px]:py-14 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[460px] h-[460px] rounded-full bg-white top-[-180px] right-[6%]" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-[rgba(245,166,35,0.07)] bottom-[-120px] left-[3%]" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-[560px] mx-auto mb-11 max-[900px]:mb-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <span className="inline-block text-[0.72rem] font-extrabold tracking-[2.5px] uppercase text-brand-orange mb-3">
            Visit Us
          </span>
          <h2 className="font-[family-name:var(--font-head)] font-extrabold tracking-[-0.02em] text-[clamp(1.9rem,3vw,2.5rem)] text-brand-navy leading-[1.18] mb-3.5">
            Come Say Hello in <span className="serif-accent">Wakad</span>
          </h2>
          <p className="text-[0.98rem] text-text-mid leading-[1.7] font-medium">
            Drop by the store, message us on WhatsApp, or give us a call. We are always happy to help you find the perfect outfit.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          className="grid grid-cols-[1.05fr_1fr] max-[900px]:grid-cols-1 rounded-[24px] overflow-hidden border border-border shadow-[0_20px_50px_rgba(61,64,91,0.12)]"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left: map */}
          <div className="relative min-h-full max-[900px]:min-h-[300px]">
            <iframe
              className="block w-full h-full min-h-[440px] max-[900px]:min-h-[300px] border-none"
              src="https://maps.google.com/maps?q=18.5980911,73.7744639&z=16&output=embed"
              title="Kids City Wakad location"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* "Open Now" badge */}
            <div className="absolute top-[18px] left-[18px] inline-flex items-center gap-2 bg-[rgba(10,22,40,0.9)] backdrop-blur-sm text-white text-[0.78rem] font-extrabold tracking-[0.3px] px-3.5 py-2 rounded-full border border-white/10">
              <span
                className="w-2 h-2 rounded-full bg-[#34d399]"
                style={{ boxShadow: '0 0 0 0 rgba(52,211,153,0.6)', animation: 'pulse 2s infinite' }}
              />
              Open Now
            </div>
          </div>

          {/* Right: details */}
          <div className="p-11 max-[900px]:p-6 flex flex-col justify-center gap-7 bg-white border-l max-[900px]:border-l-0 max-[900px]:border-t border-border">
            <motion.ul
              className="list-none m-0 p-0 flex flex-col gap-[22px]"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {CONTACT.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.li key={item.label} className="flex items-start gap-4 max-[480px]:gap-3" custom={i} variants={fadeUp}>
                    <span className="w-11 h-11 max-[480px]:w-10 max-[480px]:h-10 shrink-0 rounded-[12px] flex items-center justify-center text-brand-orange bg-[rgba(245,166,35,0.12)] border border-[rgba(245,166,35,0.2)]">
                      <Icon size={18} strokeWidth={2.2} />
                    </span>
                    <div>
                      <p className="text-[0.74rem] font-extrabold tracking-[1px] uppercase text-text-muted mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a className="text-[0.95rem] font-semibold text-brand-navy leading-[1.5] no-underline hover:text-brand-orange" href={item.href}>
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-[0.95rem] font-semibold text-brand-navy leading-[1.5]">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </motion.li>
                )
              })}
            </motion.ul>

            <div className="flex flex-wrap max-[480px]:flex-col gap-3">
              <a
                href="https://www.google.com/maps/dir//Kids+City+-+Best+Kids+Clothes+Shop+In+Wakad+(Pune)+%7C%7C+Best+Festival+Dress+%7C%7C+Traditional+Dress+Collection,+Shop+No+12,+Mahalaxmi+Complex,+Chatrapati+Chowk+Rd,+beside+Annapurna+veg+restaurant,+Kaspate+Wasti,+Wakad,+Pimpri-Chinchwad,+Maharashtra+411057/@18.6040405,73.7830858,15z"
                className="btn btn-gold"
              >
                <Navigation size={16} strokeWidth={2.4} />
                Get Directions
              </a>
              <a
                href="https://wa.me/917891672762?text=Hi%20Kids%20City!%20I%20saw%20your%20ad%20and%20want%20to%20visit%20your%20store.%20Can%20you%20share%20details%3F"
                className="btn btn-wa"
              >
                <MessageCircle size={16} strokeWidth={2.4} />
                WhatsApp Us
              </a>
              <a href="tel:+917891672762" className="btn btn-outline-navy max-[480px]:w-full max-[480px]:justify-center">
                <Phone size={15} strokeWidth={2.4} />
                Call Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
