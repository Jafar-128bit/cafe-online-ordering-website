import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {calculateTimeDifference} from "../util/utils";
import {toggleAppliedCoupon, toggleValidCoupon} from "../store/slices/setCouponSlices";

const useValidCoupon = (subTotal, couponData, cartData) => {
    const dispatch = useDispatch();
    const validCouponData = useSelector((state) => state.couponState.validCouponData[0]);

    useEffect(() => {
        const matchingOnProductCoupons = couponData
            .filter(coupon => coupon.type === "on-Product" && calculateTimeDifference(coupon.endDate, true))
            .filter(coupon => coupon.validProduct.some(productId => cartData.some(item => item.id === productId)));

        const matchingOnPurchaseCoupons = () => {
            const matchingCoupon = couponData
                .filter(coupon => coupon.type === "on-Purchase"
                    && coupon.purchaseLimit < subTotal
                    && calculateTimeDifference(coupon.endDate, true))
                .sort((a, b) => b.purchaseLimit - a.purchaseLimit)[0];

            if (matchingCoupon) {
                dispatch(toggleAppliedCoupon({type: "REMOVE", appliedCouponData: matchingCoupon}));
                return [matchingCoupon];
            }
            return [];
        };

        const totalMatchingCoupons = [...matchingOnProductCoupons, ...matchingOnPurchaseCoupons()];
        dispatch(toggleValidCoupon({type: "CLEAR"}));
        dispatch(toggleValidCoupon({type: "ADD", validCouponData: totalMatchingCoupons}));
    }, [cartData, subTotal, dispatch, couponData]);

    return {validCouponData};
}

export default useValidCoupon;