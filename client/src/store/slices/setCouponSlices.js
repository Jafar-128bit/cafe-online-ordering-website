import {createSlice} from "@reduxjs/toolkit";

const setCouponSlices = createSlice({
    name: "couponSlice",
    initialState: [],
    reducers: {
        addCoupon: (state, action) => {
            const couponCode = action.payload;
            !state.some((coupon) => coupon.type === couponCode.type && coupon.id === couponCode.id)
            && state.push(couponCode);
        },
        removeCoupon: (state, action) => {
            const couponCode = action.payload;
            return state.filter(coupon => coupon.id !== couponCode.id);
        },
        clearCoupon: (state) => {
            return [];
        },
    }
});

export const {addCoupon, removeCoupon, clearCoupon} = setCouponSlices.actions;
export default setCouponSlices.reducer;