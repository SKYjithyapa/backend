const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// buyer
// product
// quentity
// total
// date
// order status

const orderSchema = new Schema({
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "Buyer",
    require: true,
  },

  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },

  quentity: {
    type: Number,
    require: true,
  },

  total: {
    type: Number,
    require: true,
  },

  date: {
    type: String,
    require: true,
  },

  orderStatus: {
    type: String,
    require: true,
  },
});
