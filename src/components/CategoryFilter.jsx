import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export function CategoryFilter({ categories, activeCategory, onSelectCategory, sortBy, onSortChange, totalItems }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      flexWrap: 'wrap',
      padding: '1.25rem 0',
      marginBottom: '1.5rem',
      borderBottom: '1px solid #e2e8f0'
    }}>
      {/* Category Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
        {categories.map(cat => {
          const isActive = activeCategory === cat.slug || activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug || cat.id)}
              style={{
                padding: '0.55rem 1.2rem',
                borderRadius: '9999px',
                fontSize: '0.86rem',
                fontWeight: isActive ? 700 : 600,
                color: isActive ? '#ffffff' : '#475569',
                background: isActive ? '#1b4230' : '#f1f5f9',
                border: isActive ? '1px solid #1b4230' : '1px solid #cbd5e1',
                boxShadow: isActive ? '0 4px 12px rgba(27, 66, 48, 0.2)' : 'none',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Sorting & Counter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
          {totalItems} {totalItems === 1 ? 'arreglo' : 'arreglos'} encontrados
        </span>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowUpDown size={16} style={{ color: '#166534' }} />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="input-field"
            style={{
              padding: '0.45rem 2rem 0.45rem 0.8rem',
              fontSize: '0.85rem',
              borderRadius: '8px',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              color: '#0f172a',
              cursor: 'pointer',
              width: 'auto'
            }}
          >
            <option value="featured">Destacados</option>
            <option value="price-low">Precio: Menor a Mayor</option>
            <option value="price-high">Precio: Mayor a Menor</option>
            <option value="rating">Mejor Valorados</option>
            <option value="name">Nombre A-Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}
