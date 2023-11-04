const createHttpError = require("http-errors");
const ProductModel = require("../models/product");
const mongoose = require("mongoose");
const path = require("path"); // Import the path module



exports.create = async (req, res, next) => {
  const { name, description, price, company } = req.body;
  try {
    const { image } = req.files;
    if (!image) {
      throw createHttpError(400, "Image not found"); // Status code 400 is Bad Request
    }
    if (!image.mimetype.startsWith("image")) {
      throw createHttpError(400, "Only images are allowed");
    }
    const filepathtoUpload = "/public/products/" + image.name;
    let filepath = path.join(__dirname, "../public/products/", image.name); // Use path.join to construct file path
    image.mv(filepath); // Move the uploaded file to the correct location

    if (!name || !description || !price || !company) {
      throw createHttpError(400, "Please provide all the required fields");
    }

    const product = new ProductModel({
      name,
      description,
      price,
      company,
      image: filepathtoUpload,
    });

    // Continue with the code to save the product to the database if needed

  } catch (error) {
    return next(error); // Pass the error to the error handling middleware
  }
};

exports.update = async (req, res, next) => {
  const { name, description, price } = req.body;
  const productId = req.params.productId; // You should get the product ID from the request

  try {
    if (!mongoose.isValidObjectId(productId)) {
      throw createHttpError(400, "Invalid Id");
    }

    if (!name || !description || !price) {
      throw createHttpError(400, "Please provide all the required fields");
    }

    const { image } = req.files;
    let filepath;
    let filepathtouplaod;
    if (image) {
      if (!image.mimetype.startsWith("image")) {
        throw createHttpError(400, "Only images are allowed");
      }
      filepath = path.join(__dirname, "../public/products/", image.name);
      image.mv(filepath);
      filepathtouplaod = "/public/products/" + image.name;
    }

    const product = await ProductModel.findById(productId).exec();
    if (!product) {
      throw createHttpError(404, "Product not found");
    }

    product.name = name;
    product.description = description;
    product.price = price;
    if (image) {
      product.image = filepathtouplaod;
    }
    
    const result = await product.save();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
    const productId = req.params.productId; // Get the product ID from the request parameters
    try {
      if (!mongoose.isValidObjectId(productId)) {
        throw createHttpError(400, "Invalid Id");
      }
  
      const product = await ProductModel.findById(productId).exec();
      if (!product) {
        throw createHttpError(404, "Product not found");
      }
  
      await product.remove(); // Remove the product from the database
      res.status(204).send(); // Status 204 means No Content
    } catch (error) {
      next(error);
    }
  };
  
  // Get all products
  exports.getAll = async (req, res, next) => {
    try {
      const products = await ProductModel.find().exec();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };
  
  // Get a product by ID
  exports.getOne = async (req, res, next) => {
    const productId = req.params.productId; // Get the product ID from the request parameters
    try {
      if (!mongoose.isValidObjectId(productId)) {
        throw createHttpError(400, "Invalid Id");
      }
  
      const product = await ProductModel.findById(productId).exec();
      if (!product) {
        throw createHttpError(404, "Product not found");
      }
  
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };
  
  // Search for products based on a query
  exports.search = async (req, res, next) => {
    const { query } = req.query; // Get the query from the request query parameters
    try {
      if (!query) {
        throw createHttpError(400, "Search query is required");
      }
  
      const products = await ProductModel.find({
        $text: { $search: query }, // Use text index for searching (requires appropriate schema setup)
      }).exec();
  
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };