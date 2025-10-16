const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { changePassword } = require("../controllers/userController");

const auth = require("../middleware/auth");
const { getUserProfile, updateUserName } = require("../controllers/userController");

// perfil do usuario
router.get("/profile", auth, getUserProfile);
router.put("/update-name", auth, updateUserName);

// login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "Usuário não encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Senha incorreta" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

router.put("/change-password", changePassword);

module.exports = router;
