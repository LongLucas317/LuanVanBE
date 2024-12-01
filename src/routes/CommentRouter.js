const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");

router.get("/getAll/:id", CommentController.getComment); // Get All Comment by Product ID
router.post("/create", CommentController.createComment);
router.put("/update/:id", CommentController.updateComment);
router.delete("/delete/:id", CommentController.deleteComment);
router.delete("/deleteAll/:id", CommentController.deleteCommentsByProductId);

module.exports = router;
