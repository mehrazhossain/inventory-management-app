const {
  getProductsService,
  createProductService,
  updateProductByIdService,
  bulkUpdateProductService,
  deleteProductByIdService,
  bulkDeleteProductService,
} = require('../services/product.services');

exports.getProducts = async (req, res, next) => {
  try {
    const queryObject = { ...req.query };

    // sort, page, limit -> exclude
    const excludeFields = ['sort', 'page', 'limit'];

    excludeFields.forEach((field) => delete queryObject[field]);

    // console.log('original query object', req.query);
    // console.log('query object', queryObject);

    const products = await getProductsService(queryObject);

    res.status(200).json({
      status: 'success',
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "Can't get the data",
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const result = await createProductService(req.body);

    res.status(200).json({
      status: 'success',
      message: 'Product inserted successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Product is not inserted',
      error: error.message,
    });
  }
};

exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductByIdService(id, req.body);

    res.status(200).json({
      status: 'success',
      message: 'Successfully updated the product',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "Couldn't update the product",
      error: error.message,
    });
  }
};

exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body);

    res.status(200).json({
      status: 'success',
      message: 'Successfully updated the product',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "Couldn't update the product",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductByIdService(id);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: 'fail',
        error: "Couldn't delete the product",
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Successfully deleted the product',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "Couldn't delete the product",
      error: error.message,
    });
  }
};

exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids);

    res.status(200).json({
      status: 'success',
      message: 'Successfully deleted the given products',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "Couldn't delete the given products",
      error: error.message,
    });
  }
};
