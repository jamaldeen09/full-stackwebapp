import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface UsernameSchema {
    username: any
}

const initialState: UsernameSchema = {
    username: ""
}

const usernameSlice = createSlice({
    initialState,
    name: "name",
    reducers: {
        setName: (state, action: PayloadAction) => {
            state.username = action.payload
        },
        resetName: (state) => {
            state.username = ""
        }
    }
})


export const { setName,resetName } = usernameSlice.actions;
export default usernameSlice.reducer;