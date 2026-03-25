'use client'

import { MenuItem as MenuItemType } from '@/lib/types'

interface MenuItemProps {
  item: MenuItemType
  categoryType: 'veg' | 'nonveg' | 'mixed'
}

export function MenuItem({ item, categoryType }: MenuItemProps) {
  const itemType = item.type || (categoryType !== 'mixed' ? categoryType : 'veg')

  return (
    <div className="menu-item">
      <span className={`dot ${itemType === 'nonveg' ? 'nonveg' : 'veg'}`} />
      <span className="iname">{item.name}</span>
      <span className="idots" />
      <span className="iprice">
        <sup>₹</sup>
        {item.price}
      </span>
    </div>
  )
}
