const router = require("express").Router();
const accountController = require("../controllers/AccountController");

router.post("/register", accountController.Register);
router.post("/login", accountController.Login);

module.exports = router;
