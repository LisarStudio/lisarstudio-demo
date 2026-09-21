import React, { useState } from 'react';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';
import { productRepository } from '../services/productRepository';

export function Header({ cartCount, onOpenCart, onSelectCategory, searchQuery, onSearchChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const brand = productRepository.getBrandInfo();

  return (
    <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
      {/* Top Header Row */}
      <div className="container store-header-row" style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        {/* Brand Logo */}
        <a href="#inicio" className="store-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <img
            src={brand.logo}
            alt={brand.name}
            style={{ height: '52px', width: 'auto', objectFit: 'contain' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div>
            <span className="store-brand-name" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#166534', letterSpacing: '-0.02em', display: 'block', lineHeight: 1.1, fontFamily: 'serif' }}>
              Corona de <span style={{ color: '#c59b27' }}>Flores</span>
            </span>
            <span className="store-brand-tagline" style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              FLORISTERÍA FÚNEBRE CHILE
            </span>
          </div>
        </a>

        {/* Search Input Bar (Center) */}
        <div style={{ flex: '1', maxWidth: '520px', position: 'relative', display: 'flex' }} className="desktop-only">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 1rem',
              borderRadius: '25px 0 0 25px',
              border: '1px solid #cbd5e1',
              borderRight: 'none',
              outline: 'none',
              fontSize: '0.9rem',
              color: '#1e293b'
            }}
          />
          <button
            style={{
              background: '#6ea820',
              color: '#ffffff',
              padding: '0 1.25rem',
              borderRadius: '0 25px 25px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Search size={18} />
          </button>
        </div>

        {/* Account & Cart Icons (Right) */}
        <div className="store-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
          {/* User Account */}
          <a href="#mi-cuenta" aria-label="Mi cuenta" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} className="desktop-only">
            <User size={28} style={{ color: '#475569' }} />
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', lineHeight: 1 }}>Bienvenido(a)</span>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>Mi Cuenta</span>
            </div>
          </a>

          {/* Cart Icon */}
          <div onClick={onOpenCart} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <ShoppingCart size={26} style={{ color: '#0f172a' }} />
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-8px',
                background: '#e11d48',
                color: '#ffffff',
                borderRadius: '9999px',
                width: '18px',
                height: '18px',
                fontSize: '0.7rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cartCount}
              </span>
            </div>
          </div>

          {/* Phone Info */}
          <div style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 600 }} className="desktop-only">
            <span>¡Escríbenos! </span>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>{brand.whatsappFormatted}</span>
          </div>

          {/* Mobile menu toggle */}
          <button type="button" aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={mobileMenuOpen} aria-controls="store-navigation" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: 'none', color: '#0f172a' }} className="mobile-toggle">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar (Bright Green) */}
      <nav id="store-navigation" className={`store-nav${mobileMenuOpen ? ' is-open' : ''}`} style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container store-nav-inner" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '0 1.5rem' }}>
          {/* Categories Button */}
          <button onClick={() => { onSelectCategory('funebres'); setMobileMenuOpen(false); }}
            style={{
              background: '#6ea820',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.88rem',
              padding: '0.75rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              letterSpacing: '0.04em'
            }}
          >
            <Menu size={18} />
            <span>CATEGORIAS</span>
          </button>

          {/* Menu Items */}
          <div className="store-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', overflowX: 'auto', padding: '0.75rem 0' }}>
            <a href="#mi-cuenta" className="mobile-account-link" onClick={() => setMobileMenuOpen(false)}><User size={18} aria-hidden="true" /> Mi cuenta</a>
            {['Corona de Flores', 'Rosas y Flores', 'Ocasiones', 'Diseños y Estilos', 'Catálogo Completo'].map((item, idx) => (
              <a
                key={idx}
                href={idx === 0 ? "#inicio" : "#catalog-section"}
                onClick={() => { if (idx !== 0) onSelectCategory('funebres'); setMobileMenuOpen(false); }}
                style={{
                  fontSize: '0.88rem',
                  fontWeight: idx === 3 || idx === 0 ? 700 : 500,
                  color: idx === 3 ? '#6ea820' : '#334155',
                  whiteSpace: 'nowrap',
                  textDecoration: 'none'
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <label className="mobile-search"><Search size={18} aria-hidden="true" /><input aria-label="Buscar productos" type="search" placeholder="Buscar productos…" value={searchQuery} onChange={e => onSearchChange(e.target.value)} /></label>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
