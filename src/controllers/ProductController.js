const ProductService = require("../services/ProductService");
// const JwtService = require("../services/JwtService");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      isPublic,
      image,
      images,
      brand,
      operatingSystem,
      countInStock,
      discount,
      discountAmount,
      isSale,
      discountStartTime,
      discountEndTime,
      specifications,
      options,
    } = req.body;

    if (!name || !image || !brand || !options) {
      return res.status(404).json({
        status: "ERR",
        message: "The input is required",
      });
    }

    const newData = {
      name,
      isPublic,
      image,
      images,
      brand,
      operatingSystem,
      countInStock,
      discount,
      discountAmount,
      isSale,
      discountStartTime,
      discountEndTime,
      specifications,
      options,
    };

    const response = await ProductService.createProduct(newData);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;

    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }

    const response = await ProductService.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    // const token = req.headers;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteManyProduct = async (req, res) => {
  try {
    const ids = req.body.ids;
    // const token = req.headers;
    if (!ids) {
      return res.status(200).json({
        status: "ERR",
        message: "The ids is required",
      });
    }
    const response = await ProductService.deleteManyProduct(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const response = await ProductService.getDetailProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await ProductService.getAllProduct(
      Number(limit) || null,
      Number(page) || 0,
      sort,
      filter
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllBrand = async (req, res) => {
  try {
    const response = await ProductService.getAllBrand();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllOptions = async (req, res) => {
  try {
    const response = await ProductService.getAllOptions();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  deleteManyProduct,
  getDetailProduct,
  getAllProduct,
  getAllBrand,
  getAllOptions,
};
