import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface cartSchema {
    cart: any
}

const initialState: cartSchema = {
    cart: []
}

const cartSlice = createSlice({
    initialState,
    name: "cartContainer",
    reducers: {
        newCart: (state, action: PayloadAction) => {
            state.cart = action.payload
        }
    }
})

export const { newCart } = cartSlice.actions;
export default cartSlice.reducer;