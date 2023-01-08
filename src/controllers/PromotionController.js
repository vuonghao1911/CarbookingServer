const promotionService = require("../services/PromotionService");
const Promotion = require("../modal/Promotion");

class PromotionController {
  async addPromotion(req, res, next) {
    const {
      startDate,
      endDate,
      percentDiscount,
      carTypeId,
      quantityTicket,
      status,
      title,
    } = req.body;

    const promotion = new Promotion({
      startDate: new Date("2023-01-14"),
      endDate: new Date("2023-03-14"),
      percentDiscount: percentDiscount,
      carTypeId: carTypeId,
      quantityTicket: quantityTicket,
      status: status,
      title: title,
    });

    try {
      const savePromotion = await promotionService.savePromotion(promotion);
      res.json(savePromotion);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PromotionController();
