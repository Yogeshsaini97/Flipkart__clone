const mongoose = require("mongoose");

const mongoDB = "mongodb://localhost:27017/flipkart";


const mongodbconnect=()=>mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>
{
    console.log("connected to mongodb compass")
}).catch(()=>
{
    console.log("error occured in mongoose.connect function")
});


module.exports=mongodbconnect;




