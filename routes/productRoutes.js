const express = require("express");
const router = express.Router();
const  addProducts  = require("../controllers/productController");

router.post("/add",addProducts);

module.exports = router;
