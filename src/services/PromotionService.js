const Promotion = require("../modal/Promotion");

const PromotionService = {
  savePromotion: async (pormotion) => {
    return await pormotion.save();
  },
  getPromotionById: async (_id) => {
    return await Promotion.findById(_id);
  },
};

module.exports = PromotionService;
