const fs = require('fs');
const path = require('path');

const filesToCopy = ['index.html', 'style.css', 'script.js'];
const distDir = path.join(__dirname, '..', 'dist');

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function copyFiles() {
  ensureDir(distDir);
  for (const file of filesToCopy) {
    const src = path.join(__dirname, '..', file);
    const dest = path.join(distDir, path.basename(file));
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`Copied ${file} -> dist/${path.basename(file)}`);
    } else {
      console.warn(`File not found: ${src}`);
    }
  }
  // Copy any other static assets if present (optional)
  console.log('Build complete. Files are available in the dist/ directory.');
}

copyFiles();