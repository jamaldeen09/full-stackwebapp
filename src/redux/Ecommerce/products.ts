import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface ProductsSchema {
    products: any
}

const initialState: ProductsSchema = {
    products: [],
}

const productsSlice = createSlice({
    initialState,
    name: "products",
    reducers: {
        newBatch: (state, action: PayloadAction) => {
            state.products = action.payload
        }
    }
})

export const { newBatch } = productsSlice.actions;