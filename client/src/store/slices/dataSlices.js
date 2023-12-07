import {createSlice} from "@reduxjs/toolkit";

const dataSlices = createSlice({
    name: 'filterData',
    initialState: [],
    reducers: {
        setData: (state, action) => {
            state = action.payload;
            return state;
        },
    }
});

export const {setData} = dataSlices.actions;
export default dataSlices.reducer;