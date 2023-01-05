const ticketService = require("../services/TicketService");
const ObjectId = require("mongoose").Types.ObjectId;
const Ticket = require("../modal/Ticket");
const VehicleRoute = require("../modal/VehicleRoute");
class TicketController {
  async bookingTicket(req, res, next) {
    const {
      vehicleRouteId,
      customerId,
      quantity,
      chair,
      locationBus,
      phoneNumber,
    } = req.body;
    //console.log(number);
    try {
      const ticket = new Ticket({
        vehicleRouteId: vehicleRouteId,
        customerId: customerId,
        quantity: quantity,
        chair: chair,
        locationBus: locationBus,
        phoneNumber: phoneNumber,
      });

      const Arrayplace = await Promise.all(
        chair.map((e) => {
          const _id = e.id;
          console.log(_id);
          const matchedCount = VehicleRoute.updateOne(
            { _id: ObjectId(vehicleRouteId) },
            {
              $set: { ["chair.$[elem].status"]: true },
            },
            { arrayFilters: [{ "elem._id": ObjectId(_id) }] }
          );
          return matchedCount;
        })
      );
      console.log(Arrayplace);
      const saveticket = await ticketService.saveTicket(ticket);
      console.log(saveticket);
      return res.json(saveticket);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getCustomerById(req, res, next) {
    const { userId } = req.params;
    console.log(userId);

    try {
      const customer = await Customer.findById(userId);

      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TicketController();
