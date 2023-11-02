const express = require ('express');
const router = express.Router();
const ProductController = require("../controllers/product")
router.post('/',ProductController.create);
router.get('/',ProductController.getAll)
router.get('/',ProductController.getOne)
router.delete('/',ProductController.delete)
router.put('/',ProductController.update)
router.get('/',ProductController.search)

module.exports = router;