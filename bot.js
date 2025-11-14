const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ]
  }
});

client.on('qr', (qr) => {
  console.log('SCAN THIS QR CODE WITH WHATSAPP:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ ViteVite Bot is ready!');
});

client.on('message', async (message) => {
  if (message.body === 'ping') {
    message.reply('pong');
  }
  
  if (message.body === 'menu') {
    message.reply('🍕 Welcome to ViteVite Food Delivery! This is working!');
  }
});

app.get('/', (req, res) => {
  res.send('ViteVite Bot is running! Check Railway logs for QR code.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

client.initialize();
