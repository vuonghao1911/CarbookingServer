const ticketService = require("../services/TicketService");
const ObjectId = require("mongoose").Types.ObjectId;
var mongoose = require('mongoose');
const Ticket = require("../modal/Ticket");
const Customer = require("../modal/Customer");
const VehicleRoute = require("../modal/VehicleRoute");
const moment = require('moment');
class TicketController {
  async bookingTicket(req, res, next) {
    const {
      vehicleRouteId,
      customer,
      quantity,
      chair,
      locationBus,
      phoneNumber,
    } = req.body;
    console.log(chair);
    try {
      const Arrayplace = await Promise.all(
        chair.map((e) => {
          const name = e;
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
        const customerAdd = new Customer({ firstName: customer.firstNameCustomer, lastName: customer.lastNameCustomer, phoneNumber: phoneNumber });
        const newCustomer = await customerAdd.save();
        const saveticket = await ticketService.saveTicket(new Ticket(
          {
            vehicleRouteId: vehicleRouteId,
            customerId: newCustomer._id,
            quantity: quantity,
            chair: chair,
            locationBus: locationBus,
            phoneNumber: phoneNumber
          }));
        return res.json(saveticket);
      }
      else {
        const customerFind = await Customer.find({ phoneNumber: phoneNumber });
        const saveticket = await ticketService.saveTicket(new Ticket(
          {
            vehicleRouteId: vehicleRouteId,
            customerId: customerFind._id,
            quantity: quantity,
            chair: chair,
            locationBus: locationBus,
            phoneNumber: phoneNumber
          }));
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
    let listTicket = new Array();
    try {
      const tickets = await Ticket.aggregate([
        {
          $lookup:
          {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer"
          },
        },
        {
          "$unwind": "$customer",
        },
        {
          $lookup:
          {
            from: "vehicleroutes",
            localField: "vehicleRouteId",
            foreignField: "_id",
            as: "vehicleroute"
          },
        },
        {
          "$unwind": "$vehicleroute",
        },
        {
          $lookup:
          {
            from: "places",
            localField: "vehicleroute.departure",
            foreignField: "_id",
            as: "departure"
          },
        },
        {
          "$unwind": "$departure",
        },
        {
          $lookup:
          {
            from: "places",
            localField: "vehicleroute.destination",
            foreignField: "_id",
            as: "destination"
          },
        },
        {
          "$unwind": "$destination",
        },
        {
          $lookup:
          {
            from: "cars",
            localField: "vehicleroute.carId",
            foreignField: "_id",
            as: "car"
          },
        },
        {
          "$unwind": "$car",
        },
        {
          $lookup:
          {
            from: "routes",
            localField: "car.typeCarId",
            foreignField: "carTypeId",
            as: "route"
          },
        },
        {
          "$unwind": "$route"
        },
        {
          $lookup:
          {
            from: "prices",
            localField: "route._id",
            foreignField: "routeId",
            as: "price"
          },
        },
        {
          "$unwind": "$price"
        },
        {
          "$project": {
            "_id": "$_id",
            "firstName": "$customer.firstName",
            "lastName": "$customer.lastName",
            "phoneNumber": "$customer.phoneNumber",
            "departure": "$departure.name",
            "destination": "$destination.name",
            "licensePlates": "$car.licensePlates",
            "startDate": "$vehicleroute.startDate",
            "locaDeparture": "$locationBus.locaDeparture",
            "locaDestination": "$locationBus.locaDestination",
            "chair": "$chair",
            "price": "$price",
            "createdAt": "$createdAt",
            "updatedAt": "$updatedAt"
          },
        },
      ]);
      tickets.map(ticket => {
        if(new Date(ticket.startDate) > new Date(ticket.price.startDate) && new Date(ticket.startDate) < new Date(ticket.price.endDate))
          listTicket.push(ticket);
      })
      res.json(listTicket);
} catch (error) {
  next(error);
}
  }

}

module.exports = new TicketController();
