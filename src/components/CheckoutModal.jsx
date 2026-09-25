import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, Lock, Building, Mail, Phone, User } from 'lucide-react';
import { flowService } from '../services/flowService';
import { productRepository } from '../services/productRepository';

export function CheckoutModal({ isOpen, onClose, cartItems, totalAmount, orderSummary, onPaymentSuccess }) {
  const brand = productRepository.getBrandInfo();
  const [paymentMethod, setPaymentMethod] = useState('flow');
  const [formData, setFormData] = useState({
    recipient: '',
    deliveryAddress: '',
    cardMessage: '',
    name: '',
    email: '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const formatCLP = (amount) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(amount);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitCheckout = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.recipient || !formData.deliveryAddress || !formData.cardMessage || !formData.name || !formData.phone) {
      setErrorMsg('Por favor completa todos los campos requeridos para el despacho y tarjeta.');
      return;
    }

    setIsProcessing(true);

    const orderId = 'CORONA-' + Math.floor(100000 + Math.random() * 900000);
    const orderSubject = `Orden #${orderId} - ${brand.name}`;

    try {
      if (paymentMethod === 'flow') {
        const flowResult = await flowService.createPayment({
          orderId,
          subject: orderSubject,
          amount: totalAmount,
          email: formData.email || 'contacto@coronadeflores.cl',
          customerName: formData.name
        });

        setIsProcessing(false);
        onPaymentSuccess({
          orderId,
          paymentMethod: 'Flow (Webpay Plus)',
          customer: formData,
          totalAmount,
          orderSummary,
          cartItems,
          flowResult
        });
      } else if (paymentMethod === 'whatsapp') {
        setIsProcessing(false);
        const text = `*NUEVO PEDIDO CORONA DE FLORES*\n*Orden:* ${orderId}\n*¿A quién entrega condolencia?:* ${formData.recipient}\n*Dirección de Entrega:* ${formData.deliveryAddress}\n*Texto Tarjeta / Cinta:* ${formData.cardMessage}\n*Solicitante:* ${formData.name}\n*Teléfono:* ${formData.phone}\n*Email:* ${formData.email || 'No indicado'}\n*Total:* ${formatCLP(totalAmount)}\n*Productos:* ${cartItems.map(i => `${i.quantity}x ${i.title}`).join(', ')}`;
        window.open(`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
        onPaymentSuccess({
          orderId,
          paymentMethod: 'WhatsApp Directo',
          customer: formData,
          totalAmount,
          orderSummary,
          cartItems
        });
      } else {
        // Transferencia
        setIsProcessing(false);
        onPaymentSuccess({
          orderId,
          paymentMethod: 'Transferencia Bancaria Directa',
          customer: formData,
          totalAmount,
          orderSummary,
          cartItems
        });
      }
    } catch (err) {
      console.error('Checkout payment error:', err);
      setIsProcessing(false);
      setErrorMsg('Error al conectar con la pasarela de pagos. Por favor reintenta.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid #e2e8f0',
          maxWidth: '780px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '2rem',
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
        }}
      >
        <button
          aria-label="Cerrar checkout"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            color: '#64748b',
            background: '#f1f5f9',
            borderRadius: '9999px',
            padding: '0.4rem',
            border: '1px solid #e2e8f0'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <ShieldCheck size={28} style={{ color: '#166534' }} />
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>Datos para tu Envío y Pago</h2>
            <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Completa los datos de la condolencia y despacho para procesar tu orden</p>
          </div>
        </div>

        {errorMsg && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '0.75rem 1rem', borderRadius: '8px', color: '#e11d48', fontSize: '0.85rem', marginBottom: '1rem' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmitCheckout} className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '2rem' }}>
          {/* Left Column: Customer Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1b4230', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
              1. Datos de la Condolencia y Entrega
            </h3>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', display: 'block', marginBottom: '0.35rem' }}>
                1. ¿A quién entrega la condolencia? *
              </label>
              <input
                type="text"
                name="recipient"
                required
                placeholder="Ej: Familia Pérez González / Nombre del Fallecido"
                value={formData.recipient}
                onChange={handleInputChange}
                className="input-field"
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', display: 'block', marginBottom: '0.35rem' }}>
                2. Dirección de Entrega / Velatorio *
              </label>
              <input
                type="text"
                name="deliveryAddress"
                required
                placeholder="Ej: Parque del Recuerdo (Capilla 2) o Dirección particular"
                value={formData.deliveryAddress}
                onChange={handleInputChange}
                className="input-field"
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', display: 'block', marginBottom: '0.35rem' }}>
                3. Texto de la Tarjeta o Cinta *
              </label>
              <textarea
                name="cardMessage"
                required
                rows={2}
                placeholder="Ej: Con sinceras condolencias y afecto de Familia Soto Martínez"
                value={formData.cardMessage}
                onChange={handleInputChange}
                className="input-field"
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', resize: 'vertical' }}
              />
            </div>

            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1b4230', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem', marginTop: '0.5rem' }}>
              Datos de Contacto del Solicitante
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.35rem' }}>
                  Tu Nombre *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Ej: Juan Silva"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field"
                    style={{ paddingLeft: '2.4rem', width: '100%', padding: '0.6rem 0.6rem 0.6rem 2.4rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                  <User size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.35rem' }}>
                  Teléfono / WhatsApp *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+56 9 1234 5678"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field"
                    style={{ paddingLeft: '2.4rem', width: '100%', padding: '0.6rem 0.6rem 0.6rem 2.4rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                  <Phone size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                </div>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.35rem' }}>
                Correo Electrónico (para comprobante Flow)
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  name="email"
                  placeholder="contacto@cliente.cl"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                  style={{ paddingLeft: '2.4rem', width: '100%', padding: '0.6rem 0.6rem 0.6rem 2.4rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
                <Mail size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              </div>
            </div>

            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1b4230', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem', marginTop: '0.5rem' }}>
              2. Método de Pago
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {/* Flow Radio */}
              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                background: paymentMethod === 'flow' ? '#f0fdf4' : '#f8fafc',
                border: paymentMethod === 'flow' ? '1px solid #166534' : '1px solid #e2e8f0',
                cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="flow"
                    checked={paymentMethod === 'flow'}
                    onChange={() => setPaymentMethod('flow')}
                  />
                  <div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', display: 'block' }}>
                      Flow (Webpay Plus / Tarjetas de Débito y Crédito)
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Pasarela de pago 100% segura en CLP</span>
                  </div>
                </div>
                <CreditCard size={20} style={{ color: '#166534' }} />
              </label>

              {/* Transfer Radio */}
              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                background: paymentMethod === 'transfer' ? '#f0fdf4' : '#f8fafc',
                border: paymentMethod === 'transfer' ? '1px solid #166534' : '1px solid #e2e8f0',
                cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="transfer"
                    checked={paymentMethod === 'transfer'}
                    onChange={() => setPaymentMethod('transfer')}
                  />
                  <div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', display: 'block' }}>
                      Transferencia Bancaria Directa
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Datos de la cuenta de Corona de Flores</span>
                  </div>
                </div>
                <Building size={20} style={{ color: '#c59b27' }} />
              </label>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div style={{
            background: '#f8fafc',
            padding: '1.25rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '0.85rem' }}>
                Resumen del Pedido
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '200px', overflowY: 'auto' }}>
                {cartItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#334155' }}>
                    <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.quantity}x {item.title}
                    </span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>
                      {formatCLP((item.price + (item.selectedVariant ? item.selectedVariant.priceModifier : 0)) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.85rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b' }}>
                  <span>Moneda:</span>
                  <span>CLP (Pesos Chilenos)</span>
                </div>
                <div className="checkout-subtotal" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}><span>Subtotal:</span><span>{formatCLP(orderSummary.subtotal)}</span></div>
                {orderSummary.discountAmount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}><span>Descuento:</span><span>-{formatCLP(orderSummary.discountAmount)}</span></div>}
                <div className="checkout-shipping" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}><span>Envío por pedido:</span><span>{formatCLP(orderSummary.shipping)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, color: '#1b4230', marginTop: '0.3rem' }}>
                  <span>Total Final:</span>
                  <span>{formatCLP(totalAmount)}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="btn-primary"
              style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem', opacity: isProcessing ? 0.7 : 1 }}
            >
              {isProcessing ? (
                <span>Procesando con Flow...</span>
              ) : (
                <>
                  <Lock size={18} />
                  <span>Confirmar y Pagar ({formatCLP(totalAmount)})</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
