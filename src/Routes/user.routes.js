const { getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/user.controllers");
const { varifyJwt, varifyAdmin, varifyAdminOrSelf } = require("../middlewares/auth.middlewares");


module.exports=function(app){
    app.get("/cs/api/v1/users",[varifyJwt,varifyAdmin],getAllUsers);
    app.get("/cs/api/v1/users/:id",[varifyJwt,varifyAdminOrSelf],getUserById);
    app.put("/cs/api/v1/users/:id",[varifyJwt,varifyAdminOrSelf],updateUser);
    app.delete("/cs/api/v1/users/:id",[varifyJwt,varifyAdminOrSelf],deleteUser);
}