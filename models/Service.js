const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    // O MongoDB gera automaticamente o _id, mas podemos ser explícitos.
    // O tipo ObjectId já é o padrão.
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     auto: true,
    // },

    // Tipo do serviço (ex: "Corte", "Barba", "Combo", "Tintura")
    tipo: {
      type: String,
      required: [true, "O tipo de serviço é obrigatório."], // Garante que não seja vazio
      trim: true, // Remove espaços em branco
    },

    // Valor cobrado pelo serviço
    valor: {
      type: Number,
      required: [true, "O valor do serviço é obrigatório."],
      min: [0, "O valor não pode ser negativo."], // Garante que o valor seja zero ou positivo
    },

    // Data e hora que o serviço foi executado
    data: {
      type: Date,
      required: [true, "A data é obrigatória."],
      default: Date.now, // pega data + hora atual automaticamente
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Service", ServiceSchema);
