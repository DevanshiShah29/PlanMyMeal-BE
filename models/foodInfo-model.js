const mongoose = require("mongoose");

const foodInfoSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    frontParagraph: {
      type: String,
      required: true,
    },
    backParagraph: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FoodInfo", foodInfoSchema);
