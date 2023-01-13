const express = require("express");
const userRegistrationModel = require("../models/mongooseschema");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');



exports.adminrequireRegister = async function (req, res, next) {
    let data = await userRegistrationModel.findOne({ email: req.body.email });
  
    if (!data) {
      bcrypt.genSalt(10, async function (err, salt) {
        bcrypt.hash(req.body.password, salt, async function (err, hash) {
          req.body.password = hash;
          console.log(req.body.password);
  
          let _user = await new userRegistrationModel(req.body);
          let userdata = await _user.save().then(() => {
            console.log("hogya save");
          });
  
          res.status(200).json({ message: "admin created successfully!!" });
          console.log(req.body);
        });
      });
      return;
    }
  
    res.status(400).json({ message: "admin already registered" });
    console.log("admin already resgisterd");
  
    return;
  };
  
  exports.admiinrequireLogin = async function (req, res, next) {
    let data = await userRegistrationModel.findOne({ email: req.body.email });
    console.log(data);
    if (data) {
      bcrypt.compare(req.body.password, data.password, function (err, result) {
        if (result) {
          var token = jwt.sign({ id: data._id }, 'yogesh',{expiresIn:"1h"});
          console.log("token"+ token)
          res.status(200).json({token:token, message: "Perfect" });
          return;
        } else {
          res.status(400).json({ message: "wrong password" });
          return;
        }
      });
    } else {
      res
        .status(400)
        .json({ message: "admin doesn,t exist! please create new user" });
    }
  
    return;
  };
  
  exports.requireProfile= (req,res)=>
  {
      const token=req.headers.authorization;
      console.log(token)
      const id=jwt.verify(token,"yogesh")
      res.send(id);
  
  } 
  

