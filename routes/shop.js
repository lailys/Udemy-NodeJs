const path = require('path');

const express = require('express');


const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getHome);
router.get('/product-list',shopController.getProducts );
router.get('/products/:productId',shopController.getProductDetail);
router.get('/cart',shopController.getCart );
router.post('/cart',shopController.postCart );
router.post('/cart/delete-product', shopController.postDeleteProduct);
router.get('/orders', shopController.getOrders);
router.post('/orders', shopController.postOrders);

// router.get('/checkout', shopController.getCheckout);


module.exports = router;
