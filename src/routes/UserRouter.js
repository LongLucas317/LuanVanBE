const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleware");

router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.post("/deleteMany", userController.deleteManyUser);
router.get("/getAll", userController.getAllUser);
router.get("/getDetail/:id", userController.getDetailUser);
router.post("/refresh-token", userController.refreshToken);

module.exports = router;
