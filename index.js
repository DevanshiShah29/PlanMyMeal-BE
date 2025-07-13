require("dotenv").config();
const express = require("express");
const app = express(); // starting the express app
const connectDB = require("./config/db");
const itemRoutes = require("./routes/itemRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const factRoutes = require("./routes/factsRoutes");
const authRoutes = require("./routes/authRoutes");
const foodInfoRoutes = require("./routes/foodInfoRoutes");

const errorHandler = require("./middleware/errorMiddleware");
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
