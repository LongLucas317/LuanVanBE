const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
// const { authMiddleWare } = require("../middleware/authMiddleware");

router.post("/create", productController.createProduct);
router.get("/getDetail/:id", productController.getDetailProduct);
router.get("/getAll", productController.getAllProduct);
router.put("/update/:id", productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);
router.post("/deleteMany", productController.deleteManyProduct);
router.get("/getAll-brand", productController.getAllBrand);
router.get("/getAll-options", productController.getAllOptions);

module.exports = router;
