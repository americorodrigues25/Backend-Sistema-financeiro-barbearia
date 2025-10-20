const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// config do banco
const connectDB = require("./config/database");

// rotas
const authRoutes = require("./routes/Auth");
const serviceRoutes = require("./routes/ServicesRoutes");

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const MONGO_URI = process.env.MONGO_URI || "";

// conexão com banco 
if (!MONGO_URI) {
  console.warn("MONGO_URI não definida! O banco não será conectado.");
} else {
  connectDB();
}

const app = express();

// middlewares
const allowedOrigins = ["http://localhost:3000", CLIENT_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS policy: ${origin} não permitido.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());

// rotas
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);

// rota que mantem servidor sempre ativo
app.get("/ping", (req, res) => {
  res.status(200).json({ message: "Servidor ativo" });
});

// raiz
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// inicializa o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
