const { createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket } = require("../controllers/ticket.controller");
const { varifyJwt } = require("../middlewares/auth.middlewares");
const { validateTicketRequestBody } = require("../middlewares/ticket.middleware");

module.exports=(app)=>{
 app.post('/cs/api/v1/tickets',[varifyJwt,validateTicketRequestBody],createTicket)
  app.get('/cs/api/v1/tickets',[varifyJwt],getAllTickets);
  app.get('/cs/api/v1/tickets/:id',getTicketById);
  app.put('/cs/api/v1/tickets/:id',updateTicket);
  app.delete('/cs/api/v1/tickets/:id',deleteTicket);

}