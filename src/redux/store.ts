import { configureStore } from "@reduxjs/toolkit"
import emailSlice from "./Auth/EmailSlice"
import passwordSlice from "./Auth/PasswordSlice"
import usernameSlice from "./Auth/UsernameSlice"
import canvasSlice from "./Sidebar/CanvasSlice"

const store = configureStore({
    reducer: {
        emailAddress: emailSlice,
        usersPassword: passwordSlice,
        username: usernameSlice,
        offcanvas: canvasSlice,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch