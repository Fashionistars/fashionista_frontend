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

// Map old shortcut paths to correct FSD paths
const pathMap = [
  [`"@/components/Button"`, `"@/components/ui/primitives/Button"`],
  [`'@/components/Button'`, `"@/components/ui/primitives/Button"`],
  [`"@/components/Card"`, `"@/components/ui/compounds/Card"`],
  [`'@/components/Card'`, `"@/components/ui/compounds/Card"`],
  [`"@/components/BlogCard"`, `"@/components/ui/compounds/BlogCard"`],
  [`'@/components/BlogCard'`, `"@/components/ui/compounds/BlogCard"`],
  [`"@/components/VendorCard"`, `"@/components/ui/compounds/VendorCard"`],
  [`'@/components/VendorCard'`, `"@/components/ui/compounds/VendorCard"`],
  [`"@/components/Cads"`, `"@/components/ui/compounds/Cads"`],
  [`'@/components/Cads'`, `"@/components/ui/compounds/Cads"`],
  [`"@/components/SignUpForm"`, `"@/features/auth/components/SignUpForm"`],
  [`'@/components/SignUpForm'`, `"@/features/auth/components/SignUpForm"`],
  [`"@/components/VerifyInput"`, `"@/components/ui/primitives/VerifyInput"`],
  [`'@/components/VerifyInput'`, `"@/components/ui/primitives/VerifyInput"`],
  [`"@/components/CategoryScroll"`, `"@/components/ui/compounds/CategoryScroll"`],
  [`'@/components/CategoryScroll'`, `"@/components/ui/compounds/CategoryScroll"`],
  [`"@/components/Carousel"`, `"@/components/animations/Carousel"`],
  [`'@/components/Carousel'`, `"@/components/animations/Carousel"`],
  [`"@/components/Collapsible"`, `"@/components/ui/compounds/Collapsible"`],
  [`'@/components/Collapsible'`, `"@/components/ui/compounds/Collapsible"`],
  [`"@/lib/validation/schemass/addProduct"`, `"@/lib/validation/schemas/addProduct"`],
  [`'@/lib/validation/schemass/addProduct'`, `"@/lib/validation/schemas/addProduct"`],
];

const files = getAllFiles(srcDir);
let totalFixed = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  for (const [from, to] of pathMap) {
    content = content.replaceAll(from, to);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    totalFixed++;
    console.log('FIXED:', path.relative(__dirname, filePath));
  }
}

console.log(`\nDone! Fixed ${totalFixed} files.`);
