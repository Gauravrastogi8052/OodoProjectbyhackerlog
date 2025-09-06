const db = require("../config/database");
// Get all products
const getAllProducts = (callback) => {
  const query = "SELECT * FROM products ORDER BY createdAt DESC";

  db.execute(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

module.exports = {
  getAllProducts,
};
