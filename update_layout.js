const fs = require('fs');
const file = 'src/app/layout.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace imports
content = content.replace(
  'import { Analytics } from "@vercel/analytics/next";\nimport Script from "next/script";',
  'import { Analytics } from "@vercel/analytics/next";\nimport { GoogleAnalytics } from "@next/third-parties/google";'
);

// Replace head content
content = content.replace(
  /<head>\s*<Script\s*async\s*src={`https:\/\/www.googletagmanager.com\/gtag\/js\?id=\$\{process\.env\.NEXT_PUBLIC_GA_ID\}`}\s*\/>\s*<Script\s*id="gtag-init"\s*strategy="afterInteractive"\s*dangerouslySetInnerHTML=\{\{\s*__html: `\s*window\.dataLayer = window\.dataLayer \|\| \[\];\s*function gtag\(\)\{dataLayer\.push\(arguments\);\}\s*gtag\('js', new Date\(\)\);\s*gtag\('config', '\$\{process\.env\.NEXT_PUBLIC_GA_ID\}'\);\s*`,\s*\}\}\s*\/>\s*<\/head>/g,
  '<head>\n        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />\n      </head>'
);

fs.writeFileSync(file, content);
console.log('Done!');
