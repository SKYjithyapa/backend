const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // If you want to ensure email uniqueness
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number, // Change 'int' to 'Number'
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
