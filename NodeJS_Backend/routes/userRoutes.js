const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Get all products
router.get("/products", userController.getAllProducts);

module.exports = router;
