import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SingleProductSchema {
    singleProduct: any
}

const initialState: SingleProductSchema = {
    singleProduct: {}
}

const singleProductSlice = createSlice({
    initialState,
    name: "product",
    reducers: {
        newProduct: (state, action: PayloadAction) => {
            state.singleProduct = action.payload
        }
    }
})

export const { newProduct } = singleProductSlice.actions;
export default singleProductSlice.reducer;