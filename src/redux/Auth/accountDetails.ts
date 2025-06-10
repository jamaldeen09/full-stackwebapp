import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface accountDetailsSchema {
    isLoggedIn: boolean;
    id: number | null;
    username: string;
    imgUrl: string;
    cart: any[];
    password: string;
}

const initialState: accountDetailsSchema = {
    isLoggedIn: false,
    id: null,
    username: '',
    imgUrl: '',
    cart: [],
    password: ""
}

const accountDetailsSlice = createSlice({
    initialState,
    name: "account",
    reducers: {
        setAccDetails: (state, action: PayloadAction<Partial<accountDetailsSchema>>) => {
            return { ...state, ...action.payload };
        }
    }
})

export const { setAccDetails } = accountDetailsSlice.actions;
export default accountDetailsSlice.reducer;