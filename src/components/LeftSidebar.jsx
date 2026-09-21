import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { catalogMaxPrice, catalogMinPrice } from '../data/clientData';

export function LeftSidebar({ activeCategory, onSelectCategory, priceRange, onPriceChange }) {
  const [openSections, setOpenSections] = useState({ variedades: false, ocasiones: false, productosAdicionales: false, tipoFlor: false });
  const toggleSection = key => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  return <aside className="catalog-sidebar" id="catalog-filters">
    <div><h3>Categories</h3><div className="sidebar-category-links">
      <a href="#">Día de la Madre</a><a href="#">Día de la Mujer</a>
      <button type="button" aria-expanded={openSections.ocasiones} onClick={() => toggleSection('ocasiones')}>Ocasiones<ChevronDown size={14} /></button>
      <button type="button" aria-expanded={openSections.productosAdicionales} onClick={() => toggleSection('productosAdicionales')}>Productos Adicionales<ChevronDown size={14} /></button>
      <a href="#">San Valentín</a>
      <button type="button" aria-expanded={openSections.tipoFlor} onClick={() => toggleSection('tipoFlor')}>Tipo de Flor<ChevronDown size={14} /></button>
      <div className="sidebar-varieties"><button type="button" aria-expanded={openSections.variedades} aria-controls="sidebar-varieties" onClick={() => toggleSection('variedades')}>Variedades{openSections.variedades ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</button>
        {openSections.variedades && <div id="sidebar-varieties" className="sidebar-varieties-links"><a href="#">Bouquet</a><a href="#">Cajas</a><a href="#">Fruteros</a><a href="#" aria-current={activeCategory === 'funebres' ? 'page' : undefined} onClick={e => { e.preventDefault(); onSelectCategory('funebres'); }}>Fúnebres</a><a href="#">Jarrones</a><a href="#">Solitarios</a></div>}
      </div>
    </div></div>
    <div className="sidebar-price"><h3>Filtrar Por Precio</h3><input aria-label="Precio máximo" type="range" min={catalogMinPrice} max={catalogMaxPrice} step="5000" value={priceRange ?? catalogMaxPrice} onChange={e => onPriceChange?.(Number(e.target.value))} /><div className="sidebar-price-labels"><span>${catalogMinPrice.toLocaleString('es-CL')}</span><span>Hasta: ${(priceRange ?? catalogMaxPrice).toLocaleString('es-CL')}</span></div></div>
  </aside>;
}
