import React from 'react';
import { ArrowRight, CheckCircle2, Heart, Truck } from 'lucide-react';
import { productRepository } from '../services/productRepository';
import { getAssetUrl } from '../data/clientData';

export function Hero({ onExploreClick }) {
  const brand = productRepository.getBrandInfo();
  const heroImage = getAssetUrl('client_images/2021/04/Corona-de-Flores.png');

  return (
    <section style={{
      position: 'relative',
      padding: '3.5rem 0 3rem 0',
      background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
      borderBottom: '1px solid #e2e8f0',
      overflow: 'hidden'
    }}>
      <div className="container hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
        {/* Left Column: Headline & Floristry Value Prop */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }} className="badge badge-gold">
            <Heart size={14} />
            <span>FLORISTERÍA FÚNEBRE & CONDOLENCIAS CHILE</span>
          </div>

          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, lineHeight: 1.15, color: '#1b4230', letterSpacing: '-0.03em' }}>
            Homenaje & Memoria Con <span style={{ color: '#c59b27' }}>Flores Seleccionadas</span>
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.6 }}>
            En <strong>{brand.name}</strong> confeccionamos coronas fúnebres solemnes, cubre urnas y arreglos de condolencia con flores naturales de exportación y despacho urgente a velatorios e iglesias.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: '0.5rem 0' }}>
            {[
              "Despacho prioritario 24/7 a velatorios e iglesias de la Región Metropolitana",
              "Incluye cinta de condolencias impresa personalizada sin costo adicional",
              "Pago 100% seguro con Pasarela Flow (Webpay Plus, Tarjetas de Débito y Crédito)"
            ].map((text, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#334155', fontSize: '0.92rem', fontWeight: 500 }}>
                <CheckCircle2 size={18} style={{ color: '#166534', flexShrink: 0 }} />
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
              href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola Corona de Flores, necesito una consulta urgente.')}`}
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
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0',
            background: '#ffffff',
            padding: '1rem'
          }}>
            <img
              src={heroImage}
              alt="Corona de Flores"
              style={{ width: '100%', height: '340px', objectFit: 'contain', borderRadius: '14px', background: '#f8fafc' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              background: '#f1f5f9',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Truck style={{ color: '#166534' }} size={24} />
                <div>
                  <h4 style={{ color: '#1b4230', fontSize: '0.92rem', fontWeight: 700 }}>Despacho Urgente Velatorios</h4>
                  <p style={{ color: '#64748b', fontSize: '0.78rem' }}>Coordinación directa con iglesias y parroquias en Santiago</p>
                </div>
              </div>
              <span className="badge badge-emerald">Flow Webpay</span>
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
