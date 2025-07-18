const express = require("express");
const router = express.Router();
const {
  createClassification,
  getAllClassifications,
  getClassification,
  updateClassification,
  deleteClassification,
} = require("../controllers/classification-controller");
const upload = require("../middleware/upload-middleware");

router.post("/", upload.single("icon"), createClassification);
router.get("/", getAllClassifications);
router.get("/:id", getClassification);
router.put("/:id", upload.single("icon"), updateClassification);
router.delete("/:id", deleteClassification);

module.exports = router;
