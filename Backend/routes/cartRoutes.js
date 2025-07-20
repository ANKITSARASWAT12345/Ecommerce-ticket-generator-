// cartRoutes.js
const express = require('express');
const { getCart, addToCart } = require('../controllers/cartController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', verifyToken, getCart);
router.post('/', verifyToken, addToCart);

module.exports = router;
