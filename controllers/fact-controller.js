const Fact = require("../models/fact-model");
const { generateFactAnswer } = require("../utils/generate-answer");

// Get all facts
exports.getAllFacts = async (req, res) => {
  try {
    const facts = await Fact.find().sort({ createdAt: -1 });
    res.json(facts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching facts" });
  }
};

// Add a new fact
exports.createFact = async (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ message: "Both question and answer are required" });
  }

  try {
    const newFact = new Fact({ question, answer });
    await newFact.save();
    res.status(201).json(newFact);
  } catch (err) {
    res.status(500).json({ message: "Error saving fact" });
  }
};

// Delete a fact
exports.deleteFact = async (req, res) => {
  try {
    await Fact.findByIdAndDelete(req.params.id);
    res.json({ message: "Fact deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting fact" });
  }
};

// Update a fact
exports.updateFact = async (req, res) => {
  const { question, answer } = req.body;
  try {
    const updatedFact = await Fact.findByIdAndUpdate(req.params.id, { question, answer }, { new: true });
    res.json(updatedFact);
  } catch (err) {
    res.status(500).json({ message: "Error updating fact" });
  }
};

// Add multiple facts
exports.addMultipleFacts = async (req, res) => {
  try {
    const { facts } = req.body;
    if (!Array.isArray(facts) || facts.length === 0) {
      return res.status(400).json({ message: "Facts array is required" });
    }
    const created = await Fact.insertMany(facts);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Generate answer for a fact using Gemini API
exports.generateWithAI = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const answer = await generateFactAnswer(question);
    res.status(200).json({ answer });
  } catch (err) {
    console.error("Gemini AI Error:", err);
    res.status(500).json({ error: "Failed to generate answer using AI" });
  }
};
