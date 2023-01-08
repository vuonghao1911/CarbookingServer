const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const promotionSchema = new Schema({
  startDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  endDate: {
    type: Date,
    required: true,
    default: new Date(),
  },

  percentDiscount: {
    type: Number,
    required: true,
  },
  carTypeId: {
    type: ObjectId,
    required: true,
  },
  quantityTicket: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
  },
});

const Promotion = mongoose.model("Promotion", promotionSchema);

module.exports = Promotion;
