const router = require("express").Router();
const promotionController = require("../controllers/PromotionController");

router.post("/addPromotion", promotionController.addPromotion);
router.get("/all/getPromotion", promotionController.getPromotion);
router.post("/addPromotionType", promotionController.addPromotionType);
router.get("/all/getPromotionType", promotionController.getPromotionType);
router.post("/addPromotionResult", promotionController.addPromotionResult);
router.get(
  "/all/getPromotionCurrenDate",
  promotionController.getPromotionByCurrentDate
);

module.exports = router;
