import React from 'react';
import { Star } from 'lucide-react';
import { getAssetUrl } from '../data/clientData';

const formatCLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

export function ProductCard({ product, onSelectProduct, priority = false }) {
  const rating = Math.max(0, Math.min(5, Number(product.rating) || 0));
  return (
    <article className="product-card">
      <button type="button" className="product-image-button" onClick={() => onSelectProduct(product)} aria-label={`Ver ${product.title}`}>
        <img className="product-img" src={product.image} alt={product.title} width="300" height="300" loading={priority ? 'eager' : 'lazy'} decoding="async"
          onError={e => {
            if (e.currentTarget.dataset.fallback) return;
            e.currentTarget.dataset.fallback = 'true';
            e.currentTarget.src = getAssetUrl('client_images/products/corona_rosas_lirios.jpg');
          }} />
      </button>
      <div className="product-info">
        <h2 className="product-title"><button type="button" onClick={() => onSelectProduct(product)}>{product.title}</button></h2>
        <div className="product-rating" role="img" aria-label={`${rating} de 5 estrellas`}>
          {Array.from({ length: 5 }, (_, i) => <Star key={i} size={13} aria-hidden="true" fill={i < Math.round(rating) ? 'currentColor' : 'none'} />)}
        </div>
        <p className="product-price">{formatCLP.format(product.price)}</p>
        <button type="button" className="btn-ver-producto" onClick={() => onSelectProduct(product)}>Ver producto</button>
      </div>
    </article>
  );
}
