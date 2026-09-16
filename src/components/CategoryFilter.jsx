import React from 'react';
import { SlidersHorizontal, Grid, ArrowUpDown } from 'lucide-react';

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
      borderBottom: '1px solid rgba(255,255,255,0.06)'
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
                padding: '0.55rem 1.1rem',
                borderRadius: '9999px',
                fontSize: '0.86rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#ffffff' : '#94a3b8',
                background: isActive ? 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' : 'rgba(255,255,255,0.05)',
                border: isActive ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                boxShadow: isActive ? '0 4px 12px rgba(124, 58, 237, 0.3)' : 'none',
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
        <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>
          {totalItems} {totalItems === 1 ? 'producto' : 'productos'} encontrados
        </span>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowUpDown size={16} style={{ color: '#a78bfa' }} />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="input-field"
            style={{
              padding: '0.45rem 2rem 0.45rem 0.8rem',
              fontSize: '0.85rem',
              borderRadius: '8px',
              background: 'rgba(26, 24, 41, 0.9)',
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
