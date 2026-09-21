import React, { useState, useEffect } from 'react';
import './catalog.css';
import { HomePage } from './components/HomePage';
import { AccountSection } from './components/AccountSection';
import { catalogMaxPrice } from './data/clientData';
import { Header } from './components/Header';
import { LeftSidebar } from './components/LeftSidebar';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FlowResponseModal } from './components/FlowResponseModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { Footer } from './components/Footer';
import { productRepository } from './services/productRepository';

export default function App() {
  const getPage = () => window.location.hash === '#mi-cuenta' ? 'account' : window.location.hash.startsWith('#catalog') ? 'catalog' : 'home';
  const [page, setPage] = useState(getPage);
  useEffect(() => {
    const onHashChange = () => {
      setPage(getPage());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  const [products, setProducts] = useState([]);
  const [_categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('funebres');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState(catalogMaxPrice);
  const [loading, setLoading] = useState(true);

  // Modals & Drawers State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [flowResponseData, setFlowResponseData] = useState(null);

  // Cart Items State
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('corona_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('corona_cart', JSON.stringify(cartItems));
    } catch (err) {
      console.error('Error saving cart:', err);
    }
  }, [cartItems]);

  // Load Products & Categories
  useEffect(() => {
    async function loadCatalog() {
      setLoading(true);
      const [prodsList, catsList] = await Promise.all([
        productRepository.getProducts({ category: activeCategory, searchQuery, sortBy }),
        productRepository.getCategories()
      ]);
      const filteredByPrice = prodsList.filter(p => p.price <= priceRange);
      setProducts(filteredByPrice);
      setCategories(catsList);
      setLoading(false);
    }
    loadCatalog();
  }, [activeCategory, searchQuery, sortBy, priceRange]);

  // Cart operations
  const handleAddToCart = (product, quantity = 1, variant = null, ribbonText = '') => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.id === product.id && item.selectedVariant?.name === variant?.name && item.ribbonText === ribbonText);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { ...product, quantity, selectedVariant: variant, ribbonText }];
    });
    setIsCartOpen(true);
    if (selectedProduct) setSelectedProduct(null);
  };

  const handleBuyNowFlow = (product, quantity = 1, variant = null, ribbonText = '') => {
    const itemPrice = product.price + (variant ? variant.priceModifier : 0);
    const itemTotal = itemPrice * quantity;
    setCartItems([{ ...product, quantity, selectedVariant: variant, ribbonText }]);
    if (selectedProduct) setSelectedProduct(null);
    setCheckoutTotal(itemTotal);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (index, newQty) => {
    setCartItems(prev => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleProceedToCheckout = (total) => {
    setCheckoutTotal(total);
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = (paymentDetails) => {
    setIsCheckoutOpen(false);
    setCartItems([]);
    setFlowResponseData(paymentDetails);
  };

  const browseCatalog = ({ category = 'funebres', priceRange: maxPrice = catalogMaxPrice } = {}) => {
    setActiveCategory(category);
    setPriceRange(maxPrice);
    setSearchQuery('');
    window.location.hash = 'catalog-section';
    window.scrollTo(0, 0);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#ffffff', color: '#1e293b' }}>
      {/* Header */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={category => browseCatalog({ category })}
        searchQuery={searchQuery}
        onSearchChange={query => { setSearchQuery(query); setActiveCategory('funebres'); setPriceRange(catalogMaxPrice); window.location.hash = 'catalog-section'; }}
      />

      {page === 'account' ? <AccountSection /> : page === 'home' ? <HomePage onSelectProduct={setSelectedProduct} onBrowse={browseCatalog} /> : <>
      {/* Breadcrumb line */}
      <div className="container catalog-breadcrumb" style={{ padding: '0.85rem 1.5rem', fontSize: '0.78rem', color: '#64748b' }}>
        <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>🏠 TIENDA DE FLORES</a>
        <span style={{ margin: '0 0.4rem' }}>&gt;</span>
        <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>VARIEDADES</a>
        <span style={{ margin: '0 0.4rem' }}>&gt;</span>
        <strong style={{ color: '#0f172a' }}>FÚNEBRES</strong>
      </div>

      {/* Main 2-Column Layout */}
      <main style={{ flex: 1, paddingBottom: '3rem' }}>
        <div className="container app-main-grid">
          {/* Left Column: Sidebar Accordion & Price Filter */}
          <LeftSidebar
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
          />

          {/* Right Column: Product Grid & Header Controls */}
          <div className="catalog-column">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: '#64748b' }}>
                Cargando catálogo oficial Corona de Flores...
              </div>
            ) : (
              <ProductGrid
                products={products}
                onSelectProduct={setSelectedProduct}
                onAddToCart={(p) => handleAddToCart(p, 1, p.variants?.[0] || null)}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            )}
          </div>
        </div>
      </main>

      </>}

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Modals & Drawers */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNowFlow={handleBuyNowFlow}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        totalAmount={checkoutTotal}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {flowResponseData && (
        <FlowResponseModal
          paymentDetails={flowResponseData}
          onClose={() => setFlowResponseData(null)}
        />
      )}

      <style>{`
        @media (max-width: 900px) {
          .app-main-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
