import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../context/useCart.js";

// ── CONFIG: change this one line when backend is deployed ──
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CATEGORIES = ["All", "Rings", "Necklaces", "Bracelets", "Earrings"];

const SORT_OPTIONS = [
  { label: "Newest",          value: "newest"     },
  { label: "Price: Low–High", value: "price_asc"  },
  { label: "Price: High–Low", value: "price_desc" },
  { label: "Top Rated",       value: "rating"     },
];

// ── SKELETON CARD ──
function SkeletonCard() {
  return (
    <div className="product-card skeleton-card">
      <div className="product-card__img-wrap skeleton-box" />
      <div className="skeleton-line" style={{ width: "70%", marginTop: "1rem" }} />
      <div className="skeleton-line" style={{ width: "40%", marginTop: "0.5rem" }} />
    </div>
  );
}

// ── STAR RATING ──
function Stars({ rating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? "star star--filled" : "star"}>
          ★
        </span>
      ))}
    </div>
  );
}

// ── PRODUCT CARD ──
function ProductCard({ product }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const imgSrc =
    product.image?.startsWith("http")
      ? product.image
      : `${API_BASE}${product.image}`;

  return (
    <div className="product-card">
      <div className="product-card__img-wrap">
        <img src={imgSrc} alt={product.name} loading="lazy" />

        {product.countInStock === 0 && (
          <span className="product-card__tag product-card__tag--sold">Sold Out</span>
        )}
        {product.countInStock > 0 && product.countInStock <= 3 && (
          <span className="product-card__tag product-card__tag--low">
            Only {product.countInStock} left
          </span>
        )}

        <button
          className={`product-card__wishlist ${wished ? "product-card__wishlist--active" : ""}`}
          onClick={() => setWished((w) => !w)}
          aria-label="Wishlist"
        >
          <svg
            width="16" height="16" viewBox="0 0 24 24"
            fill={wished ? "currentColor" : "none"}
            stroke="currentColor" strokeWidth="1.5"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className="product-card__body">
        <p className="product-card__brand">{product.brand}</p>
        <h4>{product.name}</h4>
        <Stars rating={product.rating} />
        <div className="product-card__footer">
          <span className="product-card__price">
            ₹{product.price?.toLocaleString("en-IN")}
          </span>
          <button
            className="btn btn--small"
            disabled={product.countInStock === 0}
            onClick={handleAddToCart}
            style={{ background: added ? "var(--gold)" : undefined }}
          >
            {product.countInStock === 0 ? "Sold Out" : added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN PAGE ──
export default function CollectionsPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [sortBy, setSortBy]             = useState("newest");
  const [search, setSearch]             = useState("");
  const [searchInput, setSearchInput]   = useState("");

  // ── FETCH from your Express backend ──
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = search ? `?search=${encodeURIComponent(search)}` : "";
        const res = await fetch(`${API_BASE}/api/products${query}`);
        if (!res.ok) throw new Error(`Server responded with status ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [search]);

  // ── FILTER by category (client-side) ──
  const filtered = products.filter((p) =>
    activeCategory === "All"
      ? true
      : p.category?.toLowerCase() === activeCategory.toLowerCase()
  );

  // ── SORT (client-side) ──
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price_asc")  return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "rating")     return b.rating - a.rating;
    return 0; // newest — keep MongoDB order
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  return (
    <div className="collections-page">

      {/* ── HERO HEADER ── */}
      <div className="collections-hero">
        <div className="collections-hero__bg" />
        <div className="collections-hero__content">
          <p className="section__eyebrow">Handcrafted in India</p>
          <h1 className="collections-hero__title">Our Collections</h1>
          <p className="collections-hero__sub">
            Every piece tells a story worth wearing.
          </p>

          <form className="collections-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search rings, necklaces, gold…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* ── CONTROLS BAR ── */}
      <div className="collections-controls">
        <div className="collections-categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-pill ${activeCategory === cat ? "cat-pill--active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="collections-sort">
          <span className="collections-count">
            {loading ? "—" : `${sorted.length} piece${sorted.length !== 1 ? "s" : ""}`}
          </span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── PRODUCT GRID ── */}
      <div className="collections-grid-wrap">
        {error ? (
          <div className="collections-error">
            <p>⚠ Could not reach the server.</p>
            <p className="collections-error__detail">{error}</p>
            <p>Make sure your backend is running on <code>http://localhost:5000</code></p>
          </div>
        ) : (
          <div className="collections-grid">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
              : sorted.length === 0
              ? (
                <div className="collections-empty">
                  <p>No pieces found{search ? ` for "${search}"` : ""}.</p>
                  {search && (
                    <button
                      className="btn btn--ghost"
                      onClick={() => { setSearch(""); setSearchInput(""); }}
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              )
              : sorted.map((p) => <ProductCard key={p._id} product={p} />)
            }
          </div>
        )}
      </div>
    </div>
  );
}
