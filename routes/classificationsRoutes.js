const express = require("express");
const router = express.Router();
const classificationController = require("../controllers/classificationsController");
const upload = require("../middleware/uploadMiddleware");

router.post("/", upload.single("icon"), classificationController.createClassification);
router.get("/", classificationController.getAllClassifications);
router.get("/:id", classificationController.getClassification);
router.put("/:id", upload.single("icon"), classificationController.updateClassification);
router.delete("/:id", classificationController.deleteClassification);

module.exports = router;
