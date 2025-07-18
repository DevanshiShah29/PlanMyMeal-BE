const express = require("express");
const router = express.Router();
const classificationController = require("../controllers/classification-controller");
const upload = require("../middleware/upload-middleware");

router.post("/", upload.single("icon"), classificationController.createClassification);
router.get("/", classificationController.getAllClassifications);
router.get("/:id", classificationController.getClassification);
router.put("/:id", upload.single("icon"), classificationController.updateClassification);
router.delete("/:id", classificationController.deleteClassification);

module.exports = router;
