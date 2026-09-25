import React, { useState } from 'react';
import { X, Star, CheckCircle, ShieldCheck, ShoppingCart, CreditCard } from 'lucide-react';
import { getAssetUrl } from '../data/clientData';

export function ProductDetailModal({ product, onClose, onAddToCart, onBuyNowFlow }) {
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

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

  const fallbackImg = getAssetUrl('client_images/2021/04/Corona-de-Flores.png');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid #e2e8f0',
          maxWidth: '850px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
        }}
        id="product-detail-modal"
      >
        {/* Close Button */}
        <button
          aria-label="Cerrar producto"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            color: '#64748b',
            background: '#f1f5f9',
            borderRadius: '9999px',
            padding: '0.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #e2e8f0'
          }}
        >
          <X size={20} />
        </button>

        {/* Left Column: Image Gallery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            width: '100%',
            height: '350px',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5rem'
          }}>
            <img
              src={selectedImage}
              alt={product.title}
              style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain' }}
              onError={(e) => {
                e.target.src = fallbackImg;
              }}
            />
          </div>

          {/* Thumbnails */}
          {product.gallery && product.gallery.length > 0 && (
            <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '4px' }}>
              {[product.image, ...product.gallery].map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  style={{
                    width: '64px',
                    height: '64px',
                    padding: '2px',
                    borderRadius: '8px',
                    background: '#ffffff',
                    cursor: 'pointer',
                    border: selectedImage === img ? '2px solid #1b4230' : '1px solid #e2e8f0',
                    opacity: selectedImage === img ? 1 : 0.7,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx}`}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Guarantee Box */}
          <div style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <ShieldCheck size={24} style={{ color: '#166534', flexShrink: 0 }} />
            <div>
              <h5 style={{ fontSize: '0.85rem', color: '#14532d', fontWeight: 700 }}>Despacho Garantizado a Velatorio</h5>
              <p style={{ fontSize: '0.78rem', color: '#334155' }}>Pago encriptado con Flow (Webpay Plus) en CLP.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Order Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span className="badge badge-emerald">{product.category}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Star size={15} style={{ color: '#d97706', fill: '#d97706' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{product.rating}</span>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>({product.reviewsCount} evaluaciones)</span>
              </div>
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.25 }}>{product.title}</h2>
            <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>CÓDIGO: {product.sku}</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1b4230' }}>
              {formatCLP(currentPrice * quantity)}
            </span>
            {product.regularPrice > product.price && (
              <span style={{ fontSize: '1rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                {formatCLP(product.regularPrice * quantity)}
              </span>
            )}
          </div>

          <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
            {product.description || product.shortDescription}
          </p>

          <p className="product-shipping" style={{ fontSize: '0.85rem', color: '#475569' }}>Envío: $4.000 por pedido.</p>

          {/* Variants Selection */}
          {product.variants && product.variants.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1b4230', textTransform: 'uppercase' }}>
                {product.variantLabel || 'Tamaño / Dimensión:'}
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
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
              Cantidad:
            </span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden'
            }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ padding: '0.4rem 0.8rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}
              >
                -
              </button>
              <span style={{ padding: '0.4rem 1rem', fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{ padding: '0.4rem 0.8rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}
              >
                +
              </button>
            </div>
          </div>

          {/* Features Checklist */}
          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>El arreglo incluye:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {product.features.map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#334155' }}>
                  <CheckCircle size={15} style={{ color: '#166534', flexShrink: 0 }} />
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
            <button onClick={handleBuyNow} className="btn-gold" style={{ padding: '0.85rem', fontSize: '0.95rem' }}>
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
