export const usernameValidation = (username: string): boolean => {
    if (!username || username.length < 3) {
        return false
    }
    return true
}

export const passwordValidation = (password: string): boolean => {
    if (!password || password.length < 4){
        return false
    }
    return true
}

export const emailValidation = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!email || !regex.test(email)) {
        return false
    }
    return true
}