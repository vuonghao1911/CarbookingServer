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
      title,
      purchaseAmount,
      moneyReduced,
      maximumDiscount,
      budget,
      promotionType,
    } = req.body;

    var status;
    var message = "Success";
    var Isexists;
    const code = await Promotion.countDocuments();
    try {
      if (new Date(startDate) > new Date()) {
        status = false;
      } else {
        status = true;
      }
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
        code: code + 1,
      });

      const promotionsFind = await Promotion.find({ routeId: routeId });
      console.log(promotionsFind);
      if (promotionsFind.length > 0) {
        for (const promotion of promotionsFind) {
          if (
            new Date(startDate) >= new Date(promotion.startDate) &&
            new Date(promotion.endDate) >= new Date(startDate) &&
            promotion.status == true
          ) {
            message = "Promotion Is exists";
            Isexists = true;
          }
        }
        if (Isexists) {
          res.json({ newPromotion: null, message });
        } else {
          const newPromotion = await promotion.save();
          res.json({ newPromotion, message });
        }
      } else {
        const newPromotion = await promotion.save();
        res.json({ newPromotion, message });
      }
    } catch (error) {
      next(error);
    }
  }
  async getPromotion(req, res, next) {
    try {
      const promotion = await Promotion.aggregate([
        {
          $lookup: {
            from: "routes",
            localField: "routeId",
            foreignField: "_id",
            as: "route",
          },
        },
        {
          $unwind: "$route",
        },
        {
          $project: {
            _id: "$_id",
            startDate: "$startDate",
            endDate: "$endDate",
            percentDiscount: "$percentDiscount",
            routeId: "$routeId",
            quantityTicket: "$quantityTicket",
            status: "$status",
            title: "$title",
            purchaseAmount: "$purchaseAmount",
            moneyReduced: "$moneyReduced",
            maximumDiscount: "$maximumDiscount",
            budget: "$budget",
            departure: "$route.departure.name",
            destination: "$route.destination.name",
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
    const codeFind = await Promotion.find().sort({ _id: -1 }).limit(1);
    var code;
    if (codeFind[0]) {
      code = codeFind[0].code;
    } else {
      code = 0;
    }
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

  async getPromotionByCurrentDate(req, res, next) {
    var arrayResult = [];

    try {
      const listPromotions = await promotionService.getPromotion();
      for (const promotion of listPromotions) {
        if (
          new Date(promotion.startDate) < new Date() &&
          new Date(promotion.endDate) >= new Date()
        ) {
          arrayResult.push({ ...promotion, status: true });
        } else if (new Date() > new Date(promotion.endDate)) {
          arrayResult.push({ ...promotion, status: null });
        } else {
          arrayResult.push({ ...promotion, status: false });
        }
      }
      res.json(arrayResult);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PromotionController();
