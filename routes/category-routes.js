const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category-controller");

// GET all categories
router.get("/", getAllCategories);

// POST create new category
router.post("/", createCategory);

// PUT update a category by ID
router.put("/:id", updateCategory);

// DELETE a category by ID
router.delete("/:id", deleteCategory);

module.exports = router;
