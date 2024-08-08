const User = require("../models/user.model")


const getAllUsers=async(req,res)=>{
    try{
   const users=await User.find({})
   return res.status(201).send(users);
    }

    catch(e){
        return res.status(500).send({message:e.message||"internal server error"})
    }
}

const getUserById=async(req,res)=>{
    try{
        const users=await User.findOne({userId:req.params.id}) 
        return res.status(201).send(users);
         }
     
         catch(e){
             return res.status(500).send({message:e.message||"internal server error"})
         }
}

const updateUser=async(req,res)=>{
 try{
    const savedUser=await User.findOne({userId:req.params.id});
    if(req.body.status){
        savedUser.userStatus=req.body.status
    }
    const updatedUsers=await savedUser.save();
    return res.status(200).send(updatedUsers)
 }
 catch(e){
    return res.status(500).send({message:"fuck server error"})
 }

}

const deleteUser=(req,res)=>{

}

module.exports={
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}