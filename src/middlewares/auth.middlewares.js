const authConfigs = require("../configs/auth.configs");
const User = require("../models/user.model")
const jwt=require('jsonwebtoken');
const { userTypes } = require("../utils/constants");

const validateSignIn=(req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).send({message:"userId is not present"})
    }

    if(!req.body.password){
        return res.status(400).send({message:"password is not present"})
    }
    next();
}

const validateSignup=async(req,res,next)=>{
    if(!req.body.name){
        return res.status(400).send({message:"name is not present"})
    }
    
    if(!req.body.email){
        return res.status(400).send({message:"email is not present"})
    }

    if(!req.body.userId){
        return res.status(400).send({message:"userId is not present"})
    }

    if(!req.body.password){
        return res.status(400).send({message:"password is not present"})
    }

    var users=await User.find({
        $or:[
            {userId:req.body.userId},
            {email:req.body.email}
        ]
    })

    if(users && users.length){
        return res.status(400).send({message:"user already exist"})
    }
    next();
}

const varifyJwt=async(req,res,next)=>{
    let token=req.headers['access-token'];
    if(!token){
        return res.status(403).send({message:"token is not provided"});
    }
  jwt.verify(token,authConfigs.SECRET_KEY,async(err,payload)=>{
    if(err){
        return res.status(403).send("invalid token paseed!!"); 
    }

    const userId=payload.id;
    const user=await User.findOne({userId:userId});
    req.userId=userId;
    req.id=user._id;
    req.userRole=user.userType;

    next(); 
 


  })
  

    
}

const varifyAdmin=async(req,res,next)=>{
   
   if(req.userRole===userTypes.ADMIN){
       next();
   }else{
   return res.status(403).send({message:"only admin can access this page"})
}
}

const varifyAdminOrSelf=(req,res,next)=>{
    const userIdAsked=req.params.id.toLowerCase();
    const loggedInUser=req.userId;
    if(req.userRole===userTypes.ADMIN||userIdAsked===loggedInUser){
        next()
        return;
    }

    return res.status(403).send({message:"you are not authorized to access this page"})

}



module.exports={
    validateSignup,
    validateSignIn,
    varifyJwt,
    varifyAdmin,
    varifyAdminOrSelf
}