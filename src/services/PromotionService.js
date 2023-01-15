const Promotion = require("../modal/Promotion");
const PromotionType = require("../modal/PromotionType");
const PromotionResult = require("../modal/PromotionResult");

const PromotionService = {
  savePromotion: async (pormotion) => {
    return await pormotion.save();
  },
  savePromotionType: async (name) => {
    const promotionType = new PromotionType({ name: name });
    return await promotionType.save();
  },
  savePromotionResult: async (promotionId, ticketId, discountAmount) => {
    const promotionResult = new PromotionResult({
      promotionId: promotionId,
      ticketId: ticketId,
      discountAmount: discountAmount,
    });
    return await promotionResult.save();
  },
};

module.exports = PromotionService;
