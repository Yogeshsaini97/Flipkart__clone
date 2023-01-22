var jwt = require('jsonwebtoken');



exports.requiresigninandusercheckingforuser=async (req,res,next)=>
{
    if(req.headers.authorization)
    {
        const token=req.headers.authorization;
        const userid=jwt.verify(token,"yogesh");

      console.log(userid)
      if(userid.role=="admin")
      {
        res.status(400).json({message:"admin role does,nt have authority "});
        return;
      }
        next();
        return;
    }
    return res.status(400).send({message:"please provide auth token in headers"})
   
}