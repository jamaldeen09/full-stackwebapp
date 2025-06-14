const express = require("express")
const AuthRouter = express.Router();
const { Users } = require("../Models/User")
const { validationResult,matchedData,checkSchema } = require("express-validator")
const { userCreationSchema } = require("../MiddleWares/UserSchema")
const JWT = require("jsonwebtoken")

AuthRouter.post("/signup", 
    checkSchema(userCreationSchema),
    async (request, response) => {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty())
                return response.status(400).send({ error: errors.array() })

            const validData = matchedData(request);
            const extractedEmail = validData.email
            const extractedUsername = validData.username
            // Check if user already exists
            const existingUser = await Users.findOne({ $or: [ {email: extractedEmail}, {username: extractedUsername} ] })
            if (existingUser)
                return response.status(400).send({ msg: "You already have an account. Please Log in" , existingID: existingUser._id })

            const newUser = await Users.create(validData);
            const secretKey = process.env.ACCESS_TOKEN_KEY
            const generatedToken = JWT.sign({ id: newUser._id, username: newUser.username }, secretKey, { expiresIn: "2h" })
            return response.status(201).send({
                msg: "Account Created Successfully",
                id: newUser._id,
                accessToken: generatedToken
            })
        } catch (error) {
            console.error(error)
            return response.status(500).send({ msg: "Server Error" })
        }
})

AuthRouter.post("/login", 
    checkSchema(userCreationSchema),
    async (request, response) => {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty())
                return response.status(400).send({ error: errors.array() })

            const validData = matchedData(request);
            const extractedUsername = validData.username;
            const extractedPassword = validData.password;
            // Check if account dosent exist
            const isExist = await Users.findOne({ $and: [ {username: extractedUsername}, {password: extractedPassword} ] })
            if (!isExist)
                return response.status(400).send({ msg: "You do not have an account. Please Create an account", noAcc: true })

            const secretKey = process.env.ACCESS_TOKEN_KEY
            const newToken = JWT.sign({ id: isExist._id, username: isExist.username }, secretKey, { expiresIn: "2h" })

            return response.status(200).send({
                msg: "Account Successully found",
                id: isExist._id,
                accessToken: newToken
            })
        } catch (error) {
            console.error(error)
        }
})

AuthRouter.get("/", async (request, response) => {
    const users = await Users.find()
    return response.send(users)
})

module.exports = {
    AuthRouter
}



