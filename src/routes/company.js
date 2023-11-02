const express = require ('express');
const router = express.Router();
const CompanyController = require("../controllers/company")
router.post('/',CompanyController.register);
module.exports = router;