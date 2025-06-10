import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface profilePicSchema {
    profilePic: any
}

const initialState: profilePicSchema = {
    profilePic: ""
}

const profilePicSlice = createSlice({
    initialState,
    name: "profile",
    reducers: {
        setProfilePic: (state, action: PayloadAction) => {
            state.profilePic = action.payload
        }
    }
})

export const { setProfilePic } = profilePicSlice.actions;
export default profilePicSlice.reducer;