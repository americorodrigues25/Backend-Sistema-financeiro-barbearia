const Service = require("../models/Service");

// Criar serviço
exports.createService = async (req, res) => {
  try {
    const { tipo, valor, data } = req.body;
    const service = new Service({ tipo, valor, data });
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

// Total do dia
exports.getTotalDay = async (req, res) => {
  try {
    const hoje = new Date();
    const inicioDia = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate(),
      0,
      0,
      0
    );
    const fimDia = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate(),
      23,
      59,
      59
    );

    const servicosHoje = await Service.find({
      data: { $gte: inicioDia, $lte: fimDia },
    });
    const total = servicosHoje.reduce((acc, s) => acc + s.valor, 0);

    res.json({ success: true, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Total do mês
exports.getTotalMonth = async (req, res) => {
  try {
    const hoje = new Date();
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const fimMes = new Date(
      hoje.getFullYear(),
      hoje.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const servicosMes = await Service.find({
      data: { $gte: inicioMes, $lte: fimMes },
    });
    const total = servicosMes.reduce((acc, s) => acc + s.valor, 0);

    res.json({ success: true, total, quantidade: servicosMes.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Dados da semana
exports.getWeek = async (req, res) => {
  try {
    const hoje = new Date();
    const diaSemana = hoje.getDay();

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

// Últimos serviços
exports.getLast = async (req, res) => {
  try {
    const ultimos = await Service.find()
      .sort({ updatedAt: -1 }) // serviços mais recentes ou atualizados primeiro
      .limit(3);
    res.json({ success: true, ultimos });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Atualizar
exports.updateService = async (req, res) => {
  try {
    let { tipo, valor, data } = req.body;

    // garante que valor é number
    valor = Number(valor);

    // garante que data é Date e ajusta fuso horário
    data = new Date(data);
    data.setHours(data.getHours() + 3); // ajuste se estiver no fuso BRT (-3)

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { tipo, valor, data },
      { new: true }
    );

    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Serviço não encontrado" });
    }

    res.json({ success: true, message: "Serviço atualizado!", data: service });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Deletar
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Serviço não encontrado" });
    }

    res.json({ success: true, message: "Serviço excluído!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Buscar serviços filtrados
exports.getFilteredServices = async (req, res) => {
  try {
    const { tipo, dataInicio, dataFim } = req.query;
    const filtro = {};

    // Filtro por tipo
    if (tipo) filtro.tipo = tipo;

    // Filtro por período
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

