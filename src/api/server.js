import express from "express"
import { validationResult,matchedData,param, checkSchema } from "express-validator"
import cors from "cors"
import session from "express-session"
import cookieParser from "cookie-parser"
import database from "./database.js"
import { userCreationSchema } from "./schema.js"

const app = express();
const PORT = process.env.PORT || 4080;
const secretKey = "abUil90-$"

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httOnly: true,
        maxAge: 86400000
    }
}))

app.get("/api/products", (request, response) => {
    return response.status(200).send({
        msg: "Request Successfull",
        products: database[1]
    })
})

app.get("/api/single-product/:id", 
    param("id")
    .isString()
    .withMessage("ID must be a string")
    .notEmpty()
    .withMessage("An ID must be provided"),
    (request, response) => {
        const result = validationResult(request)
        if (!result.isEmpty())
            return response.status(400).send(result.array())

        const data = matchedData(request);
        const parsedId = parseInt(data.id);

        const productIndex = database[1].findIndex(product => product.id === parsedId);

        if (productIndex === -1) 
            return response.status(404).send({msg: "Item does not exist"})

        return response.status(200).send({
            msg: "Successfull",
            product: database[1][productIndex]
        })
})

app.post("/api/users", checkSchema(userCreationSchema), (request, response) => {

    const result = validationResult(request);
    if (!result.isEmpty())
        return response.status(400).send(result.array())

    const data = matchedData(request)
    const extractedUsername = data.username;
    const checkIfUserExists = database[0].find(user => user.username.toLowerCase() === extractedUsername.toLowerCase())

    if (checkIfUserExists)
        return response.status(401).send({
            msg: "User already has an account",
            accountFound: checkIfUserExists
        })

    const newId = database[0].length + 1;
    const newUser = {
        id: newId,
        ...data,
        cart: [],
        isLoggedIn: true,
    }
    request.session.user = newUser
    database[0].push(newUser)
    return response.status(201).send({
        msg: "Account Successfully Created",
        accountDetails: newUser
    })
})

app.listen(PORT, () => console.log(`Port ${PORT} is being listened to.`))