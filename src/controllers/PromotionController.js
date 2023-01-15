const promotionService = require("../services/PromotionService");
const Promotion = require("../modal/Promotion");
const PromotionService = require("../services/PromotionService");

class PromotionController {
  async addPromotion(req, res, next) {
    const {
      startDate,
      endDate,
      percentDiscount,
      routeId,
      quantityTicket,
      status,
      title,
      purchaseAmount,
      moneyReduced,
      maximumDiscount,
      budget,
      promotionType,
    } = req.body;

    const promotion = new Promotion({
      startDate: new Date("2023-01-14"),
      endDate: new Date("2023-03-14"),
      percentDiscount: percentDiscount,
      routeId: routeId,
      quantityTicket: quantityTicket,
      status: status,
      title: title,
      purchaseAmount: purchaseAmount,
      moneyReduced: moneyReduced,
      maximumDiscount: maximumDiscount,
      budget: budget,
      promotionType: promotionType,
    });

    try {
      const savePromotion = await promotionService.savePromotion(promotion);
      res.json(savePromotion);
    } catch (error) {
      next(error);
    }
  }
  async addPromotionType(req, res, next) {
    const { name } = req.body;

    try {
      const newPro = await PromotionService.savePromotionType(name);
      res.json(newPro);
    } catch (error) {
      next(error);
    }
  }
  async addPromotionResult(req, res, next) {
    const { promotionId, ticketId, discountAmount } = req.body;

    try {
      const newProResult = await PromotionService.savePromotionResult(
        promotionId,
        ticketId,
        discountAmount
      );
      res.json(newProResult);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PromotionController();
