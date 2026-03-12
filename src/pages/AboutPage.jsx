import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Heart, Globe, Users, Award, ArrowRight, Target, Leaf, Zap } from 'lucide-react'
import './AboutPage.css'

const stats = [
  { value: '50,000+', label: 'Happy Customers' },
  { value: '500+',    label: 'Premium Brands' },
  { value: '1,200+',  label: 'Products Listed' },
  { value: '4.8/5',   label: 'Average Rating' },
]

const team = [
  { name: 'Arjun Kapoor',   role: 'Founder & CEO',       img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
  { name: 'Priya Bhatia',   role: 'Head of Curation',    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80' },
  { name: 'Rohan Sharma',   role: 'Tech Lead',            img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80' },
  { name: 'Meera Iyer',     role: 'Creative Director',   img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80' },
]

const values = [
  { icon: <Target size={28} />,  title: 'Curated Quality',    desc: 'We hand-pick every product to ensure it meets our premium quality standards before it goes on the shelf.', color: '#E91E8C' },
  { icon: <Leaf size={28} />,    title: 'Sustainability',      desc: 'We partner with brands that share our commitment to ethical sourcing and sustainable practices.', color: '#16a34a' },
  { icon: <Heart size={28} />,   title: 'Customer First',      desc: 'Every decision we make starts with our customers. Your satisfaction is our north star.', color: '#ef4444' },
  { icon: <Zap size={28} />,     title: 'Fast & Reliable',     desc: 'Lightning-fast delivery, easy returns, and real-time tracking — because your time matters.', color: '#f59e0b' },
]

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About LuxeStore – Our Story & Mission</title>
        <meta name="description" content="Learn about LuxeStore, India's premium fashion destination. Our story, mission, values and the team behind the brand." />
        <link rel="canonical" href="https://luxestore.in/about" />
      </Helmet>

      <div className="about-page">
        {/* Hero */}
        <section className="about-hero">
          <div className="about-hero__bg">
            <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80" alt="LuxeStore store" loading="eager" />
            <div className="about-hero__overlay" />
          </div>
          <div className="container about-hero__content">
            <span className="badge badge-pink">Our Story</span>
            <h1>Fashion That Tells<br /><em>Your Story</em></h1>
            <p>Born in Mumbai, made for India. LuxeStore was founded with a single belief — that premium style should be accessible to everyone.</p>
          </div>
        </section>

        {/* Stats */}
        <section className="about-stats">
          <div className="container about-stats__grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-card">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="section">
          <div className="container about-mission">
            <div className="about-mission__text">
              <span className="badge badge-blue"><Globe size={12} /> Our Mission</span>
              <h2 className="section-title" style={{ marginTop: 10 }}>Redefining Premium Fashion<br />in India</h2>
              <div className="divider" style={{ background: 'linear-gradient(90deg, var(--blue-500), var(--pink-400))' }} />
              <p>LuxeStore started in 2021 when our founder Arjun couldn't find a single platform in India that combined genuine brand authenticity, curation, and a seamless shopping experience. He set out to build that platform.</p>
              <p>Today, we stock over 1,200 products from 500+ verified brands — from luxury labels to emerging Indian designers. Each product on our platform is authenticated and quality-checked before it reaches your door.</p>
              <p>We believe fashion is personal. It's how you introduce yourself without saying a word. Our mission is to give every Indian the tools to express their unique story with confidence.</p>
              <Link to="/shop" className="btn btn-primary btn-lg" style={{ marginTop: 12 }}>
                Shop the Collection <ArrowRight size={18} />
              </Link>
            </div>
            <div className="about-mission__img">
              <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=700&q=80" alt="Fashion curation" loading="lazy" />
              <div className="about-mission__img-badge">
                <Award size={20} />
                <span>Premium<br />Authenticated</span>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section about-values-section">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="badge badge-pink"><Heart size={12} /> What We Stand For</span>
              <h2 className="section-title" style={{ marginTop: 10 }}>Our Core Values</h2>
              <div className="divider" style={{ margin: '12px auto' }} />
            </div>
            <div className="values-grid">
              {values.map((v, i) => (
                <div key={i} className="value-card">
                  <div className="value-card__icon" style={{ '--c': v.color }}>{v.icon}</div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="badge badge-blue"><Users size={12} /> The People</span>
              <h2 className="section-title" style={{ marginTop: 10 }}>Meet the Team</h2>
              <div className="divider" style={{ margin: '12px auto', background: 'linear-gradient(90deg, var(--blue-500), var(--pink-400))' }} />
              <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>The passionate individuals who wake up every day to build a better fashion experience for India.</p>
            </div>
            <div className="team-grid">
              {team.map((m, i) => (
                <div key={i} className="team-card">
                  <div className="team-card__img-wrap">
                    <img src={m.img} alt={m.name} loading="lazy" />
                  </div>
                  <h4>{m.name}</h4>
                  <span>{m.role}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta">
          <div className="container about-cta__inner">
            <h2>Ready to Discover Your Style?</h2>
            <p>Join over 50,000 fashion lovers who trust LuxeStore for premium, authentic fashion delivered right to their door.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/shop" className="btn btn-primary btn-lg">Shop Now <ArrowRight size={18} /></Link>
              <Link to="/contact" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'white' }}>Contact Us</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
