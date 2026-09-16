import React from 'react';
import { Star, ShoppingCart, Eye, Check, Shield } from 'lucide-react';

export function ProductCard({ product, onSelectProduct, onAddToCart }) {
  const formatCLP = (amount) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div style={{
      background: 'var(--bg-card)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-color)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      position: 'relative'
    }}
    className="product-card"
    >
      {/* Badge Overlay */}
      {product.badge && (
        <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
          <span className="badge badge-purple">{product.badge}</span>
        </div>
      )}

      {/* Product Image Container */}
      <div
        onClick={() => onSelectProduct(product)}
        style={{
          width: '100%',
          height: '210px',
          background: '#09090e',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer'
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          className="product-img"
          onError={(e) => {
            e.target.src = '/client_images/uploads/woocommerce-placeholder-600x600.png';
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(9, 9, 14, 0.4)',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem'
        }}
        className="card-overlay"
        >
          <button
            onClick={(e) => { e.stopPropagation(); onSelectProduct(product); }}
            className="btn-secondary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.82rem', borderRadius: '9999px', background: 'rgba(255,255,255,0.9)', color: '#09090e' }}
          >
            <Eye size={16} />
            <span>Ver Detalle</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {product.category}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Star size={14} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff' }}>{product.rating}</span>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>({product.reviewsCount})</span>
          </div>
        </div>

        <h3
          onClick={() => onSelectProduct(product)}
          style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', cursor: 'pointer', lineHeight: 1.35 }}
        >
          {product.title}
        </h3>

        <p style={{ fontSize: '0.85rem', color: '#94a3b8', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '2.55rem' }}>
          {product.shortDescription}
        </p>

        {/* Feature bullets snippet */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', margin: '0.25rem 0' }}>
          {product.features.slice(0, 2).map((feat, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
              <Check size={14} style={{ color: '#10b981', flexShrink: 0 }} />
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{feat}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              {formatCLP(product.price)}
            </div>
            {product.regularPrice > product.price && (
              <div style={{ fontSize: '0.78rem', color: '#64748b', textDecoration: 'line-through' }}>
                {formatCLP(product.regularPrice)}
              </div>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="btn-primary"
            style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', borderRadius: 'var(--radius-md)' }}
          >
            <ShoppingCart size={17} />
            <span>Agregar</span>
          </button>
        </div>
      </div>

      <style>{`
        .product-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-active);
          box-shadow: var(--shadow-glow);
        }
        .product-card:hover .product-img {
          transform: scale(1.05);
        }
        .product-card:hover .card-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
