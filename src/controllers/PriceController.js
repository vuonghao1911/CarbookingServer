const priceService = require("../services/PriceService");
const Price = require("../modal/Price");

class PriceController {
  async addPrice(req, res, next) {
    var { startDate, endDate, priceTicket, routeId, title } = req.body;
    var status;
    var message = "Success";
    var Isexists;
    const code = Price.countDocuments();
    try {
      if (new Date(startDate) > new Date()) {
        status = false;
      } else {
        status = true;
      }
      let data = {
        price: priceTicket,
        startDate: startDate,
        endDate: endDate,
        routeId: routeId,
        title: title,
        status: status,
        code: code + 1,
      };
      const priceFind = await Price.find({ routeId: routeId });
      console.log(priceFind);
      if (priceFind.length > 0) {
        for (const price of priceFind) {
          if (
            new Date(startDate) >= new Date(price.startDate) &&
            new Date(price.endDate) >= new Date(startDate)
          ) {
            data = null;
            message = "Price Isexists";
            Isexists = true;
          }
        }
        if (Isexists) {
          res.json({ newPrice: null, message });
        } else {
          const newPrice = new Price(data);
          await newPrice.save();
          res.json({ newPrice, message });
        }
      } else {
        const newPrice = new Price(data);
        await newPrice.save();
        res.json({ newPrice, message });
      }
    } catch (error) {
      next(error);
    }
  }
  async getPrice(req, res, next) {
    try {
      const price = await Price.aggregate([
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
            price: "$price",
            status: "$status",
            route: "$route",
            title: "$title",
            status: "$status",
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
