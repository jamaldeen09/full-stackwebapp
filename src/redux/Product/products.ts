import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ProductDb {
    products: any
}

const initialState: ProductDb = {
    products: []
}

const productsSlice = createSlice({
    initialState,
    name: "productStore",
    reducers: {
        updateStore: (state, action: PayloadAction) => {
            state.products = action.payload
        }
    }
})

export const { updateStore } = productsSlice.actions;
export default productsSlice.reducer;