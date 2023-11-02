require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const BuyerModel = require("./models/buyer");
const bcrypt = require("bcrypt");
const BuyerRoutes = require("./routes/buyer");
app.use(express.json());
app.use("/api/v1/",BuyerRoutes)


app.get("/", (req, res, next) => {
  try {
    //  res.send("Hellofdasfasdfdas World  fsafddas!");
    // throw new Error("BROKEN")
    throw createHttpError(404, "BROKefs");
  } catch (error) {
    next(error);
  }
});

app.use(express.json());
app.use((err, req, res, next) => {
  if (createHttpError.isHttpError(err)) {
    res.status(err.status).send({ message: err.message });
  } else {
    res.status(500).send({ message: err.message });
  }

  //error unkonwn
  res.status(500).send({ message: "Error Unkonwn" });
});



//    app.post("/api/v1/buyers",);

module.exports = app; 