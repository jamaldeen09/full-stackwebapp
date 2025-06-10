import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface itemSchema {
    item: any
}

const initialState: itemSchema = {
    item: {}
}

const itemSlice = createSlice({
    initialState,
    name: "addedItem",
    reducers: {
        addItem: (state, action: PayloadAction) => {
            state.item = action.payload
        }
    }
})

export const { addItem } = itemSlice.actions;
export default itemSlice.reducer;