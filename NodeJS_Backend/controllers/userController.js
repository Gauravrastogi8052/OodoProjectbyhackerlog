const userModel = require("../models/userModel");

// Get all products
exports.getAllProducts = (req, res) => {
  userModel.getAllProducts((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ products: results });
  });
};
