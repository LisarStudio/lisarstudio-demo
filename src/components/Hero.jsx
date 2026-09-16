import React from 'react';
import { ArrowRight, CheckCircle2, Zap, CreditCard, ShieldCheck } from 'lucide-react';
import { productRepository } from '../services/productRepository';

export function Hero({ onExploreClick }) {
  const brand = productRepository.getBrandInfo();

  return (
    <section style={{
      position: 'relative',
      padding: '4rem 0 3.5rem 0',
      background: 'radial-gradient(circle at 50% 20%, rgba(124, 58, 237, 0.15) 0%, rgba(9, 9, 14, 1) 70%)',
      borderBottom: '1px solid var(--border-color)',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }} className="hero-grid">
        {/* Left Column: Headline & Value Prop */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }} className="badge badge-purple">
            <Zap size={14} />
            <span>SOLUCIONES DIGITALES E-COMMERCE & FLOW</span>
          </div>

          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, lineHeight: 1.15, color: '#ffffff', letterSpacing: '-0.03em' }}>
            Potencia Tu Marca Con Un Sitio Web <span style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #34d399 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Profesional & Comercial</span>
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.6 }}>
            En <strong>{brand.name}</strong> desarrollamos páginas web responsivas, tiendas virtuales con pasarela de pagos <strong>Flow.cl</strong> (Webpay Plus) y soporte técnico garantizado.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', margin: '0.5rem 0' }}>
            {[
              "Entrega acelerada desde 1 a 3 días hábiles",
              "Integración nativa con Pasarela de Pago Flow / Webpay",
              "Diseño adaptable 100% optimizado para móviles"
            ].map((text, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#e2e8f0', fontSize: '0.92rem' }}>
                <CheckCircle2 size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={onExploreClick} className="btn-primary" style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}>
              <span>Explorar Planes & Catálogo</span>
              <ArrowRight size={19} />
            </button>
            <a
              href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ padding: '0.85rem 1.4rem', fontSize: '0.95rem' }}
            >
              Cotización Personalizada
            </a>
          </div>
        </div>

        {/* Right Column: Hero Visual Container */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'var(--bg-card)'
          }}>
            <img
              src={brand.heroBanner}
              alt="Lisar Studio Banner"
              style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
              onError={(e) => {
                e.target.src = '/client_images/uploads/2021/05/Bannerlisar-1024x575.jpeg';
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(9, 9, 14, 0.9) 0%, rgba(9, 9, 14, 0.2) 60%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CreditCard style={{ color: '#34d399' }} size={24} />
                  <div>
                    <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700 }}>Pasarela Flow Integrada</h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Webpay • Tarjetas • Servipag • Mach</p>
                  </div>
                </div>
                <span className="badge badge-emerald">100% Funcional</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
