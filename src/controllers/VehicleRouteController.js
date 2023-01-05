const vehicleRouteService = require("../services/VehicleRouteService");
const Customer = require("../modal/Customer");
const Route = require("../modal/Route");
class VehicleRouteController {
  async addVehicleRoute(req, res, next) {
    const { startDate, endDate, routeId, carId, arrayId } = req.body;
    //console.log(number);
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
        carId,
        intendTime,
        arrayId
      );
      return res.json(route);
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
}

module.exports = new VehicleRouteController();
