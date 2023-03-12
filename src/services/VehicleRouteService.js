const Car = require("../modal/Car");
const VehicleRoute = require("../modal/VehicleRoute");
const Price = require("../modal/Price");
const Promotions = require("../modal/Promotion");
var mongoose = require("mongoose");

const VehicleRouteService = {
  addRoutes: async (
    startDate,
    endDate,
    departure,
    destination,
    intendTime,
    arrayId
  ) => {
    const code = await VehicleRoute.countDocuments();
    let startDateNew = new Date(
      new Date(startDate).getTime() + 7 * 3600 * 1000
    );
    for (let i = 0; i < arrayId.length; i++) {
      const { chair } = await Car.findById(arrayId[i]);
      let check = 1;
      while (startDateNew.getTime() <= new Date(endDate).getTime()) {
        if (check % 2 != 0) {
          let vehicleRoute = new VehicleRoute({
            startDate: startDateNew,
            endDate: new Date(
              startDateNew.getTime() + intendTime * 3600 * 1000
            ),
            departure: departure,
            destination: destination,
            carId: arrayId[i],
            chair: chair,
            code: code + 1,
          });
          vehicleRoute.save();
          startDateNew = new Date(
            startDateNew.getTime() + (intendTime + 1) * 3600 * 1000
          );
          check += 1;
        } else {
          let vehicleRoute = new VehicleRoute({
            startDate: startDateNew,
            endDate: new Date(
              startDateNew.getTime() + intendTime * 3600 * 1000
            ),
            departure: destination,
            destination: departure,
            carId: arrayId[i],
            chair: chair,
            code: code + 1,
          });
          vehicleRoute.save();
          startDateNew = new Date(
            startDateNew.getTime() + (intendTime + 1) * 3600 * 1000
          );
          check += 1;
        }
      }
      startDateNew = new Date(new Date(startDate).getTime() + 7 * 3600 * 1000);
    }
  },
  findVehicleRoute: async (departure, destination) => {
    const vehicleRoute = await VehicleRoute.aggregate([
      {
        $match: {
          departure: new mongoose.Types.ObjectId(departure),
          destination: new mongoose.Types.ObjectId(destination),
        },
      },
      {
        $lookup: {
          from: "cars",
          localField: "carId",
          foreignField: "_id",
          as: "car",
        },
      },
      {
        $unwind: "$car",
      },
      {
        $lookup: {
          from: "places",
          localField: "departure",
          foreignField: "_id",
          as: "departure",
        },
      },
      {
        $unwind: "$departure",
      },
      {
        $lookup: {
          from: "places",
          localField: "destination",
          foreignField: "_id",
          as: "destination",
        },
      },
      {
        $unwind: "$destination",
      },
      {
        $lookup: {
          from: "cartypes",
          localField: "car.typeCarId",
          foreignField: "_id",
          as: "cartype",
        },
      },
      {
        $unwind: "$cartype",
      },

      {
        $project: {
          _id: "$_id",
          startDate: "$startDate",
          endDate: "$endDate",
          departure: "$departure",
          destination: "$destination",
          licensePlates: "$car.licensePlates",
          carType: "$cartype.type",
          chair: "$chair",
        },
      },
    ]);
    return vehicleRoute;
  },
  checkPriceRoute: async (currenDate, routeId) => {
    const price = await Price.findOne({
      routeId: routeId,
      endDate: { $gte: new Date(currenDate) },
      startDate: { $lte: new Date(currenDate) },
    });
    return price;
  },
  checkPromotionsRoute: async (currenDate, routeId) => {
    const promotion = await Promotions.findOne({
      routeId: routeId,
      endDate: { $gte: new Date(currenDate) },
      startDate: { $lte: new Date(currenDate) },
      status: true,
    });
    return promotion;
  },
};

module.exports = VehicleRouteService;
