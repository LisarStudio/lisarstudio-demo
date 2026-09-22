// Confirmed by the client on 21 September and by Peter on 22 September.
export const SHIPPING_PER_ORDER = 4000;

export function calculateOrderTotals(items, discountPercent = 0) {
  const subtotal = items.reduce((sum, item) =>
    sum + (item.price + (item.selectedVariant?.priceModifier || 0)) * item.quantity, 0);
  const discountAmount = Math.round(subtotal * Math.min(100, Math.max(0, discountPercent)) / 100);
  const shipping = items.length ? SHIPPING_PER_ORDER : 0;
  return { subtotal, discountAmount, shipping, total: Math.max(0, subtotal - discountAmount) + shipping };
}

// Rehydrate from the current catalogue: saved prices, names and ribbon text are not authoritative.
export function restoreCart(savedItems, products) {
  if (!Array.isArray(savedItems)) return [];
  const result = [];
  for (const saved of savedItems) {
    const product = products.find(p => p.id === saved?.id);
    if (!product || !Number.isSafeInteger(saved.quantity) || saved.quantity < 1) continue;
    const variant = product.variants?.find(v =>
      saved.selectedVariant?.id ? v.id === saved.selectedVariant.id : v.name === saved.selectedVariant?.name) || null;
    const existing = result.find(item => item.id === product.id && item.selectedVariant?.name === variant?.name);
    if (existing) existing.quantity += saved.quantity;
    else result.push({ ...product, quantity: saved.quantity, selectedVariant: variant });
  }
  return result;
}
