const express = require("express");
const router = express.Router();
const {
  getRecipes,
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");

// All recipes
router.route("/").get(getRecipes).post(createRecipe);
// Recipe by ID
router.route("/:id").get(getRecipeById).put(updateRecipe).delete(deleteRecipe);
module.exports = router;
