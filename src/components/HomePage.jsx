import React from 'react';
import { ArrowRight, Flower2 } from 'lucide-react';
import { clientData } from '../data/clientData';
import { productRepository } from '../services/productRepository';
import { ProductCard } from './ProductCard';
import './HomePage.css';

const allProducts = clientData.products;
const collections = [
  { slug: 'coronas', name: 'Coronas', id: 'legacy-1326' },
  { slug: 'arreglos', name: 'Arreglos', id: 'legacy-797' },
  { slug: 'ofrendas-florales', name: 'Ofrendas florales', id: 'legacy-878' },
  { slug: 'cubre-urnas', name: 'Cubre urnas', id: 'legacy-800' },
  { slug: 'ramos', name: 'Ramos', id: 'legacy-881' },
].map(c => ({
  ...c,
  image: allProducts.find(p => p.id === c.id)?.image || allProducts[0].image,
  products: allProducts.filter(p => p.originalCategorySlugs.includes(c.slug))
}));

const selectProducts = ids => ids.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
const featured = selectProducts(['legacy-803', 'legacy-792', 'legacy-884', 'legacy-797', 'legacy-800', 'legacy-881', 'legacy-878', 'legacy-880']);

function ProductCollection({ title, eyebrow, products, onSelectProduct, onBrowse, category }) {
  return (
    <section className="home-section home-product-section">
      <div className="home-section-heading">
        <div>
          <p className="home-eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <button className="home-text-link" onClick={() => onBrowse({ category })}>
          Ver colección <ArrowRight size={17} />
        </button>
      </div>
      <div className="home-products-grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} />
        ))}
      </div>
    </section>
  );
}

export function HomePage({ onSelectProduct, onBrowse }) {
  const brand = productRepository.getBrandInfo();
  const standout = allProducts.find(p => p.id === 'legacy-1326');

  return (
    <main className="home-page" id="inicio">
      <div className="home-wrap">
        {/* Banner de bienvenida con el Logo Oficial Centrado */}
        <section className="home-welcome home-welcome-brand">
          <div className="home-brand-emblem-wrap">
            <img
              src={brand.logo}
              alt={brand.name}
              className="home-brand-main-logo"
              width="260"
              height="115"
            />
          </div>
          <p className="home-eyebrow">FLORES QUE EXPRESAN CARIÑO, RESPETO Y COMPAÑÍA</p>
          <h1>Floristería en Santiago <span>Un homenaje hecho con flores</span></h1>
        </section>

        {/* Categorías circulares */}
        <nav className="home-collections" aria-label="Colecciones de flores">
          {collections.map(c => (
            <button key={c.slug} onClick={() => onBrowse({ category: c.slug })}>
              <span className="home-category-image">
                <img src={c.image} alt={c.name} width="150" height="150" loading="lazy" />
              </span>
              <strong>{c.name}</strong>
              <span>{c.products.length} productos</span>
            </button>
          ))}
        </nav>

        {/* Catálogo de Productos Inmediato */}
        <section className="home-section home-featured" id="catalog-section">
          <div className="home-section-heading">
            <div>
              <p className="home-eyebrow">Nuestra selección</p>
              <h2>Flores para un homenaje especial</h2>
            </div>
            <button className="home-text-link" onClick={() => onBrowse()}>
              Ver todos <ArrowRight size={17} />
            </button>
          </div>
          <div className="home-featured-layout">
            <div className="home-standout">
              <span className="home-featured-label">La elegancia de las flores blancas</span>
              <ProductCard product={standout} onSelectProduct={onSelectProduct} />
            </div>
            <div className="home-featured-grid">
              {featured.map(p => (
                <ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} />
              ))}
            </div>
          </div>
        </section>

        {/* Colección de Coronas */}
        <ProductCollection
          title="Nuestra colección de coronas"
          eyebrow="Cariño y respeto en cada detalle"
          products={selectProducts(['legacy-803', 'legacy-884', 'legacy-1324', 'legacy-888', 'legacy-787'])}
          onSelectProduct={onSelectProduct}
          onBrowse={onBrowse}
          category="coronas"
        />

        {/* Colección de Arreglos y Ramos */}
        <ProductCollection
          title="Arreglos y ramos para acompañar"
          eyebrow="Pequeños gestos, grandes sentimientos"
          products={selectProducts(['legacy-792', 'legacy-797', 'legacy-881', 'legacy-882', 'archive-573'])}
          onSelectProduct={onSelectProduct}
          onBrowse={onBrowse}
          category="funebres"
        />

        {/* Preguntas frecuentes */}
        <section className="home-faq home-section">
          <p className="home-eyebrow">Te ayudamos a elegir</p>
          <h2>Preguntas frecuentes</h2>
          <details>
            <summary>¿Qué tipos de arreglos puedo encontrar?</summary>
            <p>Nuestro catálogo reúne coronas, arreglos, ofrendas florales, cubre urnas y ramos. Puedes explorar cada colección o ver los {allProducts.length} productos en la tienda.</p>
          </details>
          <details>
            <summary>¿Puedo elegir el color de las flores?</summary>
            <p>Algunos diseños tienen variantes de color. Abre la ficha del producto para consultar las opciones disponibles y su precio.</p>
          </details>
          <details>
            <summary>¿Dónde puedo consultar mis compras anteriores?</summary>
            <p>En <a href="#mi-cuenta">Mi cuenta</a> encontrarás el acceso a la cuenta de la tienda original para consultar tus compras anteriores.</p>
          </details>
        </section>

        {/* Pie de cierre */}
        <section className="home-closing">
          <Flower2 size={36} />
          <div>
            <h2>Encuentra las flores para tu homenaje</h2>
            <p>Explora nuestras colecciones y elige un detalle con significado.</p>
          </div>
          <button className="home-dark-button" onClick={() => onBrowse()}>
            Ver catálogo completo <ArrowRight size={18} />
          </button>
        </section>
      </div>
    </main>
  );
}
