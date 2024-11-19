const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    isPublic: { type: Boolean, required: true, default: true },
    operatingSystem: { type: String },
    image: { type: String, required: true },
    images: [{ type: String }],
    brand: { type: String, required: true },
    countInStock: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    isSale: { type: Boolean, required: true, default: false },
    discountStartTime: { type: String },
    discountEndTime: { type: String },
    selled: { type: Number, default: 0 },
    specifications: {
      screen: {
        //Màn hình
        size: { type: String }, // kích thước màn hình, "6.67 inches"
        technology: { type: String }, // Loại màn hình, "AMOLED"
        resolution: { type: String }, // Độ phân giải, "1220 x 2712 pixels"
        features: [{ type: String }], // Tính năng, "144Hz, 446 ppi, 4000 nits, HDR10+, Dolby Vision®"
        pwm: { type: String }, // Tần số quét, "3840 Hz"
        design: { type: String }, // Thiết kế, "Mặt sau cong 3D"
      },
      camera: {
        rear: {
          // Cam sau
          main: { type: String }, // Độ phân giải cam chính, "50MP, 23mm, ƒ/1.6"
          ultraWide: { type: String }, // Góc rộng, "12MP, 15mm, ƒ/2.2"
          video: { type: String }, // Video, "4K 2160p@30fps/60fps/24fps FullHD"
          features: [{ type: String }], // Tính năng, ["MasterCinema", "Chế độ đạo diễn", "Hình ảnh Leica đích thực"]
        },
        front: {
          // Cam trước
          resolution: { type: String }, // Độ phân giải, "32MP, ƒ/2.0, 25mm"
          features: [{ type: String }], // Tính năng, ["Night Mode", "HDR", "Palm shutter"]
        },
      },
      processor: {
        // Vi xử lý & đồ họa
        chipset: { type: String }, // e.g., "MediaTek Dimensity 9300+"
        cpu: { type: String }, // e.g., "1 x Cortex-X4 at 3.4GHz..."
        gpu: { type: String }, // e.g., "Immortalis-G720 MC12"
      },
      connectivity: {
        // Giao tiếp & kết nối
        nfc: { type: Boolean, default: false },
        sim: { type: String }, // Thẻ sim, "Dual SIM (nano-SIM and e-SIM)"
        network: { type: String }, // Hỗ trợ mạng, "5G"
        wifi: { type: String }, // wifi, "Wi-Fi 7"
        bluetooth: { type: String }, // bluetooth, "v5.4"
      },
      memory: {
        // Bộ nhớ
        ram: [{ type: String }], // RAM, 12
        storage: [{ type: String }], // Bộ nhớ trong, 512
      },
      battery: {
        // Pin
        capacity: { type: String }, // Dung lượng pin, 5000 mAh
        typeCharging: { type: String }, // Loại sạc, "Sạc nhanh"
        wiredCharging: { type: String }, // Sạc có dây, "HyperCharge 120W"
        wirelessCharging: { type: String }, // Sạc không dây, "50W"
        portCharging: { type: String }, // Cổng sạc, "Lightning"
      },
      design: {
        // Thiết kế
        dimensions: { type: String }, // Kích thước, "160.4 x 75.1 x 8.39 mm"
        weight: { type: String }, // Trọng lượng, 209
        colors: [{ type: String }],
        frameMaterial: { type: String }, // Chất liệu khung viền, "Nhôm"
      },
      additionalFeatures: {
        // Thông số khác
        waterResistance: { type: String }, // Chỉ số kháng nước, bụi, "IP68"
        audio: { type: [String] }, // Công nghệ âm thanh, ["Chứng nhận âm thanh Hi-Res & Hi-Res không dây", "Loa âm thanh nổi", "Dolby Atmos"]
      },
    },
    options: [
      {
        id: { type: Number },
        image: { type: String },
        ram: { type: String }, // lưu giá trị Storage của cấu hình
        storage: { type: String }, // lưu giá trị Storage của cấu hình
        color: { type: String }, // lưu giá trị màu sắc của cấu hình
        quantity: { type: Number, default: 0 }, // Số lượng cho từng cấu hình cụ thể
        price: { type: Number, default: 0 }, // Giá cho từng cấu hình cụ thể
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
