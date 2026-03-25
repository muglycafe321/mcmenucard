'use client'

import { MenuCategory } from '@/lib/types'
import { MenuItem } from './MenuItem'

interface MenuSectionProps {
  category: MenuCategory
}

export function MenuSection({ category }: MenuSectionProps) {
  return (
    <section className="menu-section" id={category.slug}>
      <div className="sec-head">
        <span className="sec-title">{category.label}</span>
        <div className="sec-line" />
      </div>
      {category.items.map((item, idx) => (
        <MenuItem key={idx} item={item} categoryType={category.type} />
      ))}
    </section>
  )
}
