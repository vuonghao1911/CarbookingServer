const promotionService = require("../services/PromotionService");
const Promotion = require("../modal/Promotion");
const PromotionHeader = require("../modal/PromotionHeader");
const PromotionService = require("../services/PromotionService");
const PromotionType = require("../modal/PromotionType");
const RouteType = require("../modal/RouteType");
const PromotionLine = require("../modal/PromotionLine");

class PromotionController {
  // add promotion details and promotion line
  async addPromotions(req, res, next) {
    const {
      startDate,
      endDate,
      percentDiscount,
      quantityTicket,
      title,
      purchaseAmount,
      moneyReduced,
      maximumDiscount,
      budget,
      promotionType,
      description,
      promotionHeaderId,
      codeLine,
      routeTypeId,
    } = req.body;

    var status;
    var message = "Success";

    const codeFindDetails = await PromotionLine.find()
      .sort({ _id: -1 })
      .limit(1);
    var codeDetails;
    if (codeFindDetails[0]) {
      codeDetails = codeFindDetails[0].code;
    } else {
      codeDetails = 0;
    }
    if (new Date(startDate) > new Date()) {
      status = false;
    } else {
      status = true;
    }

    const checkDate = await promotionService.checDatePromotionsDetails(
      startDate,
      endDate
    );
    const checkDateLine = await promotionService.checDatePromotionsLine(
      startDate
    );
    if (checkDate && checkDateLine == null) {
      const promotionLine = new PromotionLine({
        startDate: startDate,
        endDate: endDate,
        status: status,
        title: title,
        code: codeLine,
        title: title,
        promotionTypeId: promotionType,
        promotionHeaderId: promotionHeaderId,
        description: description,
        routeTypeId: routeTypeId,
      });

      const newPromotionLine = await promotionLine.save();
      const promotion = new Promotion({
        percentDiscount: percentDiscount,
        quantityTicket: quantityTicket,
        purchaseAmount: purchaseAmount,
        moneyReduced: moneyReduced,
        maximumDiscount: maximumDiscount,
        budget: budget,
        promotionType: promotionType,
        promotionHeaderId: promotionHeaderId,
        promotionLineId: newPromotionLine._id,
      });

      const newPromotion = await promotion.save();

      res.json({ newPromotionLine, newPromotion, message });
    } else {
      message =
        "startDate and EndDate promotionLine or PromotionDetails invalid ";
      res.json({ newPromotionLine: null, newPromotion: null, message });
    }
  }
  catch(error) {
    next(error);
  }
  // add promotion header
  async addPromotionHeader(req, res, next) {
    const { startDate, endDate, title, description, code } = req.body;

    var status;

    try {
      if (new Date(startDate) > new Date()) {
        status = false;
      } else {
        status = true;
      }
      let data = {
        startDate: startDate,
        endDate: endDate,
        title: title,
        status: status,
        code: code,
        description: description,
      };
      const promotionCheck = await promotionService.checDatePromotionsHeader(
        startDate
      );
      console.log(promotionCheck);
      if (promotionCheck) {
        res.json({
          promotionsHeader: null,
          message: "promotionHeader Is exists",
        });
      } else {
        const promotionsHeader = new PromotionHeader(data);
        await promotionsHeader.save();
        res.json({ promotionsHeader, message: "Success" });
      }
    } catch (error) {
      next(error);
    }
  }

  async getPromotion(req, res, next) {
    const { idProHeader } = req.params;
    const result = [];
    try {
      const promotion =
        await PromotionService.getPromotionDetailsByPromotionHeaderId(
          idProHeader
        );
      // console.log(promotion[1].promotionLine.startDate);

      for (const promo of promotion) {
        console.log(promo?.promotionLine?.startDate);
        if (new Date(promo?.promotionLine?.startDate) > new Date()) {
          await PromotionLine.updateOne(
            { _id: promo?.promotionLine?._id },
            { $set: { status: false } }
          );
        }
      }
      const promotionResult =
        await PromotionService.getPromotionDetailsByPromotionHeaderId(
          idProHeader
        );
      for (const elem of promotionResult) {
        var routeType = null;
        if (elem?.promotionLine?.routeTypeId) {
          routeType = await RouteType.findById(
            elem?.promotionLine?.routeTypeId
          );
        }
        result.push({ ...elem, routeType: routeType });
      }

      res.json(result);
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
  async getPromotionHeader(req, res, next) {
    try {
      const promotionHeader = await PromotionHeader.find();
      //check date > current date update status
      for (const promotionHe of promotionHeader) {
        if (new Date(promotionHe.startDate) > new Date()) {
          await PromotionHeader.updateOne(
            { _id: promotionHe._id },
            { $set: { status: false } }
          );
        }
      }

      const promotionResult = await PromotionHeader.find();
      res.json(promotionResult);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PromotionController();
