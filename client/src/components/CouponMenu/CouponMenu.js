import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import "./couponMenu.css";
import categoriesTabCover from "../../assets/background/categoriesTabCover.png";
import closeIcon from "../../assets/icons/closeIcon.svg";
import { toggleCouponMenu } from "../../store/slices/menuSlice";
import { couponList } from "../../data/data";
import IconContainer from "../IconContainer/IconContainer";
import ImageContainer from "../ImageContainer/ImageContainer";
import CouponCard from "../CouponCard/CouponCard";


const couponMenuAnimation = {
    hide: {opacity: 0, x: -500},
    show: {opacity: 1, x: 0}
}

const CouponMenu = () => {
    const dispatch = useDispatch();
    const [validCoupon, setValidCoupon] = useState([]);
    const [nonValidCoupon, setNonValidCoupon] = useState([]);
    const couponMenu = useSelector(state => state.menuState.couponMenuState);
    const cartData = useSelector((state) => state.cartItems);
    const {State, zIndex} = couponMenu;

    const handleClose = () => dispatch(toggleCouponMenu({State: false}));

    useEffect(() => {
        const matchingCoupons = couponList.filter(coupon =>
            coupon.validProduct.some(productId => cartData.map(items => items.id).includes(productId))
        );

        const nonMatchingCoupons = couponList.filter(coupon =>
            !matchingCoupons.some(matchingCoupon => matchingCoupon.id === coupon.id)
        );

        setValidCoupon([...matchingCoupons]);
        setNonValidCoupon([...nonMatchingCoupons]);
    }, [cartData]);

    return (
        <motion.aside
            className="couponMenu darkGlass35"
            style={{zIndex: zIndex}}
            variants={couponMenuAnimation}
            animate={State ? 'show' : 'hide'}
            transition={{type: "spring", stiffness: 300, damping: 25}}
        >
            <button
                type="button"
                className="closeBtn couponMenu__closeBtn"
                onClick={handleClose}
            >
                <IconContainer
                    src={closeIcon}
                    alt="close icon svg"
                    width={30}
                    height={30}
                    background={false}
                />
            </button>
            <div className="couponMenu__title">
                <ImageContainer
                    src={categoriesTabCover}
                    width="max-content"
                    height="15%"
                    alt="categories tab cover image"
                    position="absolute"
                    zIndex={0}
                />
                <h1>COUPONS</h1>
            </div>
            <section className="couponMenu__couponList addScroll">
                {validCoupon.map((value => <CouponCard
                        id={value.id}
                        couponCode={value.couponCode}
                        discount={value.discount}
                        validProductIDs={value.validProduct}
                        isActive={true}
                    />
                ))}
                {nonValidCoupon.map((value => <CouponCard
                        id={value.id}
                        couponCode={value.couponCode}
                        discount={value.discount}
                        validProductIDs={value.validProduct}
                        isActive={false}
                    />
                ))}
            </section>
        </motion.aside>
    );
}

export default CouponMenu;