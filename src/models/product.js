// name
// image
// price
// discription
// company

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    require: true,
  },

  price: {
    type: Number,
    require: true,
  },

  discription: {
    type: String,
    require: true,
  },

  company: {
    type: String,
    require: true,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
