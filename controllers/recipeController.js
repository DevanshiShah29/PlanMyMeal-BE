const Recipe = require("../models/recipeModel");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

// GET all recipes
exports.getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find().sort({ createdAt: -1 });
  res.json(recipes);
});

// POST - add new recipe
exports.createRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.create(req.body);
  res.status(201).json(recipe);
});

// GET a single recipe by ID
exports.getRecipeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Step 1: Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid recipe ID");
  }

  // Step 2: Try to find the recipe
  const recipe = await Recipe.findById(id);

  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404);
    throw new Error("Recipe not found");
  }
});

// PUT - Update recipe by ID
exports.updateRecipe = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid recipe ID");
  }

  const recipe = await Recipe.findById(id);

  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }

  // Update fields with new data
  const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
    new: true, // return the updated version
    runValidators: true,
  });

  res.json(updatedRecipe);
});

// DELETE - Remove recipe by ID
exports.deleteRecipe = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid recipe ID");
  }

  const recipe = await Recipe.findById(id);

  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }

  await recipe.deleteOne();

  res.json({ message: "Recipe deleted successfully" });
});
