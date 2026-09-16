import React from 'react';
import { MessageCircle } from 'lucide-react';
import { productRepository } from '../services/productRepository';

export function WhatsAppWidget() {
  const brand = productRepository.getBrandInfo();

  return (
    <a
      href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola Corona de Flores, necesito ayuda con mi pedido de flores fúnebres.')}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        padding: '0.4rem 0.9rem 0.4rem 0.4rem',
        borderRadius: '9999px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        textDecoration: 'none',
        transition: 'transform 0.2s ease'
      }}
      className="whatsapp-widget"
    >
      <div style={{
        background: '#25d366',
        color: '#ffffff',
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(37, 211, 102, 0.4)'
      }}>
        <MessageCircle size={24} />
      </div>
      <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0f172a' }}>
        ¿Necesitas Ayuda?
      </span>

      <style>{`
        .whatsapp-widget:hover {
          transform: translateY(-3px);
        }
      `}</style>
    </a>
  );
}
