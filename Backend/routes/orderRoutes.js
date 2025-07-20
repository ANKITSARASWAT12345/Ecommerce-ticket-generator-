// orderRoutes.js
const express = require('express');
const { placeOrder, getUserOrders, getAllOrders } = require('../controllers/orderController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, placeOrder);
router.get('/my', verifyToken, getUserOrders);
router.get('/all', verifyToken, getAllOrders);

module.exports = router;
