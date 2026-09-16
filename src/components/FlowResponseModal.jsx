import React from 'react';
import { CheckCircle2, ShieldCheck, Download, ExternalLink, RefreshCw } from 'lucide-react';
import { productRepository } from '../services/productRepository';

export function FlowResponseModal({ paymentDetails, onClose }) {
  if (!paymentDetails) return null;

  const brand = productRepository.getBrandInfo();
  const formatCLP = (amount) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="modal-overlay">
      <div
        className="fade-in"
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-color)',
          maxWidth: '620px',
          width: '100%',
          padding: '2.5rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '9999px',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '2px solid #10b981',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem auto'
        }}>
          <CheckCircle2 size={42} style={{ color: '#10b981' }} />
        </div>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
          ¡Pago Confirmado en Pasarela Flow!
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '0.35rem' }}>
          Tu orden se ha registrado exitosamente en <strong>{brand.name}</strong>.
        </p>

        {/* Order Details Card */}
        <div style={{
          background: 'rgba(18, 17, 26, 0.95)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          margin: '1.5rem 0',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          fontSize: '0.85rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem' }}>
            <span style={{ color: '#94a3b8' }}>Número de Orden:</span>
            <span style={{ fontWeight: 800, color: '#a78bfa' }}>{paymentDetails.orderId}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#94a3b8' }}>Cliente:</span>
            <span style={{ fontWeight: 600, color: '#ffffff' }}>{paymentDetails.customer.name}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#94a3b8' }}>Email:</span>
            <span style={{ color: '#ffffff' }}>{paymentDetails.customer.email}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#94a3b8' }}>Pasarela / Medio:</span>
            <span style={{ fontWeight: 600, color: '#34d399' }}>{paymentDetails.paymentMethod}</span>
          </div>

          {paymentDetails.flowResult?.token && (
            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '0.4rem 0.6rem', borderRadius: '6px' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Flow Token:</span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#a78bfa' }}>{paymentDetails.flowResult.token}</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.5rem', fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
            <span>Monto Total Pagado:</span>
            <span>{formatCLP(paymentDetails.totalAmount)}</span>
          </div>
        </div>

        {/* Verification Note */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#34d399', marginBottom: '1.5rem' }}>
          <ShieldCheck size={16} />
          <span>Confirmación de pago validada mediante HMAC SHA-256 Flow API v1</span>
        </div>

        <button
          onClick={onClose}
          className="btn-primary"
          style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem' }}
        >
          <span>Volver al Catálogo Lisar Studio</span>
        </button>
      </div>
    </div>
  );
}
