const { INTEGER } = require("sequelize");
const Car = require("../modal/Car");
const VehicleRoute = require("../modal/VehicleRoute");
const { route } = require("../routes/Customer");

const VehicleRouteService = {
  addRoutes: async (
    startDate, // start date of routes
    endDate, // end date of routes
    departure,
    destination,
    intendTime,
    arrayId // array id of car
  ) => {
    const { chair } = await Car.findById(arrayId[0].id);
    console.log(chair);

    var arrayCararrive = arrayId.slice(0, arrayId.length / 2);
    var arrayDes = arrayId.slice(arrayId.length / 2, arrayId.length);
    console.log("arrayCararrive", arrayCararrive);
    console.log("arrayCararrive1", arrayDes);

    // edit start and end date
    startDate = new Date(startDate); // start date
    endDate = new Date(endDate); // end date
    // start to 3 o'clock
    startDate.setHours(03);
    startDate.setMinutes(00);

    var endTime = new Date(startDate); // endTime = startDate
    console.log("house: ", startDate.getHours());
    endTime.setHours(startDate.getHours() + intendTime * 1);
    const array = [];
    console.log(startDate <= endDate);
    var arrive = 0;
    var des = 0;
    console.log("startDate1: ", startDate.getHours());
    while (startDate <= endDate) {
      while (startDate.getHours() < 17) {
        if (arrive < arrayId.length / 2 && arrive < intendTime) {
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
          console.log("arrive1: ", route);
          console.log("des1: ", routeDes);
          await route.save();
          await routeDes.save();
          console.log("arr", arrive);
        }

        if (arrive >= arrayId.length / 2 && arrive + 3 > intendTime) {
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
              // chair: chair,
            });
            await route.save();
            await routeDes.save();
            console.log("arrive2: ", route);
            console.log("des2: ", routeDes);

            des++;
          } else {
            arrive = 0;
          }
        }
        arrive++;
        if (des >= arrayId.length / 2) {
          arrive = 0;
        }
        console.log("arrive", arrive);
        console.log("des: ", des);
        // await route.save();
        array.push(route);
        console.log("startTime: ", startDate.getHours());
        console.log("endTime: ", endTime.getHours());
        // console.log("route ", route);

        // set hours to start next route
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
