const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const ticketSchema = new Schema(
  {
    vehicleRouteId: {
      type: ObjectId,
      required: true,
    },
    customerId: {
      type: ObjectId,
    },
    quantity: {
      type: Number,
    },
    chair: [],
    locationBus: {},
    status: {
      type: Boolean,
      default: true,
    },
    phoneNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
