import React from 'react';
import { productRepository } from '../services/productRepository';
import { Award, Code2, Users, Sparkles } from 'lucide-react';

export function AboutSection() {
  const team = productRepository.getTeamMembers();
  const brand = productRepository.getBrandInfo();

  return (
    <section style={{
      padding: '4rem 0',
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
          <div className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={14} />
            <span>NUESTRO EQUIPO CORPORATIVO</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff' }}>
            Conoce a las Mentes Detrás de {brand.name}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '0.5rem' }}>
            Un equipo multidisciplinario apasionado por crear soluciones web de alto impacto, tiendas e-commerce modernas e integraciones de pago de última generación.
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
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                padding: '1.5rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                transition: 'transform 0.3s ease'
              }}
            >
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '9999px',
                overflow: 'hidden',
                border: '3px solid #7c3aed',
                boxShadow: '0 0 15px rgba(124, 58, 237, 0.3)'
              }}>
                <img
                  src={member.image}
                  alt={member.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = '/client_images/uploads/2020/09/client1-free-img.png';
                  }}
                />
              </div>

              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>{member.name}</h3>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#a78bfa' }}>{member.role}</span>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
