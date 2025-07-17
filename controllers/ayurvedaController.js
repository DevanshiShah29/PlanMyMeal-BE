const AyurvedaModel = require("../models/ayurvedaModel");

// GET
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await AyurvedaModel.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST
exports.createCategory = async (req, res) => {
  const { name, description, items } = req.body;
  try {
    const category = new AyurvedaModel({ name, description, items });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description, items } = req.body;
  try {
    const updatedCategory = await AyurvedaModel.findByIdAndUpdate(id, { name, description, items }, { new: true });
    if (!updatedCategory) return res.status(404).json({ message: "Category not found" });
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await AyurvedaModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
