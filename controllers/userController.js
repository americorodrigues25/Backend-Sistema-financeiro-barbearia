const User = require("../models/User");
const bcrypt = require("bcryptjs");

// trazer dados do usuario
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await User.findById(userId).select("username name email");

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor", error: err.message });
  }
};

// atualizar nome do usuario
exports.updateUserName = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "O nome é obrigatório." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuário não encontrado." });
    }

    user.name = name;
    await user.save();

    res.json({
      success: true,
      message: "Nome atualizado com sucesso!",
      name: user.name,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erro no servidor",
        error: err.message,
      });
  }
};

// trocar senha
exports.changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "E-mail e nova senha são obrigatórios.",
      });
    }

     const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;

     if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "A senha deve ter pelo menos 6 caracteres e conter pelo menos 1 caractere especial (ex: @, #, $, !, etc).",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuário não encontrado." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Senha alterada com sucesso!" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Erro no servidor.",
      error: err.message,
    });
  }
};