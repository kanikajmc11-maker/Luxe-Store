# LuxeStore – Premium Fashion & Lifestyle E-Commerce

A production-grade e-commerce frontend built with **Vite + React**, designed for portfolio showcase. Clean, modern, SEO-friendly and fully responsive.

---

## ✨ Features

- **6 Pages**: Home, Shop, Product Detail, Wishlist, About, Contact
- **SEO Ready**: React Helmet Async, semantic HTML, meta tags, robots.txt, sitemap support
- **Premium UI/UX**: Cormorant Garamond display font, smooth animations, hover effects
- **Shopping Cart**: Slide-over drawer with quantity controls, savings summary
- **Wishlist**: Heart toggle on all product cards, dedicated wishlist page
- **Smart Filters**: Filter by category, tags, price range, search query
- **Sort Options**: Trending, Newest, Price, Rating, Popularity
- **Responsive**: Mobile-first, works on all screen sizes
- **Color Theme**: Pink + White + Blue — premium, modern aesthetic
- **Toast Notifications**: Feedback on cart/wishlist actions
- **Hero Carousel**: Auto-playing slides with keyboard-friendly controls
- **Deal of the Day**: Live countdown timer

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
luxe-store/
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── images/        ← Place local images here
│   │   └── icons/         ← Place custom icons/SVGs here
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx / Navbar.css
│   │   │   └── Footer.jsx / Footer.css
│   │   └── ui/
│   │       ├── ProductCard.jsx / ProductCard.css
│   │       ├── CartDrawer.jsx  / CartDrawer.css
│   │       └── ToastContainer.jsx / ToastContainer.css
│   ├── context/
│   │   └── StoreContext.jsx   ← Cart + Wishlist state (React Context)
│   ├── data/
│   │   └── products.js        ← All product/category/hero data
│   ├── hooks/
│   │   └── useToast.js
│   ├── pages/
│   │   ├── HomePage.jsx   / HomePage.css
│   │   ├── ShopPage.jsx   / ShopPage.css
│   │   ├── ProductPage.jsx / ProductPage.css
│   │   ├── WishlistPage.jsx / WishlistPage.css
│   │   ├── AboutPage.jsx  / AboutPage.css
│   │   └── ContactPage.jsx / ContactPage.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css            ← Design tokens + global styles
├── index.html
├── vite.config.js
└── package.json
```

---

## 🎨 Design System

All design tokens (colours, spacing, fonts, shadows) live in `src/index.css` as CSS custom properties:

| Token | Value |
|-------|-------|
| `--primary` | Pink `#E91E8C` |
| `--accent` | Blue `#3b82f6` |
| `--font-display` | Cormorant Garamond |
| `--font-body` | DM Sans |

---

## 🛍️ Adding Products

All product data is in `src/data/products.js`. Add new products to the `products` array following the existing schema. Images use Unsplash URLs — replace with your own for production.

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `react-router-dom` | Client-side routing |
| `react-helmet-async` | SEO meta tag management |
| `lucide-react` | Icon library |

---

## 🔧 Customisation Tips

1. **Change brand name**: Search & replace `LuxeStore` across all files
2. **Update colours**: Edit `--primary` and `--accent` in `src/index.css`
3. **Add products**: Edit `src/data/products.js`
4. **Connect to backend**: Replace context reducers with API calls
5. **Add payments**: Integrate Razorpay / PayU in the checkout flow

---

## 📸 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero carousel, categories, product tabs, deal of day, testimonials |
| Shop | `/shop` | All products with filter sidebar, sort, grid/list view |
| Product | `/product/:id` | Image gallery, size/colour selector, add to cart, reviews |
| Wishlist | `/wishlist` | Saved products grid |
| About | `/about` | Brand story, stats, team, values |
| Contact | `/contact` | Contact form, info cards, FAQ accordion |

---

## 🌐 SEO

- Unique `<title>` and `<meta name="description">` on every page via `react-helmet-async`
- `<link rel="canonical">` on all pages
- `robots.txt` in `/public`
- Sitemap generation via `vite-plugin-sitemap`
- Semantic HTML: `<main>`, `<nav>`, `<section>`, `<article>`, `<header>`, `<footer>`
- Proper `aria-label` attributes on interactive elements
- Lazy loading images with `loading="lazy"`
- `alt` text on all images

---

Built with ❤️ in India
