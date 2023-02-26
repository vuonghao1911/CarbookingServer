const vehicleRouteService = require("../services/VehicleRouteService");
const Customer = require("../modal/Customer");
var mongoose = require('mongoose');
const Route = require("../modal/Route");
const VehicleRoute = require("../modal/VehicleRoute");
class VehicleRouteController {
  async addVehicleRoute(req, res, next) {
    const { startDate, endDate, routeId, arrayId} = req.body;
    console.log(routeId);
    try {
      const routeChoose = await Route.findById(routeId);
      const departure = routeChoose.place[0]._id;
      const destination = routeChoose.place[1]._id;
      const route = await vehicleRouteService.addRoutes(
        startDate,
        endDate,
        departure,
        destination,
        routeChoose.intendTime,
        arrayId
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
      const vehicleRoute = await VehicleRoute.aggregate([
        { $match: { "departure": new mongoose.Types.ObjectId(req.body.departure), "destination": new mongoose.Types.ObjectId(req.body.destination) } }, {
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
          $lookup:
          {
            from: "promotions",
            localField: "route._id",
            foreignField: "routeId",
            as: "promotions"
          },
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
            "chair": "$chair",
            "promotions": "$promotions.title"
          },
        },]);
      vehicleRoute.map(vehicleRoute => {
        if (new Date(new Date(vehicleRoute.startDate).getTime() - (7 * 3600 * 1000)).toLocaleDateString() === new Date(new Date(req.body.startDate).getTime() - (7 * 3600 * 1000)).toLocaleDateString()) {
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
