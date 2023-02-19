const { INTEGER } = require("sequelize");
const Car = require("../modal/Car");
const VehicleRoute = require("../modal/VehicleRoute");
const { route } = require("../routes/Customer");

const VehicleRouteService = {
  addRoutes: async (startDate, endDate, departure, destination, intendTime, arrayId) => {
    let startDateNew = new Date(new Date(startDate).getTime() + (7 * 3600 * 1000));
    for (let i = 0; i < arrayId.length; i++) {
      const { chair } = await Car.findById(arrayId[i].id);
      let check = 1;
      while (startDateNew.getTime() <= new Date(endDate).getTime()) {
        if (check % 2 != 0) {
          let vehicleRoute = new VehicleRoute({
            startDate: startDateNew,
            endDate: new Date(startDateNew.getTime() + (intendTime * 3600 * 1000)),
            departure: departure,
            destination: destination,
            carId: arrayId[i].id,
            chair: chair
          });
          vehicleRoute.save();
          startDateNew = new Date(startDateNew.getTime() + ((intendTime + 1) * 3600 * 1000));
          check += 1;
        }
        else {
          let vehicleRoute = new VehicleRoute({
            startDate: startDateNew,
            endDate: new Date(startDateNew.getTime() + (intendTime * 3600 * 1000)),
            departure: destination,
            destination: departure,
            carId: arrayId[i].id,
            chair: chair
          });
          vehicleRoute.save();
          startDateNew = new Date(startDateNew.getTime() + ((intendTime + 1) * 3600 * 1000));
          check += 1;
        }
      }
      startDateNew = new Date(new Date(startDate).getTime() + (7 * 3600 * 1000));
    }
  },
  getCarById: async (_id) => {
    return await Car.findById(_id);
  },
  addCarType: async (carType) => {
    return await carType.save();
  },
};

module.exports = VehicleRouteService;
