const express = require("express");
const router = express.Router();
const {
  createFoodInfo,
  getAllFoodInfo,
  updateFoodInfo,
  deleteFoodInfo,
  generateParagraph,
  addFoodInfoInBulk,
} = require("../controllers/foodInfo-controller");

router.post("/", createFoodInfo);
router.get("/", getAllFoodInfo);
router.put("/:id", updateFoodInfo);
router.delete("/:id", deleteFoodInfo);
router.post("/generate", generateParagraph);
router.post("/bulk", addFoodInfoInBulk);

module.exports = router;
