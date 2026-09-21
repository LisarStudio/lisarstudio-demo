import React from 'react';
import { User, ShoppingBag, MapPin, KeyRound, ArrowLeft, ArrowUpRight } from 'lucide-react';
import './AccountSection.css';

const accountUrl = 'https://coronadeflores.cl/mi-cuenta/';

export function AccountSection() {
  return (
    <main className="container account-page" aria-labelledby="account-heading">
      <a className="account-back" href="#catalog-section"><ArrowLeft size={16} /> Volver al catálogo</a>
      <h1 id="account-heading">Mi cuenta</h1>
      <p className="account-intro">Accede a tu cuenta de Corona de Flores y consulta tus compras.</p>
      <div className="account-layout">
        <section className="account-access" aria-labelledby="account-access-heading">
          <User size={30} aria-hidden="true" />
          <h2 id="account-access-heading">Acceder</h2>
          <p>Utiliza el mismo usuario o correo y contraseña de tu cuenta de Corona de Flores.</p>
          <a className="account-primary" href={accountUrl}>Acceder a mi cuenta <ArrowUpRight size={17} aria-hidden="true" /></a>
          <a className="account-recovery" href={`${accountUrl}lost-password/`}>¿Olvidaste tu contraseña?</a>
          <div className="account-register">
            <h3>¿Todavía no tienes cuenta?</h3>
            <p>Regístrate en Corona de Flores.</p>
            <a className="account-secondary" href="https://coronadeflores.cl/register/">Crear cuenta</a>
          </div>
          <p className="account-destination">El acceso y el registro se abren en coronadeflores.cl, donde se conserva tu cuenta. Aquí no te pediremos tu contraseña.</p>
        </section>
        <section className="account-options" aria-labelledby="account-options-heading">
          <h2 id="account-options-heading">Gestiona tu cuenta</h2>
          <a href={`${accountUrl}orders/`} className="account-option"><ShoppingBag size={23} aria-hidden="true" /><span><strong>Mis pedidos</strong><span>Consulta las compras realizadas en coronadeflores.cl y sus detalles.</span></span><ArrowUpRight size={17} aria-hidden="true" /></a>
          <a href={`${accountUrl}edit-address/`} className="account-option"><MapPin size={23} aria-hidden="true" /><span><strong>Mis direcciones</strong><span>Revisa tus direcciones de facturación y entrega.</span></span><ArrowUpRight size={17} aria-hidden="true" /></a>
          <a href={`${accountUrl}edit-account/`} className="account-option"><KeyRound size={23} aria-hidden="true" /><span><strong>Datos de mi cuenta</strong><span>Gestiona tus datos personales y contraseña.</span></span><ArrowUpRight size={17} aria-hidden="true" /></a>
          <p className="account-destination">Para consultar estos datos tendrás que iniciar sesión. Las operaciones de prueba de este catálogo de demostración no generan pedidos en tu cuenta.</p>
        </section>
      </div>
    </main>
  );
}
