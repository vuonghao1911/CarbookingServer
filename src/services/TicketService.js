const Ticket = require("../modal/Ticket");

const TicketService = {
  saveTicket: async (ticket) => {
    return await ticket.save();
  },
  getTicketById: async (_id) => {
    return await Ticket.findById(_id);
  },
};

module.exports = TicketService;
