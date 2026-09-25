import fs from 'fs';
import path from 'path';

const srcDir = 'd:/Intranet/lisarstudio-demo/temp_chat_empresa';
const targetDir = 'd:/Intranet/lisarstudio-demo/public/client_images/revisions_20260922';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy logo
const logoSrc = path.join(srcDir, '00000775-PHOTO-2026-09-21-20-05-21.jpg');
const logoDest = path.join('d:/Intranet/lisarstudio-demo/public/client_images', 'corona-de-flores-logo-2026.jpg');
fs.copyFileSync(logoSrc, logoDest);
console.log('Copied logo to', logoDest);

// Product photo mapping
const productUpdates = {
  'legacy-788': {
    name: 'Corona 13',
    files: [
      '00000798-PHOTO-2026-09-22-08-01-26.jpg',
      '00000799-PHOTO-2026-09-22-08-01-26.jpg',
      '00000800-PHOTO-2026-09-22-08-01-26.jpg',
      '00000801-PHOTO-2026-09-22-08-01-26.jpg'
    ]
  },
  'legacy-783': {
    name: 'Corona 6',
    files: [
      '00000804-PHOTO-2026-09-22-08-04-06.jpg',
      '00000805-PHOTO-2026-09-22-08-04-06.jpg',
      '00000806-PHOTO-2026-09-22-08-04-06.jpg'
    ]
  },
  'legacy-794': {
    name: 'Arreglos 3',
    files: [
      '00000809-PHOTO-2026-09-22-08-08-59.jpg',
      '00000810-PHOTO-2026-09-22-08-08-59.jpg',
      '00000811-PHOTO-2026-09-22-08-09-00.jpg'
    ]
  },
  'legacy-880': {
    name: 'Cruz del descanso',
    files: [
      '00000814-PHOTO-2026-09-22-08-11-57.jpg',
      '00000815-PHOTO-2026-09-22-08-11-57.jpg',
      '00000816-PHOTO-2026-09-22-08-11-57.jpg'
    ]
  },
  'legacy-778': {
    name: 'Ofrendas Florales 1',
    files: [
      '00000819-PHOTO-2026-09-22-08-14-47.jpg',
      '00000820-PHOTO-2026-09-22-08-14-47.jpg'
    ]
  },
  'archive-573': {
    name: 'Ramo inolvidable',
    files: [
      '00000822-PHOTO-2026-09-22-08-23-33.jpg'
    ]
  },
  'legacy-789': {
    name: 'Hermoso escrito',
    files: [
      '00000825-PHOTO-2026-09-22-08-53-18.jpg',
      '00000826-PHOTO-2026-09-22-08-53-18.jpg',
      '00000827-PHOTO-2026-09-22-08-53-19.jpg',
      '00000828-PHOTO-2026-09-22-08-53-19.jpg'
    ]
  },
  'legacy-790': {
    name: 'Corona emotiva',
    files: [
      '00000831-PHOTO-2026-09-22-08-58-49.jpg',
      '00000832-PHOTO-2026-09-22-08-58-49.jpg',
      '00000833-PHOTO-2026-09-22-08-58-49.jpg',
      '00000834-PHOTO-2026-09-22-08-58-49.jpg'
    ]
  },
  'legacy-791': {
    name: 'Arreglo blanco delicado',
    files: [
      '00000838-PHOTO-2026-09-22-09-04-31.jpg',
      '00000839-PHOTO-2026-09-22-09-04-31.jpg',
      '00000840-PHOTO-2026-09-22-09-04-31.jpg',
      '00000841-PHOTO-2026-09-22-09-04-31.jpg'
    ]
  }
};

const recPath = 'd:/Intranet/lisarstudio-demo/src/data/recoveredProducts.json';
const rec = JSON.parse(fs.readFileSync(recPath, 'utf8'));

for (const [id, info] of Object.entries(productUpdates)) {
  const p = rec.find(item => item.id === id);
  if (!p) {
    console.error('Product not found in recoveredProducts.json:', id);
    continue;
  }
  
  const relPaths = [];
  info.files.forEach((file, idx) => {
    const srcFile = path.join(srcDir, file);
    const ext = path.extname(file);
    const destFileName = `${id}-${idx + 1}${ext}`;
    const destFile = path.join(targetDir, destFileName);
    fs.copyFileSync(srcFile, destFile);
    relPaths.push(`client_images/revisions_20260922/${destFileName}`);
  });
  
  p.image = relPaths[0];
  p.gallery = relPaths.slice(1);
  console.log('Updated product', id, p.title, 'main image:', p.image, 'gallery:', p.gallery);
}

fs.writeFileSync(recPath, JSON.stringify(rec, null, 2), 'utf8');
console.log('Saved updated recoveredProducts.json successfully!');
