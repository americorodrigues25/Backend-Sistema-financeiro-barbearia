const Service = require("../models/Service");

// cria serviço
exports.createService = async (req, res) => {
  try {
    const { tipo, valor, data } = req.body;
    const serviceDate = data ? new Date(data) : new Date();

    const service = new Service({
      tipo,
      valor,
      data: serviceDate,
      user: req.user.id,
    });

    await service.save();

    res.status(201).json({
      success: true,
      message: "Serviço cadastrado com sucesso!",
      data: service,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// valor total do dia
exports.getTotalDay = async (req, res) => {
  try {
    const hoje = new Date();
    const inicioDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    const fimDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 23, 59, 59, 999);

    const servicosHoje = await Service.find({
      user: req.user.id,
      data: { $gte: inicioDia, $lte: fimDia },
    });

    const total = servicosHoje.reduce((acc, s) => acc + s.valor, 0);

    res.json({ success: true, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// valor total do mês
exports.getTotalMonth = async (req, res) => {
  try {
    const hoje = new Date();
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const fimMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0, 23, 59, 59, 999);

    const servicosMes = await Service.find({
      user: req.user.id,
      data: { $gte: inicioMes, $lte: fimMes },
    });

    const total = servicosMes.reduce((acc, s) => acc + s.valor, 0);

    res.json({ success: true, total, quantidade: servicosMes.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// dados da semana
exports.getWeek = async (req, res) => {
  try {
    const hoje = new Date();
    const diaSemana = hoje.getDay(); // 0 = Domingo

    const domingo = new Date(hoje);
    domingo.setDate(hoje.getDate() - diaSemana);
    domingo.setHours(0, 0, 0, 0);

    const dadosSemana = [];

    for (let i = 0; i < 7; i++) {
      const inicio = new Date(domingo);
      inicio.setDate(domingo.getDate() + i);
      inicio.setHours(0, 0, 0, 0);

      const fim = new Date(domingo);
      fim.setDate(domingo.getDate() + i);
      fim.setHours(23, 59, 59, 999);

      const servicosDia = await Service.find({
        user: req.user.id,
        data: { $gte: inicio, $lte: fim },
      });

      const totalDia = servicosDia.reduce((acc, s) => acc + s.valor, 0);

      dadosSemana.push({
        dia: ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"][i],
        total: totalDia,
        quantidade: servicosDia.length,
      });
    }

    res.json({ success: true, dadosSemana });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ultimos serviços cadastrados
exports.getLast = async (req, res) => {
  try {
    const ultimos = await Service.find({ user: req.user.id })
      .sort({ updatedAt: -1 })
      .limit(3);

    res.json({ success: true, ultimos });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// atualiza serviço
exports.updateService = async (req, res) => {
  try {
    const { tipo, valor, data } = req.body;

    const serviceDate = data ? new Date(data) : new Date();

    const service = await Service.findByIdAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { tipo, valor, data: serviceDate },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ success: false, message: "Serviço não encontrado" });
    }

    res.json({ success: true, message: "Serviço atualizado!", data: service });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// apagar serviço
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!service) {
      return res.status(404).json({ success: false, message: "Serviço não encontrado" });
    }

    res.json({ success: true, message: "Serviço excluído!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// busca serviços filtrados
exports.getFilteredServices = async (req, res) => {
  try {
    const { tipo, dataInicio, dataFim } = req.query;
    const filtro = { user: req.user.id };

    if (tipo) filtro.tipo = tipo;

    if (dataInicio && dataFim) {
      filtro.data = {
        $gte: new Date(dataInicio),
        $lte: new Date(dataFim),
      };
    }

    const servicos = await Service.find(filtro).sort({ data: -1 });

    res.json({ success: true, data: servicos });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
