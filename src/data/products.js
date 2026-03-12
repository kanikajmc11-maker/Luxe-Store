// ===========================
// LUXESTORE – Product Data
// ===========================

import kurta from "../assets/images/kurta.png"
import blazer from "../assets/images/blazer.png"
import toteBag from "../assets/images/tote-bag.png"

// ===========================
// Categories
// ===========================

export const categories = [
  { id: 'clothes', label: 'Clothes', icon: 'Shirt', count: 124, image: 'https://images.unsplash.com/photo-1542295669297-4d352b042bca?w=600&q=80' },
  { id: 'footwear', label: 'Footwear', icon: 'Footprints', count: 86, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80' },
  { id: 'jewellery', label: 'Jewellery', icon: 'Gem', count: 63, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80' },
  { id: 'perfume', label: 'Perfume', icon: 'Wind', count: 42, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80' },
  { id: 'bags', label: 'Bags', icon: 'ShoppingBag', count: 78, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80' },
  { id: 'sunglasses', label: 'Sunglasses', icon: 'Glasses', count: 35, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80' },
  { id: 'watches', label: 'Watches', icon: 'Watch', count: 54, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80' },
  { id: 'skincare', label: 'Skincare', icon: 'Sparkles', count: 91, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80' },
]

// ===========================
// Products
// ===========================

export const products = [

  // CLOTHES
  {
    id: 'p005',
    name: 'Embroidered Kurta Set',
    brand: 'Fabindia',
    category: 'clothes',
    tags: ['women','ethnic','new'],
    price: 3799,
    originalPrice: 5200,
    discount: 27,
    rating: 4.8,
    reviews: 287,
    sold: 1560,
    image: kurta,
    images: [kurta],
    description: 'Exquisitely embroidered kurta set in soft cotton.',
    sizes: ['XS','S','M','L','XL'],
    colors: ['#fce7f3','#f0fdf4','#fff7ed'],
    isNew: true,
    isTrending: true,
    inStock: true,
  },

  {
    id: 'p002',
    name: 'Relaxed Linen Blazer',
    brand: 'H&M',
    category: 'clothes',
    tags: ['women','office'],
    price: 3299,
    originalPrice: 4500,
    discount: 27,
    rating: 4.4,
    reviews: 189,
    sold: 874,
    image: blazer,
    images: [blazer],
    description: 'Effortlessly chic linen blazer.',
    sizes: ['XS','S','M','L','XL'],
    colors: ['#d6d3d1','#fef3c7','#e0f2fe'],
    isNew: true,
    isTrending: false,
    inStock: true,
  },

  // BAGS
  {
    id: 'p013',
    name: 'Canvas Tote Bag',
    brand: 'Lavie',
    category: 'bags',
    tags: ['unisex','casual'],
    price: 1299,
    originalPrice: 1899,
    discount: 32,
    rating: 4.3,
    reviews: 512,
    sold: 3200,
    image: toteBag,
    images: [toteBag],
    description: 'Spacious canvas tote bag.',
    sizes: ['One Size'],
    colors: ['#f5f0e8','#1c1917','#dbeafe'],
    isNew: true,
    isTrending: false,
    inStock: true,
  },

  // FOOTWEAR
  {
    id: 'p020',
    name: 'Classic White Sneakers',
    brand: 'Nike',
    category: 'footwear',
    tags: ['men','casual'],
    price: 4999,
    originalPrice: 6500,
    discount: 23,
    rating: 4.6,
    reviews: 421,
    sold: 2400,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80'],
    description: 'Minimal white sneakers.',
    sizes: ['7','8','9','10'],
    colors: ['#ffffff','#000000'],
    isNew: false,
    isTrending: true,
    inStock: true,
  },

  // JEWELLERY
  {
    id: 'p021',
    name: 'Minimal Gold Necklace',
    brand: 'Tanishq',
    category: 'jewellery',
    tags: ['women','luxury'],
    price: 8999,
    originalPrice: 11000,
    discount: 18,
    rating: 4.7,
    reviews: 198,
    sold: 980,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80'],
    description: 'Elegant gold necklace.',
    sizes: ['One Size'],
    colors: ['#d4af37'],
    isNew: false,
    isTrending: true,
    inStock: true,
  },

  // PERFUME
  {
    id: 'p022',
    name: 'Luxury Oud Perfume',
    brand: 'Tom Ford',
    category: 'perfume',
    tags: ['men','luxury'],
    price: 6999,
    originalPrice: 8500,
    discount: 17,
    rating: 4.8,
    reviews: 356,
    sold: 1600,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80'],
    description: 'Premium oud fragrance.',
    sizes: ['50ml','100ml'],
    colors: ['#000000'],
    isNew: true,
    isTrending: true,
    inStock: true,
  }

]

// ===========================
// Testimonials
// ===========================

export const testimonials = [
  {
    id: 't1',
    rating: 5,
    text: 'Amazing quality and fast delivery. I am in love with the kurta set!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80',
    name: 'Aditi Sharma',
    role: 'Fashion Blogger',
    location: 'Mumbai',
    date: 'March 2026',
  }
]

// ===========================
// Hero
// ===========================

export const heroSlides = [
  {
    id: 1,
    tag: 'New Collection',
    title: 'Modern Sunglasses',
    subtitle: 'Trending Accessories',
    description: 'Step into style with our curated collection.',
    cta: 'Shop Now',
    ctaLink: '/shop',
    startingFrom: 649,
    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&q=80',
    accent: '#E91E8C',
  }
]

// ===========================
// Services
// ===========================

export const services = [
  { icon: 'Truck', title: 'Free Delivery', desc: 'On orders above ₹999', color: '#E91E8C' },
  { icon: 'RotateCcw', title: '30-Day Returns', desc: 'Hassle-free returns', color: '#3b82f6' },
  { icon: 'Shield', title: '100% Authentic', desc: 'Genuine products', color: '#E91E8C' },
  { icon: 'Headphones', title: '24/7 Support', desc: 'Always here for you', color: '#3b82f6' },
]

// ===========================
// Price Formatter
// ===========================

export const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price)

