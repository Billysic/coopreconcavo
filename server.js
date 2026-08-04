const express = require('express');
const path = require('path');
const apiRoutes = require('./src/routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parse de JSON
app.use(express.json());

// Servir arquivos estáticos do front-end
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`Servidor CoopRecôncavo rodando em http://localhost:${PORT}`);
  console.log(`====================================================`);
});