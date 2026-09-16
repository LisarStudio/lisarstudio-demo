import React, { useState } from 'react';
import { X, Star, CheckCircle, ShieldCheck, ShoppingCart, CreditCard, ArrowRight } from 'lucide-react';

export function ProductDetailModal({ product, onClose, onAddToCart, onBuyNowFlow }) {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);

  const formatCLP = (amount) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(amount);
  };

  const currentPrice = product.price + (selectedVariant ? selectedVariant.priceModifier : 0);

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedVariant);
  };

  const handleBuyNow = () => {
    onBuyNowFlow(product, quantity, selectedVariant);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-color)',
          maxWidth: '850px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem'
        }}
        id="product-detail-modal"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            color: '#94a3b8',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '9999px',
            padding: '0.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={20} />
        </button>

        {/* Left Column: Image Gallery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            width: '100%',
            height: '300px',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            background: '#09090e',
            border: '1px solid var(--border-color)'
          }}>
            <img
              src={selectedImage}
              alt={product.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = '/client_images/uploads/woocommerce-placeholder-600x600.png';
              }}
            />
          </div>

          {/* Thumbnails */}
          {product.gallery && product.gallery.length > 0 && (
            <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto' }}>
              {[product.image, ...product.gallery].map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => setSelectedImage(img)}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: selectedImage === img ? '2px solid #8b5cf6' : '1px solid rgba(255,255,255,0.1)',
                    opacity: selectedImage === img ? 1 : 0.6
                  }}
                />
              ))}
            </div>
          )}

          {/* Security Guarantee Box */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <ShieldCheck size={24} style={{ color: '#10b981', flexShrink: 0 }} />
            <div>
              <h5 style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 700 }}>Garantía & Pago Seguro Flow</h5>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Transacción encriptada Webpay Plus en CLP.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Order Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span className="badge badge-purple">{product.category}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Star size={15} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>{product.rating}</span>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>({product.reviewsCount} reseñas)</span>
              </div>
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.25 }}>{product.title}</h2>
            <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>SKU: {product.sku}</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
              {formatCLP(currentPrice * quantity)}
            </span>
            {product.regularPrice > product.price && (
              <span style={{ fontSize: '1rem', color: '#64748b', textDecoration: 'line-through' }}>
                {formatCLP(product.regularPrice * quantity)}
              </span>
            )}
          </div>

          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.5 }}>
            {product.description || product.shortDescription}
          </p>

          {/* Variants Selection */}
          {product.variants && product.variants.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                Opciones / Variantes del Plan:
              </label>
              <select
                value={selectedVariant ? selectedVariant.name : ''}
                onChange={(e) => {
                  const v = product.variants.find(item => item.name === e.target.value);
                  setSelectedVariant(v);
                }}
                className="input-field"
                style={{ fontSize: '0.88rem' }}
              >
                {product.variants.map((variant, idx) => (
                  <option key={idx} value={variant.name}>
                    {variant.name} {variant.priceModifier > 0 ? `(+${formatCLP(variant.priceModifier)})` : ''}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
              Cantidad:
            </span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden'
            }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ padding: '0.4rem 0.8rem', color: '#ffffff', fontSize: '1.1rem', fontWeight: 700 }}
              >
                -
              </button>
              <span style={{ padding: '0.4rem 1rem', fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{ padding: '0.4rem 0.8rem', color: '#ffffff', fontSize: '1.1rem', fontWeight: 700 }}
              >
                +
              </button>
            </div>
          </div>

          {/* Features Checklist */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>El plan incluye:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {product.features.map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#e2e8f0' }}>
                  <CheckCircle size={15} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button onClick={handleAddToCart} className="btn-primary" style={{ padding: '0.85rem', fontSize: '0.95rem' }}>
              <ShoppingCart size={18} />
              <span>Agregar al Carrito</span>
            </button>
            <button onClick={handleBuyNow} className="btn-emerald" style={{ padding: '0.85rem', fontSize: '0.95rem' }}>
              <CreditCard size={18} />
              <span>Pagar Directo con Flow (Webpay)</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #product-detail-modal { grid-template-columns: 1fr !important; padding: 1.25rem !important; }
        }
      `}</style>
    </div>
  );
}
