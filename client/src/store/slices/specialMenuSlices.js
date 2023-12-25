import {createSlice} from "@reduxjs/toolkit";

const specialMenuSlices = createSlice({
    name: "specialMenuState",
    initialState: {specialMenu: 0},
    reducers: {
        toggleSetSpecialMenu: (state, action) => {
            const {specialMenu} = action.payload;
            state.specialMenu = specialMenu;
        },
        toggleResetSpecialMenu: (state, action) => {
            state.specialMenu = 0;
        },
    },
});

export const {toggleSetSpecialMenu, toggleResetSpecialMenu} = specialMenuSlices.actions;
export default specialMenuSlices.reducer;