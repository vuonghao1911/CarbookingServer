const { INTEGER } = require("sequelize");
const Car = require("../modal/Car");
const VehicleRoute = require("../modal/VehicleRoute");
const { route } = require("../routes/Customer");

const VehicleRouteService = {
  addRoutes: async (
    startDate,
    endDate,
    departure,
    destination,
    intendTime,
    arrayId
  ) => {
    const { chair } = await Car.findById(arrayId[0]);
    console.log(chair);

    var arrayCararrive = arrayId.slice(0, arrayId.length / 2);
    var arrayDes = arrayId.slice(arrayId.length / 2, arrayId.length);
    console.log("arrayCararrive", arrayCararrive);
    console.log("arrayCararrive1", arrayDes);

    startDate = new Date("2023-02-18");
    endDate = new Date("2023-02-20");
    startDate.setHours(03);
    startDate.setMinutes(00);

    var endTime = new Date("2023-01-03");
    console.log("house: ", startDate.getHours());
    endTime.setHours(startDate.getHours() + intendTime * 1);
    const array = [];
    console.log(startDate <= endDate);
    var arrive = 0;
    var des = 0;
    console.log("startDate1: ", startDate.getHours());
    while (startDate <= endDate) {
      while (startDate.getHours() < 17) {
        if (arrive < arrayId.length && arrive < intendTime) {
          const route = new VehicleRoute({
            startDate: startDate,
            startTime: startDate,
            endTime: endTime,
            intendTime: intendTime,
            departure: departure,
            destination: destination,
            carId: arrayCararrive[arrive].id,
            chair: chair,
          });
          const routeDes = new VehicleRoute({
            startDate: startDate,
            startTime: startDate,
            endTime: endTime,
            intendTime: intendTime,
            departure: destination,
            destination: departure,
            carId: arrayDes[arrive].id,
            chair: chair,
          });
          console.log("arrive: ", route);
          console.log("des: ", routeDes);
          await route.save();
          await routeDes.save();
        }

        if (arrive > arrayId.length / 2 && arrive + 1 > intendTime) {
          if (des < arrayId.length / 2 && des < intendTime) {
            console.log("----------------------------");
            const route = new VehicleRoute({
              startDate: startDate,
              startTime: startDate,
              endTime: endTime,
              intendTime: intendTime,
              departure: departure,
              destination: destination,
              carId: arrayDes[des].id,
              chair: chair,
            });
            const routeDes = new VehicleRoute({
              startDate: startDate,
              startTime: startDate,
              endTime: endTime,
              intendTime: intendTime,
              departure: destination,
              destination: departure,
              carId: arrayCararrive[des].id,
              chair: chair,
            });
            await route.save();
            await routeDes.save();
            console.log("arrive: ", route);
            console.log("des: ", routeDes);
            console.log("idCrar: ", des);
            des++;
          } else {
            arrive = 0;
          }
        }
        arrive++;
        console.log("arrive", arrive);
        // await route.save();
        array.push(route);
        console.log("startTime: ", startDate.getHours());
        console.log("endTime: ", endTime.getHours());
        // console.log("route ", route);
        startDate.setHours(startDate.getHours() + 3);
        endTime.setHours(startDate.getHours() + intendTime * 1);
      }
      startDate.setDate(startDate.getDate() + 1);
      startDate.setHours(03);
      arrive = 0;
      des = 0;
      startDate.setMinutes(00);
      endTime.setHours(startDate.getHours() + intendTime * 1);
      console.log("d", startDate);
    }

    // console.log("array", array);
    console.log("date", arrive);
    return array;
  },
  getCarById: async (_id) => {
    return await Car.findById(_id);
  },
  addCarType: async (carType) => {
    return await carType.save();
  },
};

module.exports = VehicleRouteService;
