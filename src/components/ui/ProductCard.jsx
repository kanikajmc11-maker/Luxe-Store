import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react'
import { useCart, useWishlist } from '../../context/StoreContext'
import { formatPrice } from '../../data/products'
import './ProductCard.css'

export default function ProductCard({ product, addToast }) {
  const { addToCart }  = useCart()
  const { toggle, isWished } = useWishlist()
  const wished = isWished(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id:            product.id,
      name:          product.name,
      brand:         product.brand,
      price:         product.price,
      originalPrice: product.originalPrice,
      image:         product.image,
      size:          product.sizes?.[2] || product.sizes?.[0] || 'One Size',
    })
    addToast?.({ message: `${product.name} added to cart!` })
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(product.id)
    addToast?.({
      message: wished ? 'Removed from wishlist' : `${product.name} saved!`,
      type: wished ? 'neutral' : 'success',
    })
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card" aria-label={product.name}>
      {/* Image */}
      <div className="product-card__image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
          width="300"
          height="340"
        />

        {/* Badges */}
        <div className="product-card__badges">
          {product.isNew && <span className="product-card__badge product-card__badge--new">New</span>}
          {product.isTrending && <span className="product-card__badge product-card__badge--trend">Trending</span>}
          {product.discount >= 30 && <span className="product-card__badge product-card__badge--sale">{product.discount}% off</span>}
        </div>

        {/* Wishlist */}
        <button
          className={`product-card__wish${wished ? ' wished' : ''}`}
          onClick={handleWishlist}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={wished ? 'currentColor' : 'none'} />
        </button>

        {/* Hover overlay */}
        <div className="product-card__overlay">
          <button className="product-card__action" onClick={handleAddToCart} aria-label="Quick add to cart">
            <ShoppingBag size={16} />
            <span>Quick Add</span>
          </button>
          <Link to={`/product/${product.id}`} className="product-card__action product-card__action--view" onClick={e => e.stopPropagation()} aria-label="View product">
            <Eye size={16} />
            <span>View</span>
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="product-card__info">
        <span className="product-card__brand">{product.brand}</span>
        <h3 className="product-card__name">{product.name}</h3>

        <div className="product-card__rating">
          <Star size={12} fill="currentColor" />
          <span>{product.rating}</span>
          <em>({product.reviews.toLocaleString()})</em>
        </div>

        <div className="price-wrap">
          <span className="price">{formatPrice(product.price)}</span>
          <span className="price-original">{formatPrice(product.originalPrice)}</span>
          <span className="price-discount">{product.discount}% off</span>
        </div>
      </div>
    </Link>
  )
}
