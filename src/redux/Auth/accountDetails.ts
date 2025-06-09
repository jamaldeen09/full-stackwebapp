import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface accountDetailsSchema {
    accountDetails: any
}

const initialState: accountDetailsSchema = {
    accountDetails: {}
}

const accountDetailsSlice = createSlice({
    initialState,
    name: "account",
    reducers: {
        setAccDetails: (state, action: PayloadAction) => {
            state.accountDetails = action.payload
        }
    }
})

export const { setAccDetails } = accountDetailsSlice.actions;
export default accountDetailsSlice.reducer;