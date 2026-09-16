import React, { useState } from 'react';
import { ShoppingBag, Search, Phone, MessageCircle, Menu, X, ShieldCheck } from 'lucide-react';
import { productRepository } from '../services/productRepository';

export function Header({ cartCount, onOpenCart, activeCategory, onSelectCategory, searchQuery, onSearchChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const brand = productRepository.getBrandInfo();
  const categories = [
    { id: 'all', name: 'Todos los Planes' },
    { id: 'paginas-web', name: 'Páginas Web' },
    { id: 'e-commerce', name: 'E-Commerce' },
    { id: 'branding', name: 'Branding & Diseño' },
    { id: 'mantencion', name: 'Hosting & Mantenimiento' }
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100 }} className="glass-panel">
      {/* Top Notification Bar */}
      <div style={{
        background: 'linear-gradient(90deg, #6d28d9 0%, #059669 100%)',
        padding: '0.4rem 1rem',
        fontSize: '0.8rem',
        fontWeight: 600,
        textAlign: 'center',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        <ShieldCheck size={16} />
        <span>Soluciones Digitales Oficiales Lisar Studio • Integración Pasarela Flow 100% Funcional</span>
      </div>

      <div className="container" style={{ padding: '0.85rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        {/* Brand Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <img
            src={brand.logo}
            alt={brand.name}
            style={{ height: '42px', width: 'auto', borderRadius: '8px', objectFit: 'contain' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div>
            <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', display: 'block', lineHeight: 1 }}>
              LISAR<span style={{ color: '#a78bfa' }}>STUDIO</span>
            </span>
            <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 500, letterSpacing: '0.05em' }}>
              AGENCIA DIGITAL & E-COMMERCE
            </span>
          </div>
        </a>

        {/* Search Bar - Desktop */}
        <div style={{ flex: '1', maxWidth: '420px', position: 'relative' }} className="desktop-only">
          <input
            type="text"
            placeholder="Buscar planes, e-commerce, hosting..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '2.5rem', borderRadius: '9999px', fontSize: '0.88rem' }}
          />
          <Search size={18} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola Lisar Studio, me interesa consultar por un plan web.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-emerald"
            style={{ padding: '0.55rem 1rem', fontSize: '0.85rem', borderRadius: '9999px' }}
          >
            <MessageCircle size={18} />
            <span className="desktop-only">WhatsApp Directo</span>
          </a>

          {/* Cart Icon Button */}
          <button
            onClick={onOpenCart}
            className="btn-primary"
            style={{ position: 'relative', padding: '0.6rem 1.1rem', borderRadius: '9999px', fontSize: '0.88rem' }}
          >
            <ShoppingBag size={19} />
            <span className="desktop-only">Carrito</span>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#f43f5e',
                color: '#ffffff',
                borderRadius: '9999px',
                width: '20px',
                height: '20px',
                fontSize: '0.72rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #09090e'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: '#ffffff', padding: '0.5rem', display: 'none' }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Navigation Sub-Bar */}
      <nav style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(18, 17, 26, 0.9)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1rem', overflowX: 'auto', padding: '0.6rem 1.5rem' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              style={{
                padding: '0.4rem 0.9rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: activeCategory === cat.id ? 700 : 500,
                color: activeCategory === cat.id ? '#ffffff' : '#94a3b8',
                background: activeCategory === cat.id ? 'rgba(124, 58, 237, 0.25)' : 'transparent',
                border: activeCategory === cat.id ? '1px solid rgba(124, 58, 237, 0.5)' : '1px solid transparent',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
