const Product = require("../models/product.model");


const createProducts=(req,res)=>{
    if(!req.body){
       return res.status(400).send({message:'request can not be empty'})
    }
 
    const id=Math.random().toString(36).substring(2,7);
 
      const newProduct=new Product({
       id:id,
       name:req.body.name, 
       description:req.body.description,
       category:req.body.category,
       price:req.body.price,
     
      })
 
      newProduct.save()
      .then(data=>{
       res.send(data)
      })
   }

const getAllProducts=(req,res)=>{
    const products=Product.find({})
    .then(data=>{
      res.send(data);
    })
    .catch((err)=>{
      res.send({message:err|| 'product not find'})
    })
  }

const getProductById=(req,res)=>{
    const id=req.params.id;
    Product.findById(id)
    .then(data=>{
        if(!data){
            return res.status(400).send({message:"product id is invalid"})
        }
        res.send(data);
    })
    .catch(err=>{
        return res.status(500).send({message:err||'internal server error'})
    })
}


const changeInProduct=(req,res)=>{
    const productData=req.body;
    Product.findByIdAndUpdate(req.params.id,productData,{new:true})
    .then((data)=>{
      if(!data){
        return res.status(404).send({message:`product not find with id:${req.params.id}`})
      }
      res.send(data);
    })
    .catch(err=>{
      return res.status(500).send({message:'internal server error'});
    })
  }


  const deleteProductById=(req,res)=>{
    Product.findByIdAndDelete(req.params.id)
    .then(data=>{
      if(!data){
        return res.send({message:"product not find with given id"})
      }
      return res.send({message:"Product deleted successfully"})
    })
  }

  module.exports={
    deleteProductById,changeInProduct,getAllProducts,createProducts,getProductById
  }