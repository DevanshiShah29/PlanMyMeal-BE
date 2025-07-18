const AyurvedaModel = require("../models/category-model");
const Classification = require("../models/classification-model");

// GET
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await AyurvedaModel.find().populate("classification", "name icon");
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// POST
exports.createCategory = async (req, res) => {
  try {
    const { name, description, items, classification } = req.body;

    const classificationExists = await Classification.findById(classification);
    if (!classificationExists) {
      return res.status(400).json({
        success: false,
        error: "Invalid classification ID",
      });
    }

    const newCategory = new AyurvedaModel({
      name,
      description,
      items,
      classification,
    });

    const savedCategory = await newCategory.save();

    const populatedCategory = await AyurvedaModel.findById(savedCategory._id).populate("classification", "name icon");

    res.status(201).json({ success: true, data: populatedCategory });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// PUT
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, items, classification } = req.body;

    if (classification) {
      const classificationExists = await Classification.findById(classification);
      if (!classificationExists) {
        return res.status(400).json({ success: false, error: "Invalid classification ID" });
      }
    }

    const updatedCategory = await AyurvedaModel.findByIdAndUpdate(
      id,
      { name, description, items, classification },
      { new: true, runValidators: true }
    ).populate("classification", "name icon");

    if (!updatedCategory) {
      return res.status(404).json({ success: false, error: "Category not found" });
    }

    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await AyurvedaModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: "Category not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
