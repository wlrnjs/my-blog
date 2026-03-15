const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/app/(route)/posts/[slug]/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const search = `  if (!post) {
    return {
      title: "Not Found",
      description: "페이지를 찾을 수 없습니다.",
    };
  }`;

const replace = `  if (!post) {
    return {
      title: "Not Found",
      description: "페이지를 찾을 수 없습니다.",
    };
  }`;

content = content.replace(search, replace);

fs.writeFileSync(filePath, content);
console.log('Done!');
