const router = require("express").Router();
const placeController = require("../controllers/PlaceController");

router.post("/addPlace", placeController.addPlace);
router.post("/addRoute", placeController.addRoute);

//router.get("/:id", carController.getCarById);

module.exports = router;
