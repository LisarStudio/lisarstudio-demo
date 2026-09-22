
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { calculateOrderTotals, restoreCart } from '../src/services/cart.js';
const products = JSON.parse(fs.readFileSync(new URL('../src/data/recoveredProducts.json', import.meta.url), 'utf8'));
test('21-22 September client product names and CLP prices', () => {
  const expected = [
    ['legacy-788','Corona 13',42990],['legacy-783','Corona 6',42990],
    ['legacy-794','Arreglos 3',34990],['legacy-880','Cruz del descanso',59990],
    ['legacy-778','Ofrendas Florales 1',114990],['archive-573','Ramo inolvidable',34990],
    ['legacy-789','Hermoso escrito',64990],['legacy-790','Corona emotiva',48990],
    ['legacy-791','Arreglo blanco delicado',28990]
  ];
  for (const [id,title,price] of expected) {
    const product=products.find(p=>p.id===id);
    assert.equal(product.title,title);assert.equal(product.price,price);assert.equal(product.regularPrice,price);
  }
  assert.equal(products.length,42);
  assert.ok(products.every(p=>!/cinta|envío sin costo/i.test([p.description,p.shortDescription,...p.features].join(' '))));
});
test('flat delivery once per order across quantities, variants and discounts', () => {
  assert.deepEqual(calculateOrderTotals([]),{subtotal:0,discountAmount:0,shipping:0,total:0});
  const one={price:42990,quantity:1};
  assert.equal(calculateOrderTotals([one]).total,46990);
  assert.equal(calculateOrderTotals([{...one,quantity:2}]).total,89980);
  const items=[{...one,quantity:2},{price:34990,quantity:1,selectedVariant:{priceModifier:1000}}];
  assert.deepEqual(calculateOrderTotals(items,10),{subtotal:121970,discountAmount:12197,shipping:4000,total:113773});
});
test('saved baskets use current prices and names and merge obsolete ribbon lines', () => {
  const saved=[
    {id:'legacy-880',title:'Canastilla',price:1,quantity:2,ribbonText:'old'},
    {id:'legacy-880',title:'Canastilla',price:1,quantity:1,ribbonText:'other'},
    {id:'legacy-783',price:92990,quantity:1},
    {id:'missing',quantity:1},{id:'legacy-788',quantity:-1}
  ];
  const restored=restoreCart(saved,products);
  assert.equal(restored.length,2);
  assert.equal(restored[0].title,'Cruz del descanso');assert.equal(restored[0].quantity,3);
  assert.equal(restored[0].price,59990);assert.ok(!('ribbonText' in restored[0]));
  assert.equal(restored[1].price,42990);assert.equal(calculateOrderTotals(restored).shipping,4000);
  assert.deepEqual(restoreCart({},products),[]);
});

