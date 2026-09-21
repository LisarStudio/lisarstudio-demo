import React from 'react';
import { Star } from 'lucide-react';
import { getAssetUrl } from '../data/clientData';

const formatCLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

// Preserve the full frame for portrait photos and arrangements spanning the source width.
const fullFrameProducts = new Set(['legacy-880', 'legacy-783', 'legacy-785', 'legacy-787', 'legacy-878', 'legacy-789', 'legacy-790', 'legacy-791', 'archive-573']);

export function ProductCard({ product, onSelectProduct, priority = false }) {
  const fullFrame = product.originalCategorySlugs?.includes('cubre-urnas') || fullFrameProducts.has(product.id);
  const rating = Math.max(0, Math.min(5, Number(product.rating) || 0));
  return (
    <article className={`product-card${fullFrame ? ' product-card--full-frame' : ''}`}>
      <button type="button" className="product-image-button" onClick={() => onSelectProduct(product)} aria-label={`Ver ${product.title}`}>
        <img className="product-img" src={product.image} alt={product.title} width="300" height="300" loading={priority ? 'eager' : 'lazy'} decoding="async"
          onError={e => {
            if (e.currentTarget.dataset.fallback) return;
            e.currentTarget.dataset.fallback = 'true';
            e.currentTarget.src = getAssetUrl('client_images/products/corona_rosas_lirios.jpg');
          }} />
      </button>
      <div className="product-info">
        <h2 className="product-title"><button type="button" title={product.title} onClick={() => onSelectProduct(product)}>{product.title}</button></h2>
        <div className="product-rating" role="img" aria-label={`${rating} de 5 estrellas`}>
          {Array.from({ length: 5 }, (_, i) => <Star key={i} size={13} aria-hidden="true" className={i < Math.round(rating) ? 'is-rated' : ''} fill="currentColor" strokeWidth={0} />)}
        </div>
        <p className="product-price">{formatCLP.format(product.price)}</p>
        <button type="button" className="btn-ver-producto" onClick={() => onSelectProduct(product)}>Ver producto</button>
      </div>
    </article>
  );
}
