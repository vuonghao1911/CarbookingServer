const promotionService = require("../services/PromotionService");
const Promotion = require("../modal/Promotion");
const PromotionService = require("../services/PromotionService");
const PromotionType = require("../modal/PromotionType");

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
      startDate: startDate,
      endDate: endDate,
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
  async getPromotion(req, res, next) {
    try {
      const promotion = await Promotion.aggregate([
        {
          $lookup:
          {
            from: "routes",
            localField: "routeId",
            foreignField: "_id",
            as: "route"
          },
        },
        {
          "$unwind": "$route"
        },
        {
          "$project": {
            "_id": "$_id",
            "startDate": "$startDate",
            "endDate": "$endDate",
            "percentDiscount": "$percentDiscount",
            "routeId": "$routeId",
            "quantityTicket": "$quantityTicket",
            "status": "$status",
            "title": "$title",
            "purchaseAmount": "$purchaseAmount",
            "moneyReduced": "$moneyReduced",
            "maximumDiscount": "$maximumDiscount",
            "budget": "$budget",
            "route": "$route.place.name"
          },
        },
      ]);
      res.json(promotion);
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
  async getPromotionType(req, res, next) {
    try {
      const promotionType = await PromotionType.find();
      res.json(promotionType);
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
