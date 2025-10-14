const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/database")

const requiredEnv = ["PORT", "MONGO_URI", "JWT_SECRET"];
requiredEnv.forEach((env) => {
  if (!process.env[env]) {
    console.error(`⚠️  Erro: Variável de ambiente ${env} não definida!`);
    process.exit(1);
  }
});

const authRoutes = require("./routes/Auth");
const Service = require("./routes/ServicesRoutes");

const PORT = process.env.PORT || 5000;

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_URL, // Sua URL do Vercel
];

// Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      // Permite requisições sem "origin" (como apps nativos ou Postman)
      if (!origin) return callback(null, true);

      // Verifica se a origem está na lista de permitidas
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `A política CORS para o site ${origin} não permite acesso.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/services", Service);

// Conexão com banco
connectDB();

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
