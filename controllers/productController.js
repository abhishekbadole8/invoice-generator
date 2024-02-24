const Product = require("../models/productModel");
const generatePdf = require("../utils/generatePdf");

const addProducts = async (req, res) => {
  try {
    const userId = req.id;
    const { cartItems } = req.body;

    let existingUser = await Product.create({ userId, cartItems });
    const pdfBuffer = await generatePdf(existingUser);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="products.pdf"');
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error adding products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = addProducts;
