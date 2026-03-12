import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingBag, Heart, Search, Menu, X, ChevronDown } from 'lucide-react'
import { useCart } from '../../context/StoreContext'
import { useWishlist } from '../../context/StoreContext'
import { categories } from '../../data/products'
import './Navbar.css'

export default function Navbar({ onCartOpen }) {
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [searchOpen,   setSearchOpen]   = useState(false)
  const [searchQuery,  setSearchQuery]  = useState('')
  const [catOpen,      setCatOpen]      = useState(false)
  const { count }    = useCart()
  const { wishlist } = useWishlist()
  const navigate     = useNavigate()
  const searchRef    = useRef(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <p>🎉 Free shipping on orders above ₹999 &nbsp;|&nbsp; Use code <strong>LUXE10</strong> for 10% off &nbsp;|&nbsp; 🚀 Express delivery available</p>
      </div>

      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">

          {/* Logo */}
          <Link to="/" className="navbar__logo" aria-label="LuxeStore Home">
            <div className="navbar__logo-mark">L</div>
            <div className="navbar__logo-text">
              <span>Luxe</span><span>Store</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="navbar__nav" aria-label="Main navigation">
            <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} end>Home</NavLink>

            <div
              className={`nav-link nav-link--dropdown${catOpen ? ' open' : ''}`}
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
            >
              <span>Categories <ChevronDown size={14} /></span>
              {catOpen && (
                <div className="mega-menu">
                  <div className="mega-menu__grid">
                    {categories.map(cat => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.id}`}
                        className="mega-menu__item"
                        onClick={() => setCatOpen(false)}
                      >
                        <img src={cat.image} alt={cat.label} loading="lazy" />
                        <span>{cat.label}</span>
                        <em>{cat.count} items</em>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/shop?tag=men"    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Men's</NavLink>
            <NavLink to="/shop?tag=women"  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Women's</NavLink>
            <NavLink to="/shop?category=jewellery" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Jewellery</NavLink>
            <NavLink to="/shop?category=perfume"   className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Perfume</NavLink>
            <NavLink to="/about"   className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>About</NavLink>
          </nav>

          {/* Actions */}
          <div className="navbar__actions">
            <button
              className="icon-btn"
              aria-label="Search"
              onClick={() => setSearchOpen(s => !s)}
            >
              <Search size={20} />
            </button>

            <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
              <Heart size={20} />
              {wishlist.ids.length > 0 && (
                <span className="icon-btn__badge icon-btn__badge--pink">{wishlist.ids.length}</span>
              )}
            </Link>

            <button className="icon-btn" aria-label="Shopping cart" onClick={onCartOpen}>
              <ShoppingBag size={20} />
              {count > 0 && <span className="icon-btn__badge">{count}</span>}
            </button>

            <button
              className="icon-btn mobile-only"
              aria-label="Menu"
              onClick={() => setMobileOpen(o => !o)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className={`search-bar${searchOpen ? ' search-bar--open' : ''}`}>
          <form className="container" onSubmit={handleSearch}>
            <input
              ref={searchRef}
              type="search"
              placeholder="Search for clothes, shoes, jewellery…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
            <button type="submit" className="btn btn-primary btn-sm">Search</button>
            <button type="button" className="icon-btn" onClick={() => setSearchOpen(false)} aria-label="Close search">
              <X size={18} />
            </button>
          </form>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu${mobileOpen ? ' mobile-menu--open' : ''}`}>
        <nav>
          <Link to="/"       onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/shop"   onClick={() => setMobileOpen(false)}>All Products</Link>
          <Link to="/shop?tag=men"   onClick={() => setMobileOpen(false)}>Men's</Link>
          <Link to="/shop?tag=women" onClick={() => setMobileOpen(false)}>Women's</Link>
          <Link to="/shop?category=jewellery" onClick={() => setMobileOpen(false)}>Jewellery</Link>
          <Link to="/shop?category=perfume"   onClick={() => setMobileOpen(false)}>Perfume</Link>
          <Link to="/about"   onClick={() => setMobileOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
          <Link to="/wishlist" onClick={() => setMobileOpen(false)}>Wishlist ({wishlist.ids.length})</Link>
        </nav>
      </div>

      <div className={`overlay${mobileOpen ? ' active' : ''}`} onClick={() => setMobileOpen(false)} />
    </>
  )
}
