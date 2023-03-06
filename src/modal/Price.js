const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const priceSchema = new Schema({
  title: {
    type: String,
  },
  startDate: {
    type: Date,
    default: new Date(),
  },
  endDate: {
    type: Date,
    default: new Date(),
  },
  price: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: false,
  },
  routeId: {
    type: ObjectId,
  },
});

const Price = mongoose.model("Price", priceSchema);

module.exports = Price;
