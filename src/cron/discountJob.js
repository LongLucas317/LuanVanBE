const cron = require("node-cron");
const { updateDiscounts } = require("../services/ProductService");

// Thiết lập cron job chạy mỗi phút để cập nhật giảm giá
cron.schedule("* * * * *", async () => {
  console.log("Running discount update job...");
  await updateDiscounts();
});
