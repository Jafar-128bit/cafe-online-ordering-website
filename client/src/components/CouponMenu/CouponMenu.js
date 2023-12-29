import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {motion} from "framer-motion";

import "./couponMenu.css";
import './responsiveCouponMenu.css';

import closeLightIcon from "../../assets/icons/close_Light_Icon.svg";
import {toggleCouponMenu} from "../../store/slices/menuSlice";
import {couponList} from "../../data/data";
import CouponCard from "../CouponCard/CouponCard";
import {removeCoupon} from "../../store/slices/setCouponSlices";
import {calculateTimeDifference} from "../../util/utils";


const couponMenuAnimation = {
    hide: {opacity: 0, x: 0, display: "none"},
    show: {opacity: 1, x: 478, display: "flex"}
}

const CouponMenu = () => {
    const dispatch = useDispatch();
    const [validCoupon, setValidCoupon] = useState([]);
    const [inValidCoupon, setInValidCoupon] = useState([]);
    const [subtotal, setSubtotal] = useState([]);
    const couponMenu = useSelector(state => state.menuState.couponMenuState);
    const cartData = useSelector((state) => state.cartItems);
    const {State, zIndex} = couponMenu;

    const handleClose = () => dispatch(toggleCouponMenu({State: false}));

    useEffect(() => {
        setSubtotal(cartData.map((value) => value.price * value.quantity).reduce((acc, cur) => acc + cur, 0));

        const matchingOnProductCoupons = couponList
            .filter(coupon => coupon.type === "on-Product" && calculateTimeDifference(coupon.endDate, true))
            .filter(coupon => coupon.validProduct.some(productId => cartData.map(items => items.id).includes(productId)));

        const matchingOnPurchaseCoupons = () => {
            const matchingCoupon = couponList
                .filter(coupon => coupon.type === "on-Purchase" && coupon.purchaseLimit < subtotal && calculateTimeDifference(coupon.endDate, true))
                .sort((a, b) => b.purchaseLimit - a.purchaseLimit)[0];
            if (matchingCoupon) {
                dispatch(removeCoupon(matchingCoupon));
                return [matchingCoupon];
            }
            return [];
        };

        const nonMatchingProductCoupons = couponList.filter(coupon => !calculateTimeDifference(coupon.endDate, true));

        setValidCoupon([...matchingOnProductCoupons, ...matchingOnPurchaseCoupons()]);
        setInValidCoupon([...nonMatchingProductCoupons]);
    }, [cartData, subtotal, dispatch]);

    return (
        <motion.aside
            className="couponMenu whiteGlass75"
            style={{zIndex: zIndex - 1}}
            variants={couponMenuAnimation}
            animate={State ? 'show' : 'hide'}
            transition={{ease: "linear", duration: 0.25}}
        >
            <button
                type="button"
                className="closeBtn couponMenu__closeBtn"
                onClick={handleClose}
            >
                <img src={closeLightIcon} alt="close icon"/>
            </button>
            <div className="couponMenu__title">
                <h1>COUPONS</h1>
            </div>
            <section className="couponMenu__couponList noScroll" style={{
                gridTemplateRows: `repeat(${couponList.length}, auto-fill)`
            }}>
                {validCoupon.map((value, index) => <CouponCard
                        key={value.id}
                        id={value.id}
                        index={index}
                        couponCode={value.couponCode}
                        discount={value.discount}
                        couponType={value.type}
                        validProductIDs={value?.validProduct}
                        purchaseLimit={value?.purchaseLimit}
                        endDate={value.endDate}
                        isHide={value.isHide}
                        selfCouponData={validCoupon[index]}
                    />
                )}
                {inValidCoupon.map((value, index) => <CouponCard
                        key={value.id}
                        id={value.id}
                        index={index}
                        couponCode={value.couponCode}
                        discount={value.discount}
                        couponType={value.type}
                        validProductIDs={value?.validProduct}
                        purchaseLimit={value?.purchaseLimit}
                        endDate={value.endDate}
                        isHide={value.isHide}
                        selfCouponData={validCoupon[index]}
                    />
                )}
            </section>
        </motion.aside>
    );
}

export default CouponMenu;