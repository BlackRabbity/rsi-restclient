const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const https = require('https');
const fs = require('fs');

const app = express();

const ca = fs.readFileSync('../../public/certs/cert.cer');

const cert = fs.readFileSync('../../public/certs/cert.crt');
const key = fs.readFileSync('../../public/certs/cert.key');

const httpsAgent = new https.Agent({
  cert: cert,
  key: key,
});

app.use('/api', createProxyMiddleware({
  target: 'https://10.0.0.15:7043',
  changeOrigin: true,
  agent: httpsAgent,
}));

app.listen(3001, () => {
  console.log('Proxy server is running on https://localhost:3001');
});