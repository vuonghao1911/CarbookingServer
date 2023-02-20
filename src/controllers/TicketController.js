const ticketService = require("../services/TicketService");
const ObjectId = require("mongoose").Types.ObjectId;
const Ticket = require("../modal/Ticket");
const Customer = require("../modal/Customer");
const VehicleRoute = require("../modal/VehicleRoute");
const Route = require("../modal/Route");
class TicketController {
  async bookingTicket(req, res, next) {
    const {
      vehicleRouteId,
      customer,
      quantity,
      chair,
      locationBus,
      phoneNumber,
      discountAmount,
      idPromotion,
    } = req.body;
    console.log(chair);
    try {
      const Arrayplace = await Promise.all(
        chair.map((e) => {
          const name = e.seats;
          const matchedCount = VehicleRoute.updateOne(
            { _id: ObjectId(vehicleRouteId) },
            {
              $set: { ["chair.$[elem].status"]: true },
            },
            { arrayFilters: [{ "elem.seats": name }] }
          );
          return matchedCount;
        })
      );
      const checkCustomer = await Customer.count({ phoneNumber: phoneNumber });
      if (checkCustomer === 0) {
        const customerAdd = new Customer({
          firstName: customer.firstNameCustomer,
          lastName: customer.lastNameCustomer,
          phoneNumber: phoneNumber,
        });
        const newCustomer = await customerAdd.save();
        const saveticket = await ticketService.saveTicket(
          idPromotion,
          vehicleRouteId,
          newCustomer._id,
          quantity,
          chair,
          locationBus,
          phoneNumber,
          discountAmount
        );
        return res.json(saveticket);
      } else {
        const customerFind = await Customer.findOne({
          phoneNumber: phoneNumber,
        });
        console.log(customerFind._id);
        const saveticket = await ticketService.saveTicket(
          idPromotion,
          vehicleRouteId,
          customerFind._id,
          quantity,
          chair,
          locationBus,
          phoneNumber,
          discountAmount
        );
        return res.json(saveticket);
      }
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
  async getTicket(req, res, next) {
    try {
      const customer = await Ticket.aggregate([
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $unwind: "$customer",
        },
        {
          $lookup: {
            from: "vehicleroutes",
            localField: "vehicleRouteId",
            foreignField: "_id",
            as: "vehicleroute",
          },
        },
        {
          $unwind: "$vehicleroute",
        },
        {
          $lookup: {
            from: "places",
            localField: "vehicleroute.departure",
            foreignField: "_id",
            as: "departure",
          },
        },
        {
          $unwind: "$departure",
        },
        {
          $lookup: {
            from: "places",
            localField: "vehicleroute.destination",
            foreignField: "_id",
            as: "destination",
          },
        },
        {
          $unwind: "$destination",
        },
        {
          $lookup: {
            from: "cars",
            localField: "vehicleroute.carId",
            foreignField: "_id",
            as: "car",
          },
        },
        {
          $unwind: "$car",
        },
        {
          $project: {
            _id: "$_id",
            firstName: "$customer.firstName",
            lastName: "$customer.lastName",
            phoneNumber: "$customer.phoneNumber",
            departure: "$departure.name",
            destination: "$destination.name",
            licensePlates: "$car.licensePlates",
            startDate: "$vehicleroute.startDate",
            locaDeparture: "$locationBus.locaDeparture",
            locaDestination: "$locationBus.locaDestination",
            chair: "$chair",
            createdAt: "$createdAt",
            updatedAt: "$updatedAt",
          },
        },
      ]);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }

  async getAllTicketByUserId(req, res, next) {
    const { userId } = req.params;
    console.log(userId);

    try {
      const listTicket = await ticketService.getTicketByUserId(userId);
      var listTicketResult = [];
      for (const ticket of listTicket) {
        // get routeId
        const { _id } = await Route.findOne({
          "place._id": {
            $all: [
              ObjectId(ticket.departure._id),
              ObjectId(ticket.destination._id),
            ],
          },
        });
        const { price } = await ticketService.checkPriceTicket(
          ticket.startDate,
          _id
        );

        listTicketResult.push({ ...ticket, price: price });
      }

      res.json(listTicketResult);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TicketController();
