const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const productMiddleware = require('../middlewares/product.middleware');
const userMiddleware = require('../middlewares/user.middleware');

router.post('/create-product',userMiddleware.auth, productMiddleware.createProduct, productController.createProduct);
router.put('/update-product/:id', userMiddleware.auth, productMiddleware.updateProduct, productController.updateProduct);
router.delete('/delete-product/:id', userMiddleware.auth, productMiddleware.deleteProduct , productController.deleteProduct);
router.get('/all-product', productController.getAllProduct);
router.get('/detail-product/:id', productController.detailProduct);
router.get("/type-product/:type", productController.typeProduct);
module.exports = router;