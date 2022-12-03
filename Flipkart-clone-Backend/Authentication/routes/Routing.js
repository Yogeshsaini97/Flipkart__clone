const express=require("express")
const router=express.Router();
const userRegistrationModel=require("../models/mongooseschema")

router.get('/', function (req, res,next) {
  
    res.status(200).json(
      {
          message:"hello"
      }
    )

  })
  
  
  
router.post('/data',async function (req, res,next) {
    req.body.password="ramrahim@1";
    console.log(req.body)
    //   let data=await new userRegistrationModel(req.body); 
    //   data.save();
    //   res.send(req.body);
    //   console.log(req.body);

    // console.log(data)
      
      })



module.exports=router;