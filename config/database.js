const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, 
    });

    console.log("✅ MongoDB conectado com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB:", err.message);
    process.exit(1); 
  }

  mongoose.connection.on("disconnected", () => {
    console.warn("Conexão com o MongoDB perdida. Tentando reconectar...");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("Reconectado ao MongoDB!");
  });
}

module.exports = connectDB;
