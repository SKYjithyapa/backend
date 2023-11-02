const BuyerModel = require("../models/buyer");
const createHttpError = require("http-errors"); // You need to import createHttpError

const bcrypt = require("bcrypt"); // You need to import bcrypt

exports.register = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const phone = req.body.phone;

  try {
    if (!email || !password || !name || !phone) {
      throw createHttpError(400, "Missing required parameters");
    }

    const isUserAvailable = await BuyerModel.findOne({ email: email });

    if (isUserAvailable) {
      throw createHttpError(400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const buyer = new BuyerModel({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
    });

    const result = await buyer.save();
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};
