const express = require("express");
const { adminrequireRegister, admiinrequireLogin } = require("../controller/adminroutingfunctions");

const router = express.Router();



router.post("/login",  admiinrequireLogin);

router.post("/signup", adminrequireRegister);


module.exports = router;
