import React from 'react';
import { productRepository } from '../services/productRepository';
import { Mail, Phone, MapPin, CreditCard, ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  const brand = productRepository.getBrandInfo();

  return (
    <footer style={{
      background: '#06050a',
      borderTop: '1px solid var(--border-color)',
      padding: '4rem 0 2rem 0',
      color: '#94a3b8',
      fontSize: '0.88rem'
    }}>
      <div className="container footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.2fr', gap: '3rem', marginBottom: '3rem' }}>
        {/* Brand & Slogan */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
              src={brand.logo}
              alt={brand.name}
              style={{ height: '36px', width: 'auto', borderRadius: '6px' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              LISAR<span style={{ color: '#a78bfa' }}>STUDIO</span>
            </span>
          </div>

          <p style={{ lineHeight: 1.6, maxWidth: '400px' }}>
            {brand.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 600, fontSize: '0.82rem' }}>
            <ShieldCheck size={18} />
            <span>Integración oficial Flow.cl (Webpay Plus, Tarjetas, Servipag)</span>
          </div>
        </div>

        {/* Fast Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>Soluciones</h4>
          <a href="#" style={{ transition: 'color 0.2s ease' }}>Páginas Web Responsivas</a>
          <a href="#" style={{ transition: 'color 0.2s ease' }}>Tiendas Online E-Commerce</a>
          <a href="#" style={{ transition: 'color 0.2s ease' }}>Pasarela de Pagos Flow.cl</a>
          <a href="#" style={{ transition: 'color 0.2s ease' }}>Diseño & Branding Corporativo</a>
          <a href="#" style={{ transition: 'color 0.2s ease' }}>Hosting & Soporte Mensual</a>
        </div>

        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>Contacto Comercial</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Phone size={16} style={{ color: '#a78bfa' }} />
            <span>{brand.whatsappFormatted}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Mail size={16} style={{ color: '#a78bfa' }} />
            <span>{brand.email}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <MapPin size={16} style={{ color: '#a78bfa' }} />
            <span>{brand.address}</span>
          </div>
        </div>
      </div>

      {/* Sub Footer */}
      <div className="container" style={{
        paddingTop: '2rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.78rem'
      }}>
        <div>
          © {new Date().getFullYear()} {brand.name}. Todos los derechos reservados.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.04)', padding: '0.3rem 0.75rem', borderRadius: '9999px' }}>
          <span style={{ color: '#f59e0b', fontWeight: 700 }}>DEMO NOINDEX</span>
          <span>• Entorno de prueba oficial Lisar Studio</span>
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
