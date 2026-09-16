import { clientData } from '../data/clientData';

/**
 * Product Repository / API Adapter Pattern
 * 
 * Provides an admin-ready abstraction layer for fetching products, categories, 
 * inventory, and store metadata. Currently backed by clientData.js, but can be 
 * swapped seamlessly to connect to a REST/GraphQL backend (e.g. Node, Python, Laravel, Supabase, etc.)
 */
export class ProductRepository {
  constructor(apiBaseUrl = import.meta.env.VITE_API_URL || null) {
    this.apiBaseUrl = apiBaseUrl;
  }

  // Fetch all products with optional filtering & sorting
  async getProducts({ category = 'all', searchQuery = '', sortBy = 'featured' } = {}) {
    if (this.apiBaseUrl) {
      try {
        const queryParams = new URLSearchParams({ category, searchQuery, sortBy });
        const res = await fetch(`${this.apiBaseUrl}/api/products?${queryParams.toString()}`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('ProductRepository: Failed to reach external API, falling back to local dataset.', err);
      }
    }

    // Local repository logic
    let items = [...clientData.products];

    if (category && category !== 'all' && category !== 'todos') {
      items = items.filter(p => p.categorySlug === category || p.category === category);
    }

    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      items.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      items.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      items.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      items.sort((a, b) => a.title.localeCompare(b.title));
    }

    return items;
  }

  // Get product by ID or slug
  async getProductById(idOrSlug) {
    if (this.apiBaseUrl) {
      try {
        const res = await fetch(`${this.apiBaseUrl}/api/products/${idOrSlug}`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('ProductRepository: API fetch error:', err);
      }
    }

    return clientData.products.find(p => p.id === idOrSlug || p.slug === idOrSlug) || null;
  }

  // Get categories list
  async getCategories() {
    if (this.apiBaseUrl) {
      try {
        const res = await fetch(`${this.apiBaseUrl}/api/categories`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('ProductRepository: API fetch error:', err);
      }
    }
    return clientData.categories;
  }

  // Get brand identity & metadata
  getBrandInfo() {
    return clientData.brand;
  }

  // Get team info
  getTeamMembers() {
    return clientData.team;
  }
}

export const productRepository = new ProductRepository();
