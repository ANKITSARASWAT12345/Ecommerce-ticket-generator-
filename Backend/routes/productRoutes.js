// productRoutes.js
const express = require('express');
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getProducts);
router.post('/', verifyToken, addProduct);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router; 
