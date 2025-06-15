const express = require("express")
const productRoute = express.Router();
const { products } = require("../dataStructure");
const { Products } = require("../Models/Product");



productRoute.get("/products", async (request, response) => {
    const extractedProducts = await Products.find();
    return response.status(200).send({
        extractedProducts
    })
})


module.exports = { productRoute }