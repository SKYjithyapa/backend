require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const BuyerModel = require("./models/buyer");
const bcrypt = require("bcrypt");


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



app.post("/api/v1/buyers", async (req, res, next) => {
  console.log(req.body);
  
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const phone = req.body.phone;

  try {
    if (!email || !password || !name || !phone) {
      throw createHttpError(400, "Mising required parameters");
    }

    const isUserAvailable = await BuyerModel.findOne({ email: email }).exec();

    if (isUserAvailable) {
      throw createHttpError(400, "user already exsist");
    }

    const hashedPassword =await bcrypt.hash(password,10);

    const buyer = new BuyerModel({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone
      })

      const result = await buyer.save();
      res.status(201).send(result);



  } catch (error) {

    next(error)

  }
});

mongoose
  .connect(process.env.MONGO_URL, {})
  .then((result) => {
    console.log("db connected");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
