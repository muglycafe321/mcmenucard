'use client'

import { useEffect, useRef } from 'react'
import { MenuCategory } from '@/lib/types'

interface CategoryNavProps {
  categories: MenuCategory[]
}

export function CategoryNav({ categories }: CategoryNavProps) {
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const id = entry.target.id
          document.querySelectorAll('.cat-tab').forEach((tab) => {
            if (tab instanceof HTMLElement) {
              tab.classList.toggle('active', tab.getAttribute('data-id') === id)
            }
          })
          const activeTab = document.querySelector(`.cat-tab[data-id="${id}"]`)
          if (activeTab instanceof HTMLElement) {
            activeTab.scrollIntoView({
              inline: 'center',
              behavior: 'smooth',
              block: 'nearest',
            })
          }
        })
      },
      { rootMargin: '-50px 0px -55% 0px', threshold: 0 }
    )

    document.querySelectorAll('.menu-section').forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const navEl = document.querySelector('.cat-nav')
    const offset = (navEl instanceof HTMLElement ? navEl.offsetHeight : 52) + 6
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth',
    })
  }

  return (
    <nav className="cat-nav">
      <div ref={navRef} className="cat-inner" id="catInner">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            className="cat-tab"
            data-id={cat.slug}
            onClick={() => scrollToSection(cat.slug)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
