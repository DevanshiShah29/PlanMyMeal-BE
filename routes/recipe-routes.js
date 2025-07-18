const express = require("express");
const router = express.Router();
const {
  getRecipes,
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipe-controller");

router.route("/").get(getRecipes).post(createRecipe);
router.route("/:id").get(getRecipeById).put(updateRecipe).delete(deleteRecipe);

module.exports = router;
