const express = require("express");
const router = express.Router();
const { loginUser, handleForgotPassword } = require("../controllers/auth-controller");

router.post("/login", loginUser);
router.post("/forgot-password", handleForgotPassword);

module.exports = router;
