import React from 'react';
import { productRepository } from '../services/productRepository';
import { clientData } from '../data/clientData';
import './Footer.css';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

export function Footer({ onSelectCategory }) {
  const brand = productRepository.getBrandInfo();

  return (
    <footer className="store-footer">
      <div className="container footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.2fr', gap: '3rem', marginBottom: '3rem' }}>
        {/* Brand & Slogan */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
              src={brand.logo}
              alt={brand.name}
              style={{ height: '54px', width: 'auto', maxWidth: '240px', objectFit: 'contain', filter: 'brightness(1.15) contrast(1.05)' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>

          <p style={{ lineHeight: 1.6, maxWidth: '400px', color: '#94a3b8' }}>
            Floristería especializada en la elaboración y despacho urgente de coronas fúnebres, ramilletes de condolencias y cubre urnas en la Región Metropolitana.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontWeight: 600, fontSize: '0.82rem' }}>
            <ShieldCheck size={18} />
            <span>Pasarela de pagos integrados Flow (Webpay Plus, Tarjetas Débito y Crédito)</span>
          </div>
        </div>

        {/* Fast Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>Categorías de Floristería</h4>
          {clientData.categories.map(c => <a key={c.slug} href="#catalog-section" onClick={() => onSelectCategory(c.slug)}>{c.name}</a>)}
        </div>

        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>Atención Urgente 24/7</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Phone size={16} style={{ color: '#c59b27' }} />
            <span>{brand.whatsappFormatted}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Mail size={16} style={{ color: '#c59b27' }} />
            <span>{brand.email}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <MapPin size={16} style={{ color: '#c59b27' }} />
            <span>{brand.address}</span>
          </div>
        </div>
      </div>

      {/* Sub Footer */}
      <div className="container" style={{
        paddingTop: '2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.78rem'
      }}>
        <div>
          © {new Date().getFullYear()} {brand.name} (coronadeflores.cl). Todos los derechos reservados.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.06)', padding: '0.3rem 0.75rem', borderRadius: '9999px' }}>
          <span style={{ color: '#fbbf24', fontWeight: 700 }}>DEMO NOINDEX</span>
          <span>• Desarrollado por Lisar Studio</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </footer>
  );
}
