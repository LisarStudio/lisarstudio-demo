import React from 'react';
import { MessageCircle } from 'lucide-react';
import { productRepository } from '../services/productRepository';
import './WhatsAppWidget.css';

export function WhatsAppWidget() {
  const brand = productRepository.getBrandInfo();
  return <a href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola Corona de Flores, necesito ayuda con mi pedido de flores fúnebres.')}`} target="_blank" rel="noopener noreferrer" className="whatsapp-widget" aria-label="¿Necesitas Ayuda?" title="¿Necesitas Ayuda?">
    <span className="whatsapp-widget-icon"><MessageCircle size={25} /></span><span className="whatsapp-widget-label">¿Necesitas Ayuda?</span>
  </a>;
}
