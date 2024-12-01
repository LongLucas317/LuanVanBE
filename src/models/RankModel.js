const mongoose = require("mongoose");

const rankSchema = new mongoose.Schema(
  {
    name: { type: String },
    min: { type: Number },
    max: { type: Number },
    amount: { type: Number },
    level: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Rank = mongoose.model("Rank", rankSchema);
module.exports = Rank;
