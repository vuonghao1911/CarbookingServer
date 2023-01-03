const router = require("express").Router();
const vehicleRouteController = require("../controllers/VehicleRouteController");

router.post("/addRoute", vehicleRouteController.addVehicleRoute);

module.exports = router;
