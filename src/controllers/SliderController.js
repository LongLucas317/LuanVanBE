const Image = require("../models/SliderModel");

// Thêm hình ảnh
exports.addImage = async (req, res) => {
  try {
    const { url } = req.body;
    const newImage = new Image({ url });
    await newImage.save();
    res
      .status(201)
      .json({ status: "OK", message: "ADD IMAGE SUCCESS", image: newImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả hình ảnh
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Sửa hình ảnh
exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { url } = req.body;
    const updatedImage = await Image.findByIdAndUpdate(
      id,
      { url },
      { new: true }
    );
    res.status(200).json({
      status: "OK",
      message: "UPDATE IMAGE SUCCESS",
      image: updatedImage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa hình ảnh
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    await Image.findByIdAndDelete(id);
    res.status(200).json({ status: "OK", message: "DELETE IMAGE SUCCESS" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
