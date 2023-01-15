const Price = require("../modal/Price");

// car and car type services

const priceService = {
  savePrice: async (startDate, endDate, price, status, routeId) => {
    const newprice = new Price({
      startDate: startDate,
      endDate: endDate,
      price: price,
      status: status,
      routeId: routeId,
    });
    return await newprice.save();
  },
};

module.exports = priceService;
