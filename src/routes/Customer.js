const router = require("express").Router();
const customerController = require("../controllers/customerController");

router.post("/add", customerController.addCustomer);

router.get("/:userId", customerController.getCustomerById);

module.exports = router;
