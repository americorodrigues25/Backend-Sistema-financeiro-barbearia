const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

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

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
  })
);
app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/services", Service);

// Conexão com banco
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
