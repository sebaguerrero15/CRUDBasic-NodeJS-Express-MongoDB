const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Por favor ingrese un producto"],
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    imagen: {
      type: String,
      required: false,
    },
  },
  {
    timeStamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
