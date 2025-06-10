import express from "express"
import { validationResult,matchedData,param, checkSchema } from "express-validator"
import cors from "cors"
import session from "express-session"
import cookieParser from "cookie-parser"
import database, { usersCollection } from "./database.js"
import { userCreationSchema,profilePicSchema, loginSchema, addToCartSchema } from "./schema.js"

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

app.get("/api/all-users", (request, response) => {
    return response.status(200).send({
        msg: "Successfull",
        users: usersCollection
    })
})

app.get("/api/logout", (request, response) => {
    if (!request.session)
        return response.status(400).send({ msg: "You are not logged in" })

    request.session.destroy((err) => {
        if (err)
            return response.status(400)

        return response.status(200).send({
            msg: "Session Destroyed",
            userAvailability: false,
        })
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

app.get("/api/single-user", 
    (request, response) => {
        if (!request.session.user)
            return response.status(404).send({ msg: "User does not exist" })

        return response.status(200).send({
            msg: "User successfully found",
            userInformation: request.session.user
        })
 })


app.post("/api/users", checkSchema(userCreationSchema), (request, response) => {

    const result = validationResult(request);
    if (!result.isEmpty())
        return response.status(400).send(result.array())

    const data = matchedData(request)
    const extractedUsername = data.username;
    const checkIfUserExists = usersCollection.find(user => user.username.toLowerCase() === extractedUsername.toLowerCase())

    if (checkIfUserExists)
        return response.status(401).send({
            msg: "User already has an account",
            accountFound: checkIfUserExists
        })

    if (request.session.user) {
        return response.status(400).send({
            msg: "User is already signed in",
            information: checkIfUserExists
        })
    }
    const newId = usersCollection.length + 1;
    const newUser = {
        id: newId,
        ...data,
        cart: [],
        isLoggedIn: true,
        imgUrl: data.imgUrl || "https://placeholderimagegenerator.com/wp-content/uploads/2024/12/Light-person-placeholder-image-portrait_png_.png"
    }
    request.session.user = newUser
    usersCollection.push(newUser)
    return response.status(201).send({
        msg: "Account Successfully Created",
        accountDetails: newUser
    })
})

app.post("/api/login" , checkSchema(loginSchema) ,(request, response) => {
    const result = validationResult(request)
    if (!result.isEmpty())
        return response.status(400).send(result.array())
    const data = matchedData(request);

    const extractedUsername = data.username;
    const findUser = usersCollection.find(user => user.username.toLowerCase() === extractedUsername.toLowerCase());
    
    if (!findUser)
        return response.status(404).send({ msg: "User Was Not found. Please Sign in" })

    request.session.user = findUser;
    return response.status(200).send({
        msg: "Successfully Logged In",
        information: findUser
    })
})


app.post("/api/add-to-cart", checkSchema(addToCartSchema),

    (request, response) => {
        const result = validationResult(request);
        if (!result.isEmpty())
            return response.status(400).send(result.array())

        if (!request.session)
            return response.status(401).send({ msg: "You must be signed in to add to cart" })

        const data = matchedData(request);
        console.log(data)
        const parsedItemId = parseInt(data.itemId);
        const parsedUserId = parseInt(data.userId);

        const indexOfAddedItem = database[1].findIndex(item => item.id === parsedItemId);
        const indexOfUserAdding = usersCollection.findIndex(user => user.id === parsedUserId);

        if (indexOfAddedItem === -1 )
            return response.status(404).send({
                msg: "Item does not exist",
            })
        if (indexOfUserAdding === -1) 
            return response.status(404).send({ msg: "User does not exist" })

        const userAdding = usersCollection[indexOfUserAdding]
        const itemBeingAdded = database[0][indexOfAddedItem]

        request.session.user = userAdding
        request.session.cart.push(itemBeingAdded);
        
        return response.status(200).send({
            msg: "Successfully added item to cart",
            addedItem: itemBeingAdded
        })
})


app.put("/api/change-pic", checkSchema(profilePicSchema) ,(request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty())
        return response.status(400).send(result.array())
    const data = matchedData(request);
    console.log(data)

    const findUser = usersCollection.findIndex(user => user.username.toLowerCase() === data.username.toLowerCase());

    if (findUser === -1)
        return response.status(404).send({
           msg: "User was not found"
        })

    const newPic = {
        username: data.username,
        imgUrl: data.url,
    }
   usersCollection[findUser] = {...usersCollection[findUser], ...newPic };
   if (!request.session) 
    return response.status(400).send({msg: "You are not signed in"})
   
   request.session.user = usersCollection[findUser]

    return response.status(200).send({
      msg: "Profile Pic Sucessfully changed",
      newUrl: findUser.imgUrl,
   })
}) 

app.listen(PORT, () => console.log(`Port ${PORT} is being listened to.`))