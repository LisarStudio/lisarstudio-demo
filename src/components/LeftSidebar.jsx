import React from 'react';
import { clientData, catalogMaxPrice, catalogMinPrice } from '../data/clientData';

export function LeftSidebar({ activeCategory, onSelectCategory, priceRange, onPriceChange }) {
  return <aside className="catalog-sidebar" id="catalog-filters">
    <div><h3>Categorías</h3><nav className="sidebar-category-links" aria-label="Categorías del catálogo">
      {clientData.categories.map(c => <button key={c.slug} type="button" aria-current={activeCategory === c.slug ? 'page' : undefined} onClick={() => onSelectCategory(c.slug)}><span>{c.name}</span><span>({c.count})</span></button>)}
    </nav></div>
    <div className="sidebar-price"><h3>Filtrar Por Precio</h3><input aria-label="Precio máximo" type="range" min={catalogMinPrice} max={catalogMaxPrice} step="5000" value={priceRange ?? catalogMaxPrice} onChange={e => onPriceChange?.(Number(e.target.value))} /><div className="sidebar-price-labels"><span>${catalogMinPrice.toLocaleString('es-CL')}</span><span>Hasta: ${(priceRange ?? catalogMaxPrice).toLocaleString('es-CL')}</span></div></div>
  </aside>;
}
