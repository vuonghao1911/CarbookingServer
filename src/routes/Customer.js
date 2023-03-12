const router = require("express").Router();
const customerController = require("../controllers/customerController");

router.post("/add", customerController.addCustomer);

router.get("/:userId", customerController.getCustomerById);
router.get("/all/getCustomer", customerController.getCustomer);
router.post("/update", customerController.updateInfo);

module.exports = router;
