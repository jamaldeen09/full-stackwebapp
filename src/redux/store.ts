import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./Product/products";
import singleProductSlice from "./Product/singleProduct"
import usernameSlice from "./Auth/username"
import passwordSlice from "./Auth/password"
import accountDetailsSlice from "./Auth/accountDetails"

const store = configureStore({
    reducer: {
        // Slices goes here
        productStore: productsSlice,
        product: singleProductSlice,
        name: usernameSlice,
        Password: passwordSlice,
        account: accountDetailsSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store