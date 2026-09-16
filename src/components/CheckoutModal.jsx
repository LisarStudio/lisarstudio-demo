import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, Lock, CheckCircle2, Building, Mail, Phone, User, FileText, ArrowRight } from 'lucide-react';
import { flowService } from '../services/flowService';
import { productRepository } from '../services/productRepository';

export function CheckoutModal({ isOpen, onClose, cartItems, totalAmount, onPaymentSuccess }) {
  if (!isOpen) return null;

  const brand = productRepository.getBrandInfo();
  const [paymentMethod, setPaymentMethod] = useState('flow'); // 'flow', 'transfer', 'whatsapp'
  const [formData, setFormData] = useState({
    name: '',
    rut: '',
    email: '',
    phone: '',
    company: '',
    notes: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const formatCLP = (amount) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(amount);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitCheckout = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMsg('Por favor completa los campos obligatorios: Nombre, Email y Teléfono.');
      return;
    }

    setIsProcessing(true);

    const orderId = 'LISAR-' + Math.floor(100000 + Math.random() * 900000);
    const orderSubject = `Orden #${orderId} - ${brand.name}`;

    try {
      if (paymentMethod === 'flow') {
        const flowResult = await flowService.createPayment({
          orderId,
          subject: orderSubject,
          amount: totalAmount,
          email: formData.email,
          customerName: formData.name
        });

        setIsProcessing(false);
        onPaymentSuccess({
          orderId,
          paymentMethod: 'Flow (Webpay Plus)',
          customer: formData,
          totalAmount,
          cartItems,
          flowResult
        });
      } else if (paymentMethod === 'whatsapp') {
        setIsProcessing(false);
        const text = `*NUEVO PEDIDO EN LISAR STUDIO*\n*Orden:* ${orderId}\n*Cliente:* ${formData.name}\n*Email:* ${formData.email}\n*Teléfono:* ${formData.phone}\n*Total:* ${formatCLP(totalAmount)}\n*Método:* Pedido directo WhatsApp`;
        window.open(`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
        onPaymentSuccess({
          orderId,
          paymentMethod: 'WhatsApp Directo',
          customer: formData,
          totalAmount,
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
          cartItems
        });
      }
    } catch (err) {
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
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-color)',
          maxWidth: '750px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '2rem'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            color: '#94a3b8',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '9999px',
            padding: '0.4rem'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <ShieldCheck size={28} style={{ color: '#10b981' }} />
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>Checkout Seguro</h2>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Completa tus datos comerciales para procesar la orden mediante Pasarela Flow</p>
          </div>
        </div>

        {errorMsg && (
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid #f43f5e', padding: '0.75rem 1rem', borderRadius: '8px', color: '#f43f5e', fontSize: '0.85rem', marginBottom: '1rem' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmitCheckout} className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
          {/* Left Column: Customer Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem' }}>
              1. Datos del Cliente / Empresa
            </h3>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: '0.35rem' }}>
                Nombre y Apellido *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Ej: Silvana Morales"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field"
                  style={{ paddingLeft: '2.4rem' }}
                />
                <User size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: '0.35rem' }}>
                  Correo Electrónico *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="contacto@empresa.cl"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    style={{ paddingLeft: '2.4rem' }}
                  />
                  <Mail size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: '0.35rem' }}>
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
                    style={{ paddingLeft: '2.4rem' }}
                  />
                  <Phone size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: '0.35rem' }}>
                  RUT Empresa / Persona
                </label>
                <input
                  type="text"
                  name="rut"
                  placeholder="12.345.678-9"
                  value={formData.rut}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: '0.35rem' }}>
                  Razón Social / Proyecto
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="Nombre de tu negocio"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem', marginTop: '0.5rem' }}>
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
                background: paymentMethod === 'flow' ? 'rgba(124, 58, 237, 0.15)' : 'rgba(255,255,255,0.03)',
                border: paymentMethod === 'flow' ? '1px solid #8b5cf6' : '1px solid var(--border-color)',
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
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', display: 'block' }}>
                      Flow (Webpay Plus / Tarjetas / Servipag)
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Pasarela Oficial en Pesos Chilenos (CLP)</span>
                  </div>
                </div>
                <CreditCard size={20} style={{ color: '#34d399' }} />
              </label>

              {/* Transfer Radio */}
              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                background: paymentMethod === 'transfer' ? 'rgba(124, 58, 237, 0.15)' : 'rgba(255,255,255,0.03)',
                border: paymentMethod === 'transfer' ? '1px solid #8b5cf6' : '1px solid var(--border-color)',
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
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', display: 'block' }}>
                      Transferencia Bancaria Directa
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Datos de cuenta bancaria Lisar Studio</span>
                  </div>
                </div>
                <Building size={20} style={{ color: '#a78bfa' }} />
              </label>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div style={{
            background: 'rgba(18, 17, 26, 0.95)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem', marginBottom: '0.85rem' }}>
                Resumen del Pedido
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '200px', overflowY: 'auto' }}>
                {cartItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#cbd5e1' }}>
                    <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.quantity}x {item.title}
                    </span>
                    <span style={{ fontWeight: 700, color: '#ffffff' }}>
                      {formatCLP((item.price + (item.selectedVariant ? item.selectedVariant.priceModifier : 0)) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.85rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#94a3b8' }}>
                  <span>Moneda:</span>
                  <span>CLP (Pesos Chilenos)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginTop: '0.3rem' }}>
                  <span>Total Final:</span>
                  <span>{formatCLP(totalAmount)}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="btn-emerald"
              style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem', opacity: isProcessing ? 0.7 : 1 }}
            >
              {isProcessing ? (
                <span>Procesando con Flow...</span>
              ) : (
                <>
                  <Lock size={18} />
                  <span>Confirmar Pago ({formatCLP(totalAmount)})</span>
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
