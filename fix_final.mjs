import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, 'src');

function getAllFiles(dir, exts = ['.tsx', '.ts']) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results = results.concat(getAllFiles(full, exts));
    else if (exts.includes(path.extname(entry.name))) results.push(full);
  }
  return results;
}

// More path mappings discovered
const pathMap = [
  // Missing component paths
  [`"@/components/OrderList"`, `"@/features/orders/components/OrderList"`],
  [`'@/components/OrderList'`, `"@/features/orders/components/OrderList"`],
  [`"@/components/TopBanner"`, `"@/components/shared/utilities/TopBanner"`],
  [`'@/components/TopBanner'`, `"@/components/shared/utilities/TopBanner"`],
  [`"@/components/Transactions"`, `"@/features/account/components/Transactions"`],
  [`'@/components/Transactions'`, `"@/features/account/components/Transactions"`],
  [`"@/components/AdminTopBanner"`, `"@/components/shared/utilities/AdminTopBanner"`],
  [`'@/components/AdminTopBanner'`, `"@/components/shared/utilities/AdminTopBanner"`],
  [`"@/components/DragAndDrop"`, `"@/components/ui/compounds/DragAndDrop"`],
  [`'@/components/DragAndDrop'`, `"@/components/ui/compounds/DragAndDrop"`],
];

// Replace undefined image variable references (from bulk import removal) with string paths
const varToPath = {
  'man': '/man2_asset.svg',
  'man2': '/man3_assets.svg',
  'couple': '/couple_assets.svg',
  'woman': '/woman.svg',
  'woman2': '/woman2.svg',
  'minimalist': '/minimalist.svg',
  'vintage': '/vintage.svg',
  'senator': '/senator.svg',
  'gown': '/gown.svg',
  'sapphire': '/vendor/sapphire.svg',
  'gucci': '/vendor/gucci.svg',
  'versace': '/vendor/versace.svg',
  'burberry': '/vendor/burberry.svg',
  'ralph': '/vendor/ralph.svg',
  'calvin': '/vendor/calvin.svg',
  'fashion': '/vendor/fashion.svg',
  'google': '/google.svg',
  'arrow': '/arrow.svg',
  'arrows': '/arrows.svg',
  'bg_auth': '/bg-auth.svg',
};

const files = getAllFiles(srcDir);
let totalFixed = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Apply path mappings
  for (const [from, to] of pathMap) {
    content = content.replaceAll(from, to);
  }

  // Fix undefined image variables in data objects: image: varName, → image: "/path",
  for (const [varName, imgPath] of Object.entries(varToPath)) {
    // Match: image: varName, or image: varName\n (end of object property)
    const pattern = new RegExp(`(image:\\s*)${varName}(,|\\n|\\r)`, 'g');
    content = content.replace(pattern, `$1"${imgPath}"$2`);
    // Also match: src={varName} inside JSX (not yet handled by src replacement)
    const srcPattern = new RegExp(`src=\\{${varName}\\}`, 'g');
    content = content.replace(srcPattern, `src="${imgPath}"`);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    totalFixed++;
    console.log('FIXED:', path.relative(__dirname, filePath));
  }
}

console.log(`\nDone! Fixed ${totalFixed} files.`);
