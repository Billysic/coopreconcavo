const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const { getProducts } = require('../controllers/productController');
const { handleContactSubmission } = require('../controllers/contactController');

// Rate Limit para a rota de formulário (Máximo de 3 envios a cada 15 min por IP)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: { error: "Muitas solicitações enviadas. Aguarde 15 minutos e tente novamente." }
});

router.get('/products', getProducts);
router.post('/contact', contactLimiter, handleContactSubmission);

module.exports = router;    