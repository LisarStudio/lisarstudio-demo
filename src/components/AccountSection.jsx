import React, { useState } from 'react';
import { User, ShoppingBag, MapPin, KeyRound, ArrowLeft, ArrowUpRight, ShieldCheck, LayoutDashboard, Package, CreditCard } from 'lucide-react';
import './AccountSection.css';

const wpBaseUrl = 'https://coronadeflores.cl';
const accountUrl = `${wpBaseUrl}/mi-cuenta/`;
const adminUrl = `${wpBaseUrl}/wp-admin/`;

export function AccountSection() {
  const [activeTab, setActiveTab] = useState('customer'); // 'customer' or 'admin'

  return (
    <main className="container account-page" aria-labelledby="account-heading">
      <a className="account-back" href="#catalog-section"><ArrowLeft size={16} /> Volver a la tienda</a>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h1 id="account-heading" style={{ margin: 0 }}>Mi Cuenta & Panel de Control</h1>
          <p className="account-intro" style={{ margin: '0.35rem 0 0 0' }}>Conectado directamente con el sistema WordPress & WooCommerce de Corona de Flores.</p>
        </div>
        <div className="account-tabs" style={{ display: 'flex', gap: '8px', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('customer')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '13px',
              background: activeTab === 'customer' ? '#ffffff' : 'transparent',
              color: activeTab === 'customer' ? '#1b4230' : '#64748b',
              boxShadow: activeTab === 'customer' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            Área de Clientes
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '13px',
              background: activeTab === 'admin' ? '#ffffff' : 'transparent',
              color: activeTab === 'admin' ? '#1b4230' : '#64748b',
              boxShadow: activeTab === 'admin' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            Panel Administrador (WordPress)
          </button>
        </div>
      </div>

      {activeTab === 'customer' ? (
        <div className="account-layout">
          <section className="account-access" aria-labelledby="account-access-heading">
            <User size={30} aria-hidden="true" />
            <h2 id="account-access-heading">Acceso a Mi Cuenta</h2>
            <p>Inicia sesión con tu usuario o correo electrónico registrado en coronadeflores.cl para revisar tus pedidos anteriores y datos.</p>
            <a className="account-primary" href={accountUrl} target="_blank" rel="noopener noreferrer">
              Abrir Mi Cuenta en coronadeflores.cl <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className="account-recovery" href={`${accountUrl}lost-password/`} target="_blank" rel="noopener noreferrer">
              ¿Olvidaste tu contraseña?
            </a>
            <div className="account-register">
              <h3>¿Primera vez comprando?</h3>
              <p>Puedes crear tu cuenta para guardar tus direcciones de entrega frecuentes.</p>
              <a className="account-secondary" href={`${accountUrl}`} target="_blank" rel="noopener noreferrer">Crear cuenta en Corona de Flores</a>
            </div>
            <p className="account-destination">Tus credenciales y sesiones se procesan de forma segura directamente en el servidor WordPress de coronadeflores.cl.</p>
          </section>

          <section className="account-options" aria-labelledby="account-options-heading">
            <h2 id="account-options-heading">Gestión de Compras y Datos</h2>
            <a href={`${accountUrl}orders/`} target="_blank" rel="noopener noreferrer" className="account-option">
              <ShoppingBag size={23} aria-hidden="true" />
              <span>
                <strong>Mis Pedidos Realizados</strong>
                <span>Consulta el historial de arreglos florales, comprobantes y estado de pago Flow.</span>
              </span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a href={`${accountUrl}edit-address/`} target="_blank" rel="noopener noreferrer" className="account-option">
              <MapPin size={23} aria-hidden="true" />
              <span>
                <strong>Direcciones de Entrega y Facturación</strong>
                <span>Administra los velatorios, capillas y domicilios registrados en tu cuenta.</span>
              </span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a href={`${accountUrl}edit-account/`} target="_blank" rel="noopener noreferrer" className="account-option">
              <KeyRound size={23} aria-hidden="true" />
              <span>
                <strong>Detalles de la Cuenta</strong>
                <span>Modifica tu nombre de contacto, correo y contraseña de acceso.</span>
              </span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <p className="account-destination">Para consultar tus compras anteriores, inicia sesión con tu usuario de WordPress en coronadeflores.cl.</p>
          </section>
        </div>
      ) : (
        <div className="account-layout">
          <section className="account-access" style={{ background: '#f8fafc' }}>
            <ShieldCheck size={32} style={{ color: '#166534', marginBottom: '12px' }} />
            <h2>Dashboard de WordPress</h2>
            <p>Acceso administrativo para gestionar la tienda online, revisar los nuevos pedidos de condolencias pagados con Flow y editar productos.</p>
            <a className="account-primary" href={adminUrl} target="_blank" rel="noopener noreferrer" style={{ background: '#1b4230' }}>
              Acceder al WP-Admin <ArrowUpRight size={17} />
            </a>
            <div className="account-register">
              <h3>Sincronización con WooCommerce</h3>
              <p>Las compras realizadas desde este frontend se sincronizan automáticamente con la pasarela Flow instalada en el WordPress del dominio.</p>
            </div>
          </section>

          <section className="account-options" style={{ paddingTop: '10px' }}>
            <h2>Accesos Rápidos de Administración</h2>
            <a href={`${adminUrl}edit.php?post_type=shop_order`} target="_blank" rel="noopener noreferrer" className="account-option">
              <ShoppingBag size={23} style={{ color: '#166534' }} />
              <span>
                <strong>WooCommerce &gt; Pedidos</strong>
                <span>Revisa las ventas confirmadas por Flow, datos del difunto, velatorio y tarjeta.</span>
              </span>
              <ArrowUpRight size={17} />
            </a>
            <a href={`${adminUrl}edit.php?post_type=product`} target="_blank" rel="noopener noreferrer" className="account-option">
              <Package size={23} style={{ color: '#166534' }} />
              <span>
                <strong>Gestión de Productos</strong>
                <span>Editar precios, stock, títulos y fotografías de coronas y arreglos.</span>
              </span>
              <ArrowUpRight size={17} />
            </a>
            <a href={`${adminUrl}admin.php?page=wc-settings&tab=checkout&section=flowpayment`} target="_blank" rel="noopener noreferrer" className="account-option">
              <CreditCard size={23} style={{ color: '#c59b27' }} />
              <span>
                <strong>Configuración Flow Webpay</strong>
                <span>Verificar estado de las API Keys de Flow y parámetros de confirmación.</span>
              </span>
              <ArrowUpRight size={17} />
            </a>
          </section>
        </div>
      )}
    </main>
  );
}

