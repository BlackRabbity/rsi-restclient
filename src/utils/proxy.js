const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const https = require('https');
const fs = require('fs');

const app = express();

const ca = fs.readFileSync('../../public/certs/cert.cer');

const httpsAgent = new https.Agent({
  ca: ca,
});

app.use('/api', createProxyMiddleware({
  target: 'https://192.168.65.9:7043',
  changeOrigin: true,
  agent: httpsAgent,
}));

app.listen(3001, () => {
  console.log('Proxy server is running on https://localhost:3001');
});