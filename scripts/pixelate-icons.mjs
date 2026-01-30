import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import https from 'https';

const ICONS_DIR = './public/tech-icons';

// Tech stack with their devicon/simpleicons URLs
const techIcons = [
  { name: 'typescript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'react', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'nextjs', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'tailwindcss', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'nodejs', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'postgresql', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'docker', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'git', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  // Custom ones that need different sources
  { name: 'convex', url: 'https://www.convex.dev/favicon.ico' },
  { name: 'ethereum', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ethereum/ethereum-original.svg' },
  { name: 'flyio', url: 'https://fly.io/static/images/brand/logo-portrait.svg' },
];

// Download file
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

// Pixelate an image
async function pixelateImage(inputPath, outputPath, pixelSize = 8) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    const targetSize = 64; // Final size
    const smallSize = Math.max(8, Math.floor(targetSize / pixelSize)); // Shrink to this first
    
    await sharp(inputPath)
      .resize(smallSize, smallSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .resize(targetSize, targetSize, { kernel: 'nearest' }) // Scale back up with nearest neighbor
      .png()
      .toFile(outputPath);
    
    console.log(`✓ Pixelated: ${path.basename(outputPath)}`);
  } catch (err) {
    console.error(`✗ Failed to pixelate ${inputPath}:`, err.message);
  }
}

async function main() {
  // Create directories
  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
  }
  
  const tempDir = './temp-icons';
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  console.log('Downloading and pixelating tech icons...\n');

  for (const tech of techIcons) {
    const ext = tech.url.endsWith('.svg') ? 'svg' : 'png';
    const tempPath = path.join(tempDir, `${tech.name}.${ext}`);
    const outputPath = path.join(ICONS_DIR, `${tech.name}.png`);

    try {
      // Download
      console.log(`Downloading ${tech.name}...`);
      await downloadFile(tech.url, tempPath);
      
      // Pixelate
      await pixelateImage(tempPath, outputPath);
    } catch (err) {
      console.error(`✗ Failed for ${tech.name}:`, err.message);
    }
  }

  // Cleanup temp
  fs.rmSync(tempDir, { recursive: true, force: true });
  
  console.log('\nDone! Icons saved to', ICONS_DIR);
}

main();
