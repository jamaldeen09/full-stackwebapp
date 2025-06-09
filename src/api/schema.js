export const userCreationSchema = {
    username: {
        notEmpty: {
            errorMessage: "A username must be provided",
        },
        isString: {
            errorMessage: "Username must be a string"
        },
        isLength: {
            options: {min: 3},
            errorMessage: "Username must be at least 3 characters"
        }
    },
    password: {
        notEmpty: {
            errorMessage: "A password must be provided",
        },
        isString: {
            errorMessage: "Password must be a string"
        },
        isLength: {
            options: {min: 5},
            errorMessage: "Password must be at least 5 characters"
        }
    }
}