const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const { AuthRouter } = require("./Routes/AuthRouter")
const { productRoute } = require("./Routes/ProductRoute")
const { products } = require("./dataStructure")
const { Products } = require("./Models/Product")
require("dotenv").config({ path: __dirname + "/.env" })


// Variables
const app = express();
const PORT = process.env.PORT;
const URL = process.env.MONGO_URI;

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use("/api", AuthRouter)
app.use("/api", productRoute)

mongoose.connect(URL)
  .then(async () => {
     try {
      return await Products.insertMany(products)
     } catch (err) {
      console.error(err)
     }
  })
  .then(() => {
    console.log("Successfully connected to mongoDb")
    app.listen(PORT, () => console.log(`Port ${PORT} is being listened to`))
}).catch((err) => console.error(err))