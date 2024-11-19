const Revenue = require("../models/RevenueModel");

const getRevenueData = async (req, res) => {
  try {
    const { year, month } = req.query;

    if (!year) {
      return res.status(200).json({
        status: "ERR",
        message: "NEED YEAR TO GET DATA",
      });
    }

    // Nếu có month, tìm dữ liệu của tháng đó; nếu không, lấy tất cả các tháng trong năm
    const query = month ? { year, month } : { year };
    const revenues = await Revenue.find(query).sort({ month: 1 });

    if (revenues.length === 0) {
      return res.status(200).json({
        status: "ERR",
        message: "NO REVENUE DATA",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "GET REVENUE SUCESSS",
      data: revenues,
    });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateRevenue = async (req, res) => {
  try {
    const { year, month, amount } = req.body;

    if (!year || !month || amount === undefined) {
      return res.status(200).json({
        status: "ERR",
        message: "MISSING YEAR, MONTH OR AMOUNT",
      });
    }

    // Cập nhật hoặc tạo mới doanh thu
    const updatedRevenue = await Revenue.findOneAndUpdate(
      { year, month },
      { $set: { amount } },
      { upsert: true, new: true } // Tạo mới nếu không tìm thấy, trả về bản ghi sau khi cập nhật
    );

    res.status(200).json({
      message: "UPDATE REVENUE SUCCESS",
      data: updatedRevenue,
    });
  } catch (e) {
    reject(e);
  }
};

module.exports = { getRevenueData, updateRevenue };
