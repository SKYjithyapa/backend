require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const createHttpError = require("http-errors");

const BuyerRoutes = require("./routes/buyer");
const CompanyRoutes = require("./routes/company");
const ProductController = require("./routes/products")
app.use(express.json());
app.use("/api/v1/buyers",BuyerRoutes);
app.use("/api/v1/companies",CompanyRoutes);

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