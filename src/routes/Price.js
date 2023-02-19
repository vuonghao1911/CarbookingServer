const router = require("express").Router();
const PriceController = require("../controllers/PriceController");

router.post("/addPrice", PriceController.addPrice);
router.get("/all/getPrice", PriceController.getPrice);

module.exports = router;
