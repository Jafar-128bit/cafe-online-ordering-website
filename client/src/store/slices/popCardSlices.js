import {createSlice} from "@reduxjs/toolkit";

const popCardSlices = createSlice({
    name: 'popUpCardSlices',
    initialState: {isPopUpOpen: false, popUpType: "", itemId: null},
    reducers: {
        togglePopUpCard: (state, action) => {
            const {isPopUpOpen, popUpType, itemId} = action.payload;
            state.isPopUpOpen = isPopUpOpen;
            state.popUpType = popUpType;
            state.itemId = itemId;
        },
    },
});

export const {
    togglePopUpCard
} = popCardSlices.actions;

export default popCardSlices.reducer;