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

module.exports = router;
