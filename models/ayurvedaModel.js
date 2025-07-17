const mongoose = require("mongoose");

const AyurvedaModelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    items: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AyurvedaModelSchema", AyurvedaModelSchema);
