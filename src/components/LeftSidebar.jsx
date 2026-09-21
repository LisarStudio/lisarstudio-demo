import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { clientData } from '../data/clientData';

export function LeftSidebar({ activeCategory, onSelectCategory, priceRange, onPriceChange }) {
  const [openSections, setOpenSections] = useState({
    variedades: true,
    ocasiones: false,
    productosAdicionales: false,
    tipoFlor: false
  });

  const toggleSection = (sectionKey) => {
    setOpenSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  return (
    <aside className="catalog-sidebar" id="catalog-filters" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Categories Accordion */}
      <div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem' }}>
          Categories
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: '#475569' }}>
          <a href="#" style={{ color: '#475569', textDecoration: 'none' }}>Día de la Madre</a>
          <a href="#" style={{ color: '#475569', textDecoration: 'none' }}>Día de la Mujer</a>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => toggleSection('ocasiones')}>
            <span>Ocasiones</span>
            <ChevronDown size={16} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => toggleSection('productosAdicionales')}>
            <span>Productos Adicionales</span>
            <ChevronDown size={16} />
          </div>

          <a href="#" style={{ color: '#475569', textDecoration: 'none' }}>San Valentín</a>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => toggleSection('tipoFlor')}>
            <span>Tipo de Flor</span>
            <ChevronDown size={16} />
          </div>

          {/* Variedades Section (Expanded) */}
          <div>
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 700, color: '#0f172a' }}
              onClick={() => toggleSection('variedades')}
            >
              <span>Variedades</span>
              {openSections.variedades ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {openSections.variedades && (
              <div style={{ paddingLeft: '1rem', marginTop: '0.6rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="#" style={{ color: '#475569', textDecoration: 'none' }}>Bouquet</a>
                <a href="#" style={{ color: '#475569', textDecoration: 'none' }}>Cajas</a>
                <a href="#" style={{ color: '#475569', textDecoration: 'none' }}>Fruteros</a>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); onSelectCategory('funebres'); }}
                  style={{ color: '#0f172a', fontWeight: 800, textDecoration: 'none' }}
                >
                  Fúnebres
                </a>
                <a href="#" style={{ color: '#475569', textDecoration: 'none' }}>Jarrones</a>
                <a href="#" style={{ color: '#475569', textDecoration: 'none' }}>Solitarios</a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Price Filter Section */}
      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
          Filtrar Por Precio
        </h3>
        <input
          type="range"
          min="30000"
          max="150000"
          step="5000"
          value={priceRange || 150000}
          onChange={(e) => onPriceChange && onPriceChange(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#66a105' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#64748b', marginTop: '0.5rem' }}>
          <span>$30.000</span>
          <span>Hasta: ${priceRange ? priceRange.toLocaleString('es-CL') : '150.000'}</span>
        </div>
      </div>
    </aside>
  );
}
