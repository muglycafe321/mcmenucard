'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { DEFAULT_OFFER, DEFAULT_MENU } from '@/lib/defaults'
import { OfferItem, MenuCategory, MenuItem } from '@/lib/types'
import { HeroHeader } from '@/components/HeroHeader'
import { SpecialOfferBanner } from '@/components/SpecialOfferBanner'
import { CategoryNav } from '@/components/CategoryNav'
import { MenuSection } from '@/components/MenuSection'
import { Footer } from '@/components/Footer'
import { BackToTop } from '@/components/BackToTop'
import { AdminDrawer } from '@/components/AdminDrawer'

export default function MenuPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [offerData, setOfferData] = useState<OfferItem[]>(DEFAULT_OFFER)
  const [menuData, setMenuData] = useState<MenuCategory[]>(DEFAULT_MENU)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch special offers
        const { data: offerRes } = await supabase
          .from('special_offer')
          .select('*')
          .order('sort_order')

        // Fetch categories
        const { data: cats } = await supabase
          .from('menu_categories')
          .select('*')
          .order('sort_order')

        // Fetch items
        const { data: items } = await supabase
          .from('menu_items')
          .select('*')
          .order('sort_order')

        if (offerRes) {
          setOfferData(offerRes)
        }

        if (cats && items) {
          // Group items under categories
          const grouped = cats.map((cat) => ({
            ...cat,
            items: items.filter((item) => item.category_slug === cat.slug),
          }))
          setMenuData(grouped)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        // Use defaults as fallback
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleOfferPublish = (newOffer: OfferItem[]) => {
    setOfferData(newOffer)
  }

  const handlePriceChange = (
    categorySlug: string,
    itemId: number | undefined,
    newPrice: number
  ) => {
    if (!itemId) return
    setMenuData((prev) =>
      prev.map((cat) =>
        cat.slug === categorySlug
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId ? { ...item, price: newPrice } : item
              ),
            }
          : cat
      )
    )
  }

  const handleItemAdd = () => {
    // Refetch menu data when item is added
    window.location.reload()
  }

  const handleItemDelete = () => {
    // Refetch menu data when item is deleted
    window.location.reload()
  }

  if (isLoading) {
    return (
      <div id="menuPage" className="show">
        <HeroHeader />
        {/* Loading skeleton */}
        <div style={{ padding: '20px', textAlign: 'center', color: '#C9963A' }}>
          Loading menu...
        </div>
      </div>
    )
  }

  return (
    <div id="menuPage" className="show">
      <HeroHeader />
      <SpecialOfferBanner offer={offerData} />
      <CategoryNav categories={menuData} />
      <div className="menu-body" id="menuBody">
        {menuData.map((cat) => (
          <MenuSection key={cat.slug} category={cat} />
        ))}
      </div>
      <Footer />
      <BackToTop />
      <AdminDrawer
        offerData={offerData}
        menuData={menuData}
        onOfferPublish={handleOfferPublish}
        onPriceChange={handlePriceChange}
        onItemAdd={handleItemAdd}
        onItemDelete={handleItemDelete}
      />
    </div>
  )
}
