const router = require("express").Router();
const employeeController = require("../controllers/EmployeeController");

router.post("/addEmployeeType", employeeController.addEmployeeType);
router.post("/addEmpl", employeeController.addEmployee);

// router.get("/:id", carController.getCarById);

module.exports = router;
