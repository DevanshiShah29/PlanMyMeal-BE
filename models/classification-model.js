const mongoose = require("mongoose");

const classificationSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Classification name is required"],
      unique: true,
    },
    subText: {
      type: String,
      required: [true, "Sub text is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    color: {
      type: String,
      required: [true, "Text color is required"],
      match: [/^#([0-9a-f]{3}){1,2}$/i, "Invalid color hex code"],
    },
    bgColor: {
      type: String,
      required: [true, "Background color is required"],
      match: [/^#([0-9a-f]{3}){1,2}$/i, "Invalid color hex code"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Classification", classificationSchema);
