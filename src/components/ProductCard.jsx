import React from 'react';
import { Star, ShoppingCart, Eye, Check } from 'lucide-react';
import { getAssetUrl } from '../data/clientData';

export function ProductCard({ product, onSelectProduct, onAddToCart }) {
  const formatCLP = (amount) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(amount);
  };

  const placeholderImg = getAssetUrl('client_images/uploads/woocommerce-placeholder-600x600.png');

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s ease',
      position: 'relative',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
    }}
    className="product-card"
    >
      {/* Badge Overlay */}
      {product.badge && (
        <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
          <span className="badge badge-gold">{product.badge}</span>
        </div>
      )}

      {/* Product Image Container */}
      <div
        onClick={() => onSelectProduct(product)}
        style={{
          width: '100%',
          height: '230px',
          background: '#f8fafc',
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
            e.target.src = placeholderImg;
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.3)',
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
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.84rem', borderRadius: '9999px', background: '#ffffff', color: '#1b4230', fontWeight: 700 }}
          >
            <Eye size={16} />
            <span>Ver Detalle</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {product.category}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Star size={14} style={{ color: '#d97706', fill: '#d97706' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>{product.rating}</span>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>({product.reviewsCount})</span>
          </div>
        </div>

        <h3
          onClick={() => onSelectProduct(product)}
          style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', cursor: 'pointer', lineHeight: 1.35 }}
        >
          {product.title}
        </h3>

        <p style={{ fontSize: '0.85rem', color: '#64748b', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '2.55rem' }}>
          {product.shortDescription}
        </p>

        {/* Feature bullets snippet */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', margin: '0.25rem 0' }}>
          {product.features.slice(0, 2).map((feat, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#334155' }}>
              <Check size={14} style={{ color: '#166534', flexShrink: 0 }} />
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{feat}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1b4230' }}>
              {formatCLP(product.price)}
            </div>
            {product.regularPrice > product.price && (
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', textDecoration: 'line-through' }}>
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
          border-color: #cbd5e1;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
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
