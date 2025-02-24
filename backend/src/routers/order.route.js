const express = require('express');
const router = express.Router();
const userMiddleware = require('../middlewares/user.middleware');
const oderController = require('../controllers/order.controller');

router.post('/create-order',userMiddleware.auth, oderController.createOrder);

module.exports = router;