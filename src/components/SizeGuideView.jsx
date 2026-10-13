import { Ruler, ShieldCheck, MessageSquare, Star, ArrowRight } from 'lucide-react'
import { trackWhatsAppClick } from '../utils/analytics'

const SIZE_CHART = [
  { age: '0–3 Months', size: '0-3m', heightCm: '55–61 cm', heightIn: '21.5–24"', chestIn: '16–17"', weightKg: '3.5–5.5 kg' },
  { age: '3–6 Months', size: '3-6m', heightCm: '61–67 cm', heightIn: '24–26.5"', chestIn: '17–18"', weightKg: '5.5–7.5 kg' },
  { age: '6–12 Months', size: '6-12m', heightCm: '67–75 cm', heightIn: '26.5–29.5"', chestIn: '18–19"', weightKg: '7.5–9.5 kg' },
  { age: '1–2 Years', size: '1-2y / 0-2y', heightCm: '75–86 cm', heightIn: '29.5–34"', chestIn: '19–20"', weightKg: '9.5–12 kg' },
  { age: '2–3 Years', size: '2-3y / 2-4y', heightCm: '86–96 cm', heightIn: '34–38"', chestIn: '20–21"', weightKg: '12–14.5 kg' },
  { age: '3–4 Years', size: '3-4y / 2-4y', heightCm: '96–104 cm', heightIn: '38–41"', chestIn: '21–22"', weightKg: '14.5–17 kg' },
  { age: '4–6 Years', size: '4-6y', heightCm: '104–116 cm', heightIn: '41–45.5"', chestIn: '22–24"', weightKg: '17–21 kg' },
  { age: '6–8 Years', size: '6-8y', heightCm: '116–128 cm', heightIn: '45.5–50.5"', chestIn: '24–26"', weightKg: '21–26 kg' },
  { age: '8–10 Years', size: '8-10y', heightCm: '128–140 cm', heightIn: '50.5–55"', chestIn: '26–28"', weightKg: '26–33 kg' },
  { age: '10–12 Years', size: '10-12y', heightCm: '140–152 cm', heightIn: '55–60"', chestIn: '28–30"', weightKg: '33–42 kg' },
  { age: '12–14 Years', size: '12-14y', heightCm: '152–162 cm', heightIn: '60–64"', chestIn: '30–32"', weightKg: '42–50 kg' },
]

