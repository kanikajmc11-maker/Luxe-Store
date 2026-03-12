import { createContext, useContext, useReducer, useCallback } from 'react'

// ─── CART ───────────────────────────────────────────────────────────────────

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.items.find(
        i => i.id === action.item.id && i.size === action.item.size
      )
      if (exists) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.item.id && i.size === action.item.size
              ? { ...i, qty: i.qty + (action.item.qty || 1) }
              : i
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.item, qty: action.item.qty || 1 }] }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => !(i.id === action.id && i.size === action.size)) }
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.id && i.size === action.size ? { ...i, qty: Math.max(1, action.qty) } : i
        ),
      }
    case 'CLEAR':
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] })

  const addToCart  = useCallback((item) => dispatch({ type: 'ADD', item }), [])
  const removeItem = useCallback((id, size) => dispatch({ type: 'REMOVE', id, size }), [])
  const updateQty  = useCallback((id, size, qty) => dispatch({ type: 'UPDATE_QTY', id, size, qty }), [])
  const clearCart  = useCallback(() => dispatch({ type: 'CLEAR' }), [])

  const total    = cart.items.reduce((s, i) => s + i.price * i.qty, 0)
  const count    = cart.items.reduce((s, i) => s + i.qty, 0)
  const savings  = cart.items.reduce((s, i) => s + (i.originalPrice - i.price) * i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, updateQty, clearCart, total, count, savings }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

// ─── WISHLIST ────────────────────────────────────────────────────────────────

const WishlistContext = createContext(null)

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return state.ids.includes(action.id)
        ? { ids: state.ids.filter(i => i !== action.id) }
        : { ids: [...state.ids, action.id] }
    default:
      return state
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, dispatch] = useReducer(wishlistReducer, { ids: [] })
  const toggle     = useCallback((id) => dispatch({ type: 'TOGGLE', id }), [])
  const isWished   = useCallback((id) => wishlist.ids.includes(id), [wishlist])

  return (
    <WishlistContext.Provider value={{ wishlist, toggle, isWished }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
