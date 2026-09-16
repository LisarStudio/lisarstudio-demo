import React from 'react';
import { clientData, getAssetUrl } from '../data/clientData';
import { ExternalLink, Sparkles, ShieldCheck, Heart, Truck } from 'lucide-react';

export function PortfolioShowcase() {
  const portfolio = clientData.portfolio || [];
  const placeholderImg = getAssetUrl('client_images/uploads/woocommerce-placeholder-600x600.png');

  return (
    <section style={{
      padding: '4rem 0',
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
          <div className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={14} />
            <span>NUESTRO TRABAJO Y COMPROMISO</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>
            Excelencia & Dignidad en Cada Arreglo Floral
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.5rem' }}>
            Acompañando a las familias en Santiago con responsabilidad, delicadeza y flores frescas seleccionadas.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {portfolio.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
              className="portfolio-card"
            >
              <div style={{ height: '220px', overflow: 'hidden', background: '#f8fafc' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  className="portfolio-img"
                  onError={(e) => {
                    e.target.src = placeholderImg;
                  }}
                />
              </div>
              <div style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: '#166534', fontWeight: 700, textTransform: 'uppercase' }}>
                    {item.category}
                  </span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginTop: '0.2rem' }}>
                    {item.title}
                  </h3>
                </div>
                <div style={{ background: '#f1f5f9', borderRadius: '9999px', padding: '0.5rem', color: '#1b4230' }}>
                  <ShieldCheck size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .portfolio-card:hover {
          transform: translateY(-4px);
          border-color: #cbd5e1;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        }
        .portfolio-card:hover .portfolio-img {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
}
