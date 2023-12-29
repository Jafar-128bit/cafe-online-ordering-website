import {createSlice} from "@reduxjs/toolkit";

const dataSlices = createSlice({
    name: 'filterData',
    initialState: [],
    reducers: {
        setData: (state, action) => {
            state = action.payload;
            return state;
        },
        clearData: (state) => {
            return [];
        }
    }
});

export const {setData, clearData} = dataSlices.actions;
export default dataSlices.reducer;