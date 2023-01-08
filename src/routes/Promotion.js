const router = require("express").Router();
const promotionController = require("../controllers/PromotionController");

router.post("/addPromotion", promotionController.addPromotion);

module.exports = router;
