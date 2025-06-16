
import JWT from "jsonwebtoken"


export const verifyToken = (request, response, next) => {
    const header = request.headers.authorization
    if (!header) return response.status(401).send({ msg: "Access Denied" })
    
    const token = header.split(" ")[1];

    JWT.verify(token, process.env.ACCESS_TOKEN_KEY, (error, decoded) => {
        if (error) return response.status(403).send({ msg: "Invalid token" })

        request.id = decoded.id;
        next()
    })
}


