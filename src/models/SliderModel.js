const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema(
  {
    url: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Slider = mongoose.model("Slider", sliderSchema);
module.exports = Slider;
