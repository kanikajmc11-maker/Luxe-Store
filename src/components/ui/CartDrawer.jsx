import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/StoreContext'
import { formatPrice } from '../../data/products'
import './CartDrawer.css'

export default function CartDrawer({ open, onClose, addToast }) {
  const { cart, removeItem, updateQty, total, count, savings } = useCart()

  const handleRemove = (id, size, name) => {
    removeItem(id, size)
    addToast?.({ message: `${name} removed` })
  }

  return (
    <>
      <div className={`overlay${open ? ' active' : ''}`} onClick={onClose} />
      <div className={`cart-drawer${open ? ' cart-drawer--open' : ''}`} aria-label="Shopping cart" role="dialog">

        {/* Header */}
        <div className="cart-drawer__header">
          <div className="cart-drawer__title">
            <ShoppingBag size={20} />
            <span>My Cart</span>
            {count > 0 && <span className="cart-drawer__count">{count}</span>}
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        {cart.items.length === 0 ? (
          <div className="cart-drawer__empty">
            <div className="cart-drawer__empty-icon">
              <ShoppingBag size={48} strokeWidth={1} />
            </div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything yet.</p>
            <Link to="/shop" className="btn btn-primary" onClick={onClose}>
              Start Shopping <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-drawer__items">
              {cart.items.map((item, idx) => (
                <div key={`${item.id}-${item.size}-${idx}`} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item__img" loading="lazy" />
                  <div className="cart-item__info">
                    <span className="cart-item__brand">{item.brand}</span>
                    <p className="cart-item__name">{item.name}</p>
                    <span className="cart-item__size">Size: {item.size}</span>
                    <div className="cart-item__controls">
                      <div className="qty-control">
                        <button onClick={() => updateQty(item.id, item.size, item.qty - 1)} aria-label="Decrease quantity">
                          <Minus size={12} />
                        </button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.size, item.qty + 1)} aria-label="Increase quantity">
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="cart-item__price">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  </div>
                  <button
                    className="cart-item__remove"
                    onClick={() => handleRemove(item.id, item.size, item.name)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="cart-drawer__footer">
              {savings > 0 && (
                <div className="cart-drawer__savings">
                  🎉 You're saving {formatPrice(savings)} on this order!
                </div>
              )}
              <div className="cart-drawer__subtotal">
                <span>Subtotal ({count} items)</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <p className="cart-drawer__note">Shipping & taxes calculated at checkout</p>
              <Link to="/shop" className="btn btn-outline" onClick={onClose} style={{ width: '100%', marginBottom: 10 }}>
                Continue Shopping
              </Link>
              <button className="btn btn-primary" style={{ width: '100%' }}>
                Checkout — {formatPrice(total)} <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
