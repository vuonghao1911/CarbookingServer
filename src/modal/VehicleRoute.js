const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const vehicleRouteSchema = new Schema({
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  departure: {
    type: ObjectId,
  },
  destination: {
    type: ObjectId,
  },
  carId: {
    type: ObjectId,
  },
  chair: [],
  code: {
    type: Number,
  },
});

const VehicleRoute = mongoose.model("VehicleRoute", vehicleRouteSchema);

module.exports = VehicleRoute;
