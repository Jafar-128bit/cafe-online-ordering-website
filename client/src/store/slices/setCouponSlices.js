import {createSlice} from "@reduxjs/toolkit";

const setCouponSlices = createSlice({
    name: "couponSlice",
    initialState: [],
    reducers: {
        addCoupon: (state, action) => {
            const couponCode = action.payload;
            state.push(couponCode);
        },
        removeCoupon: (state, action) => {
            const couponCode = action.payload;
            return state.filter(code => code !== couponCode);
        },
        clearCoupon: (state) => {
            return [];
        },
    }
});

export const {addCoupon, removeCoupon, clearCoupon} = setCouponSlices.actions;
export default setCouponSlices.reducer;