export default function SizeGuideView({ onViewChange }) {
  const handleWhatsApp = () => {
    trackWhatsAppClick('SizeGuideHelp', null, 'https://kidscity.online/kids-clothing-size-guide')
    const phone = '917891672762'
    const text = 'Hi Kids City! I need help selecting the right size for my child. Can you assist me?'
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <div className="bg-white min-h-screen pt-[90px] pb-24">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 py-2 border-b border-border/70">
          <ol className="flex items-center gap-2 text-[0.82rem] text-text-muted list-none m-0 p-0 flex-wrap">
            <li>
              <a
                href="/"
                onClick={(e) => { e.preventDefault(); onViewChange('home') }}
                className="hover:text-brand-terracotta transition-colors"
              >
                Home
              </a>
            </li>
            <li>&gt;</li>
            <li className="text-brand-navy font-bold" aria-current="page">
              Kids Size Guide
            </li>
          </ol>
        </nav>

        {/* Hero Header */}
        <header className="bg-gradient-to-br from-[#faf8f5] to-white border border-border rounded-3xl p-8 md:p-12 mb-12 shadow-sm">
          <div className="max-w-[840px]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border text-[0.8rem] font-bold text-brand-navy mb-4 shadow-2xs">
              <Star size={14} className="text-amber-500 fill-amber-500" />
              <span>4.9 on Google (141 reviews) | Since 2018 | Delivery in Pune</span>
            </div>

            <h1 className="font-[family-name:var(--font-head)] text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold text-brand-navy leading-[1.2] mb-4">
              Indian Kids Clothing Size Chart (Age, Height &amp; Chest)
            </h1>

            <p className="font-[family-name:var(--font-body)] text-[1.05rem] text-text-mid leading-[1.7] mb-6">
              Shopping for kids clothes online in Pune should never involve guessing sizes! Use our verified Indian standard size chart for infants, toddlers, and children (0 to 14 years). When in doubt, our Wakad boutique team is ready on WhatsApp to check tape measurements before delivery.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-full font-bold text-[0.92rem] shadow-sm hover:brightness-105 transition-all min-h-[48px]"
              >
                <MessageSquare size={18} />
                Ask Us on WhatsApp for Sizing Help
              </button>
              <button
                onClick={() => { onViewChange('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className="inline-flex items-center gap-2 bg-brand-navy text-white px-6 py-3.5 rounded-full font-bold text-[0.92rem] hover:bg-brand-navy-dark transition-all min-h-[48px]"
              >
                Browse Collections
              </button>
            </div>
          </div>
        </header>

        {/* Comprehensive Table */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6 pb-2 border-b border-border">
            <h2 className="font-[family-name:var(--font-head)] text-[1.4rem] font-extrabold text-brand-navy">
              Standard Indian Children Size Chart
            </h2>
            <span className="text-[0.8rem] text-text-muted">Ages 0–14 Years</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border shadow-2xs bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#faf8f5] border-b border-border text-[0.85rem] font-extrabold text-brand-navy uppercase tracking-wider">
                  <th className="py-4 px-4 sm:px-6">Age Group</th>
                  <th className="py-4 px-4 sm:px-6">Kids City Tag</th>
                  <th className="py-4 px-4 sm:px-6">Height (cm)</th>
                  <th className="py-4 px-4 sm:px-6">Height (Inches)</th>
                  <th className="py-4 px-4 sm:px-6">Chest (Inches)</th>
                  <th className="py-4 px-4 sm:px-6">Approx. Weight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-[0.9rem] font-medium text-brand-navy">
                {SIZE_CHART.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-brand-navy">{row.age}</td>
                    <td className="py-3.5 px-4 sm:px-6">
                      <span className="px-2.5 py-1 rounded-md bg-[#eef4fd] text-[#1e4494] font-bold text-[0.8rem]">
                        {row.size}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-text-mid">{row.heightCm}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-text-mid">{row.heightIn}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-text-mid font-semibold">{row.chestIn}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-text-muted">{row.weightKg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How to Measure at Home */}
        <section className="bg-white border border-border rounded-3xl p-8 md:p-10 mb-16 shadow-2xs">
          <h2 className="font-[family-name:var(--font-head)] text-[1.4rem] font-extrabold text-brand-navy mb-6">
            How to Measure Your Child at Home (3 Easy Steps)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#faf8f5] border border-border">
              <span className="w-8 h-8 rounded-full bg-brand-terracotta text-white font-bold flex items-center justify-center text-sm mb-3">
                1
              </span>
              <strong className="block text-[1rem] text-brand-navy mb-2">Chest Measurement</strong>
              <p className="text-[0.88rem] text-text-mid leading-[1.6]">
                Place the measuring tape comfortably around the fullest part of the child chest under the armpits. Keep one finger between the tape and chest for relaxed breathing room.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#faf8f5] border border-border">
              <span className="w-8 h-8 rounded-full bg-brand-terracotta text-white font-bold flex items-center justify-center text-sm mb-3">
                2
              </span>
              <strong className="block text-[1rem] text-brand-navy mb-2">Height Measurement</strong>
              <p className="text-[0.88rem] text-text-mid leading-[1.6]">
                Have your child stand barefoot against a flat wall. Measure from the top of the head straight down to the floor. Height is the most reliable sizing indicator for children.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#faf8f5] border border-border">
              <span className="w-8 h-8 rounded-full bg-brand-terracotta text-white font-bold flex items-center justify-center text-sm mb-3">
                3
              </span>
              <strong className="block text-[1rem] text-brand-navy mb-2">Length Preference</strong>
              <p className="text-[0.88rem] text-text-mid leading-[1.6]">
                For party gowns and festival lehengas, measure from shoulder to mid-calf or ankle depending on desired length. For night suits, standard ankle length is recommended.
              </p>
            </div>
          </div>

          {/* Sizing Pro Tips */}
          <div className="mt-8 p-6 rounded-2xl bg-[#f0f9ff] border border-blue-100">
            <h3 className="font-bold text-[1rem] text-blue-900 mb-2">
              Boutique Sizing Tips from Pune Parents:
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-[0.88rem] text-blue-950">
              <li><strong>Between sizes?</strong> Always choose one size larger. Children grow rapidly, and slightly loose festive clothing allows easier movement.</li>
              <li><strong>Festival Lehengas:</strong> Feature drawstring skirts with adjustable ties to accommodate waist growth over multiple months.</li>
              <li><strong>100% Cotton Night Suits:</strong> Cut with relaxed roominess for nighttime tossing and turning.</li>
            </ul>
          </div>
        </section>

        {/* WhatsApp Consultation Card */}
        <div className="bg-brand-navy text-white rounded-3xl p-8 md:p-12 text-center max-w-[800px] mx-auto">
          <h3 className="font-[family-name:var(--font-head)] text-[1.6rem] font-extrabold mb-3">
            Still Not Sure About Sizing?
          </h3>
          <p className="text-[0.95rem] text-white/80 max-w-[500px] mx-auto mb-6">
            WhatsApp us your child age, height, and photo. Our Wakad staff will personally measure the garment and confirm before shipping.
          </p>
          <button
            onClick={handleWhatsApp}
            className="bg-[#25D366] text-white px-8 py-3.5 rounded-full font-bold text-[0.95rem] inline-flex items-center gap-2 hover:brightness-105 transition-all shadow-md min-h-[48px]"
          >
            <MessageSquare size={18} />
            Get Live Sizing Advice on WhatsApp (+91 78916 72762)
          </button>
        </div>
      </div>
    </div>
  )
}
