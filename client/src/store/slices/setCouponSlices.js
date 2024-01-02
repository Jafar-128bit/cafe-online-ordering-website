import {createSlice} from "@reduxjs/toolkit";

const couponSlice = createSlice({
    name: "couponSlice",
    initialState: {
        appliedCouponData: [],
        validCouponData: [], // Add this line if validCouponData is part of your state
    },
    reducers: {
        toggleAppliedCoupon: (state, action) => {
            const {type, appliedCouponData} = action.payload;
            switch (type) {
                case "ADD":
                    const isCouponAlreadyApplied = state.appliedCouponData.some(
                        (coupon) =>
                            coupon.type === appliedCouponData.type &&
                            coupon.id === appliedCouponData.id
                    );

                    if (!isCouponAlreadyApplied) {
                        state.appliedCouponData.push(appliedCouponData);
                    }
                    break;

                case "REMOVE":
                    state.appliedCouponData = state.appliedCouponData.filter(
                        (coupon) => coupon.id !== appliedCouponData.id
                    );
                    break;

                default:
                    break;
            }
        },
        toggleValidCoupon: (state, action) => {
            const {type, validCouponData} = action.payload;
            switch (type) {
                case "ADD":
                    const isCouponAlreadyApplied = state.validCouponData.some(
                        (coupon) =>
                            coupon.type === validCouponData.type &&
                            coupon.id === validCouponData.id
                    );

                    if (!isCouponAlreadyApplied) {
                        state.validCouponData.push(validCouponData);
                    }
                    break;

                case "CLEAR":
                    state.validCouponData = [];
                    break;

                default:
                    break;
            }
        },
        clearCoupon: (state) => state.appliedCouponData = [],
    },
});

export const {
    toggleAppliedCoupon,
    toggleValidCoupon,
    clearCoupon
} = couponSlice.actions;
export default couponSlice.reducer;
