const router = require("express").Router();
const carController = require("../controllers/CarController");

router.post("/addCarType", carController.addCarType);
router.post("/addCar", carController.addCar);

router.get("/:id", carController.getCarById);

module.exports = router;
