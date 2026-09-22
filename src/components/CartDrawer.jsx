import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Tag, CreditCard } from 'lucide-react';
import { calculateOrderTotals } from '../services/cart';
import { getAssetUrl } from '../data/clientData';

export function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onProceedToCheckout }) {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  if (!isOpen) return null;

  const placeholderImg = getAssetUrl('client_images/uploads/woocommerce-placeholder-600x600.png');

  const formatCLP = (amount) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(amount);
  };

  const summary = calculateOrderTotals(cartItems, discountPercent);
  const { subtotal, discountAmount, shipping, total } = summary;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'CORONA10' || couponCode.toUpperCase() === 'FLOW10') {
      setDiscountPercent(10);
      setCouponMessage('¡Cupón 10% Descuento Aplicado!');
    } else {
      setCouponMessage('Cupón no válido (Prueba: CORONA10)');
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-label="Carrito de compras" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div
        className="slide-in-right"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          width: '100%',
          maxWidth: '450px',
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          borderLeft: '1px solid #e2e8f0'
        }}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#1b4230',
          color: '#ffffff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShoppingBag size={22} style={{ color: '#c59b27' }} />
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>Tu Carrito de Compras</h3>
              <p style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>{cartItems.length} {cartItems.length === 1 ? 'arreglo floral' : 'arreglos florales'}</p>
            </div>
          </div>
          <button aria-label="Cerrar carrito" onClick={onClose} style={{ color: '#ffffff', padding: '0.4rem' }}>
            <X size={22} />
          </button>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto 0', padding: '2rem 1rem' }}>
              <ShoppingBag size={56} style={{ color: '#cbd5e1', margin: '0 auto 1rem auto' }} />
              <h4 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>El carrito está vacío</h4>
              <p style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '0.5rem' }}>
                Explora nuestras coronas fúnebres, ramilletes y cubre urnas para agregar a tu pedido.
              </p>
            </div>
          ) : (
            cartItems.map((item, idx) => {
              const itemUnitPrice = item.price + (item.selectedVariant ? item.selectedVariant.priceModifier : 0);
              return (
                <div
                  key={`${item.id}-${idx}`}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
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
                    style={{ width: '65px', height: '65px', borderRadius: '8px', objectFit: 'cover', background: '#e2e8f0' }}
                    onError={(e) => {
                      e.target.src = placeholderImg;
                    }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>{item.title}</h4>
                    {item.selectedVariant && (
                      <span style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 600 }}>{item.selectedVariant.name}</span>
                    )}
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1b4230', marginTop: '0.2rem' }}>
                      {formatCLP(itemUnitPrice * item.quantity)}
                    </span>
                  </div>

                  {/* Quantity Controls & Remove */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    <button onClick={() => onRemoveItem(idx)} style={{ color: '#e11d48', padding: '0.2rem' }} title="Eliminar">
                      <Trash2 size={16} />
                    </button>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#ffffff',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1'
                    }}>
                      <button
                        onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                        style={{ padding: '0.2rem 0.5rem', color: '#0f172a', fontWeight: 700 }}
                      >
                        -
                      </button>
                      <span style={{ padding: '0.2rem 0.5rem', fontSize: '0.85rem', color: '#0f172a', fontWeight: 700 }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        style={{ padding: '0.2rem 0.5rem', color: '#0f172a', fontWeight: 700 }}
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
            borderTop: '1px solid #e2e8f0',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {/* Coupon input */}
            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Cupón de descuento (Ej: CORONA10)"
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
              <span style={{ fontSize: '0.78rem', color: discountPercent > 0 ? '#166534' : '#e11d48' }}>
                {couponMessage}
              </span>
            )}

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Subtotal:</span>
                <span>{formatCLP(subtotal)}</span>
              </div>
              <div className="cart-shipping" style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Envío por pedido:</span><span>{formatCLP(shipping)}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#166534' }}>
                  <span>Descuento ({discountPercent}%):</span>
                  <span>-{formatCLP(discountAmount)}</span>
                </div>
              )}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.2rem',
                fontWeight: 800,
                color: '#1b4230',
                paddingTop: '0.5rem',
                borderTop: '1px solid #e2e8f0'
              }}>
                <span>Total a Pagar:</span>
                <span>{formatCLP(total)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => { onClose(); onProceedToCheckout(summary); }}
              className="btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem' }}
            >
              <CreditCard size={18} />
              <span>Pagar con Flow Webpay ({formatCLP(total)})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
