const router = require("express").Router();
const ticketController = require("../controllers/TicketController");

router.post("/booking", ticketController.bookingTicket);

module.exports = router;
