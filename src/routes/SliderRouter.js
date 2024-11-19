const express = require("express");
const router = express.Router();
const sliderController = require("../controllers/SliderController");

router.post("/add-image", sliderController.addImage);
router.get("/all-image", sliderController.getAllImages);
router.put("/update/:id", sliderController.updateImage);
router.delete("/delete/:id", sliderController.deleteImage);

module.exports = router;
