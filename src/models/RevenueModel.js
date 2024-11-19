const mongoose = require("mongoose");

const revenueSchema = new mongoose.Schema({
  month: { type: Number, required: true }, // Tháng (1-12)
  year: { type: Number, required: true }, // Năm
  amount: { type: Number, required: true }, // Doanh thu
});

module.exports = mongoose.model("Revenue", revenueSchema);
