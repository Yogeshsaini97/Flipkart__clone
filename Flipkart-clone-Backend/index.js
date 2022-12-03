const express = require('express')
const app = express();
const cors=require("cors")  
const mongodbconnect=require("./Authentication/controller/mongodbconnect")
const router=require("./Authentication/routes/Routing")


mongodbconnect();

app.use(express.json());
app.use(cors());
app.use("/flipkart",router)



app.listen(5000,()=>
{
    console.log("server is running");
})
