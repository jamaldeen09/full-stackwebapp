import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface passwordSchema {
    password: any
}

const initialState: passwordSchema = {
    password: ""
}

const passwordSlice = createSlice({
    initialState,
    name: "Password",
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