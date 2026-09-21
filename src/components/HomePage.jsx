import React, { useState } from 'react';
import { ArrowRight, Flower2, HeartHandshake, PackageCheck, UserRound } from 'lucide-react';
import { clientData, catalogMaxPrice, getAssetUrl } from '../data/clientData';
import { ProductCard } from './ProductCard';
import './HomePage.css';

const allProducts = clientData.products;
const collections = [
  { slug: 'coronas', name: 'Coronas', id: 'legacy-1326' },
  { slug: 'arreglos', name: 'Arreglos', id: 'legacy-797' },
  { slug: 'ofrendas-florales', name: 'Ofrendas florales', id: 'legacy-878' },
  { slug: 'cubre-urnas', name: 'Cubre urnas', id: 'legacy-800' },
  { slug: 'ramos', name: 'Ramos', id: 'legacy-881' },
].map(c => ({ ...c, image: allProducts.find(p => p.id === c.id).image, products: allProducts.filter(p => p.originalCategorySlugs.includes(c.slug)) }));
const selectProducts = ids => ids.map(id => allProducts.find(p => p.id === id));
const featured = selectProducts(['legacy-803', 'legacy-792', 'legacy-884', 'legacy-797', 'legacy-800', 'legacy-881', 'legacy-878', 'legacy-880']);

function ProductCollection({ title, eyebrow, products, onSelectProduct, onBrowse, category }) {
  return <section className="home-section home-product-section">
    <div className="home-section-heading"><div><p className="home-eyebrow">{eyebrow}</p><h2>{title}</h2></div><button className="home-text-link" onClick={() => onBrowse({ category })}>Ver colección <ArrowRight size={17} /></button></div>
    <div className="home-products-grid">{products.map(p => <ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} />)}</div>
  </section>;
}

