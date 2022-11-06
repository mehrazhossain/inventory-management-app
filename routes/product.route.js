const express = require('express');
const productController = require('../controllers/product.controller');
const uploader = require('../middleware/uploader');
const router = express.Router();

// route for file upload
router.post(
  '/file-upload',
  uploader.single('image'),
  productController.fileUpload
);

//
router.route('/bulk-update').patch(productController.bulkUpdateProduct);
router.route('/bulk-delete').delete(productController.bulkDeleteProduct);

router
  .route('/')
  .get(productController.getProducts)
  .post(productController.createProduct);

router
  .route('/:id')
  .patch(productController.updateProductById)
  .delete(productController.deleteProductById);

module.exports = router;
