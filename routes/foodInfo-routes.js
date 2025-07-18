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

// POST - Add a new food info card
router.post("/", createFoodInfo);

// GET - Retrieve all food info cards
router.get("/", getAllFoodInfo);

// Update
router.put("/:id", updateFoodInfo);

// Delete
router.delete("/:id", deleteFoodInfo);

router.post("/generate", generateParagraph);
router.post("/bulk", addFoodInfoInBulk);

module.exports = router;
