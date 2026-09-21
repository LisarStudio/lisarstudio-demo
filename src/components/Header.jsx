import React, { useRef, useState } from 'react';
import { ShoppingCart, Search, User, Menu, X, ChevronDown } from 'lucide-react';
import { productRepository } from '../services/productRepository';
import './Header.css';

export function Header({ cartCount, onOpenCart, onSelectCategory, searchQuery, onSearchChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInput = useRef(null);
  const brand = productRepository.getBrandInfo();
  const toggleSearch = () => {
    setSearchOpen(open => !open);
    setMobileMenuOpen(false);
    requestAnimationFrame(() => searchInput.current?.focus());
  };
  return <header className="store-header">
    <div className="store-topbar"><div className="container"><a href="#mi-cuenta">Mi Cuenta</a><a className="store-top-email" href={`mailto:${brand.email}`}>{brand.email}</a><span>FLORISTERÍA FÚNEBRE CHILE</span></div></div>
    <div className="container store-header-row">
      <button type="button" className="mobile-toggle" aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={mobileMenuOpen} aria-controls="store-navigation" onClick={() => { setMobileMenuOpen(open => !open); setSearchOpen(false); }}>{mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}</button>
      <a href="#inicio" className="store-brand" onClick={() => setMobileMenuOpen(false)}>
        <img src={brand.logo} alt={brand.name} width="52" height="52" />
        <span className="store-brand-copy"><span className="store-brand-name">Corona de <span>Flores</span></span><span className="store-brand-tagline">FLORISTERÍA FÚNEBRE CHILE</span></span>
      </a>
      <form className={`store-search${searchOpen ? ' is-open' : ''}`} role="search" onSubmit={e => { e.preventDefault(); onSearchChange(searchQuery); setSearchOpen(false); }}>
        <input ref={searchInput} type="search" aria-label="Buscar productos" placeholder="Buscar..." value={searchQuery} onChange={e => onSearchChange(e.target.value)} />
        <button type="submit" aria-label="Buscar"><Search size={20} /></button>
      </form>
      <div className="store-header-actions">
        <a href="#mi-cuenta" aria-label="Mi cuenta" className="store-account"><User size={35} /><span><small>Bienvenido(a)</small><strong>Mi Cuenta</strong></span></a>
        <button type="button" className="mobile-search-toggle" aria-label={searchOpen ? 'Cerrar búsqueda' : 'Abrir búsqueda'} aria-expanded={searchOpen} onClick={toggleSearch}>{searchOpen ? <X size={25} /> : <Search size={27} />}</button>
        <button type="button" className="store-cart" onClick={onOpenCart} aria-label={`Abrir carrito, ${cartCount} productos`}><span className="store-cart-icon"><ShoppingCart size={28} /><span className="store-cart-count">{cartCount}</span></span><ChevronDown size={14} /></button>
      </div>
    </div>
    <nav id="store-navigation" className={`store-nav${mobileMenuOpen ? ' is-open' : ''}`} aria-label="Navegación principal">
      <div className="container store-nav-inner">
        <button type="button" className="store-categories" onClick={() => { onSelectCategory('funebres'); setMobileMenuOpen(false); }}><Menu size={20} /><span>CATEGORIAS</span></button>
        <div className="store-nav-links"><a href="#mi-cuenta" className="mobile-account-link" onClick={() => setMobileMenuOpen(false)}><User size={18} /> Mi cuenta</a>{['Corona de Flores', 'Rosas y Flores', 'Ocasiones', 'Diseños y Estilos', 'Catálogo Completo'].map((item, idx) => <a key={item} href={idx === 0 ? '#inicio' : '#catalog-section'} className={idx === 3 ? 'store-nav-accent' : ''} onClick={() => { if (idx !== 0) onSelectCategory('funebres'); setMobileMenuOpen(false); }}>{item}</a>)}</div>
        <p className="store-phone">¡Escríbenos! <span>{brand.whatsappFormatted}</span></p>
      </div>
    </nav>
  </header>;
}
