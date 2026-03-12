import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider, WishlistProvider } from './context/StoreContext'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CartDrawer from './components/ui/CartDrawer'
import ToastContainer from './components/ui/ToastContainer'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import WishlistPage from './pages/WishlistPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import { useState } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [toasts,  setToasts]   = useState([])

  const addToast = ({ message, type = 'success' }) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }

  return (
    <BrowserRouter>
      <WishlistProvider>
        <CartProvider>
          <ScrollToTop />
          <Navbar onCartOpen={() => setCartOpen(true)} />
          <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} addToast={addToast} />

          <Routes>
            <Route path="/"          element={<HomePage  addToast={addToast} onCartOpen={() => setCartOpen(true)} />} />
            <Route path="/shop"      element={<ShopPage  addToast={addToast} />} />
            <Route path="/product/:id" element={<ProductPage addToast={addToast} />} />
            <Route path="/wishlist"  element={<WishlistPage addToast={addToast} />} />
            <Route path="/about"     element={<AboutPage />} />
            <Route path="/contact"   element={<ContactPage />} />
          </Routes>

          <Footer />
          <ToastContainer toasts={toasts} />
        </CartProvider>
      </WishlistProvider>
    </BrowserRouter>
  )
}
