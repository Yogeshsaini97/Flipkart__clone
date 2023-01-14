const express=require("express")
const router=express.Router();
const mongoose = require("mongoose");
const slugify=require("slugify")




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
     type:Number
     
      }
    },
    { timestamps: true }
  );
  

  
 const categorymodel=mongoose.model("flipkart_categories",CategorySchema);






router.post("/category/create",(req,res)=>
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

const requiresignin=(req,res,next)=>
{
    const token=req.headers.authorization.split(" ")[1];
    const user=jwt.verify(token,)
}



router.get("/category/getallcategories",async (req,res)=>
{

   let data= await categorymodel.find();
   if(data.length==0)
   {
   
    res.status(200).json({message:"there are no categories in database"})
    return;
   }

   
   res.status(200).json({message:"all categories",categories:data});
   return;

});


module.exports=router;