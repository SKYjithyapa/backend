const BuyerModel = require("../models/buyer");
const createHttpError = require("http-errors"); // You need to import createHttpError

const bcrypt = require("bcrypt"); // You need to import bcrypt
const jwt =require('jsonwebtoken');


exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    // Check if email and password are provided
    if (!email || !password) {
      throw createHttpError(400, 'Missing required parameters');
    }

    // Find the buyer with the provided email
    const buyer = await BuyerModel.findOne({ email: email }).exec();

    // Check if the buyer exists
    if (!buyer) {
      throw createHttpError(400, 'User does not exist');
    }

    // Now you can compare the provided password with the stored password hash in the buyer model
    // For password comparison, you would typically use a password hashing library like bcrypt

    // Example using bcrypt (make sure to import and install bcrypt):
    const bcrypt = require('bcrypt');

    const passwordMatch = await bcrypt.compare(password, buyer.password);

    if (!passwordMatch) {
      throw createHttpError(401, 'Invalid password');
    }


    const user = await BuyerModel.findOne({email : email}).exec();


      const token = jwt.sign({
        user_id : user._id,
        email :user.email,
      },
      
      process.env.JWT_TOKEN_KEY,{
        expiresIn :   "4h",
      })

      user.token = token;
      const result = await user.save();
      

    // If the email and password are correct, you can proceed with the login process

    // Return a success response or set the user session, token, or perform other login actions
    res.status(200).send(result);

  } catch (error) {
    next(error);
  }
};

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
