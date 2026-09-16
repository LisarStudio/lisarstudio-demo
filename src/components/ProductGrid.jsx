import React from 'react';
import { ProductCard } from './ProductCard';
import { LayoutGrid, List } from 'lucide-react';

export function ProductGrid({ products, onSelectProduct, onAddToCart, sortBy, onSortChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Category Heading & Description */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <span>-</span>
          <span>Arreglos Fúnebres 🌸 y Coronas Fúnebres en Santiago</span>
        </h1>
        <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '900px' }}>
          Honra la memoria de tu ser querido con coronas, pedestales y cubre cajas elaborados con flores frescas de exportación. <br />
          ⏱️ <strong>Entrega en 2 horas</strong> a cualquier funeraria de Santiago: Sendero, Parque del Recuerdo, Cementerio General, San Sebastián y más. ¿Necesitas un catálogo 100% especializado? Visita coronas fúnebres en Santiago con envío urgente garantizado.
        </p>
      </div>

      {/* Sorting & Layout View Toggle Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.6rem 0',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
        margin: '0.5rem 0 1rem 0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem', color: '#475569' }}>
          <span>Ordenar por:</span>
          <select
            value={sortBy || 'featured'}
            onChange={(e) => onSortChange && onSortChange(e.target.value)}
            style={{
              padding: '0.35rem 1.8rem 0.35rem 0.6rem',
              borderRadius: '4px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              fontSize: '0.85rem',
              color: '#0f172a',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="featured">Aleatorio</option>
            <option value="price-low">Precio: Menor a Mayor</option>
            <option value="price-high">Precio: Mayor a Menor</option>
            <option value="rating">Mejor Valorados</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <button style={{ padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#f8fafc', color: '#0f172a' }}>
            <LayoutGrid size={16} />
          </button>
          <button style={{ padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#ffffff', color: '#64748b' }}>
            <List size={16} />
          </button>
        </div>
      </div>

      {/* 4-Column Product Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '4rem'
      }}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onSelectProduct={onSelectProduct}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}
