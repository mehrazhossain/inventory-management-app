const { match } = require('assert');
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
    let filters = { ...req.query };

    // sort, page, limit -> exclude
    const excludeFields = ['sort', 'page', 'limit'];
    excludeFields.forEach((field) => delete filters[field]);

    // operators -> gt, lt, gte, lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filtersString);

    const queries = {};

    if (req.query.sort) {
      // price,quantity -> 'price quantity'
      const sortBy = req.query.sort.split(',').join(' ');
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      queries.fields = fields;
    }

    const products = await getProductsService(filters, queries);

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
