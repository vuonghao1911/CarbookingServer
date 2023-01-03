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
      required: true,
    },
    quantity: {
      type: Number,
    },
    chair: [],
    locationBus: {
      type: String,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
