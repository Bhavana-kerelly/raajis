import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import WhyUsAndFooter from '../components/WhyUsAndFooter'
import { BLOG_POSTS } from '../data/blogPosts'
import './innerPages.css'
import './blog.css'

const CATEGORIES = [
  'All',
  'Corporate Gifting',
  'Traditional Recipes',
  'Heritage & Culture',
  'Ingredients & Health',
  'Festivals',
]

export default function Blog() {
  const { slug } = useParams()
  // Directly and permanently display the 24 authentic blog articles
  const [posts] = useState(BLOG_POSTS)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeArticle, setActiveArticle] = useState(null)
  const loading = false

  // Automatically open article if URL contains :slug
  useEffect(() => {
    if (slug) {
      const match = BLOG_POSTS.find((p) => p.slug === slug || p.id === slug)
      if (match) {
        setActiveArticle(match)
      }
    }
  }, [slug])

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (activeArticle) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [activeArticle])

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveArticle(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Filtered posts based on category and search query
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory

      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.summary && post.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))

      return matchesCategory && matchesSearch
    })
  }, [posts, selectedCategory, searchQuery])

  // Top featured post
  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0]
  }, [posts])

  return (
    <motion.div
      className="page-wrapper"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Navbar />

      {/* HERO SECTION */}
      <section className="blog-hero">
        <div className="page-container">
          <div className="inner-hero-content">
            <span className="inner-eyebrow">HERITAGE TALES & CULINARY CRAFT</span>
            <h1 className="inner-title">Stories from the Hearth</h1>
            <p className="inner-subtext">
              Dive into the history of Pindi Vantalu, festive culinary traditions,
              cold-pressed ingredient secrets, and mindful snacking wisdom from Raaji's kitchen.
            </p>

            {/* Interactive Search Bar */}
            <div className="blog-search-bar">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="blog-search-icon"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search stories, recipes, or ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="blog-search-input"
                aria-label="Search blog posts"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="page-section" style={{ borderTop: 'none', paddingTop: '1.5rem' }}>
        <div className="page-container">
          {/* Category Filter Tabs */}
          <div className="category-filter-bar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-tab-btn ${selectedCategory === cat ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FEATURED SPOTLIGHT CARD (Displayed when viewing All and no search) */}
          {selectedCategory === 'All' && !searchQuery && featuredPost && (
            <motion.article
              className="blog-featured-card"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div className="featured-img-wrap">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="featured-img"
                  onError={(e) => {
                    const src = e.currentTarget.src
                    if (src.includes('.jpg')) {
                      e.currentTarget.src = src.replace('.jpg', '.png')
                    } else {
                      e.currentTarget.src = '/story-preparation.png'
                    }
                  }}
                />
                <span className="featured-pill">Featured Article</span>
              </div>

              <div className="featured-content">
                <div className="blog-meta-row">
                  <span>{featuredPost.category}</span>
                  <span className="meta-dot">•</span>
                  <span>{featuredPost.readTime}</span>
                  <span className="meta-dot">•</span>
                  <span>{featuredPost.date}</span>
                </div>

                <h2 className="featured-title">{featuredPost.title}</h2>
                <p className="featured-desc">{featuredPost.summary}</p>

                <div className="featured-footer">
                  <button
                    type="button"
                    className="read-btn"
                    onClick={() => setActiveArticle(featuredPost)}
                  >
                    Read Story
                    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {featuredPost.tags && featuredPost.tags.length > 0 && (
                    <div className="blog-tag-list" style={{ margin: 0 }}>
                      {featuredPost.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="blog-tag-pill">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          )}

          {/* ALL ARTICLES GRID */}
          <div className="blog-grid">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="blog-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.03, 0.35), duration: 0.35 }}
              >
                <div className="blog-card-media">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="blog-card-img"
                    loading="lazy"
                    onError={(e) => {
                      const src = e.currentTarget.src
                      if (src.includes('.jpg')) {
                        e.currentTarget.src = src.replace('.jpg', '.png')
                      } else {
                        e.currentTarget.src = '/story-preparation.png'
                      }
                    }}
                  />
                  <span className="blog-card-badge">{post.category}</span>
                </div>

                <div className="blog-card-body">
                  <div className="blog-meta-row">
                    <span>{post.readTime}</span>
                    <span className="meta-dot">•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-snippet">{post.summary}</p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="blog-tag-list">
                      {post.tags.map((tag) => (
                        <span key={tag} className="blog-tag-pill">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="blog-card-footer">
                    <span style={{ fontSize: '0.8rem', color: '#8C6239', fontWeight: '600' }}>
                      By {post.author}
                    </span>
                    <button
                      type="button"
                      className="blog-action-text"
                      onClick={() => setActiveArticle(post)}
                    >
                      Read Article →
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredPosts.length === 0 && !loading && (
            <div className="blog-empty-state">
              <h3 style={{ fontFamily: 'var(--font-display)', color: '#4A2A1D', marginBottom: '0.5rem' }}>
                No stories found
              </h3>
              <p style={{ color: '#6E4532', fontSize: '0.95rem' }}>
                We couldn't find any articles matching "{searchQuery}". Try searching for another ingredient or topic.
              </p>
              <button
                type="button"
                className="category-tab-btn"
                style={{ marginTop: '1rem' }}
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('All')
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FULL ARTICLE READER MODAL */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            className="article-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveArticle(null)}
          >
            <motion.div
              className="article-modal-container"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setActiveArticle(null)}
                aria-label="Close article"
              >
                ✕
              </button>

              <img
                src={activeArticle.coverImage}
                alt={activeArticle.title}
                className="modal-header-img"
                onError={(e) => {
                  const src = e.currentTarget.src
                  if (src.includes('.jpg')) {
                    e.currentTarget.src = src.replace('.jpg', '.png')
                  } else {
                    e.currentTarget.src = '/story-preparation.png'
                  }
                }}
              />

              <div className="modal-body">
                <span className="modal-category-badge">{activeArticle.category}</span>
                <h1 className="modal-title">{activeArticle.title}</h1>

                <div className="modal-meta-bar">
                  <span>Written by {activeArticle.author}</span>
                  <span className="meta-dot">•</span>
                  <span>{activeArticle.date}</span>
                  <span className="meta-dot">•</span>
                  <span>{activeArticle.readTime}</span>
                </div>

                {/* Article Highlight Quote */}
                {activeArticle.highlightQuote && (
                  <div className="modal-quote-box">
                    "{activeArticle.highlightQuote}"
                  </div>
                )}

                {/* Article Content: Handles both rich HTML string from CMS and array sections */}
                {typeof activeArticle.content === 'string' ? (
                  <div
                    className="modal-rich-content"
                    dangerouslySetInnerHTML={{ __html: activeArticle.content }}
                  />
                ) : Array.isArray(activeArticle.content) ? (
                  activeArticle.content.map((sec, idx) => (
                    <div key={idx} style={{ marginBottom: '1.4rem' }}>
                      <h3 className="modal-section-heading">{sec.heading}</h3>
                      <div className="modal-paragraph" style={{ whiteSpace: 'pre-line', lineHeight: '1.8' }}>
                        {sec.body}
                      </div>
                    </div>
                  ))
                ) : null}

                {/* Related Snack Callout */}
                {activeArticle.relatedSnack && (
                  <div className="modal-snack-callout">
                    <div className="snack-callout-text">
                      <h4>Craving This Tradition?</h4>
                      <p>
                        Taste the authentic flavor of {activeArticle.relatedSnack.name}.
                      </p>
                    </div>
                    <Link
                      to={`/snacks/${activeArticle.relatedSnack.slug}`}
                      className="read-btn"
                      style={{ textDecoration: 'none' }}
                      onClick={() => setActiveArticle(null)}
                    >
                      View Snack Details →
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <WhyUsAndFooter />
    </motion.div>
  )
}
