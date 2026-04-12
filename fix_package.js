const fs = require('fs');
let pkg = fs.readFileSync('package.json', 'utf8');
pkg = pkg.replace(/<<<<<<< HEAD\n\s*"test": "bun test"\n=======\n([\s\S]*?)>>>>>>> origin\/develop/g, '$1');
pkg = pkg.replace(/<<<<<<< HEAD\n=======\n([\s\S]*?)>>>>>>> origin\/develop/g, '$1');
fs.writeFileSync('package.json', pkg);
