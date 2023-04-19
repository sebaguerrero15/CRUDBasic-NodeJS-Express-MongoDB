const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const Product = require("./models/productModel");

app.use(express.json());
app.use(express.urlencoded({extended: false}))

//Rutas

app.get("/", (req, res) => {
  res.send("Hola Mundo 😎!");
});

app.get("/blog", (req, res) => {
  res.send("Mi Blog 🐱‍👤!");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//ingresar un producto
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//Actualizar un producto
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if(!product) {
      return res.status(404).json({message: `No se puede encontrar un producto con el id ${id}`})
    }
    const updatedProduct = await Product.findById(id)
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//borrar un producto
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product) {
      return res.status(404).json({message: `No se puede encontrar un producto con el id ${id}`})
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//conexion a mongoDB

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://root:root@cluster0.g8r1lco.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log("Connected to MongoDB!, in the port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
