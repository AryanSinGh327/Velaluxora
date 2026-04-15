import { useState } from "react";

const products = [
  {
    name: "Tear Drop Pendant Set",
    image: "/uploads/pendant_Set2.jpg",
    description:
      "Graceful artificial jewellery set featuring a delicate chain with a sparkling teardrop pendant and matching earrings. Designed for a classy and minimal look, perfect for parties, date nights, and special occasions.",
    category: "Necklaces",
    price: 1449,
    countInStock: 1,
  },
  {
    name: "Emerald Royale Necklace Set",
    image: "/uploads/Emerald_Royale_Necklace1.jpg",
    description:
      "A statement of pure luxury, this stunning emerald-toned necklace set is crafted with intricate detailing and cascading teardrop stones that radiate elegance. Paired with matching chandelier earrings, it's designed to elevate your festive and wedding looks effortlessly.",
    category: "Necklaces",
    price: 3449,
    countInStock: 1,
  },
  {
    name: "Teardrop Diamond Choker Set",
    image: "/uploads/choker_Set2.jpg",
    description:
      "Premium artificial jewellery set featuring a stunning teardrop design choker with matching statement earrings. Crafted with high-shine stones for a luxurious and classy look—perfect for weddings, parties & festive occasions.",
    category: "Necklaces",
    price: 2249,
    countInStock: 1,
  },
  {
    name: "Marquise Luxe Ring",
    image: "/uploads/Marquise_Luxe_Ring2.jpg",
    description:
      "Elegant gold-tone ring with sparkling marquise-cut stones in a leaf design. Lightweight, stylish, and perfect for everyday luxury.",
    category: "Rings",
    price: 349,
    countInStock: 1,
  },
  {
    name: "American Diamond Necklace Set",
    image: "/uploads/Elegant_American_Diamond_Necklace_Set1.jpg",
    description:
      "Premium artificial jewellery with sparkling stones and a classy finish. Perfect for weddings, parties & festive wear.",
    category: "Necklaces",
    price: 1649,
    countInStock: 1,
  },
  {
    name: "American Diamond Necklace Set with Green Stones",
    image: "/uploads/greenstoneSet1.jpg",
    description:
      "Premium artificial jewellery set featuring a sparkling double-layer necklace with emerald-tone center stones and matching earrings. Perfect for weddings, parties, and festive wear. Lightweight, stylish, and eye-catching.",
    category: "Necklaces",
    price: 1949,
    countInStock: 1,
  },
  {
    name: "Royal Gold-Tone Designer Jewellery Set",
    image: "/uploads/gold_Set2.jpg",
    description:
      "Make a bold statement with this premium artificial jewellery set featuring a rich gold-tone finish, sparkling stones, and intricate detailing. Perfect for weddings, festive occasions, and grand parties.",
    category: "Necklaces",
    price: 2449,
    countInStock: 0,
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Name A–Z", value: "name_asc" },
];

export default function Collections() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [wishlist, setWishlist] = useState([]);
  const [quickView, setQuickView] = useState(null);

  const toggleWishlist = (name) =>
    setWishlist((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );

  const filtered = products
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "name_asc") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <>
      <style>{`
        .col-page { padding-top: 80px; }

        /* ── PAGE HERO ── */
        .col-hero {
          background: var(--charcoal);
          padding: 5rem 2rem 4rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .col-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 60% 50%, rgba(201,169,110,0.13) 0%, transparent 70%);
        }
        .col-hero__eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1rem;
          position: relative;
        }
        .col-hero__title {
          font-family: var(--ff-display);
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 300;
          color: var(--white);
          line-height: 1.05;
          position: relative;
        }
        .col-hero__title em {
          font-style: italic;
          color: var(--gold-light);
        }
        .col-hero__divider {
          width: 48px;
          height: 1px;
          background: var(--gold);
          margin: 1.5rem auto 0;
          position: relative;
        }

        /* ── TOOLBAR ── */
        .col-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 2rem 2rem 0;
          max-width: 1280px;
          margin: 0 auto;
        }

        .col-filters {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .col-filter-btn {
          font-family: var(--ff-body);
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.5rem 1.3rem;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition);
        }
        .col-filter-btn:hover,
        .col-filter-btn--active {
          background: var(--charcoal);
          color: var(--white);
          border-color: var(--charcoal);
        }

        .col-sort {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .col-sort select {
          font-family: var(--ff-body);
          font-size: 0.78rem;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text);
          padding: 0.4rem 0.8rem;
          cursor: pointer;
          outline: none;
          transition: border-color var(--transition);
        }
        .col-sort select:hover { border-color: var(--gold); }

        .col-count {
          font-size: 0.75rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        /* ── GRID ── */
        .col-grid-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 2.5rem 2rem 6rem;
        }

        /* Category label rows */
        .col-category-label {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin: 2rem 0 0.5rem;
        }
        .col-category-label span {
          font-family: var(--ff-display);
          font-size: 1.6rem;
          font-weight: 300;
          color: var(--charcoal);
          white-space: nowrap;
        }
        .col-category-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .col-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        /* ── PRODUCT CARD ── */
        .col-card {
          cursor: pointer;
          position: relative;
        }
        .col-card__img-wrap {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: #f5f0ea;
          margin-bottom: 1rem;
        }
        .col-card__img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .col-card:hover .col-card__img-wrap img { transform: scale(1.06); }

        .col-card__oos {
          position: absolute;
          inset: 0;
          background: rgba(250,247,242,0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }
        .col-card__oos span {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          border: 1px solid var(--border);
          padding: 0.4rem 0.9rem;
          background: var(--white);
        }

        .col-card__wishlist {
          position: absolute;
          top: 1rem; right: 1rem;
          background: var(--white);
          border: none;
          border-radius: 50%;
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          opacity: 0;
          transition: opacity var(--transition), color var(--transition);
          color: var(--text-muted);
          z-index: 3;
        }
        .col-card__wishlist--active { color: var(--gold); opacity: 1 !important; }
        .col-card:hover .col-card__wishlist { opacity: 1; }
        .col-card__wishlist:hover { color: var(--gold); }

        .col-card__quick {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: var(--charcoal);
          color: var(--white);
          border: none;
          padding: 0.65rem;
          font-family: var(--ff-body);
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          transform: translateY(100%);
          transition: transform var(--transition), background var(--transition);
          z-index: 3;
        }
        .col-card:hover .col-card__quick { transform: translateY(0); }
        .col-card__quick:hover { background: var(--gold); }

        .col-card__name {
          font-family: var(--ff-display);
          font-size: 1.05rem;
          font-weight: 400;
          margin-bottom: 0.5rem;
        }
        .col-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .col-card__price {
          font-size: 0.9rem;
          color: var(--gold-dark);
          font-weight: 500;
        }

        /* ── QUICK VIEW MODAL ── */
        .qv-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(26,26,24,0.55);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.25s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .qv-modal {
          background: var(--cream);
          max-width: 780px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          animation: slideUp 0.3s ease;
          position: relative;
          max-height: 90vh;
          overflow: hidden;
        }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

        .qv-img {
          aspect-ratio: 3/4;
          overflow: hidden;
        }
        .qv-img img { width: 100%; height: 100%; object-fit: cover; }

        .qv-body {
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow-y: auto;
        }
        .qv-cat {
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.8rem;
        }
        .qv-name {
          font-family: var(--ff-display);
          font-size: 1.7rem;
          font-weight: 300;
          line-height: 1.2;
          margin-bottom: 1rem;
        }
        .qv-price {
          font-size: 1.1rem;
          color: var(--gold-dark);
          font-weight: 500;
          margin-bottom: 1.2rem;
        }
        .qv-desc {
          font-size: 0.83rem;
          color: var(--text-muted);
          line-height: 1.8;
          margin-bottom: 2rem;
        }
        .qv-oos-label {
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }
        .qv-close {
          position: absolute;
          top: 1rem; right: 1rem;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-muted);
          transition: color var(--transition);
          z-index: 5;
        }
        .qv-close:hover { color: var(--charcoal); }

        /* ── EMPTY ── */
        .col-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 5rem 0;
          color: var(--text-muted);
        }
        .col-empty p:first-child {
          font-family: var(--ff-display);
          font-size: 1.4rem;
          font-weight: 300;
          margin-bottom: 0.5rem;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .col-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .col-grid { grid-template-columns: repeat(2, 1fr); }
          .qv-modal { grid-template-columns: 1fr; max-height: 85vh; overflow-y: auto; }
          .qv-img { aspect-ratio: 4/3; }
        }
        @media (max-width: 480px) {
          .col-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
          .col-toolbar { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="col-page">
        {/* PAGE HERO */}
        <div className="col-hero">
          <p className="col-hero__eyebrow">Vélaluxora</p>
          <h1 className="col-hero__title">
            Our <em>Collections</em>
          </h1>
          <div className="col-hero__divider" />
        </div>

        {/* TOOLBAR */}
        <div className="col-toolbar">
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <div className="col-filters">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`col-filter-btn ${activeCategory === cat ? "col-filter-btn--active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="col-count">{filtered.length} piece{filtered.length !== 1 ? "s" : ""}</span>
          </div>

          <div className="col-sort">
            <span>Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* GRID */}
        <div className="col-grid-wrap">
          {activeCategory === "All" ? (
            // Grouped by category
            CATEGORIES.filter((c) => c !== "All").map((cat) => {
              const items = filtered.filter((p) => p.category === cat);
              if (!items.length) return null;
              return (
                <div key={cat}>
                  <div className="col-category-label" style={{ display: "flex", alignItems: "center", gap: "1.5rem", margin: "2rem 0 1.5rem" }}>
                    <span style={{ fontFamily: "var(--ff-display)", fontSize: "1.6rem", fontWeight: 300, color: "var(--charcoal)", whiteSpace: "nowrap" }}>
                      {cat}
                    </span>
                    <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
                  </div>
                  <div className="col-grid">
                    {items.map((p) => (
                      <ProductCard
                        key={p.name}
                        product={p}
                        wishlisted={wishlist.includes(p.name)}
                        onWishlist={() => toggleWishlist(p.name)}
                        onQuickView={() => setQuickView(p)}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-grid">
              {filtered.length === 0 ? (
                <div className="col-empty">
                  <p>No pieces found</p>
                  <p>Try a different category</p>
                </div>
              ) : (
                filtered.map((p) => (
                  <ProductCard
                    key={p.name}
                    product={p}
                    wishlisted={wishlist.includes(p.name)}
                    onWishlist={() => toggleWishlist(p.name)}
                    onQuickView={() => setQuickView(p)}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* QUICK VIEW MODAL */}
      {quickView && (
        <div className="qv-backdrop" onClick={() => setQuickView(null)}>
          <div className="qv-modal" onClick={(e) => e.stopPropagation()}>
            <div className="qv-img">
              <img src={quickView.image} alt={quickView.name} />
            </div>
            <div className="qv-body">
              <p className="qv-cat">{quickView.category}</p>
              <h2 className="qv-name">{quickView.name}</h2>
              <p className="qv-price">₹{quickView.price.toLocaleString("en-IN")}</p>
              <p className="qv-desc">{quickView.description}</p>
              {quickView.countInStock === 0 ? (
                <p className="qv-oos-label">— Currently out of stock —</p>
              ) : (
                <button className="btn btn--primary">Add to Cart</button>
              )}
            </div>
            <button className="qv-close" onClick={() => setQuickView(null)} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function ProductCard({ product, wishlisted, onWishlist, onQuickView }) {
  const { name, image, price, countInStock } = product;
  return (
    <div className="col-card">
      <div className="col-card__img-wrap">
        <img src={image} alt={name} />
        {countInStock === 0 && (
          <div className="col-card__oos">
            <span>Out of Stock</span>
          </div>
        )}
        <button
          className={`col-card__wishlist ${wishlisted ? "col-card__wishlist--active" : ""}`}
          onClick={(e) => { e.stopPropagation(); onWishlist(); }}
          aria-label="Wishlist"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        <button className="col-card__quick" onClick={onQuickView}>Quick View</button>
      </div>
      <div className="col-card__body">
        <h4 className="col-card__name">{name}</h4>
        <div className="col-card__footer">
          <span className="col-card__price">₹{price.toLocaleString("en-IN")}</span>
          {countInStock > 0 ? (
            <button className="btn btn--small">Add to Cart</button>
          ) : (
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              Sold Out
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
