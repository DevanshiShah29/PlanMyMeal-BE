const jwt = require("jsonwebtoken");

const users = {
  Ninad: { password: "Ninad3110", role: "user" },
  Devanshi: { password: "Devanshi2901", role: "user" },
  Admin: { password: "Admin123", role: "admin" },
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  const user = users[username];
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });

  res.json({ token, role: user.role , username: username });
};
