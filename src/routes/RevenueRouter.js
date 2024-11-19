const express = require("express");
const router = express.Router();
const revenueController = require("../controllers/RevenueController");

router.get("/get-revenue", revenueController.getRevenueData);
router.post("/update-revenue", revenueController.updateRevenue);

module.exports = router;
