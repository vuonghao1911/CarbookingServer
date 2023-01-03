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
      dayUpdate: {
        type: Date,
        default: new Date(),
      },
      newPrice: {
        type: Number,
      },
      oldPrice: {
        type: Number,
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
