const vehicleRouteService = require("../services/VehicleRouteService");
const Customer = require("../modal/Customer");
var mongoose = require('mongoose');
const Route = require("../modal/Route");
const VehicleRoute = require("../modal/VehicleRoute");
class VehicleRouteController {
  async addVehicleRoute(req, res, next) {
    const { startDate, endDate, routeId, arrayId, priceTicket } = req.body;
    try {
      const { place, intendTime } = await Route.findOne(
        { routeId },
        {
          place: { _id: 1 },
          intendTime: 1,
        }
      );
      const departure = place[0]._id;
      const destination = place[1]._id;
      console.log("location", departure);
      const route = await vehicleRouteService.addRoutes(
        startDate,
        endDate,
        departure,
        destination,
        intendTime,
        arrayId,
        priceTicket
      );
      return res.json(route);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async searchVehicleRoute(req, res, next) {
    let vehicleRouteSearch = new Array();
    try {
      const vehicleRoute = await VehicleRoute.aggregate([{ $match: { "departure": new mongoose.Types.ObjectId(req.body.departure), "destination": new mongoose.Types.ObjectId(req.body.destination) } }, {
        $lookup:
        {
          from: "cars",
          localField: "carId",
          foreignField: "_id",
          as: "car"
        },
      },
      {
        "$unwind": "$car",
      },
      {
        $lookup:
        {
          from: "places",
          localField: "departure",
          foreignField: "_id",
          as: "departure"
        },
      },
      {
        "$unwind": "$departure"
      },
      {
        $lookup:
        {
          from: "places",
          localField: "destination",
          foreignField: "_id",
          as: "destination"
        },
      },
      {
        "$unwind": "$destination"
      },
      {
        $lookup:
        {
          from: "cartypes",
          localField: "car.typeCarId",
          foreignField: "_id",
          as: "cartype"
        },
      },
      {
        "$unwind": "$cartype"
      },
      {
        $lookup:
        {
          from: "routes",
          localField: "car.typeCarId",
          foreignField: "carTypeId",
          as: "route"
        },
      },
      {
        "$unwind": "$route"
      },
      {
        $lookup:
        {
          from: "prices",
          localField: "route._id",
          foreignField: "routeId",
          as: "price"
        },
      },
      {
        "$unwind": "$price"
      },
      {
        "$project": {
          "_id": "$_id",
          "startDate": "$startDate",
          "endDate": "$endDate",
          "departure": "$departure",
          "destination": "$destination",
          "licensePlates": "$car.licensePlates",
          "carType": "$cartype.type",
          "price": "$price",
          "chair": "$chair"
        },
      },]);
      vehicleRoute.map(vehicleRoute => {
        if (new Date(vehicleRoute.startDate).toLocaleDateString() === new Date(req.body.startDate).toLocaleDateString()) {
          vehicleRouteSearch.push(vehicleRoute);
        }
      })
      res.json(vehicleRouteSearch);
    } catch (error) {
      next(error);
    }
  }
  async getCustomerById(req, res, next) {
    const { userId } = req.params;
    console.log(userId);

    try {
      const customer = await Customer.findById(userId);

      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
  async getVehicleRoute(req, res, next) {
    try {
      const vehicleRoute = await VehicleRoute.aggregate([
        {
          $lookup:
          {
            from: "cars",
            localField: "carId",
            foreignField: "_id",
            as: "car"
          },
        },
        {
          "$unwind": "$car",
        },
        {
          $lookup:
          {
            from: "places",
            localField: "departure",
            foreignField: "_id",
            as: "departure"
          },
        },
        {
          "$unwind": "$departure"
        },
        {
          $lookup:
          {
            from: "places",
            localField: "destination",
            foreignField: "_id",
            as: "destination"
          },
        },
        {
          "$unwind": "$destination"
        },
        {
          $lookup:
          {
            from: "cartypes",
            localField: "car.typeCarId",
            foreignField: "_id",
            as: "cartype"
          },
        },
        {
          "$unwind": "$cartype"
        },
        {
          $lookup:
          {
            from: "routes",
            localField: "car.typeCarId",
            foreignField: "carTypeId",
            as: "route"
          },
        },
        {
          "$unwind": "$route"
        },
        {
          $lookup:
          {
            from: "prices",
            localField: "route._id",
            foreignField: "routeId",
            as: "price"
          },
        },
        {
          "$unwind": "$price"
        },
        {
          "$project": {
            "_id": "$_id",
            "startDate": "$startDate",
            "endDate": "$endDate",
            "departure": "$departure",
            "destination": "$destination",
            "licensePlates": "$car.licensePlates",
            "carType": "$cartype.type",
            "price": "$price",
            "chair": "$chair"
          },
        },
      ]);
      res.json(vehicleRoute);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new VehicleRouteController();
