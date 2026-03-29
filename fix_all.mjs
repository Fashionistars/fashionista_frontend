import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, 'src');

// Recursively get all .tsx and .ts files
function getAllFiles(dir, exts = ['.tsx', '.ts']) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllFiles(full, exts));
    } else if (exts.includes(path.extname(entry.name))) {
      results.push(full);
    }
  }
  return results;
}

const files = getAllFiles(srcDir);
let totalFixed = 0;

// FIX 1: SVG kebab-case to camelCase (JSX attribute name fix)
const svgAttrFixes = [
  [/\bstroke-width=/g, 'strokeWidth='],
  [/\bstroke-linecap=/g, 'strokeLinecap='],
  [/\bstroke-linejoin=/g, 'strokeLinejoin='],
  [/\bstroke-miterlimit=/g, 'strokeMiterlimit='],
  [/\bstroke-dasharray=/g, 'strokeDasharray='],
  [/\bstroke-dashoffset=/g, 'strokeDashoffset='],
  [/\bfill-rule=/g, 'fillRule='],
  [/\bclip-rule=/g, 'clipRule='],
  [/\bfill-opacity=/g, 'fillOpacity='],
  [/\bstroke-opacity=/g, 'strokeOpacity='],
  [/\bclip-path=/g, 'clipPath='],
  [/\bstop-color=/g, 'stopColor='],
  [/\bstop-opacity=/g, 'stopOpacity='],
];

// FIX 2: broken public/ relative imports → string paths for Image src
// Pattern: import name from '...public/something.ext'
const publicImportFix = /import\s+(\w+)\s+from\s+['"][^'"]*\/public\/([^'"]+)['"]\s*;?\r?\n/g;

// FIX 3: src/app/client/dashboard/layout.tsx old AdminTopBanner import
const adminTopBannerFix = [
  ["import AdminTopBanner from \"../../components/AdminTopBanner\";", 
   "import AdminTopBanner from \"@/components/shared/utilities/AdminTopBanner\";"],
];

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  const rel = path.relative(__dirname, filePath);

  // Apply SVG camelCase fixes
  for (const [pattern, replacement] of svgAttrFixes) {
    content = content.replace(pattern, replacement);
  }

  // Apply specific string fixes
  for (const [from, to] of adminTopBannerFix) {
    content = content.replace(from, to);
  }

  // Collect all broken public imports and their variable names for src replacement
  const publicImports = [];
  let match;
  const importRegex = /import\s+(\w+)\s+from\s+['"][^'"]*\/public\/([^'"]+)['"]\s*;?\r?\n/g;
  while ((match = importRegex.exec(original)) !== null) {
    publicImports.push({ varName: match[1], assetPath: match[2] });
  }

  if (publicImports.length > 0) {
    // Remove all broken public imports
    content = content.replace(/import\s+\w+\s+from\s+['"][^'"]*\/public\/[^'"]+['"]\s*;?\r?\n/g, '');
    
    // Replace src={varName} → src="/assetPath" with dimensions if Image
    for (const { varName, assetPath } of publicImports) {
      // Replace <Image src={varName} with <Image src="/assetPath" width={xxx} height={xxx}
      // (only add dimensions if they are not already present on the same element)
      content = content.replace(
        new RegExp(`(<Image[^>]*?)\\ssrc=\\{${varName}\\}`, 'g'),
        `$1 src="/${assetPath}"`
      );
      // Replace any StaticImport variable usage in src
      content = content.replace(
        new RegExp(`src=\\{${varName}\\}`, 'g'),
        `src="/${assetPath}"`
      );
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    totalFixed++;
    console.log('FIXED:', rel);
  }
}

console.log(`\nDone! Fixed ${totalFixed} files.`);
