import { Star } from 'lucide-react'
import styles from './AnnouncementBar.module.css'

const MESSAGE = "🎉 MONSOON SALE — Upto 40% OFF on Night Suits & Festival Wear \u00A0·\u00A0 FREE Delivery in Wakad & Hinjewadi \u00A0·\u00A0 Cash on Delivery Available \u00A0·\u00A0 4.9★ Rated by 500+ Happy Parents \u00A0·\u00A0 New Stock Every Week \u00A0·\u00A0 WhatsApp: 78916 72762 \u00A0·\u00A0"

export default function AnnouncementBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.track}>
        <div className={styles.inner}>
          <span className={styles.msg}>
            <Star size={13} fill="currentColor" strokeWidth={0} className={styles.star} />
            {MESSAGE}
          </span>
          <span className={styles.msg}>
            <Star size={13} fill="currentColor" strokeWidth={0} className={styles.star} />
            {MESSAGE}
          </span>
        </div>
      </div>
    </div>
  )
}
