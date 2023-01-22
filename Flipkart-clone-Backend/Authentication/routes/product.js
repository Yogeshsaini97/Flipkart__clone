const express=require("express")
const router=express.Router();
const mongoose = require("mongoose");
const slugify=require("slugify")
var jwt = require('jsonwebtoken');
const userRegistrationModel = require("../models/mongooseschema");
const {requiresigninandusercheckingforadmin}=require("./Requiresigninmiddlewareforadmin")
const multer=require("multer");
const shortid=require("shortid");
const path=require("path");




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
      price:{type:Number,
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
        type:mongoose.Schema.Types.ObjectId,ref:"flipkart_users",
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

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname),"/uploads"))
    },
    filename: function (req, file, cb) {

      cb(null, shortid.generate() + "-" + file.originalname )
    }
  })


  const upload=multer({storage})
  




 router.post("/Product/create",requiresigninandusercheckingforadmin,upload.array("productPicture"), async(req,res)=>
 {
 
    //  res.status(200).json({file:req.files,body:req.body})
    const { name ,price, description,category,createdBy}=req.body
    let productPictures=[];
    const token=req.headers.authorization;
    const userid=jwt.verify(token,"yogesh");

  console.log(userid)
    if(req.files.length>0)
    {
        productPictures= req.files.map(file=>{
        return {img:file.filename}
    })
    }
    const product=await new productModel({
        name:name,
        slug:slugify(name),
        price:price,
        productPictures:productPictures,
        category:category,
        description:description,
        createdBy:userid.id
    })
   await product.save().then(()=>
    {
        console.log("hogya save")
        res.status(201).json({product})
    }).catch((err)=>
    {
        console.log("error in save")
        res.status(400).json({err})
    })

 
 });

 






module.exports=router