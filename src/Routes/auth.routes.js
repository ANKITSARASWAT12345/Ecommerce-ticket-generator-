const { registerUser, loginUser } = require("../controllers/auth.controllers");
const { validateSignup, validateSignIn } = require("../middlewares/auth.middlewares");


module.exports=(app)=>{
    app.post("/cs/api/v1/auth/signup",[validateSignup],registerUser);
    app.post("/cs/api/v1/auth/signin",[validateSignIn],loginUser);
    
}