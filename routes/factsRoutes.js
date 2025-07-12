// routes/factRoutes.js
const express = require("express");
const router = express.Router();
const factController = require("../controllers/factsController");

router.get("/", factController.getAllFacts);
router.post("/", factController.createFact);
router.delete("/:id", factController.deleteFact);
router.put("/:id", factController.updateFact);
router.post("/bulk", factController.addMultipleFacts);
router.post("/generate", factController.generateWithAI);

module.exports = router;
