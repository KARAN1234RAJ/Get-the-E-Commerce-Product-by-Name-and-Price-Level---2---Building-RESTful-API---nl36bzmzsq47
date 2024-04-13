const fs = require("fs");
const express = require("express");
const app = express();

// Importing products from products.json file
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`));

//Middlewares
app.use(express.json());

// GET endpoint for sending the products to client by id
//// Endpoint - /api/v1/products/:id
app.get("/api/v1/products/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10); // Converting string to integer using base-10 number system
 // console.log(productId);
  let singleProduct = products.find((item) => item.id === productId);
 // console.log(singleProduct.length);
  if (singleProduct.length>0) {
    res
      .status(200)
      .send({
        status: "success",
        message: "Product fetched successfully",
        data:{ product:singleProduct},
      });
  } else {
    res.status(404).send({ status: "failed", message: "Product not found" });
  }
});

module.exports = app;
