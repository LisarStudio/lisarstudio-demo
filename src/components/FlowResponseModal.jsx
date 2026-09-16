import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
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
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid #e2e8f0',
          maxWidth: '620px',
          width: '100%',
          padding: '2.5rem',
          textAlign: 'center',
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
        }}
      >
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '9999px',
          background: '#f0fdf4',
          border: '2px solid #166534',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem auto'
        }}>
          <CheckCircle2 size={42} style={{ color: '#166534' }} />
        </div>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>
          ¡Pago Confirmado en Pasarela Flow!
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '0.35rem' }}>
          Tu orden de arreglo floral se ha registrado exitosamente en <strong>{brand.name}</strong>.
        </p>

        {/* Order Details Card */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          margin: '1.5rem 0',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          fontSize: '0.85rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
            <span style={{ color: '#64748b' }}>Número de Orden:</span>
            <span style={{ fontWeight: 800, color: '#1b4230' }}>{paymentDetails.orderId}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Cliente:</span>
            <span style={{ fontWeight: 600, color: '#0f172a' }}>{paymentDetails.customer.name}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Email:</span>
            <span style={{ color: '#0f172a' }}>{paymentDetails.customer.email}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Pasarela / Medio:</span>
            <span style={{ fontWeight: 600, color: '#166534' }}>{paymentDetails.paymentMethod}</span>
          </div>

          {paymentDetails.flowResult?.token && (
            <div style={{ display: 'flex', justifyContent: 'space-between', background: '#ffffff', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <span style={{ color: '#64748b', fontSize: '0.78rem' }}>Flow Token:</span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#1b4230' }}>{paymentDetails.flowResult.token}</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '0.5rem', fontSize: '1.1rem', fontWeight: 800, color: '#1b4230' }}>
            <span>Monto Total Pagado:</span>
            <span>{formatCLP(paymentDetails.totalAmount)}</span>
          </div>
        </div>

        {/* Verification Note */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#166534', marginBottom: '1.5rem' }}>
          <ShieldCheck size={16} />
          <span>Confirmación de pago validada mediante HMAC SHA-256 Flow API v1</span>
        </div>

        <button
          onClick={onClose}
          className="btn-primary"
          style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem' }}
        >
          <span>Volver a Corona de Flores</span>
        </button>
      </div>
    </div>
  );
}
