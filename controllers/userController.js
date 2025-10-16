const User = require("../models/User");
const bcrypt = require("bcryptjs");

// rota para trocar senha
exports.changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "E-mail e nova senha são obrigatórios." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "Usuário não encontrado." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Senha alterada com sucesso!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Erro no servidor.", error: err.message });
  }
};
