
const validateTicketRequestBody=(req,res,next)=>{
    if(!req.body.title || !req.body.description || !req.body.ticketPriority){
        return res.status(400).send({message:"please pass all the parameters"})
    }
    next();

}

module.exports={
    validateTicketRequestBody
}