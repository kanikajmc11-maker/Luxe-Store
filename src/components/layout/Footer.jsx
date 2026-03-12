import { Link } from 'react-router-dom'
import { Instagram, Twitter, Facebook, Youtube, MapPin, Phone, Mail, Heart } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">

          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <div className="footer__logo-mark">L</div>
              <div>
                <strong>LuxeStore</strong>
                <span>Premium Fashion</span>
              </div>
            </Link>
            <p>Your curated destination for premium fashion, accessories, and lifestyle products. Discover trends, find your style, and express yourself.</p>
            <div className="footer__social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="https://twitter.com"   target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="https://facebook.com"  target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="https://youtube.com"   target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/shop?tag=new">New Arrivals</Link></li>
              <li><Link to="/shop?tag=trending">Trending</Link></li>
              <li><Link to="/shop?discount=true">Sale</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer__col">
            <h4>Categories</h4>
            <ul>
              <li><Link to="/shop?category=clothes">Clothing</Link></li>
              <li><Link to="/shop?category=footwear">Footwear</Link></li>
              <li><Link to="/shop?category=jewellery">Jewellery</Link></li>
              <li><Link to="/shop?category=bags">Bags</Link></li>
              <li><Link to="/shop?category=watches">Watches</Link></li>
              <li><Link to="/shop?category=sunglasses">Sunglasses</Link></li>
              <li><Link to="/shop?category=skincare">Skincare</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="footer__col">
            <h4>Customer Care</h4>
            <ul>
              <li><a href="#">Track My Order</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">Size Guide</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4>Get in Touch</h4>
            <div className="footer__contact">
              <div className="footer__contact-item">
                <MapPin size={16} />
                <span>42 Fashion Street, Bandra West, Mumbai – 400050</span>
              </div>
              <div className="footer__contact-item">
                <Phone size={16} />
                <a href="tel:+918001234567">+91 800 123 4567</a>
              </div>
              <div className="footer__contact-item">
                <Mail size={16} />
                <a href="mailto:hello@luxestore.in">hello@luxestore.in</a>
              </div>
            </div>
            <div className="footer__newsletter">
              <p>Get exclusive deals in your inbox:</p>
              <form className="footer__newsletter-form" onSubmit={e => e.preventDefault()}>
                <input type="email" placeholder="Your email address" aria-label="Email for newsletter" />
                <button type="submit" className="btn btn-primary btn-sm">Join</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} LuxeStore. All rights reserved. Made with <Heart size={13} fill="currentColor" /> in India.</p>
          <div className="footer__payment">
            <span>We accept:</span>
            <div className="footer__payment-icons">
              <span className="payment-chip">Visa</span>
              <span className="payment-chip">Mastercard</span>
              <span className="payment-chip">UPI</span>
              <span className="payment-chip">PayTM</span>
              <span className="payment-chip">COD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
