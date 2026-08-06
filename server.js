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

// 2. Servir arquivos estáticos do front-end com política de cache configurada
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '30d', // Define o cache de navegadores para 30 dias para arquivos estáticos
  etag: true
}));

// Rotas da API
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`Servidor CoopRecôncavo rodando em http://localhost:${PORT}`);
  console.log(`====================================================`);
});