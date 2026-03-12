import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle } from 'lucide-react'
import './ContactPage.css'

const faqs = [
  { q: 'How long does delivery take?', a: 'Standard delivery takes 3–5 business days. Express delivery (1–2 days) is available for most pin codes.' },
  { q: 'What is your return policy?', a: 'We offer a hassle-free 30-day return policy. Items must be in original condition with tags attached.' },
  { q: 'Are all products authentic?', a: 'Yes, 100%. Every product on LuxeStore is sourced directly from brands or authorised distributors and verified by our quality team.' },
  { q: 'Do you offer Cash on Delivery?', a: 'Yes, COD is available for orders up to ₹15,000 across most serviceable pin codes.' },
  { q: 'Can I track my order?', a: 'Absolutely. Once shipped, you\'ll receive a tracking link via SMS and email. You can also track from your order history.' },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [openFaq,   setOpenFaq]   = useState(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Helmet>
        <title>Contact Us – LuxeStore | Get in Touch</title>
        <meta name="description" content="Get in touch with LuxeStore. Customer support, order queries, returns and feedback. We're here to help." />
        <link rel="canonical" href="https://luxestore.in/contact" />
      </Helmet>

      <div className="contact-page">
        {/* Header */}
        <div className="contact-hero">
          <div className="container">
            <span className="badge badge-pink"><MessageSquare size={12} /> Get in Touch</span>
            <h1>We're Here to Help</h1>
            <p>Have a question, concern or just want to share some feedback? Our support team is available 7 days a week.</p>
          </div>
        </div>

        <div className="container contact-layout">
          {/* Info Cards */}
          <div className="contact-info">
            <div className="contact-info-card">
              <div className="contact-info-card__icon" style={{ '--c': 'var(--pink-500)' }}>
                <MapPin size={22} />
              </div>
              <div>
                <h4>Our Office</h4>
                <p>42 Fashion Street, Bandra West<br />Mumbai – 400050, Maharashtra</p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-card__icon" style={{ '--c': 'var(--blue-500)' }}>
                <Phone size={22} />
              </div>
              <div>
                <h4>Phone Support</h4>
                <p><a href="tel:+918001234567">+91 800 123 4567</a></p>
                <p><a href="tel:+918001234568">+91 800 123 4568</a></p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-card__icon" style={{ '--c': 'var(--pink-500)' }}>
                <Mail size={22} />
              </div>
              <div>
                <h4>Email Us</h4>
                <p><a href="mailto:hello@luxestore.in">hello@luxestore.in</a></p>
                <p><a href="mailto:support@luxestore.in">support@luxestore.in</a></p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-card__icon" style={{ '--c': 'var(--blue-500)' }}>
                <Clock size={22} />
              </div>
              <div>
                <h4>Business Hours</h4>
                <p>Mon – Sat: 9:00 AM – 8:00 PM</p>
                <p>Sunday: 10:00 AM – 5:00 PM</p>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="contact-map">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=600&q=80"
                alt="LuxeStore Mumbai Office Location"
                loading="lazy"
              />
              <div className="contact-map__label">
                <MapPin size={16} />
                <span>Mumbai, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div className="contact-success">
                <div className="contact-success__icon">
                  <CheckCircle size={52} />
                </div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. Our team will respond to your query within 24 hours.</p>
                <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2>Send Us a Message</h2>
                <p className="contact-form-sub">Fill out the form below and we'll get back to you as soon as possible.</p>

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form__row">
                    <div className="form-field">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        id="name" name="name" type="text"
                        placeholder="Your full name"
                        value={form.name} onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        id="email" name="email" type="email"
                        placeholder="your@email.com"
                        value={form.email} onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="subject">Subject *</label>
                    <select id="subject" name="subject" value={form.subject} onChange={handleChange} required>
                      <option value="">Select a subject…</option>
                      <option value="order">Order Enquiry</option>
                      <option value="return">Return / Refund</option>
                      <option value="product">Product Question</option>
                      <option value="partnership">Brand Partnership</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message" name="message"
                      placeholder="Tell us how we can help…"
                      rows="5"
                      value={form.message} onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* FAQ */}
        <section className="faq-section section">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="badge badge-blue">FAQs</span>
              <h2 className="section-title" style={{ marginTop: 10 }}>Frequently Asked Questions</h2>
              <div className="divider" style={{ margin: '12px auto', background: 'linear-gradient(90deg, var(--blue-500), var(--pink-400))' }} />
            </div>
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                  <button className="faq-item__q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span>{faq.q}</span>
                    <span className="faq-item__icon">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && (
                    <div className="faq-item__a">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
