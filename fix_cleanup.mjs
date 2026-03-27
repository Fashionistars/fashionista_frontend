import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, 'src');

function getAllFiles(dir, exts = ['.tsx', '.ts', '.jsx', '.js']) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results = results.concat(getAllFiles(full, exts));
    else if (exts.includes(path.extname(entry.name))) results.push(full);
  }
  return results;
}

const fixes = [
  // Charts wrong path
  [`"@/components/Charts"`, `"@/components/ui/compounds/Charts"`],
  [`'@/components/Charts'`, `"@/components/ui/compounds/Charts"`],
  // MultiStep wrong path
  [`"@/components/MultiStep"`, `"@/features/shop/components/MultiStep"`],
  [`'@/components/MultiStep'`, `"@/features/shop/components/MultiStep"`],
  // DragAndDrop wrong path
  [`"@/components/ui/compounds/DragAndDrop"`, `"@/components/shared/utilities/DragAndDrop"`],
  [`'@/components/ui/compounds/DragAndDrop'`, `"@/components/shared/utilities/DragAndDrop"`],
  // OrdersTable
  [`"@/components/OrdersTable"`, `"@/app/components/OrdersTable"`],
  [`'@/components/OrdersTable'`, `"@/app/components/OrdersTable"`],
  // core/services/api.ts relative paths
  [`from './mock'`, `from "@/lib/utils/mock-data"`],
  [`from './axiosInstance'`, `from "@/lib/api/axiosInstance"`],
  // core/api/middleware.ts axiosInstance
  [`from "./axiosInstance"`, `from "@/lib/api/axiosInstance"`],
  // Transactions.tsx NumberInput and Collapsible
  [`"./NumberInput"`, `"@/app/components/NumberInput"`],
  [`"./Collapsible"`, `"@/components/ui/compounds/Collapsible"`],
  [`'./NumberInput'`, `"@/app/components/NumberInput"`],
  [`'./Collapsible'`, `"@/components/ui/compounds/Collapsible"`],
];

const files = getAllFiles(srcDir);
let totalFixed = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  const rel = path.relative(__dirname, filePath);

  for (const [from, to] of fixes) {
    content = content.replaceAll(from, to);
  }

  // Fix cookieStore.get() without await cookies() — files that still call cookies().get()
  if (content.includes('cookieStore.get(') && !content.includes('const cookieStore = await cookies()')) {
    // Add await cookies() before the first use
    content = content.replace(
      /\} =\> \{(\s*)\n(\s*const accessToken)/,
      '} => {$1\n$2const cookieStore = await cookies();$1\n$2const accessToken'
    );
    // Simpler: wrap the whole function start
    if (content.includes('cookieStore.get(')) {
      content = content.replace(
        /const accessToken = cookieStore\.get/,
        'const cookieStore = await cookies();\n  const accessToken = cookieStore.get'
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
