import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

/**
 * Crochet product card
 * - Yarn-colour swatches swap the product image and tint the stage
 * - Details accordion for yarn, size and care info
 * - Product image/name navigate to /products/:id
 * - Wishlist and add-to-basket code are retained but hidden for now
 */

const SAMPLE_PRODUCT = {
  id: 1,
  name: "Ribbed pompom beanie",
  tagline: "Hand-crocheted in soft cotton blend",
  price: 499,
  variants: [
    { name: "Sage", hex: "#9DB59A" },
    { name: "Dusty rose", hex: "#D6A2A6" },
    { name: "Lavender", hex: "#B3A6D4" },
    { name: "Mustard", hex: "#D6B058" },
    { name: "Oat", hex: "#D9CFBF" },
  ],
  details: [
    { label: "Yarn", value: "70% cotton, 30% bamboo, 4 ply" },
    { label: "Size", value: "Fits most adults, 54–58 cm head" },
    { label: "Care", value: "Hand wash cold, dry flat" },
  ],
};

function BeanieIllustration({ color }) {
  const gradientId = useId();
  const ribs = Array.from({ length: 16 }, (_, i) => 38 + i * 8.25);

  return (
    <svg
      viewBox="0 0 200 200"
      className="yc-illustration"
      aria-hidden="true"
    >
      <ellipse
        cx="100"
        cy="176"
        rx="64"
        ry="7"
        fill="rgba(43,42,51,.08)"
      />

      <circle cx="100" cy="50" r="20" fill={color} />
      <circle cx="100" cy="50" r="20" fill={`url(#${gradientId})`} />

      <path
        d="M42 138 C42 84 70 64 100 64 C130 64 158 84 158 138 Z"
        fill={color}
      />

      {[70, 85, 100, 115, 130].map((x) => (
        <path
          key={x}
          d={`M${x} 68 Q${x + (x - 100) * 0.35} 100 ${
            x + (x - 100) * 0.55
          } 136`}
          stroke="rgba(43,42,51,.1)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      ))}

      <rect
        x="34"
        y="130"
        width="132"
        height="36"
        rx="10"
        fill={color}
      />

      <rect
        x="34"
        y="130"
        width="132"
        height="36"
        rx="10"
        fill="rgba(43,42,51,.07)"
      />

      {ribs.map((x) => (
        <line
          key={x}
          x1={x}
          y1="135"
          x2={x}
          y2="161"
          stroke="rgba(43,42,51,.12)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}

      <defs>
        <radialGradient id={gradientId} cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="rgba(255,255,255,.35)" />
          <stop offset="100%" stopColor="rgba(43,42,51,.1)" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function YarnBall({ color }) {
  return (
    <svg viewBox="0 0 32 32" className="yc-yarn" aria-hidden="true">
      <circle cx="16" cy="16" r="12" fill={color} />

      <g
        fill="none"
        stroke="rgba(43,42,51,.22)"
        strokeWidth="1.1"
        strokeLinecap="round"
      >
        <path d="M7 11 Q16 16 25 9" />
        <path d="M5.5 16 Q16 22 27 14" />
        <path d="M7 22 Q16 26 25.5 20" />
        <path d="M12 5 Q9 16 13 27.5" />
      </g>

      <path
        d="M26 20 Q30 24 28 29"
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ProductCard({
  product = SAMPLE_PRODUCT,
  currency = "INR",
  locale = "en-IN",
  onAddToCart,
  onToggleWishlist,
}) {
  const [active, setActive] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [added, setAdded] = useState(false);

  const swatchRefs = useRef([]);
  const uid = useId();

  const variant = product.variants[active];

  const price = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(variant.price ?? product.price);

  useEffect(() => {
    if (!added) return;

    const timer = setTimeout(() => {
      setAdded(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [added]);

  const selectVariant = (index) => {
    setActive(index);
    setAdded(false);
  };

  const handleSwatchKeys = (event) => {
    const count = product.variants.length;
    let next = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (active + 1) % count;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (active - 1 + count) % count;
    }

    if (next === null) return;

    event.preventDefault();

    selectVariant(next);
    swatchRefs.current[next]?.focus();
  };

  const toggleSaved = () => {
    setSaved((current) => !current);
    onToggleWishlist?.(product, !saved);
  };

  const addToCart = () => {
    setAdded(true);
    onAddToCart?.({
      ...product,
      variant,
    });
  };

  return (
    <article
      className="yc-card"
      style={{
        "--yarn": variant.hex,
      }}
    >
      <div className="yc-stage">
        <svg className="yc-stitch" aria-hidden="true">
          <rect width="100%" height="100%" rx="14" ry="14" />
        </svg>

        <Link
          to={`/products/${product.id}`}
          className="yc-stage-link"
          aria-label={`View ${product.name}`}
        >
          {product.variants.map((item, index) => (
            <div
              key={item.name}
              className="yc-shot"
              data-active={index === active}
              aria-hidden={index !== active}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={`${product.name} in ${item.name}`}
                  loading="lazy"
                />
              ) : (
                <BeanieIllustration color={item.hex} />
              )}
            </div>
          ))}
        </Link>

        <button
          type="button"
          className="yc-wish yc-feature-hidden"
          aria-pressed={saved}
          aria-label={
            saved ? "Remove from wishlist" : "Save to wishlist"
          }
          onClick={toggleSaved}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 20.5s-7.5-4.6-7.5-10.1A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8c0 5.5-7.5 10.1-7.5 10.1Z" />
          </svg>
        </button>
      </div>

      <div className="yc-body">
        <header className="yc-head">
          <Link
            to={`/products/${product.id}`}
            className="yc-name-link"
          >
            <h3 className="yc-name">{product.name}</h3>
          </Link>

          <p className="yc-price">{price}</p>
        </header>

        <p className="yc-tagline">{product.tagline}</p>

        <div className="yc-colour">
          <p
            className="yc-colour-label"
            id={`${uid}-colour`}
          >
            Colour
            <span>{variant.name}</span>
          </p>

          <div
            className="yc-swatches"
            role="radiogroup"
            aria-labelledby={`${uid}-colour`}
            onKeyDown={handleSwatchKeys}
          >
            {product.variants.map((item, index) => (
              <button
                key={item.name}
                ref={(element) => {
                  swatchRefs.current[index] = element;
                }}
                type="button"
                role="radio"
                aria-checked={index === active}
                aria-label={item.name}
                title={item.name}
                tabIndex={index === active ? 0 : -1}
                className="yc-swatch"
                style={{
                  "--swatch": item.hex,
                }}
                onClick={() => selectVariant(index)}
              >
                <YarnBall color={item.hex} />
              </button>
            ))}
          </div>
        </div>

        {product.details?.length > 0 && (
          <div
            className="yc-details"
            data-open={detailsOpen}
          >
            <button
              type="button"
              className="yc-details-toggle"
              aria-expanded={detailsOpen}
              aria-controls={`${uid}-details`}
              onClick={() =>
                setDetailsOpen((current) => !current)
              }
            >
              Details
              <span
                className="yc-plus"
                aria-hidden="true"
              />
            </button>

            <div
              className="yc-details-panel"
              id={`${uid}-details`}
              aria-hidden={!detailsOpen}
            >
              <dl>
                {product.details.map((detail) => (
                  <div key={detail.label}>
                    <dt>{detail.label}</dt>
                    <dd>{detail.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}

        <button
          type="button"
          className="yc-add yc-feature-hidden"
          data-added={added}
          onClick={addToCart}
        >
          <span aria-live="polite">
            {added
              ? `Added ${variant.name} to basket`
              : "Add to basket"}
          </span>
        </button>
      </div>
    </article>
  );
}
