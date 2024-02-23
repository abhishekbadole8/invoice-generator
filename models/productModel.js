const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  rateWithGst: {
    type: Number,
    required: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    cartItems: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
