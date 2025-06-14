import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UsernameSchema {
    username: any
}

const initialState: UsernameSchema = {
    username: ""
}

const usernameSlice = createSlice({
    initialState,
    name: "username",
    reducers: {
        setUsername: (state, action: PayloadAction) => {
            state.username = action.payload
        },
        resetUsername: (state) => {
            state.username = ""
        }
    }
})

export const { setUsername,resetUsername } = usernameSlice.actions;
export default usernameSlice.reducer;