import React from 'react';
import { clientData } from '../data/clientData';
import { ExternalLink, Layers, Sparkles } from 'lucide-react';

export function PortfolioShowcase() {
  const portfolio = clientData.portfolio || [];

  return (
    <section style={{
      padding: '4rem 0',
      background: 'var(--bg-primary)',
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={14} />
            <span>PORTAFOLIO DESTACADO DE CLIENTES</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff' }}>
            Proyectos & Soluciones E-Commerce Realizadas
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '0.5rem' }}>
            Casos de éxito desarrollados por Lisar Studio con diseño personalizado e integración directa de pagos.
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
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
              className="portfolio-card"
            >
              <div style={{ height: '220px', overflow: 'hidden', background: '#09090e' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  className="portfolio-img"
                  onError={(e) => {
                    e.target.src = './client_images/uploads/woocommerce-placeholder-600x600.png';
                  }}
                />
              </div>
              <div style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 700, textTransform: 'uppercase' }}>
                    {item.category}
                  </span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginTop: '0.2rem' }}>
                    {item.title}
                  </h3>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '9999px', padding: '0.5rem', color: '#a78bfa' }}>
                  <ExternalLink size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .portfolio-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-active);
          box-shadow: var(--shadow-glow);
        }
        .portfolio-card:hover .portfolio-img {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
}
