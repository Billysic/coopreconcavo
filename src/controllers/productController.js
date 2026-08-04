const products = require('../data/products');

const getProducts = (req, res) => {
  const { category } = req.query;

  if (!category || category === 'all') {
    return res.status(200).json(products);
  }

  const filteredProducts = products.filter(
    p => p.category.toLowerCase() === category.toLowerCase()
  );

  return res.status(200).json(filteredProducts);
};

module.exports = { getProducts };