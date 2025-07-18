const Classification = require("../models/classification-model");
const { uploadToCloudinary } = require("../utils/cloudinary");

exports.createClassification = async (req, res) => {
  try {
    let icon = "";
    if (req.file) {
      const result = await uploadToCloudinary(req.file);
      icon = result.secure_url;
    }

    const classification = new Classification({
      ...req.body,
      icon,
    });

    await classification.save();
    res.status(201).json(classification);
  } catch (err) {
    res.status(400).json({
      error: err.message,
      message: "Failed to create classification",
    });
  }
};

exports.getAllClassifications = async (req, res) => {
  try {
    const classifications = await Classification.find().sort({ name: 1 });
    res.json(classifications);
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Failed to fetch classifications",
    });
  }
};

exports.getClassification = async (req, res) => {
  try {
    const classification = await Classification.findById(req.params.id);
    if (!classification) {
      return res.status(404).json({ message: "Classification not found" });
    }
    res.json(classification);
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Failed to fetch classification",
    });
  }
};

exports.updateClassification = async (req, res) => {
  try {
    let updateData = { ...req.body, updatedAt: Date.now() };

    if (req.file) {
      const result = await uploadToCloudinary(req.file);
      updateData.icon = result.secure_url;
    }

    const classification = await Classification.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!classification) {
      return res.status(404).json({ message: "Classification not found" });
    }

    res.json(classification);
  } catch (err) {
    console.error(err); // 👈 log it to your terminal
    res.status(500).json({
      error: err.message,
      message: "Internal Server Error - Failed to create classification",
    });

    res.status(400).json({
      error: err.message,
      message: "Failed to update classification",
    });
  }
};

exports.deleteClassification = async (req, res) => {
  try {
    const classification = await Classification.findByIdAndDelete(req.params.id);
    if (!classification) {
      return res.status(404).json({ message: "Classification not found" });
    }
    res.json({ message: "Classification deleted successfully" });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Failed to delete classification",
    });
  }
};
