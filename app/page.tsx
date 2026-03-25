'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()

  return (
    <div id="landing">
      <div className="lp-img-wrap">
        <Image
          src="/hero.jpg"
          alt="Mugly Café delicious food"
          fill
          className="lp-img"
          priority
        />
        <div className="lp-top-text">
          <h1 className="lp-headline">
            Crispy, Creamy, Crazy Delicious — Only at Mugly Café
          </h1>
        </div>
        <div className="lp-bottom">
          <p className="lp-tagline">
            Once You Try Mugly… There&apos;s No Going Back
          </p>
          <div className="lp-cta">
            <button className="lp-btn-main" onClick={() => router.push('/menu')}>
              🍽 View Full Menu
            </button>
            <div className="lp-info-row">
              <span>📍 Municipality Office Building, Kuthuparamba</span>
              <span>🚚 Delivery Available</span>
              <span>📞 +91 7025212122</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
