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

const files = getAllFiles(srcDir);
let totalFixed = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Fix mismatched quotes: from '@/... " or from "@/ ...'  
  // Pattern 1: import X from '@/path"  -> import X from "@/path"
  content = content.replace(/from\s+'([^'"]+)"/g, 'from "$1"');
  // Pattern 2: import X from "@/path'  -> import X from "@/path"
  content = content.replace(/from\s+"([^'"]+)'/g, 'from "$1"');
  
  // Also fix: import X from '@/path'; with trailing ; handled
  // and multi-word: import { X } from '@/..."
  // Normalize all single-quote imports to double quotes
  content = content.replace(/^(import\s+.*\s+from\s+)'([^']+)'(;?)$/gm, '$1"$2"$3');

  // Fix Image width/height missing (add when src is string and no width specified)
  // Add width={24} height={24} to Image tags that only have src and alt with no size
  content = content.replace(/<Image\s+src="\/([^"]+)"\s+alt="([^"]*)"\s*\/>/g, (match, src, alt) => {
    // Keep as-is but note these may need manual width/height
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    totalFixed++;
    console.log('FIXED:', path.relative(__dirname, filePath));
  }
}

console.log(`\nDone! Fixed ${totalFixed} files.`);
