'use client'

import { useState } from 'react'
import { MenuCategory } from '@/lib/types'
import { supabase } from '@/lib/supabase'

interface MenuItemsPaneProps {
  menuData: MenuCategory[]
  currentCat: number
  setCurrentCat: (index: number) => void
  onPriceChange: (categorySlug: string, itemId: number | undefined, newPrice: number) => void
  onItemAdd: () => void
  onItemDelete: () => void
}

export function MenuItemsPane({
  menuData,
  currentCat,
  setCurrentCat,
  onPriceChange,
  onItemAdd,
  onItemDelete,
}: MenuItemsPaneProps) {
  const [newName, setNewName] = useState('')
  const [newPrice, setNewPrice] = useState('')

  const handlePriceBlur = async (
    categorySlug: string,
    itemId: number | undefined,
    newPriceValue: number
  ) => {
    if (!itemId) return
    try {
      await supabase
        .from('menu_items')
        .update({ price: newPriceValue })
        .eq('id', itemId)
      onPriceChange(categorySlug, itemId, newPriceValue)
    } catch (error) {
      console.error('Error updating price:', error)
    }
  }

  const handleAddItem = async () => {
    if (!newName.trim() || !newPrice) return

    const currentCategory = menuData[currentCat]
    try {
      await supabase.from('menu_items').insert({
        category_slug: currentCategory.slug,
        name: newName.trim(),
        price: parseInt(newPrice, 10),
        sort_order: 999,
      })
      setNewName('')
      setNewPrice('')
      onItemAdd()
    } catch (error) {
      console.error('Error adding item:', error)
    }
  }

  const handleDeleteItem = async (itemId: number | undefined, itemName: string) => {
    if (!itemId) return
    if (!confirm(`Delete "${itemName}"?`)) return

    try {
      await supabase.from('menu_items').delete().eq('id', itemId)
      onItemDelete()
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  return (
    <div className="mn-pane">
      <div className="mn-cats" id="mnCats">
        {menuData.map((cat, index) => (
          <button
            key={cat.slug}
            className={`mn-ctab ${currentCat === index ? 'on' : ''}`}
            onClick={() => setCurrentCat(index)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="mn-list" id="mnList">
        {menuData[currentCat]?.items.map((item, index) => (
          <div key={index} className="mn-irow">
            <span className="mn-iname">{item.name}</span>
            <input
              type="number"
              className="mn-pinp"
              min="0"
              value={item.price}
              onBlur={(e) =>
                handlePriceBlur(
                  menuData[currentCat].slug,
                  item.id,
                  parseInt(e.target.value, 10)
                )
              }
            />
            <button
              className="mn-del"
              onClick={() => handleDeleteItem(item.id, item.name)}
            >
              🗑
            </button>
          </div>
        ))}
      </div>
      <div className="mn-add-bar">
        <input
          id="newName"
          type="text"
          className="mn-nname"
          placeholder="Item name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && document.getElementById('newPrice')?.focus()}
        />
        <input
          id="newPrice"
          type="number"
          className="mn-nprice"
          placeholder="₹"
          min="0"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
        />
        <button id="newAdd" className="mn-plus" onClick={handleAddItem}>
          ＋
        </button>
      </div>
    </div>
  )
}
