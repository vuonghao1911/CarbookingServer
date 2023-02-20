const router = require("express").Router();
const ticketController = require("../controllers/TicketController");

router.post("/booking", ticketController.bookingTicket);
router.get("/all/getTicket", ticketController.getTicket);
router.get("/:userId", ticketController.getAllTicketByUserId);

module.exports = router;
