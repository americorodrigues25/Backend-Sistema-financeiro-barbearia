const express = require("express");
const router = express.Router();

const { changePassword } = require("../controllers/userController");
const auth = require("../middleware/auth");
const {
  getUserProfile,
  updateUserName,
} = require("../controllers/userController");
const { login } = require("../controllers/authController");

// perfil do usuario
router.get("/profile", auth, getUserProfile);
router.put("/update-name", auth, updateUserName);
router.put("/change-password", changePassword);

// login
router.post("/login", login);

module.exports = router;
