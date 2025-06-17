import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InfoSchema {
    information: any
}

const initialState: InfoSchema = {
    information: {}
}

const infoSlice = createSlice({
    initialState,
    name: "info",
    reducers: {
        newInfo: (state, action: PayloadAction) => {
            state.information = action.payload
        }
    }
})

export const { newInfo } = infoSlice.actions;
export default infoSlice.reducer;

