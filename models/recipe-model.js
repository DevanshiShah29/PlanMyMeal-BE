const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    name: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    vitamins: { type: String },
    protein: { type: String },
    carbs: { type: String },
    fats: { type: String },
    fiber: { type: String },
    calories: { type: String },
    time: { type: String },
    level: { type: String },
    youtubeLink: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
