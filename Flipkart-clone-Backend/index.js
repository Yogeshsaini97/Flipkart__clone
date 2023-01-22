const express = require("express");
const app = express();
const cors = require("cors");
const mongodbconnect = require("./Authentication/controller/mongodbconnect");
const userRouter = require("./Authentication/routes/Routing");
const adminRouter = require("./Authentication/routes/adminRouting");
const category=require("./Authentication/routes/Category")
const product=require("./Authentication/routes/Product")
const cart=require("./Authentication/routes/Addintocart")
const path=require("path");

const mongoose = require("mongoose");

mongodbconnect();




app.use(express.json());
app.use("/public",express.static(path.join(__dirname,"Authentication/uploads")))

app.use(cors());

app.use("/flipkart/user", userRouter);
app.use("/flipkart/admin", adminRouter);
app.use("/flipkart", category);
app.use("/flipkart", product);
app.use("/flipkart", cart);


app.listen(5000, () => {
  console.log("server is running");
});
