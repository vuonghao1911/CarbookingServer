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
  getPromotion: async () => {
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
          budget: "$budget",
          quantityTicket: "$quantityTicket",
          maximumDiscount: "$maximumDiscount",
          moneyReduced: "$moneyReduced",
          purchaseAmount: "$purchaseAmount",
          percentDiscount: "$percentDiscount",
          title: "$title",
          departure: "$route.departure",
          destination: "$route.destination",
        },
      },
    ]);

    return promotion;
  },
};

module.exports = PromotionService;
