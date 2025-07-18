// we define what each route should do
const asyncHandler = require("express-async-handler"); // helps to handle async/await without try/catch
const Item = require("../models/item-model");

// Get all items
exports.getItems = asyncHandler(async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Create an item
exports.createItem = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const item = await Item.create({ name });
  res.status(201).json(item);
});

// Update an item
exports.updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

// Delete an item
exports.deleteItem = asyncHandler(async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
});
