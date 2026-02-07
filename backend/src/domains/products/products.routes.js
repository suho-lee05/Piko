const express = require('express');
const productsController = require('./products.controller');

const router = express.Router();

router.get('/', productsController.listProducts);
router.get('/:productId', productsController.getProduct);
router.post('/', productsController.createProduct);
router.put('/:productId', productsController.updateProduct);
router.delete('/:productId', productsController.deleteProduct);

module.exports = router;
