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
    },
    imgUrl: {
        notEmpty: {
            errorMessage: "An imageURL must be provided",
        },
        isString: {
            errorMessage: "imgUrl must be a string"
        },
    }
}

export const profilePicSchema = {
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
    url: {
        notEmpty: {
            errorMessage: "An url must be provided",
        },
        isString: {
            errorMessage: "url must be a string"
        },
    }
}

export const loginSchema = {
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
    }
}

export const addToCartSchema = {
    itemId: {
        notEmpty: {
            errorMessage: "A username must be provided",
        },
        isString: {
            errorMessage: "Username must be a string"
        },
    },
    userId: {
        notEmpty: {
            errorMessage: "A username must be provided",
        },
        isString: {
            errorMessage: "Username must be a string"
        },
    }
}