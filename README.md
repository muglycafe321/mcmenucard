# Mugly Café Digital Menu - Next.js 14

A modern Next.js 14 digital menu application for Mugly Café with Supabase backend.

## Features

- 🎨 **Exact Design Preservation**: All animations, fonts, colors, and layouts from the original HTML
- 📱 **Fully Responsive**: Works perfectly on all device sizes
- 🚀 **Next.js 14 App Router**: Modern React architecture with server components
- 💾 **Supabase Backend**: Real-time database with Row Level Security
- 🔐 **Admin Panel**: Secure password-protected menu management
- ✨ **Smooth Animations**: All original CSS animations preserved

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Custom CSS + Tailwind CSS utilities
- **Fonts**: Google Fonts (Playfair Display + DM Sans)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier works)

### Installation

1. **Clone the repository** (or navigate to the project folder)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   
   The `.env.local` file is already configured with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://eqrbjrglemcqairztcpt.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_Vg5uUtg3f76sdbWdkaHI9w__uMPHkqR
   ```

4. **Set up Supabase Database**:

   Go to your Supabase project's SQL Editor and run the following SQL:

   ```sql
   -- Special offer meals
   CREATE TABLE special_offer (
     id        SERIAL PRIMARY KEY,
     name      TEXT    NOT NULL,
     price     INTEGER NOT NULL,
     sort_order INTEGER DEFAULT 0
   );

   -- Menu categories
   CREATE TABLE menu_categories (
     id         SERIAL PRIMARY KEY,
     slug       TEXT UNIQUE NOT NULL,
     label      TEXT NOT NULL,
     type       TEXT DEFAULT 'veg',
     sort_order INTEGER DEFAULT 0
   );

   -- Menu items
   CREATE TABLE menu_items (
     id            SERIAL PRIMARY KEY,
     category_slug TEXT REFERENCES menu_categories(slug) ON DELETE CASCADE,
     name          TEXT    NOT NULL,
     price         INTEGER NOT NULL,
     type          TEXT    DEFAULT NULL,
     sort_order    INTEGER DEFAULT 0
   );

   -- Enable Row Level Security
   ALTER TABLE special_offer   ENABLE ROW LEVEL SECURITY;
   ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
   ALTER TABLE menu_items      ENABLE ROW LEVEL SECURITY;

   -- Public read policies
   CREATE POLICY "public read" ON special_offer   FOR SELECT USING (true);
   CREATE POLICY "public read" ON menu_categories FOR SELECT USING (true);
   CREATE POLICY "public read" ON menu_items      FOR SELECT USING (true);

   -- Anon write policies (admin password enforced in UI)
   CREATE POLICY "anon write" ON special_offer   FOR ALL USING (true);
   CREATE POLICY "anon write" ON menu_categories FOR ALL USING (true);
   CREATE POLICY "anon write" ON menu_items      FOR ALL USING (true);
   ```

5. **Seed the database** (optional - defaults will load if empty):

   Insert the default menu categories and items using the data in `lib/defaults.ts`.

6. **Run the development server**:
   ```bash
   npm run dev
   ```

7. **Open your browser**:
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
mugly-cafe/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Landing page (full-screen photo)
│   └── menu/
│       └── page.tsx        # Main menu page
├── components/
│   ├── HeroHeader.tsx      # Café header with ornament
│   ├── SpecialOfferBanner.tsx  # Fried chicken special offer
│   ├── CategoryNav.tsx     # Sticky category navigation
│   ├── MenuSection.tsx     # Menu category section
│   ├── MenuItem.tsx        # Individual menu item
│   ├── Footer.tsx          # Footer component
│   ├── BackToTop.tsx       # Scroll-to-top button
│   ├── AdminDrawer.tsx     # Admin panel drawer
│   ├── SpecialOfferPane.tsx    # Edit special offers
│   ├── MenuItemsPane.tsx   # Edit menu items
│   └── PreviewModal.tsx    # Preview & confirm modal
├── lib/
│   ├── supabase.ts         # Supabase client
│   ├── types.ts            # TypeScript interfaces
│   └── defaults.ts         # Default menu data
├── public/
│   └── hero.jpg            # Landing page hero image
├── .env.local              # Environment variables
└── package.json
```

## Admin Panel

Access the admin panel by clicking the ⚙ button (bottom-left corner).

**Admin Password**: `mugly321`

### Features:
- 🍗 **Special Offer Management**: Add, edit, delete special offer items
- 📋 **Menu Item Management**: Update prices, add new items, delete items
- 👁 **Preview Mode**: Preview changes before publishing
- ✅ **Live Updates**: Changes are immediately reflected in the database

## Menu Categories

The menu includes 19 categories:
1. Rolls
2. Loaded Fries
3. Chicken
4. Maggi
5. Sandwich
6. Pasta
7. Pizza
8. Momos
9. Burger
10. Fresh Cream
11. Falooda
12. Ice Cream
13. Mojito
14. Lemon
15. Avil Milk
16. Shake
17. Shake & Tender
18. Juice
19. Hot Drinks

## Deployment to Vercel

1. **Push to Git**: Commit your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository

3. **Configure Environment Variables**:
   In Vercel project settings, add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your application
   - You'll get a live URL (e.g., `https://your-project.vercel.app`)

5. **Custom Domain** (optional):
   - Configure custom domain in Vercel settings

## Design Features

### Preserved Elements:
- ✅ All CSS variables and design tokens
- ✅ Google Fonts (Playfair Display + DM Sans)
- ✅ Color scheme (black, gold, veg/nonveg indicators)
- ✅ All animations (zoomIn, fadeUp, up, popIn)
- ✅ Responsive layouts
- ✅ Smooth scrolling and transitions
- ✅ Sticky navigation with active state
- ✅ Gradient overlays and effects

### Animations:
- **Landing Page**: Image zoom, text fade-up
- **Menu Sections**: Staggered fade-in
- **Navigation**: Smooth scroll highlighting
- **Buttons**: Hover effects and transitions
- **Modals**: Pop-in animation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

This is a custom project for Mugly Café. For questions or issues, contact the development team.

## License

Proprietary - All rights reserved to Mugly Café.

---

**Built with ❤️ using Next.js 14 and Supabase**
