'use client'

import { OfferItem } from '@/lib/types'

interface PreviewModalProps {
  isOpen: boolean
  draftOffer: OfferItem[]
  onCancel: () => void
  onConfirm: () => void
}

export function PreviewModal({
  isOpen,
  draftOffer,
  onCancel,
  onConfirm,
}: PreviewModalProps) {
  if (!isOpen) return null

  return (
    <div id="previewModal" className="on">
      <div className="preview-box">
        <div className="pm-header">
          <div className="pm-label">Preview — Special Offer</div>
          <div className="pm-title">This is how it will look on the menu</div>
        </div>
        <div className="pm-preview-card">
          <div className="pm-fc-head">
            <span style={{ fontSize: '17px', lineHeight: '1' }}>🍗</span>
            <span className="pm-fc-title">Fried Chicken</span>
            <span className="pm-fc-badge">Special</span>
          </div>
          <div className="pm-rows" id="pmRows">
            {draftOffer
              .filter((i) => i.name || i.price)
              .map((item, idx) => (
                <div key={idx} className="pm-row">
                  <span className="pm-dot" />
                  <span className="pm-name">
                    {item.name || (
                      <em style={{ color: 'var(--muted)' }}>unnamed</em>
                    )}
                  </span>
                  <span className="pm-price">
                    <sup>₹</sup>
                    {item.price || 0}
                  </span>
                </div>
              ))}
          </div>
        </div>
        <div className="pm-question">
          Are you sure you want to update the offer?
        </div>
        <div className="pm-sub">
          Customers will see these changes immediately.
        </div>
        <div className="pm-actions">
          <button className="pm-cancel" onClick={onCancel}>
            ✕ Go Back
          </button>
          <button className="pm-confirm" onClick={onConfirm}>
            ✓ Yes, Publish
          </button>
        </div>
      </div>
    </div>
  )
}
