const createHttpError = require("http-errors");
const bcrypt = require("bcrypt");
const OrderModel = require("../models/order");

exports.create = async (req, res, next) => {
  const { buyer, product, quantity, description, address } = req.body;

  try {
    const { pdf } = req.files;
    if (!pdf) {
      throw createHttpError(484, "pdf not found");
    }
    let filepath = _dirname + "../../public/pdfs" + pdf.name;
    pdf.mv(filepath);
    let filepathtouplaod = "/public/pdfs/" + pdf.name;
    if (!buyer || !product || !quantity || laddress) {
      throw createHttpError(400, "Please provide all the required fields");
    }
    const buyerId = mongoose.Types.ObjectId(buyer);
    const productId = mongoose.Types.ObjectId(product);
    const order = new OrderModel({
      buyer: buyerId,
      product: productId,
      quantity,
      total: quantity * product.price,
      date: Date.now(),
      orderStatus: "pending",
      file: filepathtouplaod,
      description,
      address,
    });

    const result = await order.save();
    res.status(201).send(result);



  } 
  
  
  
  
  catch (error) {
    next(error);
  }
};

exports.getOrderByCompany  = async(req,res,next) =>{
    const companyId =req.params.id;

    try{
        const orders = await OrderModel.fine({company:companyId}).populate("buyer").populate("product").exec();
        res.send(orders);

    }

    catch(error){
        next(error)
    }

};

exports.getOrdersByBuyer = async (req, res, next) => {
    const buyerId = req.params.id;
    try {
        const orders = await OrderModel.find({ buyer: buyerId })
            .populate('buyer')
            .populate('product');
        res.send(orders);
    } catch (error) {
        next(error);
    }
};