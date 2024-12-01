const express = require("express");
const router = express.Router();
const rankController = require("../controllers/RankController");

router.post("/create", rankController.createRank);
router.put("/update/:id", rankController.updateRank);
router.get("/getAll", rankController.getAllRank);
router.get("/getDetail/:id", rankController.getDetailRank);
router.delete("/delete/:id", rankController.deleteRank);

module.exports = router;
