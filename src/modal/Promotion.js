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
  },
  routeId: {
    type: ObjectId,
    required: true,
  },
  quantityTicket: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
  },

  purchaseAmount: {
    type: Number,
  },
  moneyReduced: {
    type: Number,
  },
  maximumDiscount: {
    type: Number,
  },
  budget: {
    type: Number,
  },
  promotionType: {
    type: ObjectId,
  },
});

const Promotion = mongoose.model("Promotion", promotionSchema);

module.exports = Promotion;
