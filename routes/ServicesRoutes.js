const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const { getFilteredServices } = require("../controllers/serviceController");

router.post("/", serviceController.createService);
router.get("/total/day", serviceController.getTotalDay);
router.get("/total/month", serviceController.getTotalMonth);
router.get("/week", serviceController.getWeek);
router.get("/last", serviceController.getLast);
router.get("/filter", getFilteredServices);
router.put("/:id", serviceController.updateService);
router.delete("/:id", serviceController.deleteService);

// Rota leve para manter o servidor acordado
router.get("/ping", (req, res) => {
  res.status(200).json({ message: "Servidor ativo" });
});

module.exports = router;
