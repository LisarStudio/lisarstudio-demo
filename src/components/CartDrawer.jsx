import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, CreditCard, ShieldCheck } from 'lucide-react';

export function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onProceedToCheckout }) {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  if (!isOpen) return null;

  const formatCLP = (amount) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(amount);
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const itemPrice = item.price + (item.selectedVariant ? item.selectedVariant.priceModifier : 0);
    return sum + (itemPrice * item.quantity);
  }, 0);

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'LISAR10' || couponCode.toUpperCase() === 'FLOW10') {
      setDiscountPercent(10);
      setCouponMessage('¡Cupón 10% Descuento Aplicado!');
    } else {
      setCouponMessage('Cupón no válido (Prueba: LISAR10)');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div
        className="slide-in-right"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          width: '100%',
          maxWidth: '450px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          borderLeft: '1px solid var(--border-color)'
        }}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(18, 17, 26, 0.95)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShoppingBag size={22} style={{ color: '#a78bfa' }} />
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>Tu Carrito</h3>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'}</p>
            </div>
          </div>
          <button onClick={onClose} style={{ color: '#94a3b8', padding: '0.4rem' }}>
            <X size={22} />
          </button>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto 0', padding: '2rem 1rem' }}>
              <ShoppingBag size={56} style={{ color: '#475569', margin: '0 auto 1rem auto' }} />
              <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700 }}>El carrito está vacío</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '0.5rem' }}>
                Explora nuestros planes web e-commerce e incorpora los servicios que tu empresa necesita.
              </p>
            </div>
          ) : (
            cartItems.map((item, idx) => {
              const itemUnitPrice = item.price + (item.selectedVariant ? item.selectedVariant.priceModifier : 0);
              return (
                <div
                  key={`${item.id}-${idx}`}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem',
                    display: 'flex',
                    gap: '0.85rem',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '65px', height: '65px', borderRadius: '8px', objectFit: 'cover', background: '#09090e' }}
                    onError={(e) => {
                      e.target.src = '/client_images/uploads/woocommerce-placeholder-600x600.png';
                    }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>{item.title}</h4>
                    {item.selectedVariant && (
                      <span style={{ fontSize: '0.75rem', color: '#a78bfa' }}>{item.selectedVariant.name}</span>
                    )}
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>
                      {formatCLP(itemUnitPrice * item.quantity)}
                    </span>
                  </div>

                  {/* Quantity Controls & Remove */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    <button onClick={() => onRemoveItem(idx)} style={{ color: '#f43f5e', padding: '0.2rem' }} title="Eliminar">
                      <Trash2 size={16} />
                    </button>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'rgba(0,0,0,0.4)',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)'
                    }}>
                      <button
                        onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                        style={{ padding: '0.2rem 0.5rem', color: '#ffffff', fontWeight: 700 }}
                      >
                        -
                      </button>
                      <span style={{ padding: '0.2rem 0.5rem', fontSize: '0.85rem', color: '#ffffff', fontWeight: 700 }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        style={{ padding: '0.2rem 0.5rem', color: '#ffffff', fontWeight: 700 }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid var(--border-color)',
            background: 'rgba(18, 17, 26, 0.98)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {/* Coupon input */}
            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Cupón de descuento (Ej: LISAR10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="input-field"
                  style={{ fontSize: '0.82rem', paddingLeft: '2.2rem' }}
                />
                <Tag size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              </div>
              <button type="submit" className="btn-secondary" style={{ padding: '0.5rem 0.85rem', fontSize: '0.82rem' }}>
                Aplicar
              </button>
            </form>
            {couponMessage && (
              <span style={{ fontSize: '0.78rem', color: discountPercent > 0 ? '#34d399' : '#f43f5e' }}>
                {couponMessage}
              </span>
            )}

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                <span>Subtotal:</span>
                <span>{formatCLP(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399' }}>
                  <span>Descuento ({discountPercent}%):</span>
                  <span>-{formatCLP(discountAmount)}</span>
                </div>
              )}
              <div style={{
                display: 'flex',
                justify: 'space-between',
                fontSize: '1.2rem',
                fontWeight: 800,
                color: '#ffffff',
                paddingTop: '0.5rem',
                borderTop: '1px solid rgba(255,255,255,0.08)'
              }}>
                <span>Total Pagar:</span>
                <span>{formatCLP(total)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => { onClose(); onProceedToCheckout(total); }}
              className="btn-emerald"
              style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem' }}
            >
              <CreditCard size={18} />
              <span>Ir a Pagar con Flow ({formatCLP(total)})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
