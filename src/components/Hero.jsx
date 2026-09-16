import React from 'react';
import { ArrowRight, CheckCircle2, Heart, CreditCard, Clock, Truck } from 'lucide-react';
import { productRepository } from '../services/productRepository';

export function Hero({ onExploreClick }) {
  const brand = productRepository.getBrandInfo();

  return (
    <section style={{
      position: 'relative',
      padding: '4.5rem 0 3.5rem 0',
      background: 'radial-gradient(circle at 50% 20%, rgba(212, 175, 55, 0.12) 0%, rgba(7, 23, 16, 1) 75%)',
      borderBottom: '1px solid var(--border-color)',
      overflow: 'hidden'
    }}>
      <div className="container hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
        {/* Left Column: Headline & Floristry Value Prop */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }} className="badge badge-purple">
            <Heart size={14} />
            <span>FLORISTERÍA FÚNEBRE & CONDOLENCIAS CHILE</span>
          </div>

          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, lineHeight: 1.15, color: '#faf8f5', letterSpacing: '-0.03em' }}>
            Homenaje & Memoria Con <span style={{ background: 'linear-gradient(135deg, #f3e5ab 0%, #d4af37 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Flores Seleccionadas</span>
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.6 }}>
            En <strong>{brand.name}</strong> confeccionamos coronas fúnebres solemnes, cubre urnas y arreglos de condolencia con flores naturales de exportación y despacho urgente a velatorios e iglesias.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: '0.5rem 0' }}>
            {[
              "Despacho prioritario 24/7 en la Región Metropolitana e iglesias",
              "Incluye cinta de condolencias impresa personalizada",
              "Pago 100% seguro con Pasarela Flow (Webpay Plus, Tarjetas)"
            ].map((text, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#f8fafc', fontSize: '0.92rem' }}>
                <CheckCircle2 size={18} style={{ color: '#d4af37', flexShrink: 0 }} />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={onExploreClick} className="btn-primary" style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}>
              <span>Ver Catálogo de Arreglos</span>
              <ArrowRight size={19} />
            </button>
            <a
              href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ padding: '0.85rem 1.4rem', fontSize: '0.95rem' }}
            >
              Consulta Urgente 24/7
            </a>
          </div>
        </div>

        {/* Right Column: Floral Hero Visual */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.7)',
            border: '2px solid rgba(212, 175, 55, 0.3)',
            background: 'var(--bg-card)'
          }}>
            <img
              src={brand.heroLogo}
              alt="Corona de Flores"
              style={{ width: '100%', height: '380px', objectFit: 'contain', padding: '1.5rem', background: '#0b2016' }}
              onError={(e) => {
                e.target.src = './client_images/2021/04/Corona-de-Flores.png';
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(7, 23, 16, 0.95) 0%, rgba(7, 23, 16, 0.1) 60%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Truck style={{ color: '#d4af37' }} size={24} />
                  <div>
                    <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700 }}>Despacho Urgente Velatorios</h4>
                    <p style={{ color: '#cbd5e1', fontSize: '0.78rem' }}>Coordinación inmediata con iglesias y velatorios</p>
                  </div>
                </div>
                <span className="badge badge-emerald">Flow Webpay</span>
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
