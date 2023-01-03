const route = (app) => {
  const customerRouter = require("./Customer");
  const carRouter = require("./Car");
  const vehicleRoute = require("./VehicleRoute");
  const employeeRoute = require("./Employee");

  app.use("/customers", customerRouter);
  app.use("/cars", carRouter);
  app.use("/routes", vehicleRoute);
  app.use("/employees", employeeRoute);
};

module.exports = route;
