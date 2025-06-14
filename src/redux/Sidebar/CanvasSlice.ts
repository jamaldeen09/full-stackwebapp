import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface CanvasSchema {
    canvasActivator: boolean
}

const initialState: CanvasSchema = {
    canvasActivator: false
}

const canvasSlice = createSlice({
    initialState,
    name: "offcanvas",
    reducers: {
        activateCanvas: (state) => {
            state.canvasActivator = true
        },
        deactivateCanvas: (state) => {
            state.canvasActivator = false
        }
    }
})

export const { activateCanvas,deactivateCanvas } = canvasSlice.actions;
export default canvasSlice.reducer;
