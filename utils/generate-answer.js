const { GoogleGenerativeAI } = require("@google/generative-ai");

const generateFactAnswer = async (question) => {
  const prompt = `Generate a concise 2-3 line response to ${question} without restating the question. 
- Keep under 200 words
- Optionally add links,  use format :https://example.com (no brackets) 
- Maintain neutral/professional tone
- Include only most relevant information`;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = await response.text();

  return text;
};

const generateFoodInfoAnswer = async (frontParagraph) => {
  const prompt = `
      Act as a certified nutritionist. Based on this question or intro:
      "${frontParagraph}"
      Write a realistic, educational paragraph about the food’s nutritional value, covering vitamins, minerals, and health benefits.
   `;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = await response.text();

  return text;
};

module.exports = {
  generateFactAnswer,
  generateFoodInfoAnswer,
};
