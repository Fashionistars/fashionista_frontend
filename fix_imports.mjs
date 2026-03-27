import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// All files with broken logo/image imports from ../../public/
const filesToFix = [
  'src/components/shared/feedback/NewFooter.tsx',
  'src/app/(auth)/layout.tsx',
  'src/app/admin-dashboard/layout.tsx',
  'src/app/dashboard/@vendor/layout.tsx',
  'src/app/dashboard/@client/(dashboard)/layout.tsx',
  'src/app/client/dashboard/layout.tsx',
];

// Regex patterns to fix
const fixes = [
  // Remove broken relative logo imports (any depth)
  { pattern: /import logo from ['"][.\/]+public\/logo\.svg['"];\r?\n/g, replacement: '' },
  // Fix src={logo} to src="/logo.svg" with width/height added
  { pattern: /<Image(\s+)src=\{logo\}/g, replacement: '<Image$1src="/logo.svg" width={55} height={55}' },
  // Fix any leftover ../../public/heroimg references  
  { pattern: /import heroImg from ['"][.\/]+public\/heroimg\.png['"];\r?\n/g, replacement: '' },
  { pattern: /src=\{heroImg\}/g, replacement: 'src="/heroimg.png"' },
];

for (const relPath of filesToFix) {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log('SKIP (not found):', relPath);
    continue;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  const original = content;
  for (const fix of fixes) {
    content = content.replace(fix.pattern, fix.replacement);
  }
  if (content !== original) {
    fs.writeFileSync(fullPath, content);
    console.log('FIXED:', relPath);
  } else {
    console.log('NO CHANGE:', relPath);
  }
}
console.log('All done!');
