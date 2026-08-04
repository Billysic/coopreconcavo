const { sanitizeInput } = require('../utils/sanitize');

const handleContactSubmission = (req, res) => {
  const { buyerName, companyName, email, phone, volume, message, website } = req.body;

  // 1. Honeypot check: Se o campo 'website' estiver preenchido, trata-se de um bot
  if (website) {
    return res.status(200).json({ message: "Solicitação recebida com sucesso!" });
  }

  // 2. Validação básica de campos obrigatórios
  if (!buyerName || !companyName || !email || !phone || !volume) {
    return res.status(400).json({ error: "Preencha todos os campos obrigatórios." });
  }

  // 3. Sanitização contra ataques XSS
  const cleanData = {
    buyerName: sanitizeInput(buyerName),
    companyName: sanitizeInput(companyName),
    email: sanitizeInput(email),
    phone: sanitizeInput(phone),
    volume: sanitizeInput(volume),
    message: sanitizeInput(message),
    createdAt: new Date().toISOString()
  };

  console.log("--- NOVA COTAÇÃO B2B RECEBIDA COM SUCESSO ---");
  console.log(cleanData);

  return res.status(200).json({
    message: "Solicitação enviada com sucesso! A equipe da CoopRecôncavo entrará em contato em breve."
  });
};

module.exports = { handleContactSubmission };