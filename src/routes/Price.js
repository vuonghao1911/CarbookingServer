const router = require("express").Router();
const PriceController = require("../controllers/PriceController");

router.post("/addPrice", PriceController.addPrice);

module.exports = router;
