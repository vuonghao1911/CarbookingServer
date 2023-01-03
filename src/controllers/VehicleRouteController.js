const vehicleRouteService = require("../services/VehicleRouteService");
const Customer = require("../modal/Customer");
class VehicleRouteController {
  async addVehicleRoute(req, res, next) {
    const { startDate, endDate, departure, destination, carId, intendTime } =
      req.body;
    //console.log(number);
    try {
      const route = await vehicleRouteService.addRoutes(
        startDate,
        endDate,
        departure,
        destination,
        carId,
        intendTime
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
