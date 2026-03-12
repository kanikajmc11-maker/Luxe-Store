import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Heart, ShoppingBag } from 'lucide-react'
import { useWishlist } from '../context/StoreContext'
import { products } from '../data/products'
import ProductCard from '../components/ui/ProductCard'
import './WishlistPage.css'

export default function WishlistPage({ addToast }) {
  const { wishlist } = useWishlist()
  const wishedProducts = products.filter(p => wishlist.ids.includes(p.id))

  return (
    <>
      <Helmet>
        <title>My Wishlist – LuxeStore</title>
        <meta name="description" content="View and manage your saved items on LuxeStore." />
      </Helmet>

      <div className="wishlist-page">
        <div className="container">
          {/* Header */}
          <div className="wishlist-header">
            <div>
              <nav className="breadcrumb" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span className="sep">/</span>
                <span>Wishlist</span>
              </nav>
              <h1 className="wishlist-title">
                <Heart size={28} />
                My Wishlist
              </h1>
              {wishedProducts.length > 0 && (
                <p className="wishlist-count">{wishedProducts.length} item{wishedProducts.length !== 1 ? 's' : ''} saved</p>
              )}
            </div>
          </div>

          {wishedProducts.length === 0 ? (
            <div className="wishlist-empty">
              <div className="wishlist-empty__icon">
                <Heart size={56} strokeWidth={1} />
              </div>
              <h2>Your wishlist is empty</h2>
              <p>Save items you love by clicking the heart icon on any product. They'll appear here for easy access.</p>
              <Link to="/shop" className="btn btn-primary btn-lg">
                <ShoppingBag size={18} />
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="products-grid">
              {wishedProducts.map(p => (
                <ProductCard key={p.id} product={p} addToast={addToast} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
