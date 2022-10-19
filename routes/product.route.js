const express = require('express');
const productController = require('../controllers/product.controller');
const router = express.Router();

router
  .route('/')
  .get(productController.getProducts)
  .post(productController.createProduct);

router.route('/bulk-update').patch(productController.bulkUpdateProduct);

router.route('/:id').patch(productController.updateProduct);

module.exports = router;
