const express = require("express");
const {check}=require("express-validator")

const router = express.Router();

const {
  requireRegister,
  requireLogin,
} = require("../controller/routingFunctions");

router.post("/login", requireLogin);

router.post("/signup",[
    check("firstName").notEmpty().withMessage("firstname is required"),
    check("lastName").notEmpty().withMessage("lastname is required"),
    check("email").notEmpty().withMessage("valid email is required"),
    check("password").isLength({min:6}).withMessage("password must be at least 6 chars long"),
], requireRegister);



module.exports = router;
