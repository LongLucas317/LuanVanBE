const Product = require("../models/ProductModel");
// const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      isPublic,
      image,
      images,
      brand,
      countInStock,
      discount,
      discountAmount,
      isSale,
      discountStartTime,
      discountEndTime,
      specifications,
      options,
    } = newProduct;

    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct !== null) {
        resolve({
          status: "ERR",
          message: "The name of product is already",
        });
      }

      const newProduct = await Product.create({
        name,
        isPublic,
        image,
        images,
        brand,
        countInStock: Number(countInStock),
        discount,
        discountAmount: Number(discountAmount),
        isSale,
        discountStartTime,
        discountEndTime,
        specifications,
        options,
      });

      if (newProduct) {
        resolve({
          status: "OK",
          message: "CREATE PRODUCT SUCCESS",
          data: newProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "The product is not defined",
        });
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "UPDATE PRODUCT SUCCESS",
        data: updatedProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// const updateDiscounts = async () => {
//   const now = new Date();
//   const utcString = now.toLocaleString("en-US", {
//     timeZone: "Asia/Ho_Chi_Minh",
//   });

//   const utcArr1 = utcString.split(", ")[0];
//   const utcArr15 = utcArr1.replaceAll("/", "-");
//   const utcArr2 = utcString.split(", ")[1];
//   const utcArr3 = utcArr2.split(":");
//   const utcArr4 = utcArr3[0].concat(":").concat(utcArr3[1]);
//   const utcArrFinal = `${utcArr15}T${utcArr4}:00.000+00:00Z`;

//   const productsToUpdate = await Product.find();

//   for (let product of productsToUpdate) {
//     if (
//       product.discountStartTime <= utcArrFinal &&
//       product.discountEndTime >= utcArrFinal
//     ) {
//       console.log("check");
//       product.discount = product.discountAmount;
//       product.isSale = true;
//     } else {
//       product.discount = 0;
//       product.isSale = false;
//     }
//     await product.save();
//   }

//   console.log("Discounts updated successfully");
// };

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "The product is not defined",
        });
      }

      await Product.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "DELETE PRODUCT SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyProduct = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany({ _id: ids });

      resolve({
        status: "OK",
        message: "DELETE PRODUCT SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id,
      });
      if (product === null) {
        resolve({
          status: "OK",
          message: "The product is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "GET PRODUCT INFOR SUCCESS",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments();
      let allProduct = [];

      if (filter) {
        const label = filter[0];
        const allProductFilter = await Product.find({
          [label]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });

        resolve({
          status: "OK",
          message: "GET ALL PRODUCT SUCCESS",
          data: allProductFilter,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }

      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];

        const allProductSort = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);

        resolve({
          status: "OK",
          message: "SUCCESS",
          data: allProductSort,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }

      if (!limit) {
        allProduct = await Product.find();
      } else {
        allProduct = await Product.find()
          .limit(limit)
          .skip(page * limit);
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allProduct,
        total: totalProduct,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllBrand = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allBrand = await Product.distinct("brand");

      resolve({
        status: "OK",
        message: "GET ALL BRAND PRODUCT SUCCESS",
        data: allBrand,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllOptions = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allOptions = await Product.distinct("options");

      resolve({
        status: "OK",
        message: "GET ALL OPTIONS PRODUCT SUCCESS",
        data: allOptions,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  // updateDiscounts,
  deleteProduct,
  deleteManyProduct,
  getDetailProduct,
  getAllProduct,
  getAllBrand,
  getAllOptions,
};
