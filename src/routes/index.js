const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");
const OrderRouter = require("./OrderRouter");
const PaymentRouter = require("./PaymentRouter");
const RevenueRouter = require("./RevenueRouter");
const SliderRouter = require("./SliderRouter");
const CommentRouter = require("./CommentRouter");
const RankRouter = require("./RankRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);
  app.use("/api/order", OrderRouter);
  app.use("/api/payment", PaymentRouter);
  app.use("/api/revenue", RevenueRouter);
  app.use("/api/slider", SliderRouter);
  app.use("/api/comment", CommentRouter);
  app.use("/api/rank", RankRouter);
};

module.exports = routes;
