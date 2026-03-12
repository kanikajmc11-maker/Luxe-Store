import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  Heart, ShoppingBag, Star, Truck, RotateCcw, Shield,
  ChevronLeft, ChevronRight, Minus, Plus, Check, Share2
} from 'lucide-react'
import { useCart, useWishlist } from '../context/StoreContext'
import { products, formatPrice } from '../data/products'
import ProductCard from '../components/ui/ProductCard'
import './ProductPage.css'

export default function ProductPage({ addToast }) {
  const { id }   = useParams()
  const navigate = useNavigate()
  const product  = products.find(p => p.id === id)

  const { addToCart }            = useCart()
  const { toggle, isWished }     = useWishlist()
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[2] || product?.sizes?.[0])
  const [qty,  setQty]           = useState(1)
  const [imgIdx, setImgIdx]      = useState(0)
  const [tab,  setTab]           = useState('description')
  const [added, setAdded]        = useState(false)

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <h2>Product not found</h2>
        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/shop')}>Back to Shop</button>
      </div>
    )
  }

  const wished   = isWished(product.id)
  const related  = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const imgs     = product.images?.length ? product.images : [product.image]

  const handleAddToCart = () => {
    if (!selectedSize) { addToast?.({ message: 'Please select a size', type: 'error' }); return }
    addToCart({
      id: product.id, name: product.name, brand: product.brand,
      price: product.price, originalPrice: product.originalPrice,
      image: product.image, size: selectedSize, qty,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
    addToast?.({ message: `${product.name} added to cart!` })
  }

  const handleWishlist = () => {
    toggle(product.id)
    addToast?.({ message: wished ? 'Removed from wishlist' : 'Saved to wishlist!' })
  }

  return (
    <>
      <Helmet>
        <title>{product.name} – {product.brand} | LuxeStore</title>
        <meta name="description" content={`Buy ${product.name} by ${product.brand} at LuxeStore. ₹${product.price.toLocaleString('en-IN')} – ${product.description.slice(0,120)}`} />
        <link rel="canonical" href={`https://luxestore.in/product/${product.id}`} />
      </Helmet>

      <div className="product-page">
        <div className="container">

          {/* Breadcrumb */}
          <nav className="breadcrumb" style={{ padding: '20px 0' }} aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <Link to="/shop">Shop</Link>
            <span className="sep">/</span>
            <Link to={`/shop?category=${product.category}`} style={{ textTransform: 'capitalize' }}>{product.category}</Link>
            <span className="sep">/</span>
            <span>{product.name}</span>
          </nav>

          <div className="product-layout">
            {/* Gallery */}
            <div className="product-gallery">
              <div className="product-gallery__main">
                <img
                  src={imgs[imgIdx]}
                  alt={product.name}
                  className="product-gallery__img"
                  loading="eager"
                />
                {imgs.length > 1 && (
                  <>
                    <button className="gallery-nav gallery-nav--prev" onClick={() => setImgIdx(i => (i - 1 + imgs.length) % imgs.length)} aria-label="Previous image">
                      <ChevronLeft size={18} />
                    </button>
                    <button className="gallery-nav gallery-nav--next" onClick={() => setImgIdx(i => (i + 1) % imgs.length)} aria-label="Next image">
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
                {product.discount >= 20 && (
                  <div className="product-gallery__discount">-{product.discount}%</div>
                )}
              </div>
              {imgs.length > 1 && (
                <div className="product-gallery__thumbs">
                  {imgs.map((img, i) => (
                    <button
                      key={i}
                      className={`product-gallery__thumb${i === imgIdx ? ' active' : ''}`}
                      onClick={() => setImgIdx(i)}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img src={img} alt={`${product.name} view ${i + 1}`} loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="product-details">
              <div className="product-details__brand">
                <span className="badge badge-pink">{product.brand}</span>
                {product.isNew && <span className="badge badge-blue">New Arrival</span>}
                {product.isTrending && <span className="badge" style={{ background: '#fff3cd', color: '#92400e' }}>🔥 Trending</span>}
              </div>

              <h1 className="product-details__name">{product.name}</h1>

              {/* Rating */}
              <div className="product-details__rating">
                <div className="stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <span>{product.rating}</span>
                <a href="#reviews" className="product-details__reviews">
                  {product.reviews.toLocaleString()} reviews
                </a>
                <span className="product-details__sold">{product.sold.toLocaleString()} sold</span>
              </div>

              {/* Price */}
              <div className="product-details__price-wrap">
                <span className="product-details__price">{formatPrice(product.price)}</span>
                <span className="price-original">{formatPrice(product.originalPrice)}</span>
                <span className="price-discount">{product.discount}% off</span>
              </div>
              <p className="product-details__saving">
                You save {formatPrice(product.originalPrice - product.price)} on this purchase
              </p>

              <hr className="product-details__divider" />

              {/* Colors */}
              {product.colors?.length > 1 && (
                <div className="product-details__option">
                  <span className="product-details__option-label">Colour</span>
                  <div className="color-swatches">
                    {product.colors.map((c, i) => (
                      <button
                        key={i}
                        className={`color-swatch${i === 0 ? ' active' : ''}`}
                        style={{ background: c }}
                        aria-label={`Select colour ${c}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes?.length > 0 && (
                <div className="product-details__option">
                  <div className="product-details__option-header">
                    <span className="product-details__option-label">Size: <strong>{selectedSize}</strong></span>
                    <button className="size-guide-link">Size Guide</button>
                  </div>
                  <div className="size-options">
                    {product.sizes.map(s => (
                      <button
                        key={s}
                        className={`size-btn${selectedSize === s ? ' active' : ''}`}
                        onClick={() => setSelectedSize(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Qty */}
              <div className="product-details__option">
                <span className="product-details__option-label">Quantity</span>
                <div className="qty-control qty-control--lg">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity">
                    <Minus size={16} />
                  </button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} aria-label="Increase quantity">
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* CTA */}
              <div className="product-details__ctas">
                <button
                  className={`btn btn-primary btn-lg product-details__add-btn${added ? ' added' : ''}`}
                  onClick={handleAddToCart}
                >
                  {added ? <><Check size={18} /> Added!</> : <><ShoppingBag size={18} /> Add to Cart</>}
                </button>
                <button
                  className={`product-details__wish-btn${wished ? ' wished' : ''}`}
                  onClick={handleWishlist}
                  aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart size={22} fill={wished ? 'currentColor' : 'none'} />
                </button>
                <button className="product-details__share-btn" aria-label="Share product">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Trust badges */}
              <div className="product-details__trust">
                <div className="trust-item"><Truck size={16} /><span>Free delivery on orders above ₹999</span></div>
                <div className="trust-item"><RotateCcw size={16} /><span>Easy 30-day returns</span></div>
                <div className="trust-item"><Shield size={16} /><span>100% authentic product</span></div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="product-tabs-section">
            <div className="product-info-tabs">
              {['description', 'details', 'reviews'].map(t => (
                <button
                  key={t}
                  className={`product-info-tab${tab === t ? ' active' : ''}`}
                  onClick={() => setTab(t)}
                  style={{ textTransform: 'capitalize' }}
                >
                  {t} {t === 'reviews' && `(${product.reviews.toLocaleString()})`}
                </button>
              ))}
            </div>

            <div className="product-tab-content">
              {tab === 'description' && (
                <div>
                  <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--gray-600)', maxWidth: 720 }}>
                    {product.description}
                  </p>
                </div>
              )}
              {tab === 'details' && (
                <table className="product-table">
                  <tbody>
                    <tr><td>Brand</td><td>{product.brand}</td></tr>
                    <tr><td>Category</td><td style={{ textTransform: 'capitalize' }}>{product.category}</td></tr>
                    <tr><td>Available Sizes</td><td>{product.sizes?.join(', ')}</td></tr>
                    <tr><td>Rating</td><td>{product.rating} / 5 ({product.reviews.toLocaleString()} reviews)</td></tr>
                    <tr><td>SKU</td><td>{product.id.toUpperCase()}</td></tr>
                    <tr><td>Availability</td><td>{product.inStock ? '✅ In Stock' : '❌ Out of Stock'}</td></tr>
                  </tbody>
                </table>
              )}
              {tab === 'reviews' && (
                <div className="reviews-summary">
                  <div className="reviews-score">
                    <strong>{product.rating}</strong>
                    <div className="stars">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} size={20} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                    <span>{product.reviews.toLocaleString()} verified ratings</span>
                  </div>
                  <div className="reviews-bars">
                    {[5,4,3,2,1].map(star => (
                      <div key={star} className="reviews-bar-row">
                        <span>{star}★</span>
                        <div className="reviews-bar">
                          <div className="reviews-bar__fill" style={{
                            width: star === 5 ? '68%' : star === 4 ? '20%' : star === 3 ? '8%' : star === 2 ? '2%' : '2%'
                          }} />
                        </div>
                        <em>{star === 5 ? '68%' : star === 4 ? '20%' : star === 3 ? '8%' : star === 2 ? '2%' : '2%'}</em>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="related-section">
              <div className="section-header">
                <div>
                  <h2 className="section-title">You Might Also Like</h2>
                  <div className="divider" />
                </div>
                <Link to={`/shop?category=${product.category}`} className="btn btn-outline">View All</Link>
              </div>
              <div className="products-grid" style={{ marginTop: 24 }}>
                {related.map(p => (
                  <ProductCard key={p.id} product={p} addToast={addToast} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
