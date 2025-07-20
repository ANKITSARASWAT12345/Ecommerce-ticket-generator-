const mongoose=require('mongoose');
const { userTypes, userStatus } = require('../utils/constants');

const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        default:userTypes.CUSTOMER,
        enum:[userTypes.ADMIN,userTypes.CUSTOMER,userTypes.ENGINEER]
    },

    userStatus:{
      type:String,
      default:userStatus.APROVED,
      required:true,
      enum:[userStatus.APROVED,userStatus.PENDING,userStatus.REJECT]
    },
    
    createdAt:{
        type:Date,
        immutable:true,
        default:Date.now()
    },

})

const User=mongoose.model("User",userSchema);

module.exports=User;