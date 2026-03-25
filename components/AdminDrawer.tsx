'use client'

import { useState } from 'react'
import { OfferItem, MenuCategory } from '@/lib/types'
import { supabase } from '@/lib/supabase'
import { SpecialOfferPane } from './SpecialOfferPane'
import { MenuItemsPane } from './MenuItemsPane'
import { PreviewModal } from './PreviewModal'

interface AdminDrawerProps {
  offerData: OfferItem[]
  menuData: MenuCategory[]
  onOfferPublish: (offer: OfferItem[]) => void
  onPriceChange: (categorySlug: string, itemId: number | undefined, newPrice: number) => void
  onItemAdd: () => void
  onItemDelete: () => void
}

const ADMIN_PASSWORD = 'mugly321'

export function AdminDrawer({
  offerData,
  menuData,
  onOfferPublish,
  onPriceChange,
  onItemAdd,
  onItemDelete,
}: AdminDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState<'special' | 'menu'>('special')
  const [draftOffer, setDraftOffer] = useState<OfferItem[]>([])
  const [currentCat, setCurrentCat] = useState(0)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
    if (!isLoggedIn) {
      // Initialize draft offer on first open
      setDraftOffer(JSON.parse(JSON.stringify(offerData)))
    }
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setError('')
      setIsLoggedIn(true)
      setDraftOffer(JSON.parse(JSON.stringify(offerData)))
    } else {
      setError('Wrong password')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setPassword('')
    setError('')
    setCurrentCat(0)
  }

  const handlePreview = () => {
    setIsPreviewOpen(true)
  }

  const handleConfirmPublish = async () => {
    try {
      // Delete all existing rows
      await supabase.from('special_offer').delete().neq('id', 0)

      // Insert new rows
      const rows = draftOffer
        .filter((i) => i.name)
        .map((i, idx) => ({
          name: i.name,
          price: i.price,
          sort_order: idx,
        }))

      await supabase.from('special_offer').insert(rows)

      // Update parent state
      onOfferPublish(draftOffer.filter((i) => i.name))

      setIsPreviewOpen(false)
    } catch (error) {
      console.error('Error publishing offer:', error)
    }
  }

  return (
    <>
      {/* Admin Button */}
      <button id="adminBtn" onClick={handleOpen} aria-label="Admin panel">
        ⚙
      </button>

      {/* Backdrop */}
      <div
        id="backdrop"
        className={isOpen ? 'on' : ''}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div id="drawer" className={isOpen ? 'on' : ''}>
        <div className="dw-head">
          <span className="dw-title">Admin Panel</span>
          <button className="dw-close" onClick={handleClose}>
            ✕
          </button>
        </div>

        {!isLoggedIn ? (
          <div id="loginBox">
            <p className="dw-hint">Enter admin password</p>
            <input
              id="pwInp"
              type="password"
              className="dw-inp"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <p id="pwErr" className={`dw-err ${error ? 'on' : ''}`}>
              {error}
            </p>
            <button className="dw-btn" onClick={handleLogin}>
              Unlock
            </button>
          </div>
        ) : (
          <div id="editor" className="on">
            <div className="ed-tabs">
              <button
                className={`ed-tab ${activeTab === 'special' ? 'on' : ''}`}
                data-target="specialPane"
                onClick={() => setActiveTab('special')}
              >
                🍗 Special Offer
              </button>
              <button
                className={`ed-tab ${activeTab === 'menu' ? 'on' : ''}`}
                data-target="menuPane"
                onClick={() => setActiveTab('menu')}
              >
                📋 Menu Items
              </button>
            </div>

            {/* Special Offer Pane */}
            <div
              id="specialPane"
              className={`pane ${activeTab === 'special' ? 'on' : ''}`}
            >
              <SpecialOfferPane
                draftOffer={draftOffer}
                setDraftOffer={setDraftOffer}
                onPreview={handlePreview}
              />
            </div>

            {/* Menu Items Pane */}
            <div
              id="menuPane"
              className={`pane ${activeTab === 'menu' ? 'on' : ''}`}
            >
              <MenuItemsPane
                menuData={menuData}
                currentCat={currentCat}
                setCurrentCat={setCurrentCat}
                onPriceChange={onPriceChange}
                onItemAdd={onItemAdd}
                onItemDelete={onItemDelete}
              />
            </div>

            <div className="dw-foot">
              <button className="dw-btn out" onClick={handleLogout}>
                Logout
              </button>
              <button className="dw-btn out">Reset All</button>
            </div>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={isPreviewOpen}
        draftOffer={draftOffer}
        onCancel={() => setIsPreviewOpen(false)}
        onConfirm={handleConfirmPublish}
      />
    </>
  )
}
