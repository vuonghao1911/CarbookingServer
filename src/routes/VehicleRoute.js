const router = require("express").Router();
const vehicleRouteController = require("../controllers/VehicleRouteController");

router.post("/addRoute", vehicleRouteController.addVehicleRoute);
router.post("/searchRoute", vehicleRouteController.searchVehicleRoute);
router.get("/all/getVehicleRoute", vehicleRouteController.getVehicleRoute);

module.exports = router;
