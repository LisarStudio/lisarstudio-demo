import React, { useState } from 'react';
import { ShoppingBag, Search, MessageCircle, Menu, X, ShieldCheck, PhoneCall } from 'lucide-react';
import { productRepository } from '../services/productRepository';

export function Header({ cartCount, onOpenCart, activeCategory, onSelectCategory, searchQuery, onSearchChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const brand = productRepository.getBrandInfo();
  const categories = [
    { id: 'all', name: 'Todos los Arreglos' },
    { id: 'coronas-funebres', name: 'Coronas Fúnebres' },
    { id: 'arreglos-condolencias', name: 'Arreglos & Ramilletes' },
    { id: 'cubre-urnas', name: 'Cubre Urnas & Cruces' },
    { id: 'canastos-florales', name: 'Canastos & Palmas' }
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: '#ffffff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      {/* Top Notification Bar */}
      <div style={{
        background: '#1b4230',
        padding: '0.45rem 1rem',
        fontSize: '0.82rem',
        fontWeight: 600,
        textAlign: 'center',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        <ShieldCheck size={16} style={{ color: '#c59b27' }} />
        <span>Despacho 24/7 Urgente a Velatorios, Iglesias y Parroquias en Santiago • Envíos el mismo día</span>
      </div>

      <div className="container" style={{ padding: '0.9rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        {/* Brand Logo & Name */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
          <img
            src={brand.logo}
            alt={brand.name}
            style={{
              height: '56px',
              width: 'auto',
              maxHeight: '56px',
              borderRadius: '8px',
              border: '2px solid #1b4230',
              objectFit: 'contain',
              background: '#ffffff',
              padding: '2px'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div>
            <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#1b4230', letterSpacing: '-0.02em', display: 'block', lineHeight: 1.1 }}>
              CORONA DE <span style={{ color: '#c59b27' }}>FLORES</span>
            </span>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              FLORISTERÍA FÚNEBRE & CONDOLENCIAS CHILE
            </span>
          </div>
        </a>

        {/* Search Bar - Desktop */}
        <div style={{ flex: '1', maxWidth: '400px', position: 'relative' }} className="desktop-only">
          <input
            type="text"
            placeholder="Buscar coronas fúnebres, arreglos, cubre urnas..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '2.5rem', borderRadius: '9999px', fontSize: '0.88rem', background: '#f8fafc' }}
          />
          <Search size={18} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Phone / WhatsApp Direct */}
          <a
            href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola Corona de Flores, necesito información urgente para enviar arreglos fúnebres.')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#166534',
              color: '#ffffff',
              fontWeight: 700,
              padding: '0.6rem 1.1rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 2px 8px rgba(22, 101, 52, 0.25)'
            }}
          >
            <MessageCircle size={18} />
            <span className="desktop-only">Pedidos WhatsApp 24/7</span>
          </a>

          {/* Cart Icon Button */}
          <button
            onClick={onOpenCart}
            className="btn-primary"
            style={{ position: 'relative', padding: '0.6rem 1.2rem', borderRadius: '9999px', fontSize: '0.88rem' }}
          >
            <ShoppingBag size={19} />
            <span className="desktop-only">Mi Carrito</span>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#e11d48',
                color: '#ffffff',
                borderRadius: '9999px',
                width: '22px',
                height: '22px',
                fontSize: '0.75rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #ffffff'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: '#1b4230', padding: '0.5rem', display: 'none' }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Navigation Sub-Bar */}
      <nav style={{ borderTop: '1px solid #e2e8f0', background: '#1b4230' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto', padding: '0.5rem 1.5rem' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              style={{
                padding: '0.45rem 1.1rem',
                borderRadius: '6px',
                fontSize: '0.88rem',
                fontWeight: activeCategory === cat.id ? 700 : 600,
                color: activeCategory === cat.id ? '#1b4230' : '#ffffff',
                background: activeCategory === cat.id ? '#ffffff' : 'transparent',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                border: activeCategory === cat.id ? '1px solid #ffffff' : '1px solid transparent'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
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
