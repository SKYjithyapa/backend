const createHttpError = require("http-errors");
const bcrypt = require("bcrypt");
const CompanyModel = require("../models/company");

exports.register = async (req, res, next) => {
    const { email, password, name, phone, address } = req.body; // Destructure the request body

    try {
        if (!email || !password || !name || !phone || !address) {
            throw createHttpError(400, "Missing required parameters");
        }

        const isCompanyAvailable = await CompanyModel.findOne({ email }).exec(); // Simplify query

        if (isCompanyAvailable) {
            throw createHttpError(400, "Company already exists"); // Correct typo
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const company = new CompanyModel({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
        });

        const result = await company.save();
        res.status(201).send(result);
    } catch (error) {
        next(error);
    }
};
