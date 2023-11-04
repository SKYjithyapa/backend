// name
// email
// password
// phone

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buyerSchema = new Schema({
  name: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },

  phone: {
    type: Number, // Change 'int' to 'Number'
    required: true,
  },

  token:{
    type : String,
    require : false,

  }



  
});

const Buyer = mongoose.model("Buyer", buyerSchema);

module.exports = Buyer; 
