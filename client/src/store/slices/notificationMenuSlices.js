import {createSlice} from "@reduxjs/toolkit";

const notificationMenuSlices = createSlice({
    name: "specialMenuState",
    initialState: [],
    reducers: {
        toggleSendNotification: (state, action) => {
            const newNotification = action.payload;
            !state.some((notification) => notification.id === newNotification.id) && state.push(newNotification);
        },
        toggleRemoveNotification: (state, action) => {
            const notificationIdToRemove = action.payload;
            return state.filter(item => item.id !== notificationIdToRemove);
        },
    },
});

export const {toggleSendNotification, toggleRemoveNotification} = notificationMenuSlices.actions;
export default notificationMenuSlices.reducer;