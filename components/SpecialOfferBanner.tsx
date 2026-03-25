'use client'

import { OfferItem } from '@/lib/types'

interface SpecialOfferBannerProps {
  offer: OfferItem[]
}

export function SpecialOfferBanner({ offer }: SpecialOfferBannerProps) {
  return (
    <div className="fc-block">
      <div className="fc-card">
        <div className="fc-head">
          <span className="fc-icon">🍗</span>
          <span className="fc-title">Fried Chicken</span>
          <span className="fc-badge">Special</span>
        </div>
        <div className="fc-rows">
          {offer.map((item, idx) => (
            <div key={idx} className="fc-row">
              <span className="fc-dot" />
              <span className="fc-name">{item.name}</span>
              <span className="fc-price">
                <sup>₹</sup>
                {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
