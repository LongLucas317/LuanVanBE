const cron = require("node-cron");
const Product = require("../models/ProductModel");

// Hàm cập nhật giảm giá cho sản phẩm
const updateDiscounts = async () => {
  try {
    const now = new Date();
    const utcString = now.toLocaleString("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
    });

    const utcArr1 = utcString.split(", ")[0];
    const utcArr15 = utcArr1.split("/");
    const utcArr16 = `${utcArr15[2]}-${utcArr15[0]}-${utcArr15[1]}`;
    const utcArr2 = utcString.split(", ")[1];
    const utcArr3 = utcArr2.split(":");
    const utcArr35 = utcArr3[2].split(" ");

    const handleGraftTime = () => {
      if (utcArr35[1] === "AM") {
        utcArr3[0] = utcArr3[0];
      } else if (utcArr35[1] === "PM") {
        utcArr3[0] = +utcArr3[0] + 12;
      }

      return utcArr3[0];
    };
    const timeGraft = handleGraftTime();

    const utcArr4 = `${timeGraft}:${utcArr3[1]}`;
    const utcArrFinal = `${utcArr16}T${utcArr4}` + ":00.000+00:00";

    const productsToUpdate = await Product.find();

    for (let product of productsToUpdate) {
      // Kiểm tra nếu thời gian giảm giá đang diễn ra
      if (
        product.discountStartTime <= utcArrFinal &&
        product.discountEndTime >= utcArrFinal
      ) {
        // Nếu trong khoảng thời gian giảm giá, cập nhật discount
        product.discount = product.discountAmount;
        product.isSale = true;
        console.log("CHECKKKKKKKKKKK");
      } else {
        // Nếu hết thời gian giảm giá, đặt lại discount về 0
        product.discount = 0;
        product.isSale = false;
      }
      await product.save();
    }
    console.log("Discounts updated successfully.");
  } catch (error) {
    console.error("Error updating discounts:", error);
  }
};

// Thiết lập cron job để chạy mỗi phút (có thể điều chỉnh tùy vào nhu cầu)
cron.schedule("* * * * *", updateDiscounts); // Chạy mỗi phút
