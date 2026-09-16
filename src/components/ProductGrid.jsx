import React from 'react';
import { ProductCard } from './ProductCard';
import { PackageSearch } from 'lucide-react';

export function ProductGrid({ products, onSelectProduct, onAddToCart }) {
  if (!products || products.length === 0) {
    return (
      <div style={{
        padding: '4rem 1.5rem',
        textAlign: 'center',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px dashed var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <PackageSearch size={48} style={{ color: '#94a3b8' }} />
        <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>No se encontraron productos</h3>
        <p style={{ color: '#94a3b8', maxWidth: '400px', fontSize: '0.9rem' }}>
          Intenta cambiar los términos de búsqueda o selecciona otra categoría de nuestro catálogo.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.75rem',
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
  );
}
