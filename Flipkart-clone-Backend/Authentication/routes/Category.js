const express=require("express")
const router=express.Router();
const mongoose = require("mongoose");
const slugify=require("slugify")
var jwt = require('jsonwebtoken');
const userRegistrationModel = require("../models/mongooseschema");
const {requiresigninandusercheckingforadmin}=require("./Requiresigninmiddlewareforadmin")

const filtercagtegories=(cat,parentId=null)=>
{
const categoryList=[];
let categoryji;
if(parentId==null)
{
    categoryji=cat.filter(cat=>cat.parentId==undefined);

}

else{
    categoryji=cat.filter(cat=>cat.parentId==parentId);
}

for(let loop of categoryji)
{
    categoryList.push({
        _id:loop._id,
        name:loop.name,
        slug:loop.slug,
        children:filtercagtegories(cat,loop._id)
    })
    
}


return categoryList;


}


const CategorySchema = new mongoose.Schema(
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
      parentId: {
     type:String
     
      }
    },
    { timestamps: true }
  );
  

  
 const categorymodel=mongoose.model("flipkart_categories",CategorySchema);


//  const requiresignin=async (req,res,next)=>
// {
//     if(req.headers.authorization)
//     {
//         const token=req.headers.authorization;
//         const userid=jwt.verify(token,"yogesh");

//       console.log(userid)
//       if(userid.role=="user")
//       {
//         res.status(400).json({message:"user role does,nt have authority to create categopries"});
//         return;
//       }
//         next();
//         return;
//     }
//     return res.status(400).send({message:"please provide auth token in headers"})
   
// }





router.post("/category/create",requiresigninandusercheckingforadmin,(req,res)=>
{

    const categoryobj={
        name:req.body.name,
        slug:slugify(req.body.name)

    }

    if(req.body.parentId)
    {
        categoryobj.parentId=req.body.parentId;
    }

    console.log(categoryobj)
    // res.send(categoryobj);

    const cat=new categorymodel(categoryobj);
    cat.save().then((result)=>
    {
        res.status(200).json({message:"category added successfully",result:result})
    }).catch((err)=>
    {
      res.status(400).json({error:err})
    })

});




router.get("/category/getallcategories",requiresigninandusercheckingforadmin,async (req,res)=>
{

   let data= await categorymodel.find();
   
   if(data.length==0)
   {
   
    res.status(200).json({message:"there are no categories in database"})
    return;
   }
   const filteredcategories=filtercagtegories(data);
   
   res.status(200).json({message:"all categories",categories:filteredcategories});
   return;

});


module.exports=router;