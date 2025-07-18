require("dotenv").config();
const express = require("express");
const app = express(); // starting the express app
const connectDB = require("./config/db");
const itemRoutes = require("./routes/item-routes");
const recipeRoutes = require("./routes/recipe-routes");
const factRoutes = require("./routes/fact-routes");
const authRoutes = require("./routes/auth-routes");
const foodInfoRoutes = require("./routes/foodInfo-routes");
const ayurvedaRoutes = require("./routes/category-routes");
const classificationRoutes = require("./routes/classification-routes");

const errorHandler = require("./middleware/error-middleware");
const cors = require("cors");

// Connect to MongoDB
connectDB();

// Middleware to parse JSON body
app.use(express.json());

const allowedOrigins = ["http://localhost:3000", "https://mymeal-planner.netlify.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Mount item routes
app.use("/api/items", itemRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/facts", factRoutes);
app.use("/api/food-info", foodInfoRoutes);
app.use("/api/ayurveda", ayurvedaRoutes);
app.use("/api/classification", classificationRoutes);
app.use("/api", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
