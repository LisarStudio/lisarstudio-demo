import React from 'react';
import { ProductCard } from './ProductCard';
import { LayoutGrid, List } from 'lucide-react';

export function CatalogViewToggle({ view, onViewChange }) {
  return <div className="catalog-view" aria-label="Presentación del catálogo">
    <button type="button" aria-label="Ver cuadrícula" aria-pressed={view === 'grid'} onClick={() => onViewChange('grid')}><LayoutGrid size={17} /></button>
    <button type="button" aria-label="Ver lista" aria-pressed={view === 'list'} onClick={() => onViewChange('list')}><List size={17} /></button>
  </div>;
}

export function ProductGrid({ products, onSelectProduct, sortBy, onSortChange, view = 'grid', onViewChange }) {
  return (
    <section id="catalog-section" className="catalog" aria-labelledby="catalog-title">
      <div className="catalog-intro">
        <h1 id="catalog-title">Arreglos Fúnebres 🌸 y Coronas Fúnebres en Santiago</h1>
        <p>Honra la memoria de tu ser querido con coronas, pedestales y cubre cajas elaborados con flores frescas de exportación.<br />
          ⏱️ <strong>Entrega en 2 horas</strong> a cualquier funeraria de Santiago: Sendero, Parque del Recuerdo, Cementerio General, San Sebastián y más. ¿Necesitas un catálogo 100% especializado? Visita coronas fúnebres en Santiago con envío urgente garantizado.
        </p>
      </div>
      <div className="catalog-toolbar">
        <div className="catalog-sort">
          <label htmlFor="catalog-sort">Ordenar por:</label>
          <select id="catalog-sort" value={sortBy || 'featured'} onChange={e => onSortChange(e.target.value)}>
            <option value="featured">Destacados</option>
            <option value="price-low">Precio: Menor a Mayor</option>
            <option value="price-high">Precio: Mayor a Menor</option>
            <option value="rating">Mejor Valorados</option>
          </select>
        </div>
        <CatalogViewToggle view={view} onViewChange={onViewChange} />
      </div>
      {products.length ? (
        <div className={`catalog-products${view === 'list' ? ' catalog-products--list' : ''}`}>
          {products.map((product, index) => <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} priority={index < 2} />)}
        </div>
      ) : <p role="status" className="catalog-empty">No encontramos productos con estos filtros. Prueba otra búsqueda o amplía el precio máximo.</p>}
    </section>
  );
}
