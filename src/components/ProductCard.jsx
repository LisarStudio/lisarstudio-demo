import React from 'react';
import { Star } from 'lucide-react';
import { getAssetUrl } from '../data/clientData';

export function ProductCard({ product, onSelectProduct, onAddToCart }) {
  const formatCLP = (amount) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(amount);
  };

  const placeholderImg = getAssetUrl('client_images/products/corona_rosas_lirios.jpg');

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.2s ease',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}
    className="product-card"
    >
      {/* Product Image Container */}
      <div
        onClick={() => onSelectProduct(product)}
        style={{
          width: '100%',
          height: '240px',
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
            transition: 'transform 0.3s ease'
          }}
          className="product-img"
          onError={(e) => {
            e.target.src = placeholderImg;
          }}
        />
      </div>

      {/* Product Info (Centered style like Imagen 1) */}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', textAlign: 'center', gap: '0.4rem' }}>
        <h3
          onClick={() => onSelectProduct(product)}
          style={{ fontSize: '0.92rem', fontWeight: 600, color: '#1e293b', cursor: 'pointer', lineHeight: 1.3, minHeight: '2.5rem' }}
        >
          {product.title}
        </h3>

        {/* Rating Stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={13} style={{ color: '#d1d5db', fill: '#d1d5db' }} />
          ))}
        </div>

        {/* Price */}
        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0' }}>
          {formatCLP(product.price)}
        </div>

        {/* Green "Ver producto" Button */}
        <button
          onClick={() => onSelectProduct(product)}
          style={{
            width: '100%',
            background: '#66a105',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.82rem',
            padding: '0.55rem 1rem',
            borderRadius: '4px',
            marginTop: 'auto',
            transition: 'background 0.2s ease'
          }}
          className="btn-ver-producto"
        >
          Ver producto
        </button>
      </div>

      <style>{`
        .product-card:hover {
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .product-card:hover .product-img {
          transform: scale(1.04);
        }
        .btn-ver-producto:hover {
          background: #568804 !important;
        }
      `}</style>
    </div>
  );
}
