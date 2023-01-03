const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const vehicleRouteSchema = new Schema({
  startDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },

  endTime: {
    type: Date,
    required: true,
  },
  intendTime: {
    type: Number,
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
});

const VehicleRoute = mongoose.model("VehicleRoute", vehicleRouteSchema);

module.exports = VehicleRoute;
