import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { SlidersHorizontal, Grid3X3, List, ChevronDown, X, Search } from 'lucide-react'
import ProductCard from '../components/ui/ProductCard'
import { products, categories } from '../data/products'
import './ShopPage.css'

const SORT_OPTIONS = [
  { value: 'trending',  label: 'Trending First' },
  { value: 'newest',    label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc',label: 'Price: High to Low' },
  { value: 'rating',    label: 'Highest Rated' },
  { value: 'popular',   label: 'Most Popular' },
]

export default function ShopPage({ addToast }) {
  const [params, setParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [view,    setView]   = useState('grid')
  const [sort,    setSort]   = useState('trending')
  const [priceRange, setPriceRange] = useState([0, 20000])

  const qCategory = params.get('category') || ''
  const qTag      = params.get('tag')      || ''
  const qQuery    = params.get('q')        || ''

  const [selectedCats, setSelectedCats] = useState(() => qCategory ? [qCategory] : [])
  const [selectedTags, setSelectedTags] = useState(() => qTag ? [qTag] : [])
  const [searchLocal, setSearchLocal]   = useState(qQuery)

  // Sync URL params to filters
  useEffect(() => {
    if (qCategory && !selectedCats.includes(qCategory)) setSelectedCats([qCategory])
  }, [qCategory])

  useEffect(() => {
    if (qTag && !selectedTags.includes(qTag)) setSelectedTags([qTag])
  }, [qTag])

  useEffect(() => { setSearchLocal(qQuery) }, [qQuery])

  const allTags = [...new Set(products.flatMap(p => p.tags))]

  const toggleCat = (id) => {
    setSelectedCats(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id])
  }

  const toggleTag = (t) => {
    setSelectedTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }

  const clearFilters = () => {
    setSelectedCats([])
    setSelectedTags([])
    setPriceRange([0, 20000])
    setSearchLocal('')
    setParams({})
  }

  const filtered = useMemo(() => {
    let list = [...products]
    if (selectedCats.length) list = list.filter(p => selectedCats.includes(p.category))
    if (selectedTags.length) list = list.filter(p => selectedTags.some(t => p.tags.includes(t)))
    if (searchLocal)         list = list.filter(p =>
      p.name.toLowerCase().includes(searchLocal.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchLocal.toLowerCase())
    )
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    switch (sort) {
      case 'price-asc':  return list.sort((a,b) => a.price - b.price)
      case 'price-desc': return list.sort((a,b) => b.price - a.price)
      case 'rating':     return list.sort((a,b) => b.rating - a.rating)
      case 'popular':    return list.sort((a,b) => b.sold - a.sold)
      case 'newest':     return list.sort((a,b) => b.isNew - a.isNew)
      default:           return list.sort((a,b) => b.isTrending - a.isTrending)
    }
  }, [selectedCats, selectedTags, searchLocal, priceRange, sort])

  const activeFiltersCount =
    selectedCats.length + selectedTags.length +
    (priceRange[0] > 0 || priceRange[1] < 20000 ? 1 : 0)

  return (
    <>
      <Helmet>
        <title>Shop All Products – LuxeStore | Premium Fashion India</title>
        <meta name="description" content="Browse our complete collection of premium fashion, jewellery, footwear, bags and lifestyle products. Filter by category, brand, and price." />
        <link rel="canonical" href="https://luxestore.in/shop" />
      </Helmet>

      <div className="shop-page">
        {/* Page Header */}
        <div className="shop-hero">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span className="sep">/</span>
              <span>Shop</span>
              {qCategory && <><span className="sep">/</span><span style={{ textTransform: 'capitalize' }}>{qCategory}</span></>}
            </nav>
            <h1 className="shop-hero__title">
              {selectedCats.length === 1
                ? categories.find(c => c.id === selectedCats[0])?.label || 'All Products'
                : qTag ? `${qTag.charAt(0).toUpperCase() + qTag.slice(1)}'s Collection`
                : searchLocal ? `Search: "${searchLocal}"`
                : 'All Products'}
            </h1>
            <p className="shop-hero__sub">{filtered.length} products found</p>
          </div>
        </div>

        <div className="container shop-layout">
          {/* Sidebar */}
          <aside className={`shop-sidebar${filtersOpen ? ' shop-sidebar--open' : ''}`}>
            <div className="shop-sidebar__header">
              <h3>Filters {activeFiltersCount > 0 && <span className="filter-count">{activeFiltersCount}</span>}</h3>
              {activeFiltersCount > 0 && (
                <button className="clear-filters" onClick={clearFilters}>Clear all</button>
              )}
              <button className="icon-btn shop-sidebar__close" onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                <X size={18} />
              </button>
            </div>

            {/* Search */}
            <div className="filter-group">
              <h4>Search</h4>
              <div className="filter-search-wrap">
                <Search size={14} className="filter-search-icon" />
                <input
                  type="search"
                  placeholder="Search products…"
                  value={searchLocal}
                  onChange={e => setSearchLocal(e.target.value)}
                  className="filter-search"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="filter-group">
              <h4>Categories</h4>
              <div className="filter-options">
                {categories.map(cat => (
                  <label key={cat.id} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedCats.includes(cat.id)}
                      onChange={() => toggleCat(cat.id)}
                    />
                    <span className="filter-checkbox__box" />
                    <span>{cat.label}</span>
                    <em>{cat.count}</em>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="filter-group">
              <h4>Price Range</h4>
              <div className="price-chips">
                {[[0,1000],[1000,3000],[3000,7000],[7000,20000]].map(([min, max]) => (
                  <button
                    key={`${min}-${max}`}
                    className={`chip${priceRange[0] === min && priceRange[1] === max ? ' active' : ''}`}
                    onClick={() => setPriceRange([min, max])}
                  >
                    {min === 0 ? `Under ₹${max.toLocaleString('en-IN')}` : `₹${min.toLocaleString('en-IN')} – ₹${max.toLocaleString('en-IN')}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="filter-group">
              <h4>Tags</h4>
              <div className="filter-tags">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    className={`chip${selectedTags.includes(tag) ? ' active' : ''}`}
                    onClick={() => toggleTag(tag)}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="shop-main">
            {/* Toolbar */}
            <div className="shop-toolbar">
              <button
                className="btn btn-outline btn-sm filter-toggle"
                onClick={() => setFiltersOpen(o => !o)}
              >
                <SlidersHorizontal size={15} />
                Filters
                {activeFiltersCount > 0 && <span className="filter-count">{activeFiltersCount}</span>}
              </button>

              <div className="shop-toolbar__right">
                <select
                  className="sort-select"
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  aria-label="Sort products"
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>

                <div className="view-toggle">
                  <button
                    className={`icon-btn${view === 'grid' ? ' active' : ''}`}
                    onClick={() => setView('grid')}
                    aria-label="Grid view"
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    className={`icon-btn${view === 'list' ? ' active' : ''}`}
                    onClick={() => setView('list')}
                    aria-label="List view"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filters */}
            {(selectedCats.length > 0 || selectedTags.length > 0) && (
              <div className="active-filters">
                {selectedCats.map(id => {
                  const cat = categories.find(c => c.id === id)
                  return (
                    <span key={id} className="active-filter-chip">
                      {cat?.label}
                      <button onClick={() => toggleCat(id)} aria-label={`Remove ${cat?.label} filter`}><X size={12} /></button>
                    </span>
                  )
                })}
                {selectedTags.map(tag => (
                  <span key={tag} className="active-filter-chip" style={{ textTransform: 'capitalize' }}>
                    {tag}
                    <button onClick={() => toggleTag(tag)} aria-label={`Remove ${tag} filter`}><X size={12} /></button>
                  </span>
                ))}
              </div>
            )}

            {/* Products */}
            {filtered.length === 0 ? (
              <div className="shop-empty">
                <div className="shop-empty__icon">🛍️</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms.</p>
                <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
              </div>
            ) : (
              <div className={view === 'grid' ? 'products-grid' : 'products-list'}>
                {filtered.map(p => (
                  <ProductCard key={p.id} product={p} addToast={addToast} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Overlay for mobile filter sidebar */}
      <div className={`overlay${filtersOpen ? ' active' : ''}`} onClick={() => setFiltersOpen(false)} />
    </>
  )
}
