const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const routeSchema = new Schema({
  carTypeId: {
    type: ObjectId,
  },
  intendTime: {
    type: Number,
  },
  departure: {},
  destination: {},
  status: {
    type: Boolean,
    default: true,
  },
  code: {
    type: String,
  },
});

const Route = mongoose.model("Route", routeSchema);

module.exports = Route;
