const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [
        {
            product: { type: mongoose.Schema.Types.ObjectId , required: true, ref: "Products" }, 
             quantity: { type: Number, required: true , default: 1 }
        },
    ]
})

const Users = mongoose.model("Users", userSchema)

module.exports = {
    Users
}