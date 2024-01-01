import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {motion} from "framer-motion";

import "./couponMenu.css";
import './responsiveCouponMenu.css';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import {toggleCouponMenu} from "../../store/slices/menuSlice";
import {couponList} from "../../data/data";
import CouponCard from "../CouponCard/CouponCard";
import {removeCoupon} from "../../store/slices/setCouponSlices";
import {calculateTimeDifference} from "../../util/utils";


const couponMenuAnimation = {
    hide: {opacity: 0, y: -680},
    show: {opacity: 1, y: 0}
}

const CouponMenu = ({theme}) => {
    const dispatch = useDispatch();
    const [validCoupon, setValidCoupon] = useState([]);
    const [subtotal, setSubtotal] = useState([]);
    const cartData = useSelector((state) => state.cartItems);
    const couponMenu = useSelector(state => state.menuState.couponMenuState);
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

        setValidCoupon([...matchingOnProductCoupons, ...matchingOnPurchaseCoupons()]);
    }, [cartData, subtotal, dispatch]);

    return (
        <motion.div
            className={`couponMenu ${theme === "dark" ? "darkGlass35" : "whiteGlass75"}`}
            style={{zIndex: zIndex}}
            variants={couponMenuAnimation}
            animate={State ? 'show' : 'hide'}
            transition={{ease: "easeOut", duration: 0.3}}
        >
            <button
                type="button"
                className="couponMenu__closeBtn"
                onClick={handleClose}
            >
                <CloseOutlinedIcon style={{
                    color: theme === "dark" ? "var(--colorWhite)" : "var(--colorBlack)",
                    fontSize: "30px"
                }}/>
            </button>
            <div className="couponMenu__title">
                <h1 style={{color: theme === "dark" ? "var(--colorWhite)" : "var(--color02)"}}>COUPONS</h1>
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
            </section>
        </motion.div>
    );
}

export default CouponMenu;