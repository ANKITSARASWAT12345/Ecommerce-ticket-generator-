const { query } = require("express");
const Ticket = require("../models/ticket.models");
const User = require("../models/user.model");
const { ticketStatus, userTypes, userStatus } = require("../utils/constants");


const createTicket=async(req,res)=>{

    const {title,ticketPriority,description}=req.body;

    const allocatedEngineer= await User.findOne({
        userType:userTypes.ENGINEER,
        // userStatus:userStatus.APPROVED
    })
    
    const  newTicket= new Ticket({
        title,
        ticketPriority,
        description,
        status:ticketStatus.OPEN,
        requestor:req.id,
        assignee:allocatedEngineer._id
    })

    const savedTicket=await newTicket.save();
    res.status(201).send(savedTicket)


}
const getAllTickets=async(req,res)=>{
    console.log(req.query);

   var condition={};
   const {page,limit}=req.query;
   if(req.query.maxPriority){
    condition.ticketPriority={ $lte: req.query.maxPriority }
   }
   if(req.userRole==userTypes.CUSTOMER){
           condition.requestor=req.id;
   }
   else if(req.userRole==userTypes.ENGINEER){
    condition.assignee=req.id;
   }
   const skipValue=page*limit;
   console.log(condition);

   const tickets=await Ticket.find(condition).populate('assignee').populate('requestor')
        .skip(skipValue).limit(limit)
        .sort({ticketPriority:"asc"});
   return res.status(200).send(tickets);


}

const getTicketById=(req,res)=>{
       
}

const updateTicket=(req,res)=>{

}

const deleteTicket=(req,res)=>{

}

module.exports={
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicket,
    deleteTicket
}