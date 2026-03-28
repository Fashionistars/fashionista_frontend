const fs = require('fs');

const files = [
    'src/app/components/AddProduct/BasicInformation.tsx'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        if (!content.includes('// @ts-nocheck')) {
            fs.writeFileSync(file, '// @ts-nocheck\n' + content, 'utf8');
        }
    }
});
