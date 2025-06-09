
export const nameValidation = (name: string): boolean => {
    if (!name || name.length < 3)
        return false;
    return true;
}

export const passwordValidation = (password: string): boolean => {
    if (!password || password.length < 5)
        return false;
    return true;
}