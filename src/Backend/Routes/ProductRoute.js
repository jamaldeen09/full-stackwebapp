const express = require("express");
const productRoute = express.Router();
const { products } = require("../dataStructure");
const { Products } = require("../Models/Product");
const {
  param,
  validationResult,
  matchedData,
  query,
} = require("express-validator");
const { verifyToken } = require("../MiddleWares/ProtectedCartMiddleWare");
const { Users } = require("../Models/User");
const mongoose = require("mongoose");
const { User } = require("lucide-react");
const ObjectId = mongoose.Types.ObjectId;

const getRandomValue = (reference) => {
  const random = Math.floor(Math.random() * reference.length )
  return random
}
productRoute.get("/products", async (request, response) => {
  try {
    const extractedProducts = await Products.find();
    return response.status(200).send({
      msg: "Successfull",
      products: extractedProducts,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).send({
      msg: "Server Error",
      errorMsg: error,
    });
  }
});

productRoute.post(
  "/products/cart/:id",
  verifyToken,
  param("id")
    .notEmpty()
    .withMessage("An ID must be provided")
    .isString()
    .withMessage("ID must be a string"),
  query("amount").isString().withMessage("Amount must be a string"),
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty())
        return response.status(400).send({ success: false, errors: errors });

      const validatedData = matchedData(request);

      const extractedID = validatedData.id;
      const extractedAmount = validatedData.amount;
      if (!ObjectId.isValid(extractedID)) {
        return response
          .status(400)
          .send({ success: false, msg: "Invalid product ID format" });
      }

      const user = await Users.findById(request.id);

      if (!user)
        return response
          .status(400)
          .send({ msg: "User was not found. Please log in" });

      const exisitingItem = user.cart.find(
        (item) => item.product.toString() === extractedID
      );

      if (!exisitingItem) {
        user.cart.push({
          product: new ObjectId(extractedID),
          quantity: parseInt(extractedAmount),
        });
      } else {
        exisitingItem.quantity += parseInt(extractedAmount);
      }

      await user.save();
      return response.status(200).send({
        msg: "Cart Updated",
        cart: user.cart,
      });
    } catch (err) {
      console.error(err);
    }
  }
);

productRoute.get("/cart", verifyToken, async (request, response) => {
  try {
    if (!request.id)
      return response.status(401).send({
        message: "Unauthorized Access",
        error: "Invalid Token",
      });
    const user = await Users.findById(request.id).populate("cart.product");

    return response.status(200).send({
      msg: "Successfull",
      newCart: user.cart,
    });
  } catch (error) {
    console.error(error);
  }
});

productRoute.delete(
  "/deleteItem/:id",
  verifyToken,
  param("id")
    .notEmpty()
    .withMessage("An ID must be provided")
    .isString()
    .withMessage("Item must be a string"),
  async (request, response) => {
    try {
      if (!request.id)
        return response.status(401).send({ msg: "Access Denied" });
      const errors = validationResult(request);
      if (!errors.isEmpty())
        return response.status(400).send({ errors: errors.array() });

      const validData = matchedData(request);
      const extractedId = validData.id;

      // Find item from users Cart
      let user = await Users.findById(request.id);

      let foundItem = user.cart.find(
        (item) => item.product.toString() === extractedId
      );
      console.log(foundItem.product.toString());

      if (!foundItem)
        return response
          .status(404)
          .send({ success: false, msg: "Item was not found" });

      if (foundItem.quantity <= 1) {
        user.cart = user.cart.filter(
          (item) => item.product.toString() !== foundItem.product.toString()
        );

        await user.save();
        return response
          .status(200)
          .send({ msg: "Cart Successfully updated", newCart: user.cart });
      }
      foundItem.quantity -= 1;
      await user.save();
      // Re-fetch with populated product info
      const updatedUser = await Users.findById(user._id).populate(
        "cart.product"
      );

      return response.status(200).send({
        msg: "An Item has been deleted from your cart",
        updatedCart: updatedUser.cart,
      });
    } catch (err) {
      console.error(err);
      return response.status(500).send({ msg: "Server Error" });
    }
  }
);

productRoute.delete("/clear-cart", verifyToken, async (request, response) => {
  try {
    if (!request.id) {
      return response.status(401).send({ msg: "Unauthorized Access" })
    }
    let findUser = await Users.findById(request.id);
    console.log(findUser)
    findUser.cart = [];
    await findUser.save()

    return response.status(200).send({
      msg: "Cart cleared successfully",
      cart: findUser.cart
    })
  } catch (err) {
    console.error(err);
    return response.status(500).send({
      msg: "Server Error"
    })
  }
})

productRoute.get("/featured/favourites", 
  verifyToken,
  async (request, response) => {
    try {
      if (!request.id)
        return response.status(401).send({ msg: "Access Denied" })

      const products = await Products.find();

      const featured = [];
      const favourites = []
      for (let i = 0; i < 3; i++) {
        const randomVal = getRandomValue(products)
        featured.push(products[randomVal])
      }

      for (let i = 0; i < 3; i ++) {
        const randomVal = getRandomValue(products)
        favourites.push(products[randomVal])
      }

      return response.status(200).send({
        msg: "Success",
        featuredProducts: featured,
        favouriteProducts: favourites
      })
    } catch (err) {
      console.error(err)
    }
})
module.exports = { productRoute };
