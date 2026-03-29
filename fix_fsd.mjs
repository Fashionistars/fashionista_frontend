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

// Direct string replacements across all files
const fixes = [
  // Wrong axiosInstance paths in features — use @/lib/ version
  [`from "../utils/axiosInstance"`, `from "@/lib/api/axiosInstance"`],
  [`from './axiosInstance'`, `from "@/lib/api/axiosInstance"`],
  // Wrong fetchAuth paths in features — use @/lib/ version  
  [`from "../utils/fetchAuth"`, `from "@/lib/api/fetchAuth"`],
  [`from "./fetchAuth"`, `from "@/lib/api/fetchAuth"`],
  // core/services wrong paths
  [`from './fetchAuth'`, `from "@/lib/api/fetchAuth"`],
  [`from './mock'`, `from "@/lib/utils/mock-data"`],
  [`from './axiosInstance'`, `from "@/lib/api/axiosInstance"`],
  // auth_shema typo in auth schema imports
  [`from "../utils/schemas/auth_shema"`, `from "@/lib/validation/auth_shema"`],
  [`from "../schemas/auth_shema"`, `from "@/lib/validation/auth_shema"`],
  [`from './auth_schema'`, `from "./auth_shema"`],
  // features/shop missing schema
  [`from "../utils/schema"`, `from "@/lib/validation/addProduct"`],
  [`from "../utils/schemas/addProduct"`, `from "@/lib/validation/addProduct"`],
  // features/auth Button import
  [`from "./Button"`, `from "@/components/ui/primitives/Button"`],
  // features/orders missing OrdersTable
  [`from './OrdersTable'`, `from "@/app/components/OrdersTable"`],
  // Transactions.tsx missing NumberInput and Collapsible
  [`from './NumberInput'`, `from "@/app/components/NumberInput"`],
  [`from './Collapsible'`, `from "@/components/ui/compounds/Collapsible"`],
];

const files = getAllFiles(srcDir);
let totalFixed = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  const rel = path.relative(__dirname, filePath);

  // Apply fixes
  for (const [from, to] of fixes) {
    content = content.replaceAll(from, to);
  }

  // Fix cookies().set → await cookies() pattern in features/auth/api/actions.ts (and similar)
  if (content.includes('cookies().set(') || content.includes('cookies().get(')) {
    // Fix: cookies().set/get → need to await first
    // Replace entire login function pattern to use await
    content = content.replace(
      /let user_role;\s*\n(\s*)try {/g,
      '$1try {'
    );
    content = content.replace(
      /\/\/ user_role = role;\s*\n/g,
      ''
    );
    content = content.replace(
      /cookies\(\)\.set\(/g,
      'cookieStore.set('
    );
    content = content.replace(
      /cookies\(\)\.get\(/g,
      'cookieStore.get('
    );
    // Insert const cookieStore = await cookies(); before the first set/get
    // Find the pattern: const { access, refresh, role } = res.data; \n then set calls
    content = content.replace(
      /(const \{ [^}]+ \} = res\.data;\s*\n)/,
      '$1    const cookieStore = await cookies();\n'
    );
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    totalFixed++;
    console.log('FIXED:', rel);
  }
}

console.log(`\nDone! Fixed ${totalFixed} files.`);
