const router = require("express").Router();
const ticketController = require("../controllers/TicketController");

router.post("/booking", ticketController.bookingTicket);
router.get("/all/getTicket", ticketController.getTicket);

module.exports = router;
