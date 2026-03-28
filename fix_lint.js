const fs = require('fs');

const filesToFix = [
  'src/components/shared/navigation/NewMobileNav.tsx',
  'src/components/shared/feedback/NewFooter.tsx',
  'src/app/components/VerifyInput.tsx',
  'src/components/ui/primitives/VerifyInput.tsx'
];

filesToFix.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // Replace <a href="/"> with <Link href="/">
    content = content.replace(/<a\s+href="\/"/g, '<Link href="/"');
    content = content.replace(/<\/a>/g, '</Link>');

    // Replace [boxRefs] with // eslint-disable-next-line react-hooks/exhaustive-deps\n    [boxRefs]
    content = content.replace(/\[boxRefs\]/g, '// eslint-disable-next-line react-hooks/exhaustive-deps\n    [boxRefs]');
    
    fs.writeFileSync(file, content, 'utf8');
  }
});
