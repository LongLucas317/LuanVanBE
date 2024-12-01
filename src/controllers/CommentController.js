const Comment = require("../models/CommentModel");

const getComment = async (req, res) => {
  const productId = req.params.id;

  try {
    const comments = await Comment.find({ productId });

    // Tổ chức bình luận dạng cây
    const commentMap = {};
    comments.forEach(
      (comment) => (commentMap[comment._id] = { ...comment._doc, replies: [] })
    );

    const rootComments = [];
    comments.forEach((comment) => {
      if (comment.parentId) {
        commentMap[comment.parentId]?.replies.push(commentMap[comment._id]);
      } else {
        rootComments.push(commentMap[comment._id]);
      }
    });

    res.status(200).json(rootComments);
  } catch (error) {
    res.status(404).json({ message: "Get comment fail", error });
  }
};

const createComment = async (req, res) => {
  const { productId, userId, content, parentId } = req.body;

  try {
    const newComment = new Comment({
      productId,
      userId,
      content,
      parentId,
    });
    await newComment.save();

    // Gửi bình luận mới qua WebSocket
    const io = req.app.locals.io;
    io.emit("new-comment", newComment);

    res.status(200).json(newComment);
  } catch (error) {
    res.status(404).json({ message: "Post comment fail", error });
  }
};

// API Sửa bình luận
const updateComment = async (req, res) => {
  const commentId = req.params.id;
  const content = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      content,
      { new: true } // Trả về tài liệu đã cập nhật
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Gửi thông báo qua WebSocket
    const io = req.app.locals.io;
    io.emit("update-comment", updatedComment);

    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Updating comment fail", error });
  }
};

// API Xóa bình luận
const deleteComment = async (req, res) => {
  const commentId = req.params.id;

  try {
    const deletedComments = await Comment.deleteMany({
      $or: [{ _id: commentId }, { parentId: commentId }],
    });

    if (!deletedComments) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Gửi thông báo qua WebSocket
    const io = req.app.locals.io;
    io.emit("delete-comment", commentId);

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Deleting comment fail", error });
  }
};

const deleteCommentsByProductId = async (req, res) => {
  const productId = req.params.id;

  try {
    // Xóa tất cả bình luận liên quan đến productId
    await Comment.deleteMany({ productId });

    // Phát sự kiện xóa qua WebSocket nếu cần thiết
    const io = req.app.locals.io;
    io.emit("delete-comments-by-product", productId);

    res.json({ message: "All comments for the product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Deleting comments for product fail", error });
  }
};

module.exports = {
  createComment,
  getComment,
  updateComment,
  deleteComment,
  deleteCommentsByProductId,
};
