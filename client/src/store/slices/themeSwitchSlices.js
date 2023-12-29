import {createSlice} from "@reduxjs/toolkit";

const themeSwitchSlices = createSlice({
    name: "themeSwitch",
    initialState: {theme: "light"},
    reducers: {
        toggleThemeMode: (state, action) => {
            const {theme} = action.payload;
            state.theme = theme;
        },
    }
});

export const {toggleThemeMode} = themeSwitchSlices.actions;
export default themeSwitchSlices.reducer;