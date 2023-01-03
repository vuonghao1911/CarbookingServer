const Car = require("../modal/Car");
const CarType = require("../modal/CarType");

const CarService = {
  addCar: async (car) => {
    return await car.save();
  },
  getCarById: async (_id) => {
    return await Car.findById(_id);
  },
  addCarType: async (carType) => {
    return await carType.save();
  },
};

module.exports = CarService;
