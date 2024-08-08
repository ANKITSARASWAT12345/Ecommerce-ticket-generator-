

//post a new product

const { createProducts, getAllProducts, getProductById, changeInProduct, deleteProductById } = require("../controllers/product.controllers");
const { varifyJwt, varifyAdmin } = require("../middlewares/auth.middlewares");
const Product = require("../models/product.model");


module.exports=(app)=>{

  app.post('/products',[varifyJwt,varifyAdmin],createProducts)

  app.get('/products',[varifyJwt],getAllProducts)

  app.get('/products/:id',[varifyJwt],getProductById)

  app.put("/products/:id",[varifyJwt,varifyAdmin],changeInProduct)

  app.delete('/products/:id',[varifyJwt,varifyAdmin],deleteProductById)
  
 
}
