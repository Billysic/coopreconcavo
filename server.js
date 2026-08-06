const express = require('express');
const path = require('path');
const compression = require('compression');
const apiRoutes = require('./src/routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Habilita a compressão Gzip/Brotli para todas as respostas da aplicação
app.use(compression());

// Middleware para parse de JSON
app.use(express.json());

// 2. Servir arquivos estáticos do front-end minificados pelo Vite (pasta 'dist')
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '30d', // Cache do navegador para os arquivos estáticos
  etag: true
}));

// Rotas da API
app.use('/api', apiRoutes);

// 3. Fallback para rotas de front-end (garante que o index.html seja entregue)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`Servidor CoopRecôncavo rodando em http://localhost:${PORT}`);
  console.log(`====================================================`);
});