export function HomePage({ onSelectProduct, onBrowse }) {
  const [category, setCategory] = useState('funebres');
  const [productId, setProductId] = useState('');
  const [budget, setBudget] = useState(String(catalogMaxPrice));
  const available = category === 'funebres' ? allProducts : collections.find(c => c.slug === category).products;
  const submitSearch = e => {
    e.preventDefault();
    if (productId) onSelectProduct(allProducts.find(p => p.id === productId));
    else onBrowse({ category, priceRange: Number(budget) });
  };
  const standout = allProducts.find(p => p.id === 'legacy-1326');
  return <main className="home-page" id="inicio">
    <div className="home-wrap">
      <section className="home-welcome">
        <p className="home-eyebrow">Flores que expresan cariño, respeto y compañía</p>
        <h1>Floristería en Santiago <span>Un homenaje hecho con flores</span></h1>
      </section>

      <section className="home-hero" aria-labelledby="home-hero-title">
        <img className="home-hero-image" src={getAssetUrl('client_images/home/floral-hero.webp')} alt="Rosas blancas, lirios y follaje inspirados en nuestros arreglos florales" fetchPriority="high" width="1536" height="1024" />
        <div className="home-hero-content">
          <span className="home-brand-pill">Corona de Flores</span>
          <h2 id="home-hero-title">Cuando las palabras<br />no alcanzan</h2>
          <p>Un detalle que acompaña. Flores para expresar todo tu cariño.</p>
          <form className="home-flower-finder" onSubmit={submitSearch}>
            <div className="home-finder-fields">
              <label>Categoría<select value={category} onChange={e => { setCategory(e.target.value); setProductId(''); }}><option value="funebres">Todos los arreglos</option>{collections.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
              <label>Diseño<select value={productId} onChange={e => setProductId(e.target.value)}><option value="">Todos los diseños</option>{available.filter(p => p.price <= Number(budget)).map(p => <option key={p.id} value={p.id}>{p.title}</option>)}</select></label>
              <label>Presupuesto<select value={budget} onChange={e => { setBudget(e.target.value); setProductId(''); }}><option value={catalogMaxPrice}>Todos los precios</option><option value="30000">Hasta $30.000</option><option value="50000">Hasta $50.000</option><option value="100000">Hasta $100.000</option></select></label>
            </div>
            <button className="home-gradient-button" type="submit">{productId ? 'Ver diseño' : 'Buscar flores'} <ArrowRight size={18} /></button>
          </form>
        </div>
      </section>

      <nav className="home-collections" aria-label="Colecciones de flores">
        {collections.map(c => <button key={c.slug} onClick={() => onBrowse({ category: c.slug })}><span className="home-category-image"><img src={c.image} alt="" width="150" height="150" loading="lazy" /></span><strong>{c.name}</strong><span>{c.products.length} productos</span></button>)}
      </nav>

      <div className="home-shop-strip"><p>Tu tienda de flores en Santiago <strong>Detalles que acompañan</strong></p><button onClick={() => onBrowse()}>Ver tienda <ArrowRight size={16} /></button></div>

      <section className="home-editorial">
        <p className="home-eyebrow">Un gesto de amor, un recuerdo que permanece</p>
        <h2>Arreglos florales para acompañar</h2>
        <p>Hay momentos en los que una flor dice más que mil palabras. Encuentra coronas, arreglos y ramos para compartir tu cariño y rendir un homenaje especial.</p>
        <ul><li>Coronas y ofrendas florales para recordar con respeto.</li><li>Arreglos, cubre urnas y ramos de nuestro catálogo.</li><li>Opciones de color disponibles en los diseños que lo permiten.</li></ul>
        <button className="home-pink-button" onClick={() => onBrowse()}>Explorar catálogo <ArrowRight size={16} /></button>
        <small>{allProducts.length} diseños de Corona de Flores. Precios en pesos chilenos.</small>
      </section>

      <div className="home-service-strip">
        <div><Flower2 /><span><strong>Flores con significado</strong><small>Un detalle para acompañar</small></span></div>
        <div><HeartHandshake /><span><strong>Homenajes especiales</strong><small>Elige el diseño adecuado</small></span></div>
        <div><PackageCheck /><span><strong>Catálogo completo</strong><small>{allProducts.length} productos para descubrir</small></span></div>
        <a href="#mi-cuenta"><UserRound /><span><strong>Mi cuenta</strong><small>Accede a tus compras anteriores</small></span></a>
      </div>

      <section className="home-section home-featured">
        <div className="home-section-heading"><div><p className="home-eyebrow">Nuestra selección</p><h2>Flores para un homenaje especial</h2></div><button className="home-text-link" onClick={() => onBrowse()}>Ver todos <ArrowRight size={17} /></button></div>
        <div className="home-featured-layout">
          <div className="home-standout"><span className="home-featured-label">La elegancia de las flores blancas</span><ProductCard product={standout} onSelectProduct={onSelectProduct} /></div>
          <div className="home-featured-grid">{featured.map(p => <ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} />)}</div>
        </div>
      </section>

      <section className="home-editorial home-editorial-centered"><p className="home-eyebrow">Flores que hablan desde el corazón</p><h2>Un homenaje tan especial como su recuerdo</h2><p>Descubre nuestra colección de coronas. Diseños con diferentes tamaños, flores y colores para encontrar la forma de expresar tus condolencias.</p><button className="home-pink-button" onClick={() => onBrowse({ category: 'coronas' })}>Descubrir coronas <ArrowRight size={16} /></button></section>

      <section className="home-photo-banner">
        <img src={getAssetUrl('client_images/home/floral-editorial.webp')} alt="Composición de rosas blancas inspirada en los arreglos de Corona de Flores" width="1536" height="1024" loading="lazy" />
        <div><p className="home-eyebrow">Detalles que expresan cariño</p><h2>La belleza de<br />un gesto sincero</h2><p>Flores para estar cerca,<br />incluso en los momentos más difíciles.</p><button className="home-dark-button" onClick={() => onBrowse({ category: 'arreglos' })}>Ver arreglos <ArrowRight size={17} /></button></div>
      </section>

      <ProductCollection title="Nuestra colección de coronas" eyebrow="Cariño y respeto en cada detalle" products={selectProducts(['legacy-803', 'legacy-884', 'legacy-1324', 'legacy-888', 'legacy-787'])} onSelectProduct={onSelectProduct} onBrowse={onBrowse} category="coronas" />
      <div className="home-twin-banners">
        {collections.filter(c => ['cubre-urnas', 'ofrendas-florales'].includes(c.slug)).map(c => <section key={c.slug}><div><p className="home-eyebrow">Un homenaje con flores</p><h2>{c.name}</h2><button className="home-text-link" onClick={() => onBrowse({ category: c.slug })}>Ver colección <ArrowRight size={16} /></button></div><img src={c.image} alt={c.name} width="300" height="300" loading="lazy" /></section>)}
      </div>
      <ProductCollection title="Arreglos y ramos para acompañar" eyebrow="Pequeños gestos, grandes sentimientos" products={selectProducts(['legacy-792', 'legacy-797', 'legacy-881', 'legacy-882', 'archive-573'])} onSelectProduct={onSelectProduct} onBrowse={onBrowse} category="funebres" />

      <section className="home-faq home-section"><p className="home-eyebrow">Te ayudamos a elegir</p><h2>Preguntas frecuentes</h2><details><summary>¿Qué tipos de arreglos puedo encontrar?</summary><p>Nuestro catálogo reúne coronas, arreglos, ofrendas florales, cubre urnas y ramos. Puedes explorar cada colección o ver los {allProducts.length} productos en la tienda.</p></details><details><summary>¿Puedo elegir el color de las flores?</summary><p>Algunos diseños tienen variantes de color. Abre la ficha del producto para consultar las opciones disponibles y su precio.</p></details><details><summary>¿Dónde puedo consultar mis compras anteriores?</summary><p>En <a href="#mi-cuenta">Mi cuenta</a> encontrarás el acceso a la cuenta de la tienda original para consultar tus compras anteriores.</p></details></section>
      <section className="home-closing"><Flower2 size={36} /><div><h2>Encuentra las flores para tu homenaje</h2><p>Explora nuestras cinco colecciones y elige un detalle con significado.</p></div><button className="home-dark-button" onClick={() => onBrowse()}>Ver catálogo completo <ArrowRight size={18} /></button></section>
    </div>
  </main>;
}
