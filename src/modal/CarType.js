const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const carTypeSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  price: [
    {
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
    },
  ],

  chair: [
    {
      seats: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const CarType = mongoose.model("CarType", carTypeSchema);

module.exports = CarType;
