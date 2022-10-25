const {
  createBrandService,
  getBrandsService,
  getBrandByIdService,
  updateBrandService,
} = require('../services/brand.services');

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);

    res.status(200).json({
      status: 'success',
      message: 'Successfully created the brand',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: "Could't create the brand",
      message: error.message,
    });
  }
};

exports.getBrands = async (req, res, next) => {
  try {
    const brands = await getBrandsService(req.body);

    res.status(200).json({
      status: 'success',
      message: 'Successfully get the brands',
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: "Could't get the brands",
      message: error.message,
    });
  }
};

exports.getBrandById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const brand = await getBrandByIdService(id);

    if (!brand) {
      return res.status(400).json({
        status: 'fail',
        error: "Couldn't find the brand with this id",
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Successfully get the brand',
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: "Could't get the brand",
      message: error.message,
    });
  }
};

exports.updateBrand = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await updateBrandService(id, req.body);

    if (!result.nModified) {
      return res.status(400).json({
        status: 'fail',
        error: "Couldn't update the brand with this id",
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Successfully updated the brand',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: "Could't update the brand",
      message: error.message,
    });
  }
};
