const User = require("../models/user.model")
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const authConfigs = require("../configs/auth.configs");
const { userTypes, userStatus } = require("../utils/constants");
const registerUser=async(req,res)=>{

    const userType=req.body.userType;
    var status=(userType===userTypes.CUSTOMER?userStatus.APPROVED:userStatus.PENDING)

       const newUser=new User({
            name:req.body.name,
            email:req.body.email,
            userId:req.body.userId,
            password:bcrypt.hashSync(req.body.password,10),
            userType:req.body.userType,
            userStatus:status
        })
    
     const savedUser=await newUser.save();
     res.status(201).send(savedUser);
   
}

const loginUser=async(req,res)=>{
    const user=await User.findOne({userId:req.body.userId});
    if(user==null){
        return res.status(400).send({message:"userId passed is invalid"});
    }

    

    const isValidPassword=bcrypt.hashSync(req.body.password,user.password);
    if(!isValidPassword){
        return res.status(400).send({message:"password passed is invalid"});
    }

    var token=jwt.sign({id:user.userId},authConfigs.SECRET_KEY,{expiresIn:1200});

    res.send({
        name:user.name,
        userId:user.userId,
        email:user.email,
        accessToken:token,
        userType:user.userType

    })

}

module.exports={
    registerUser,
    loginUser
}

