const express = require ('express');
const router = express.Router();
const ProductController = require("../controllers/product")
const verifytoken  =require('../middelware/verifyToken')


router.post('/',ProductController.create);
router.get('/all',verifytoken ,ProductController.getAll)
router.get('/:id',ProductController.getOne)
router.delete('/:id',ProductController.delete)
router.put('/:id',ProductController.update)
router.get('searchResults',ProductController.search)

module.exports = router;