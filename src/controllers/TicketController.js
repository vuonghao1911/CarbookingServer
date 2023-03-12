const ticketService = require("../services/TicketService");
const ObjectId = require("mongoose").Types.ObjectId;
var mongoose = require("mongoose");
const Ticket = require("../modal/Ticket");
const Customer = require("../modal/Customer");
const VehicleRoute = require("../modal/VehicleRoute");

const moment = require("moment");

const Route = require("../modal/Route");
const PromotionResults = require("../modal/PromotionResult");

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
    const code = await Ticket.countDocuments();

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
          discountAmount,
          code
        );
        return res.json(saveticket);
      } else {
        const customerFind = await Customer.findOne({
          phoneNumber: phoneNumber,
        });

        const saveticket = await ticketService.saveTicket(
          idPromotion,
          vehicleRouteId,
          customerFind._id,
          quantity,
          chair,
          locationBus,
          phoneNumber,
          discountAmount,
          code
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
      const listTicket = await ticketService.getTicket();
      var listTicketResult = [];
      for (const ticket of listTicket) {
        // get routeId
        const { _id, intendTime } = await Route.findOne({
          "departure._id": ObjectId(ticket.departure._id),
          "destination._id": ObjectId(ticket.destination._id),
        });

        console.log("id", _id);
        const { price } = await ticketService.checkPriceTicket(
          ticket.startDate,
          _id
        );

        listTicketResult.push({
          ...ticket,
          price: price,
          intendTime: intendTime,
        });
      }

      res.json(listTicketResult);
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
        const { _id, intendTime } = await Route.findOne({
          "departure._id": ObjectId(ticket.departure._id),
          "destination._id": ObjectId(ticket.destination._id),
        });

        console.log("id", _id);
        const { price } = await ticketService.checkPriceTicket(
          ticket.startDate,
          _id
        );

        listTicketResult.push({
          ...ticket,
          price: price,
          intendTime: intendTime,
        });
      }

      res.json(listTicketResult);
    } catch (error) {
      next(error);
    }
  }

  async CanceledTicket(req, res, next) {
    const { ticketId } = req.params;

    try {
      // get idPromotion
      const promotionresults = await PromotionResults.findOne({
        ticketId: ticketId,
      });

      const { chair, vehicleRouteId } = await Ticket.findById(ticketId);

      if (vehicleRouteId) {
        if (promotionresults) {
          await ticketService.cancleTicket(
            ticketId,
            promotionresults.promotionId,
            chair,
            vehicleRouteId,
            promotionresults.discountAmount
          );
        } else {
          await ticketService.cancleTicket(
            ticketId,
            null,
            chair,
            vehicleRouteId,
            null
          );
        }

        res.json({ cancleTicket: true });
      } else {
        res.json({ cancleTicket: false });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TicketController();
