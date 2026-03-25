'use client'

import { OfferItem } from '@/lib/types'

interface SpecialOfferPaneProps {
  draftOffer: OfferItem[]
  setDraftOffer: (offer: OfferItem[]) => void
  onPreview: () => void
}

export function SpecialOfferPane({
  draftOffer,
  setDraftOffer,
  onPreview,
}: SpecialOfferPaneProps) {
  const handleAddRow = () => {
    setDraftOffer([...draftOffer, { name: '', price: 0 }])
  }

  const handleDeleteRow = (index: number) => {
    const updated = [...draftOffer]
    updated.splice(index, 1)
    setDraftOffer(updated)
  }

  const handleNameChange = (index: number, name: string) => {
    const updated = [...draftOffer]
    updated[index].name = name
    setDraftOffer(updated)
  }

  const handlePriceChange = (index: number, price: string) => {
    const updated = [...draftOffer]
    updated[index].price = parseInt(price, 10) || 0
    setDraftOffer(updated)
  }

  return (
    <div className="sp-scroll">
      <div className="sp-section-lbl">Edit Special Offer Items</div>
      <div id="spEditRows">
        {draftOffer.map((item, index) => (
          <div key={index} className="sp-edit-row">
            <input
              type="text"
              className="sp-edit-name"
              placeholder="Meal name"
              value={item.name}
              onChange={(e) => handleNameChange(index, e.target.value)}
            />
            <input
              type="number"
              className="sp-edit-price"
              placeholder="₹"
              min="0"
              value={item.price}
              onChange={(e) => handlePriceChange(index, e.target.value)}
            />
            <button
              className="sp-del-row"
              onClick={() => handleDeleteRow(index)}
            >
              🗑
            </button>
          </div>
        ))}
      </div>
      <button className="sp-add-row-btn" onClick={handleAddRow}>
        ＋ Add Row
      </button>
    </div>
  )
}
