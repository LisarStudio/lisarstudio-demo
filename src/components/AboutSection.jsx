import React from 'react';
import { productRepository } from '../services/productRepository';
import { getAssetUrl } from '../data/clientData';
import { Sparkles } from 'lucide-react';

export function AboutSection() {
  const team = productRepository.getTeamMembers();
  const brand = productRepository.getBrandInfo();
  const fallbackAvatar = getAssetUrl('client_images/uploads/2020/09/client1-free-img.png');

  return (
    <section style={{
      padding: '4rem 0',
      background: '#f8fafc',
      borderTop: '1px solid #e2e8f0',
      borderBottom: '1px solid #e2e8f0'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={14} />
            <span>NUESTRO EQUIPO DE ATENCIÓN</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>
            Atención Personalizada 24/7 en {brand.name}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.5rem' }}>
            Floristas profesionales y personal de logística especializados en confección y despacho solemne de arreglos fúnebres.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem'
        }}>
          {team.map((member, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid #e2e8f0',
                padding: '1.5rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '9999px',
                overflow: 'hidden',
                border: '3px solid #166534',
                boxShadow: '0 4px 12px rgba(22, 101, 52, 0.15)'
              }}>
                <img
                  src={member.image}
                  alt={member.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = fallbackAvatar;
                  }}
                />
              </div>

              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>{member.name}</h3>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#166534' }}>{member.role}</span>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
