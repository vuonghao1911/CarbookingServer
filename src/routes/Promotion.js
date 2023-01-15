const router = require("express").Router();
const promotionController = require("../controllers/PromotionController");

router.post("/addPromotion", promotionController.addPromotion);
router.post("/addPromotionType", promotionController.addPromotionType);
router.post("/addPromotionResult", promotionController.addPromotionResult);

module.exports = router;
