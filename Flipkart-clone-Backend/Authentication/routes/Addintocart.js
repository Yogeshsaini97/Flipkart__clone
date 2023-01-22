const express=require("express")
const router=express.Router();
const mongoose = require("mongoose");
const slugify=require("slugify")
var jwt = require('jsonwebtoken');
const userRegistrationModel = require("../models/mongooseschema");
const {requiresigninandusercheckingforuser}=require("./Requiresigninmiddlewareforuser")
const multer=require("multer");
const shortid=require("shortid");
const path=require("path");




const cartSchema = new mongoose.Schema(
    {
      user:{type:mongoose.Schema.Types.ObjectId,ref:"flipkart_users",required:true},
      cartItems:[{
        product:{type:mongoose.Schema.Types.ObjectId,ref:"flipkart_Product",required:true},
        quantity:{type:Number,default:1},
        price:{type:Number,required:true}

      }]




    },
    { timestamps: true }
  );




  const cartModel=mongoose.model("flipkart_cart",cartSchema);

  
 router.post("/user/cart/add",requiresigninandusercheckingforuser, async(req,res)=>
  {
 
    const token=req.headers.authorization;
        const userid=jwt.verify(token,"yogesh");


        cartModel.findOne({user:userid.id}).then(result=>{
            if(result)
            {
                // console.log(result)
                const check=result.cartItems.find((data)=>data.product==req.body.cartItems.product)
                console.log(check)
               if(check!=undefined)
               {
                cartModel.findOneAndUpdate({user:userid.id,"cartItems.product":req.body.cartItems.product},{
                    "$set":{
                        "cartItems.$":{
                            ...req.body.cartItems,
                            
                            quantity:check.quantity+req.body.cartItems.quantity

                        }
                    }
                }).then((result)=>
                {
                    if(result)
                    {
                        // console.log(result);
                        res.status(200).json({message:"product updated by 1 successfully!!!",result:result})
                        return;
                    }
                })
                // console.log("hy")
                return;
               }
               else{
                cartModel.findOneAndUpdate({user:userid.id},{
                                        "$push":{
                                            "cartItems":req.body.cartItems
                                        }
                                    }).then((result)=>
                                    {
                                        if(result)
                                        {
                                            // console.log(result);
                                            res.status(200).json({message:"new product in card added successfulyy!!!",result:result})
                                            return;
                                        }
                                    })
                // console.log("by")
                                    return;
               }
                // if(req.body.cartItems.product)
                
                //                 // res.status(400).json({message:"already added"});
                //                 // return;
                //                 cartModel.findOneAndUpdate({user:userid.id},{
                //                     "$push":{
                //                         "cartItems":req.body.cartItems
                //                     }
                //                 }).then((result)=>
                //                 {
                //                     if(result)
                //                     {
                //                         console.log(result);
                //                         res.status(200).json({message:"cart updated"})
                //                     }
                //                 })
                // console.log(result)
            }


            else{

                const cart=new cartModel({
                    user:userid.id,
                    cartItems:[req.body.cartItems]
                })
            
                cart.save().then((result)=>
                {
                    // console.log(result);
                    res.status(200).json({result});
                    return;
                }).catch((err)=>
                {
                    // console.log(err);
                    res.status(err).json({err})
                    return;
                })
              return;
               
             
            }


  
return;

        })


        
//         if(cartModel.findOne({user:userid.id}))
//         {
//             res.status(400).json({message:"already added"});
        
//   return;

//         }
//         else{
//             const cart=new cartModel({
//                 user:userid.id,
//                 cartItems:req.body.cartItems
//             })
        
//             cart.save().then((result)=>
//             {
//                 console.log(result);
//                 res.status(200).json({result});
//                 return;
//             }).catch((err)=>
//             {
//                 console.log(err);
//                 res.status(err).json({err})
//                 return;
//             })

//         }


      
    
        
 
  });

 






module.exports=router