const priceService = require("../services/PriceService");
const Price = require("../modal/Price");

class PriceController {
  async addPrice(req, res, next) {
    var { startDate, endDate, priceTicket, routeId } = req.body;
    let data = {
      price: priceTicket,
      startDate: startDate,
      endDate: endDate,
      routeId: routeId
    }
    try {
      const newPrice = new Price(data);
      newPrice.save();
      res.json(newPrice);
    } catch (error) {
      next(error);
    }
  }
  async getPrice(req, res, next) {
    try {
      const price = await Price.aggregate([
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
          "$unwind": "$route",
        },
        {
          "$project": {
            "_id": "$_id",
            "startDate": "$startDate",
            "endDate": "$endDate",
            "price": "$price",
            "status": "$status",
            "route": "$route"
          },
        },
      ]);
      res.json(price);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PriceController();
