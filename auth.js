const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

function signToken(user) {
  return jwt.sign(
    { id: user._id.toString(), role: user.role, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "username, email, password are required" });
    }

    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) return res.status(409).json({ error: "User already exists" });

    // Role assignment rule:
    // - For safety: only allow role=admin if explicitly provided AND you later change it in DB (or keep viewer/user)
    // - Here we allow all 3 for demo; in real systems you would restrict admin creation.
    const safeRole = ["admin", "user", "viewer"].includes(role) ? role : "user";

    const passwordHash = await User.hashPassword(password);
    const user = await User.create({ username, email, passwordHash, role: safeRole });

    const token = signToken(user);
    res.status(201).json({
      token,
      user: { id: user._id, username: user.username, email: user.email, role: user.role }
    });
  } catch (e) {
    res.status(500).json({ error: "Signup failed", details: e.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password) {
      return res.status(400).json({ error: "emailOrUsername and password are required" });
    }

    const user = await User.findOne({
      $or: [{ email: emailOrUsername.toLowerCase() }, { username: emailOrUsername }]
    });

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await user.verifyPassword(password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = signToken(user);
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email, role: user.role }
    });
  } catch (e) {
    res.status(500).json({ error: "Login failed", details: e.message });
  }
});

module.exports = router;
