const userCreationSchema = {
    username: {
        notEmpty: {
            errorMessage: "A username must be provided"
        },
        isString: {
            errorMessage: "Username must be a string"
        },
        isLength: {
            options: { min: 3 },
            errorMessage: "Username must be at least 3 chracters"
        }
    },
    email: {
        notEmpty: {
            errorMessage: "An Email Address must be provided",
        },
        isString: {
            errorMessage: "Email Address must be a string"
        },
        isEmail: {
            errorMessage: "Invalid Email Address"
        },
    },
    password: {
        notEmpty: {
            errorMessage: "A password must be provided"
        },
        isString: {
            errorMessage: "Password must be a string"
        },
        isLength: {
            options: { min: 3 },
            errorMessage: "Password must be at least 3 chracters"
        }
    }
}

module.exports = {
    userCreationSchema
}