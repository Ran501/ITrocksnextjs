const https = require('https');
const fs = require('fs');
const path = require('path');

const sponsorLogos = [
  {
    name: 'apollo-logo.png',
    url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/apollographql.svg'
  },
  {
    name: 'betfred-logo.png',
    url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/bet365.svg'
  },
  {
    name: 'teamviewer-logo.png',
    url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/teamviewer.svg'
  },
  {
    name: 'canon-logo.png',
    url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/canon.svg'
  },
  {
    name: 'dhl-logo.png',
    url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/dhl.svg'
  },
  {
    name: 'konami-logo.png',
    url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/konami.svg'
  },
  {
    name: 'visa-logo.png',
    url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/visa.svg'
  },
  {
    name: 'mastercard-logo.png',
    url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/mastercard.svg'
  }
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(__dirname, '../public/img', filename);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

// Create img directory if it doesn't exist
const imgDir = path.join(__dirname, '../public/img');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

// Download all logos
Promise.all(sponsorLogos.map(logo => 
  downloadImage(logo.url, logo.name)
)).then(() => {
  console.log('All logos downloaded successfully!');
}).catch(err => {
  console.error('Error downloading logos:', err);
}); 