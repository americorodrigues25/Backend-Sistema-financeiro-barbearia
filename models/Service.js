const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    tipo: {
      type: String,
      required: [true, "O tipo de serviço é obrigatório."],
      trim: true,
    },

    valor: {
      type: Number,
      required: [true, "O valor do serviço é obrigatório."],
      min: [0, "O valor não pode ser negativo."],
    },

    data: {
      type: Date,
      required: [true, "A data é obrigatória."],
      default: Date.now,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", ServiceSchema);
