const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/img');
const outputDir = path.join(__dirname, '../public/img');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all image files
const imageFiles = fs.readdirSync(inputDir).filter(file => 
  /\.(jpg|jpeg|png|avif)$/i.test(file)
);

async function optimizeImage(file) {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file.replace(/\.[^.]+$/, '.webp'));

  try {
    await sharp(inputPath)
      .webp({ quality: 90, effort: 6 })
      .resize({
        width: 1920,
        height: 1080,
        fit: 'inside',
        withoutEnlargement: true
      })
      .toFile(outputPath);

    console.log(`Optimized: ${file} -> ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`Error processing ${file}:`, error);
  }
}

async function processImages() {
  console.log('Starting image optimization...');
  
  for (const file of imageFiles) {
    await optimizeImage(file);
  }
  
  console.log('Image optimization complete!');
}

processImages(); 