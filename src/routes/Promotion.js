const router = require("express").Router();
const promotionController = require("../controllers/PromotionController");
// add promotion Line and add promotionDetails
router.post("/addPromotion", promotionController.addPromotions);
// get list promotion by Id promotionHeader
router.get("/all/getPromotion/:idProHeader", promotionController.getPromotion);
router.post("/addPromotionType", promotionController.addPromotionType);
router.get("/all/getPromotionType", promotionController.getPromotionType);
router.post("/addPromotionResult", promotionController.addPromotionResult);
router.post("/addPromotionHeader", promotionController.addPromotionHeader);
// get list Promotion by currentDate --- mobile
router.get(
  "/all/getPromotionCurrenDate",
  promotionController.getPromotionByCurrentDate
);
// get list promotionHeader
router.get("/all/getPromotionHeader", promotionController.getPromotionHeader);

module.exports = router;
