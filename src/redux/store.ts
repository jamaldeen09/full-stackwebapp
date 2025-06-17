import { configureStore } from "@reduxjs/toolkit"
import emailSlice from "./Auth/EmailSlice"
import passwordSlice from "./Auth/PasswordSlice"
import usernameSlice from "./Auth/UsernameSlice"
import canvasSlice from "./Sidebar/CanvasSlice"
import productsSlice from "./Ecommerce/products"
import cartSlice from "./Ecommerce/Cart"
import infoSlice from "./Auth/InfoSlice"

const store = configureStore({
    reducer: {
        emailAddress: emailSlice,
        usersPassword: passwordSlice,
        username: usernameSlice,
        offcanvas: canvasSlice,
        products: productsSlice,
        cartContainer: cartSlice,
        info: infoSlice,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch