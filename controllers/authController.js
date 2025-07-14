const jwt = require("jsonwebtoken");
const sendMail = require('../utils/sendMail');

const users = {
  Ninad: { password: "Ninad3110", role: "user" },
  Devanshi: { password: "Devanshi2901", role: "user" },
  Admin: { password: "Admin123", role: "admin" },
};

const allowedUsers = {
  "devanshifour@gmail.com": "Admin123",
  "ninadshah2k@gmail.com": "Ninad3110",
  "devanshio2h@gmail.com": "Devanshi2901",
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  const user = users[username];
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });

  res.json({ token, role: user.role, username: username });
};

exports.handleForgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!allowedUsers[email]) {
    res.status(404);
    throw new Error("Email does not exist in our records");
  }

  const password = allowedUsers[email];

  await sendMail({
    to: email,
    subject: "Your Password for MyMeal Planner",
    text: `Your password is: ${password}`,
  });

  res.json({ message: "Password has been sent to your email." });
};
