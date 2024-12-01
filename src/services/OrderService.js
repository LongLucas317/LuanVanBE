const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      memberDiscount,
      totalPrice,
      fullName,
      address,
      phone,
      user,
      isPaid,
    } = newOrder;
    try {
      const promises = orderItems.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order.product,
            countInStock: { $gte: order.amount },
          },
          {
            $inc: {
              countInStock: -order.amount,
              selled: +order.amount,
            },
          },
          {
            new: true,
          }
        );
        if (productData) {
          return {
            status: "OK",
            message: "CREATE ORDER SUCCESS",
          };
        } else {
          return {
            status: "OK",
            message: "ERR",
            id: order.product,
          };
        }
      });

      const results = await Promise.all(promises);
      const newData = results.filter((item) => item.id);
      if (newData.length) {
        resolve({
          status: "ERR",
          message: `San pham voi id: ${newData.join(",")} khong du hang`,
        });
      } else {
        const createdOrder = await Order.create({
          orderItems,
          shippingAddress: {
            fullName,
            address,
            phone,
          },
          paymentMethod,
          itemsPrice,
          memberDiscount,
          totalPrice,
          user: user,
          isPaid,
        });

        if (createdOrder) {
          resolve({
            status: "OK",
            message: "SUCCESS",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateOrder = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrder = await Order.findOne({
        _id: id,
      });
      if (checkOrder === null) {
        resolve({
          status: "OK",
          message: "The order is not defined",
        });
      }

      const updatedOrder = await Order.findByIdAndUpdate(id, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "UPDATE ORDER SUCCESS",
        data: updatedOrder,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getOrderDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById({
        _id: id,
      });
      if (order === null) {
        resolve({
          status: "ERR",
          message: "The order is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "GET ORDER INFOR SUCESSS",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllOrderByUserId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.find({
        user: id,
      }).sort({ createdAt: -1, updatedAt: -1 });
      if (order === null) {
        resolve({
          status: "ERR",
          message: "The order is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "GET ALL ORDER SUCCESS",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const cancelOrder = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = [];
      const promises = data.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order.product,
            selled: { $gte: order.amount },
          },
          {
            $inc: {
              countInStock: +order.amount,
              selled: -order.amount,
            },
          },
          { new: true }
        );
        if (productData) {
          order = await Order.findByIdAndDelete(id);
          if (order === null) {
            resolve({
              status: "ERR",
              message: "The order is not defined",
            });
          }
        } else {
          return {
            status: "OK",
            message: "ERR",
            id: order.product,
          };
        }
      });
      const results = await Promise.all(promises);
      const newData = results && results[0] && results[0].id;

      if (newData) {
        resolve({
          status: "ERR",
          message: `San pham voi id: ${newData} khong ton tai`,
        });
      }
      resolve({
        status: "OK",
        message: "CANCEL ORDER SUCCESS",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllOrder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allOrder = await Order.find();

      resolve({
        status: "OK",
        message: "GET ALL ORDER SUCCESS",
        data: allOrder,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrder,
  updateOrder,
  getOrderDetails,
  getAllOrderByUserId,
  getAllOrder,
  cancelOrder,
};
