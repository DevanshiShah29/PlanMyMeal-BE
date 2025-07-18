const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    items: { type: [String], default: [] },
    classification: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classification",
      required: [true, "Classification is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
