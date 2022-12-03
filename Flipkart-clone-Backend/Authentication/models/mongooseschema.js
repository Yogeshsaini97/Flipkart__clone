const mongoose = require("mongoose");


const userschema=new mongoose.Schema({
    firstName:
    {
        type:String,
        required:true,
        trim:true,
        minLength:0,
        maxLength: 20
    },
    lastName:
    {
        type:String,
        required:true,
        trim:true,
        minLength:0,
        maxLength: 20
    },
    userName:
    {
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true,
        minLength:0,
        maxLength: 20
    },
    email:
    {
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        minLength:0,
        maxLength: 20
    },
    role:
    {
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    contactNumber:
    {
        type:Number,
        required:true
       
     
    },
    profilepicture:
    {
        type:String
    },
    password:
    {
        type:String,
        required:true
    }
    
 },{timestamps:true});   





const userRegistrationModel=mongoose.model("flipkart_users",userschema);

module.exports=userRegistrationModel;
