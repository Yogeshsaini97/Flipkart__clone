const express=require("express")
const router=express.Router();
const mongoose = require("mongoose");
const slugify=require("slugify")
var jwt = require('jsonwebtoken');
const userRegistrationModel = require("../models/mongooseschema");
const requiresignin=require("./Requiresignin")



const ProductSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true
      },
      slug: {
        type: String,
        required: true,
        unique: true
      },
      Price:{type:Number,
        required: true},
    description:{
            type: String,
        required: true,
        trim:true



        },
    offer:{type:Number},
    productPictures:[
    {
        img:
        {
            type:String
        }



    }




],
reviews:[
    {
        userId:mongoose.Schema.Types.ObjectId,ref:"flipkart_users",
        review:String
    }
],
createdBy:{
    type:mongoose.Schema.Types.ObjectId, ref:"flipkart_users"
},
updateAt:Date,
category:{type:mongoose.Schema.Types.ObjectId,ref:"flipkart_categories"}








    },
    { timestamps: true }
  );
  

  
 const productModel=mongoose.model("flipkart_Product",ProductSchema);



 router.post("/Product/create",requiresignin,(req,res)=>
 {
 
     res.status(200).json({message:"hy baby"})
 
 });
 






module.exports=router;