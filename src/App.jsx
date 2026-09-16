import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FlowResponseModal } from './components/FlowResponseModal';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { productRepository } from './services/productRepository';

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
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
      const saved = localStorage.getItem('lisar_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lisar_cart', JSON.stringify(cartItems));
    } catch (err) {
      console.error('Error saving cart:', err);
    }
  }, [cartItems]);

  // Load Products & Categories from ProductRepository Adapter
  useEffect(() => {
    async function loadCatalog() {
      setLoading(true);
      const [prodsList, catsList] = await Promise.all([
        productRepository.getProducts({ category: activeCategory, searchQuery, sortBy }),
        productRepository.getCategories()
      ]);
      setProducts(prodsList);
      setCategories(catsList);
      setLoading(false);
    }
    loadCatalog();
  }, [activeCategory, searchQuery, sortBy]);

  // Cart operations
  const handleAddToCart = (product, quantity = 1, variant = null) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.id === product.id && item.selectedVariant?.name === variant?.name);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { ...product, quantity, selectedVariant: variant }];
    });
    setIsCartOpen(true);
    if (selectedProduct) setSelectedProduct(null);
  };

  const handleBuyNowFlow = (product, quantity = 1, variant = null) => {
    const itemPrice = product.price + (variant ? variant.priceModifier : 0);
    const itemTotal = itemPrice * quantity;
    setCartItems([{ ...product, quantity, selectedVariant: variant }]);
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

  const scrollToCatalog = () => {
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        <Hero onExploreClick={scrollToCatalog} />

        <div id="catalog-section" className="container" style={{ paddingTop: '2.5rem' }}>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalItems={products.length}
          />

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: '#a78bfa' }}>
              Cargando catálogo oficial Lisar Studio...
            </div>
          ) : (
            <ProductGrid
              products={products}
              onSelectProduct={setSelectedProduct}
              onAddToCart={(p) => handleAddToCart(p, 1, p.variants?.[0] || null)}
            />
          )}
        </div>

        <PortfolioShowcase />
        <AboutSection />
      </main>


      {/* Footer */}
      <Footer />

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
    </div>
  );
}
