import { useEffect, useRef } from 'react'
import styles from './WhatsAppFAB.module.css'

export default function WhatsAppFAB() {
  const btnRef = useRef(null)

  useEffect(() => {
    let timer
    function wiggle() {
      btnRef.current?.classList.add(styles.wiggle)
      timer = setTimeout(() => {
        btnRef.current?.classList.remove(styles.wiggle)
      }, 700)
    }

    const interval = setInterval(wiggle, 6000)
    const init = setTimeout(wiggle, 2500)
    return () => { clearInterval(interval); clearTimeout(init); clearTimeout(timer) }
  }, [])

  return (
    <div className={styles.fab}>
      <div className={styles.tooltip}>Chat with us on WhatsApp!</div>
      <a
        ref={btnRef}
        href="https://wa.me/917891672762?text=Hi%20Kids%20City!%20I%20saw%20your%20ad%20and%20want%20to%20visit%20your%20store.%20Can%20you%20share%20details%3F"
        className={styles.btn}
        aria-label="Chat on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.ring} />
        <span className={styles.ring2} />
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.118.55 4.107 1.514 5.84L0 24l6.343-1.484A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.651-.502-5.178-1.381l-.372-.22-3.765.881.921-3.666-.242-.384A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>
    </div>
  )
}
