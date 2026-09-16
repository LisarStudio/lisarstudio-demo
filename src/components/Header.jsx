import React, { useState } from 'react';
import { ShoppingBag, Search, Phone, MessageCircle, Menu, X, ShieldCheck, Heart } from 'lucide-react';
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
    <header style={{ position: 'sticky', top: 0, zIndex: 100 }} className="glass-panel">
      {/* Top Notification Bar */}
      <div style={{
        background: 'linear-gradient(90deg, #1b4230 0%, #b8860b 100%)',
        padding: '0.4rem 1rem',
        fontSize: '0.82rem',
        fontWeight: 600,
        textAlign: 'center',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        <ShieldCheck size={16} />
        <span>Atención 24/7 y Despacho Urgente a Velatorios e Iglesias • Pasarela de Pagos Flow Integrada</span>
      </div>

      <div className="container" style={{ padding: '0.85rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        {/* Brand Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}>
          <img
            src={brand.logo}
            alt={brand.name}
            style={{ height: '48px', width: 'auto', borderRadius: '50%', border: '2px solid #d4af37', objectFit: 'cover' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#faf8f5', letterSpacing: '-0.02em', display: 'block', lineHeight: 1 }}>
              CORONA DE <span style={{ color: '#d4af37' }}>FLORES</span>
            </span>
            <span style={{ fontSize: '0.72rem', color: '#cbd5e1', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              FLORISTERÍA FÚNEBRE & CONDOLENCIAS
            </span>
          </div>
        </a>

        {/* Search Bar - Desktop */}
        <div style={{ flex: '1', maxWidth: '420px', position: 'relative' }} className="desktop-only">
          <input
            type="text"
            placeholder="Buscar coronas, ramos, cubre urnas..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '2.5rem', borderRadius: '9999px', fontSize: '0.88rem' }}
          />
          <Search size={18} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#cbd5e1' }} />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola Corona de Flores, necesito hacer una consulta urgente para despacho de flores.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-emerald"
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.86rem', borderRadius: '9999px' }}
          >
            <MessageCircle size={18} />
            <span className="desktop-only">Pedido WhatsApp 24/7</span>
          </a>

          {/* Cart Icon Button */}
          <button
            onClick={onOpenCart}
            className="btn-primary"
            style={{ position: 'relative', padding: '0.65rem 1.2rem', borderRadius: '9999px', fontSize: '0.88rem' }}
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
                width: '21px',
                height: '21px',
                fontSize: '0.75rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #071710'
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
      <nav style={{ borderTop: '1px solid rgba(212, 175, 55, 0.15)', background: 'rgba(13, 36, 25, 0.95)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1rem', overflowX: 'auto', padding: '0.65rem 1.5rem' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                fontSize: '0.86rem',
                fontWeight: activeCategory === cat.id ? 700 : 500,
                color: activeCategory === cat.id ? '#071710' : '#cbd5e1',
                background: activeCategory === cat.id ? 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)' : 'transparent',
                border: activeCategory === cat.id ? '1px solid #d4af37' : '1px solid transparent',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
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
