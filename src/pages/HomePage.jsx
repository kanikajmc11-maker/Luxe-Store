import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  ArrowRight, ChevronLeft, ChevronRight,
  Truck, RotateCcw, Shield, Headphones, Star,
  TrendingUp, Sparkles, Crown
} from 'lucide-react'
import ProductCard from '../components/ui/ProductCard'
import { products, categories, heroSlides, testimonials, services, formatPrice } from '../data/products'
import './HomePage.css'

export default function HomePage({ addToast, onCartOpen }) {
  const [slideIdx, setSlideIdx]   = useState(0)
  const [activeTab, setActiveTab] = useState('trending')
  const intervalRef = useRef(null)

  // Auto-play hero
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSlideIdx(i => (i + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const prevSlide = () => {
    clearInterval(intervalRef.current)
    setSlideIdx(i => (i - 1 + heroSlides.length) % heroSlides.length)
  }
  const nextSlide = () => {
    clearInterval(intervalRef.current)
    setSlideIdx(i => (i + 1) % heroSlides.length)
  }

  const tabProducts = {
    trending: products.filter(p => p.isTrending).slice(0, 8),
    new:      products.filter(p => p.isNew).slice(0, 8),
    toprated: [...products].sort((a, b) => b.rating - a.rating).slice(0, 8),
  }

  const slide = heroSlides[slideIdx]

  return (
    <>
      <Helmet>
        <title>LuxeStore – Premium Fashion & Lifestyle Shopping in India</title>
        <meta name="description" content="Shop premium fashion, jewellery, footwear, bags and lifestyle products at LuxeStore. Free shipping on orders above ₹999. Latest trends delivered to your door." />
        <link rel="canonical" href="https://luxestore.in/" />
      </Helmet>

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="hero" aria-label="Hero banner">
          <div
            className="hero__slide"
            style={{ '--accent': slide.accent }}
          >
            <div className="hero__bg">
              <img src={slide.image} alt={slide.title} key={slide.id} className="hero__bg-img" loading="eager" />
              <div className="hero__bg-overlay" />
            </div>

            <div className="container hero__content">
              <div className="hero__text">
                <span className="hero__tag animate-fade-up">
                  <Sparkles size={13} />
                  {slide.subtitle}
                </span>
                <h1 className="hero__title animate-fade-up animate-fade-up-delay-1">
                  {slide.tag}
                  <br />
                  <em>{slide.title.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}</em>
                </h1>
                <p className="hero__desc animate-fade-up animate-fade-up-delay-2">
                  {slide.description}
                </p>
                <div className="hero__meta animate-fade-up animate-fade-up-delay-3">
                  Starting from <strong>{formatPrice(slide.startingFrom)}</strong>
                </div>
                <div className="hero__ctas animate-fade-up animate-fade-up-delay-4">
                  <Link to={slide.ctaLink} className="btn btn-primary btn-lg">
                    {slide.cta} <ArrowRight size={18} />
                  </Link>
                  <Link to="/shop" className="btn btn-ghost btn-lg" style={{ color: 'white' }}>
                    Browse All
                  </Link>
                </div>
              </div>
            </div>

            {/* Controls */}
            <button className="hero__nav hero__nav--prev" onClick={prevSlide} aria-label="Previous slide">
              <ChevronLeft size={22} />
            </button>
            <button className="hero__nav hero__nav--next" onClick={nextSlide} aria-label="Next slide">
              <ChevronRight size={22} />
            </button>

            {/* Dots */}
            <div className="hero__dots">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  className={`hero__dot${i === slideIdx ? ' hero__dot--active' : ''}`}
                  onClick={() => setSlideIdx(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── CATEGORY QUICK ACCESS ─────────────────────────────────────── */}
        <section className="category-strip section-sm">
          <div className="container">
            <div className="category-strip__grid">
              {categories.map((cat, i) => (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.id}`}
                  className="category-strip__item animate-fade-up"
                  style={{ animationDelay: `${i * 0.06}s` }}
                  aria-label={`Browse ${cat.label}`}
                >
                  <div className="category-strip__img-wrap">
                    <img src={cat.image} alt={cat.label} loading="lazy" />
                  </div>
                  <span>{cat.label}</span>
                  <em>{cat.count}</em>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── BANNER TRIO ───────────────────────────────────────────────── */}
        <section className="banner-trio section-sm">
          <div className="container banner-trio__grid">
            <Link to="/shop?tag=women" className="banner-card banner-card--pink">
              <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80" alt="Women's Collection" loading="lazy" />
              <div className="banner-card__content">
                <span>Women's</span>
                <h2>New Season<br />Collection</h2>
                <p>Up to 40% off</p>
                <span className="banner-card__cta">Shop Now <ArrowRight size={14} /></span>
              </div>
            </Link>

            <div className="banner-col">
              <Link to="/shop?category=watches" className="banner-card banner-card--blue banner-card--sm">
                <img src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80" alt="Watches" loading="lazy" />
                <div className="banner-card__content">
                  <span>Watches</span>
                  <h2>Luxury Timepieces</h2>
                  <span className="banner-card__cta">Explore <ArrowRight size={13} /></span>
                </div>
              </Link>
              <Link to="/shop?tag=men" className="banner-card banner-card--dark banner-card--sm">
                <img src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600&q=80" alt="Men's Fashion" loading="lazy" />
                <div className="banner-card__content">
                  <span>Men's</span>
                  <h2>Modern Essentials</h2>
                  <span className="banner-card__cta">Shop <ArrowRight size={13} /></span>
                </div>
              </Link>
            </div>

            <Link to="/shop?category=jewellery" className="banner-card banner-card--rose">
              <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80" alt="Jewellery" loading="lazy" />
              <div className="banner-card__content">
                <span>Jewellery</span>
                <h2>Fine Jewellery<br />Collection</h2>
                <p>Handcrafted with love</p>
                <span className="banner-card__cta">View Collection <ArrowRight size={14} /></span>
              </div>
            </Link>
          </div>
        </section>

        {/* ── SERVICES STRIP ───────────────────────────────────────────── */}
        <section className="services-strip section-sm">
          <div className="container services-strip__grid">
            {services.map((s, i) => (
              <div key={i} className="service-card">
                <div className="service-card__icon" style={{ '--c': s.color }}>
                  {s.icon === 'Truck'      && <Truck size={24} />}
                  {s.icon === 'RotateCcw'  && <RotateCcw size={24} />}
                  {s.icon === 'Shield'     && <Shield size={24} />}
                  {s.icon === 'Headphones' && <Headphones size={24} />}
                </div>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRODUCT TABS ─────────────────────────────────────────────── */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div>
                <div className="badge badge-pink"><TrendingUp size={12} /> Featured Products</div>
                <h2 className="section-title" style={{ marginTop: 8 }}>Handpicked For You</h2>
                <div className="divider" />
              </div>
              <Link to="/shop" className="btn btn-outline">
                View All <ArrowRight size={16} />
              </Link>
            </div>

            {/* Tabs */}
            <div className="product-tabs">
              {[
                { key: 'trending', label: 'Trending', icon: <TrendingUp size={14} /> },
                { key: 'new',      label: 'New Arrivals', icon: <Sparkles size={14} /> },
                { key: 'toprated', label: 'Top Rated', icon: <Crown size={14} /> },
              ].map(tab => (
                <button
                  key={tab.key}
                  className={`product-tab${activeTab === tab.key ? ' active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            <div className="products-grid" style={{ marginTop: 32 }}>
              {tabProducts[activeTab].map(p => (
                <ProductCard key={p.id} product={p} addToast={addToast} />
              ))}
            </div>
          </div>
        </section>

        {/* ── DEAL OF DAY BANNER ───────────────────────────────────────── */}
        <DealBanner addToast={addToast} />

        {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
        <section className="section testimonials-section">
          <div className="container">
            <div className="section-header" style={{ marginBottom: 40 }}>
              <div>
                <div className="badge badge-blue"><Star size={12} fill="currentColor" /> Customer Reviews</div>
                <h2 className="section-title" style={{ marginTop: 8 }}>What Our Customers Say</h2>
                <div className="divider" style={{ background: 'linear-gradient(90deg, var(--blue-500), var(--pink-400))' }} />
              </div>
            </div>
            <div className="testimonials-grid">
              {testimonials.map(t => (
                <div key={t.id} className="testimonial-card">
                  <div className="testimonial-card__stars">
                    {Array.from({ length: t.rating }, (_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="testimonial-card__text">{t.text}</p>
                  <div className="testimonial-card__author">
                    <img src={t.avatar} alt={t.name} loading="lazy" />
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.role} · {t.location}</span>
                    </div>
                    <em>{t.date}</em>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ───────────────────────────────────────────────── */}
        <section className="newsletter-section">
          <div className="container newsletter-section__inner">
            <div className="newsletter-section__text">
              <h2>Get Exclusive Deals & Style Tips</h2>
              <p>Join over 50,000 fashion lovers. Get early access to new arrivals, flash sales and style inspiration delivered to your inbox.</p>
            </div>
            <form
              className="newsletter-section__form"
              onSubmit={(e) => {
                e.preventDefault()
                addToast({ message: 'Welcome to LuxeStore! 🎉' })
                e.target.reset()
              }}
            >
              <input type="email" placeholder="Enter your email address" aria-label="Email for newsletter" required />
              <button type="submit" className="btn btn-primary">
                Subscribe <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}

// ─── DEAL BANNER ────────────────────────────────────────────────────────────

function DealBanner({ addToast }) {
  const deal = products.find(p => p.id === 'p015')
  const [time, setTime] = useState({ h: 5, m: 32, s: 41 })

  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev
        s--
        if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        if (h < 0) { h = 23; m = 59; s = 59 }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])

  const pad = n => String(n).padStart(2, '0')

  return (
    <section className="deal-banner section-sm">
      <div className="container deal-banner__inner">
        <div className="deal-banner__text">
          <span className="badge badge-pink">⚡ Deal of the Day</span>
          <h2>Flash Sale — Don't Miss Out!</h2>
          <p>Limited-time offer on our most popular products. Grab them before they're gone.</p>
          <div className="deal-banner__timer" aria-label="Countdown timer">
            {[['Hours', time.h], ['Mins', time.m], ['Secs', time.s]].map(([label, val]) => (
              <div key={label} className="deal-banner__time-block">
                <strong>{pad(val)}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
        {deal && (
          <div className="deal-banner__product">
            <img src={deal.image} alt={deal.name} loading="lazy" />
            <div className="deal-banner__product-info">
              <span className="deal-banner__save">Save {formatPrice(deal.originalPrice - deal.price)}</span>
              <h3>{deal.name}</h3>
              <p>{deal.brand}</p>
              <div className="price-wrap">
                <span className="price">{formatPrice(deal.price)}</span>
                <span className="price-original">{formatPrice(deal.originalPrice)}</span>
                <span className="price-discount">{deal.discount}% off</span>
              </div>
              <Link to={`/product/${deal.id}`} className="btn btn-primary" style={{ marginTop: 12 }}>
                Shop Now <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
