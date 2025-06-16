const express = require("express")
const productRoute = express.Router();
const { products } = require("../dataStructure");
const { Products } = require("../Models/Product");
const { param, validationResult, matchedData, query } = require("express-validator");
const { verifyToken } = require("../MiddleWares/ProtectedCartMiddleWare");
const { Users } = require("../Models/User");
const mongoose = require("mongoose");
const { User } = require("lucide-react");



productRoute.get("/products", async (request, response) => {
    try {
        const extractedProducts = await Products.find();
        return response.status(200).send({
           msg: "Successfull",
           products: extractedProducts
        })
        
    } catch (error) {
        console.error(error);
        return response.status(500).send({
            msg: "Server Error",
            errorMsg: error
        })
    }
})

productRoute.post("/products/cart/:id", 
    verifyToken,
    param("id")
    .notEmpty()
    .withMessage("An ID must be provided")
    .isString()
    .withMessage("ID must be a string")
    ,query("amount")
    .isString()
    .withMessage("Amount must be a string"),
    async (request, response) => {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty())
                return response.status(400).send({ success: false, errors: errors })

            const validatedData = matchedData(request);
            
            const extractedID = validatedData.id
            const extractedAmount = validatedData.amount;

            const user = await Users.findById(request.id)
            const checkIfproductExists = user.cart.find((item) => item.product.toString() === extractedID)

            if (checkIfproductExists) {
                // Update quantity
                checkIfproductExists.quantity += parseInt(extractedAmount)
            } else {
                user.cart.push({ product: extractedID, quantity: parseInt(extractedAmount) });
            }

            await user.save();
            return response.status(200).send({
                success: true,
            })
        } catch (err) {
            console.error(err)
        }
})

productRoute.get("/cart",
    verifyToken,
    async (request, response) => {
       try {
        if (!request.id)
            return response.status(401).send({
                message: "Unauthorized Access",
                error: "Invalid Token"
            })
        const user = await Users.findById(request.id).populate("cart.product");

        return response.status(200).send({
            msg: "Successfull",
            newCart: user.cart
        })
       } catch (error) {
        console.error(error)
       }
    }
)



module.exports = { productRoute }