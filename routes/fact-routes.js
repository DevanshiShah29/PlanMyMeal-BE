const express = require("express");
const router = express.Router();
const {
  getAllFacts,
  createFact,
  deleteFact,
  updateFact,
  addMultipleFacts,
  generateWithAI,
} = require("../controllers/fact-controller");

router.get("/", getAllFacts);
router.post("/", createFact);
router.delete("/:id", deleteFact);
router.put("/:id", updateFact);
router.post("/bulk", addMultipleFacts);
router.post("/generate", generateWithAI);

module.exports = router;
