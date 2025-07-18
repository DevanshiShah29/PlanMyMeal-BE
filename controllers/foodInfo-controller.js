const FoodInfo = require("../models/foodInfo-model");
const { generateFoodInfoAnswer } = require("../utils/generate-answer");

// @desc   Add new food info card
// @route  POST /api/food-info
exports.createFoodInfo = async (req, res) => {
  try {
    const { image, frontParagraph, backParagraph } = req.body;

    const newFood = new FoodInfo({ image, frontParagraph, backParagraph });
    await newFood.save();

    res.status(201).json({ message: "Food info added successfully", data: newFood });
  } catch (err) {
    console.error("Error creating food info:", err);
    res.status(500).json({ error: "Failed to add food info" });
  }
};

// @desc   Get all food info cards
// @route  GET /api/food-info
exports.getAllFoodInfo = async (req, res) => {
  try {
    const foodInfoList = await FoodInfo.find().sort({ createdAt: -1 });
    res.status(200).json(foodInfoList);
  } catch (err) {
    console.error("Error fetching food info:", err);
    res.status(500).json({ error: "Failed to fetch food info" });
  }
};

// @desc   Update a food info card
// @route  PUT /api/food-info/:id
exports.updateFoodInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, frontParagraph, backParagraph } = req.body;

    const updatedFood = await FoodInfo.findByIdAndUpdate(id, { image, frontParagraph, backParagraph }, { new: true });

    if (!updatedFood) {
      return res.status(404).json({ error: "Food info not found" });
    }

    res.status(200).json({ message: "Updated successfully", data: updatedFood });
  } catch (err) {
    console.error("Error updating food info:", err);
    res.status(500).json({ error: "Failed to update food info" });
  }
};

// @desc   Delete a food info card
// @route  DELETE /api/food-info/:id
exports.deleteFoodInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await FoodInfo.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Food info not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Error deleting food info:", err);
    res.status(500).json({ error: "Failed to delete food info" });
  }
};

exports.generateParagraph = async (req, res) => {
  const { frontParagraph } = req.body;

  if (!frontParagraph) {
    return res.status(400).json({ error: "frontParagraph is required" });
  }

  try {
    const answer = await generateFoodInfoAnswer(frontParagraph);
    res.status(200).json({ answer });
  } catch (err) {
    console.error("Gemini AI Error:", err);
    res.status(500).json({ error: "Failed to generate answer using AI" });
  }
};

// @route  POST /food-info/bulk
exports.addFoodInfoInBulk = async (req, res) => {
  try {
    const { foodCards } = req.body;
    if (!foodCards || !Array.isArray(foodCards)) {
      return res.status(400).json({ error: "Invalid data format" });
    }

    const inserted = await FoodInfo.insertMany(foodCards);
    res.status(201).json({ message: "Bulk insert successful", data: inserted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Bulk insert failed" });
  }
};
