const productModel = require('../models/productModel');

// Create a new product
exports.createProduct = (req, res) => {
  const { productName, productPrice, description, category } = req.body;
  
  // Validation
  if (!productName || !productPrice || !category) {
    return res.status(400).json({ error: 'Product name, price, and category are required' });
  }
  
  productModel.createProduct({ productName, productPrice, description, category }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Product created successfully', product: result });
  });
};

// Get all products
exports.getAllProducts = (req, res) => {
  productModel.getAllProducts((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ products: results });
  });
};

// Get product by ID
exports.getProductById = (req, res) => {
  const productId = req.params.id;
  
  productModel.getProductById(productId, (err, result) => {
    if (err) {
      if (err.message === 'Product not found') {
        return res.status(404).json({ error: err.message });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ product: result });
  });
};

// Update a product
exports.updateProduct = (req, res) => {
  const productId = req.params.id;
  const { productName, productPrice, description, category } = req.body;
  
  // Validation
  if (!productName || !productPrice || !category) {
    return res.status(400).json({ error: 'Product name, price, and category are required' });
  }
  
  productModel.updateProduct(productId, { productName, productPrice, description, category }, (err, result) => {
    if (err) {
      if (err.message === 'Product not found') {
        return res.status(404).json({ error: err.message });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Product updated successfully', product: result });
  });
};

// Delete a product
exports.deleteProduct = (req, res) => {
  const productId = req.params.id;
  
  productModel.deleteProduct(productId, (err, result) => {
    if (err) {
      if (err.message === 'Product not found') {
        return res.status(404).json({ error: err.message });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result);
  });
};

// Get products by category
exports.getProductsByCategory = (req, res) => {
  const category = req.params.category;
  
  productModel.getProductsByCategory(category, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ products: results });
  });
};