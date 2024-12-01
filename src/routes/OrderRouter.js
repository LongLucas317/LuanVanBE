const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");

router.post("/create", orderController.createOrder);
router.put("/update/:id", orderController.updateOrder);
router.get("/getDetail/:id", orderController.getDetailsOrder); // Get Order with Order ID
router.get("/getAll-detail/:id", orderController.getAllOrderByUserId); // Get Order with User ID
router.delete("/cancel-order/:id", orderController.cancelOrder);
router.get("/getAll", orderController.getAllOrder);

module.exports = router;
