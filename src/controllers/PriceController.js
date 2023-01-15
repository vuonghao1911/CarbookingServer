const priceService = require("../services/PriceService");

class PriceController {
  async addPrice(req, res, next) {
    var { startDate, endDate, price, routeId } = req.body;
    var status;
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    if (startDate <= new Date() && endDate > new Date()) {
      status = true;
    } else {
      status = false;
    }
    try {
      const newPrice = await priceService.savePrice(
        startDate,
        endDate,
        price,
        status,
        routeId
      );
      res.json(newPrice);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PriceController();
