const placeService = require("../services/PlaceService");
const Place = require("../modal/Place");
const Route = require("../modal/Route");

class PlaceController {
  async addPlace(req, res, next) {
    const { name, busStation, code } = req.body;
    //console.log(number);
    try {
      const place = new Place({
        name: name,
        busStation: busStation,
        code: code,
      });

      const saveplace = await placeService.savePlace(place);
      console.log(saveplace);
      return res.json(saveplace);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async addRoute(req, res, next) {
    const { carTypeId, intendTime, departureId, destinationId, code } =
      req.body;
    //console.log(number);

    // const Arrayplace = await Promise.all(
    //   placeId.map((e) => {
    //     const place = Place.findById(e.id);
    //     return place;
    //   })
    // );
    const departure = await Place.findById(departureId);
    const destination = await Place.findById(destinationId);

    try {
      const route1 = new Route({
        carTypeId: carTypeId,
        intendTime: intendTime,
        departure: departure,
        destination: destination,
        code: code[0] + "-" + code[1],
        status: true
      });
      const route2 = new Route({
        carTypeId: carTypeId,
        intendTime: intendTime,
        departure: destination,
        destination: departure,
        code: code[1] + "-" + code[0],
        status: true
      });
      const saveRoute1 = await placeService.saveRoute(route1);
      const saveRoute2 = await placeService.saveRoute(route2);
      return res.json([saveRoute1, saveRoute2]);
    } catch (error) {
      console.log(error);
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
  async getPlace(req, res, next) {
    try {
      const place = await Place.find();
      res.json(place);
    } catch (error) {
      next(error);
    }
  }
  async updateRoute(req, res, next) {
    try {
      const route = await Route.findByIdAndUpdate(
        req.body.routeId,
        {
          intendTime: req.body.timeBusLineUpdate,
          carTypeId: req.body.typeBusUpdate,
          status: req.body.statusBusLineUpdate
        });
      res.json(route);
    } catch (error) {
      next(error);
    }
  }
  async getRoute(req, res, next) {
    let routesList = new Array();
    try {
      const routes = await Route.aggregate([
        {
          $lookup: {
            from: "cartypes",
            localField: "carTypeId",
            foreignField: "_id",
            as: "cartype",
          },
        },
        { $unwind: "$cartype" },
        {
          $lookup: {
            from: "prices",
            localField: "_id",
            foreignField: "routeId",
            as: "price",
          },
        },
        {
          $project: {
            _id: "$_id",
            carType: "$cartype.type",
            intendTime: "$intendTime",
            route: "$route",
            departure: "$departure",
            destination: "$destination",
            status: "$status",
            code: "$code",
            price: "$price"
          },
        },
      ]);
      routes.map(route => {
        if(route.price.length != 0){
            route.price = route.price.filter(price => (new Date(price.startDate).getTime() <= new Date().getTime() && new Date(price.endDate).getTime() >= new Date().getTime()));
            routesList.push(route);
        }
        else
          routesList.push(route);
      })
      res.json(routesList);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PlaceController();
