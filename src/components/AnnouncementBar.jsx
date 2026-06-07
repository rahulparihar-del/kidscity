import { Star } from 'lucide-react'
import styles from './AnnouncementBar.module.css'

const MESSAGE = "4.9 Google Rating \u00A0·\u00A0 135+ Happy Families \u00A0·\u00A0 Wakad's #1 Kids Store \u00A0·\u00A0 New Collection Every Week \u00A0·\u00A0 Open Daily at Mahalaxmi Complex, Wakad \u00A0·\u00A0"

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
