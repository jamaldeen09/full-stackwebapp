import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PasswordSchema {
    password: any
}

const initialState: PasswordSchema = {
    password: ""
}

const passwordSlice = createSlice({
    initialState,
    name: "usersPassword",
    reducers: {
        setPassword: (state, action: PayloadAction) => {
            state.password = action.payload
        },
        resetPassword: (state) => {
            state.password = ""
        }
    }
})

export const { setPassword,resetPassword } = passwordSlice.actions;
export default passwordSlice.reducer;