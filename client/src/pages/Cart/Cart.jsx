import "./cart.css";
import "./lightModeStyle.css";
import "./darkModeStyle.css";
import './responsiveCart.css';

import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useAnimate, motion} from "framer-motion";
import {useEffect, useState} from "react";
import {removeFromCart} from "../../store/slices/cartSlices";
import {couponList} from "../../data/data";
import useAmount from "../../hooks/useAmount";
import {toggleNavbar, toggleNotificationMenu} from "../../store/slices/menuSlice";
import {useFormik} from 'formik';
import * as Yup from "yup";
import {toggleAppliedCoupon} from "../../store/slices/setCouponSlices";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import {calculateTimeDifference} from "../../util/utils";
import CartProductCard from "../../components/ProductCard/CartProductCard/CartProductCard";

const cartUIAnimation = {
    initial: {opacity: 0,},
    animate: {opacity: 1, transition: {ease: "easeOut", duration: 0.2,}}
};

const shadeAnimation = {
    hide: {opacity: 0, display: "none"},
    show: {opacity: 1, display: "flex"}
}

const cartPopupRemoveAnimation = {
    hide: {opacity: 0, scale: 0},
    show: {opacity: 1, scale: 1}
}

const couponApplyBtnAnimation = {
    show: {width: "80px", height: "32px", borderRadius: "var(--borderRadius1)"},
    hide: {width: "36px", height: "36px", borderRadius: "50%"},
}

const couponValidationSchema = Yup.object().shape({
    code: Yup.string()
        .required('Apply')
        .min(6, 'Too Short')
        .max(6, 'Too Long'),
});

const RemovePopUpCard = ({itemToRemove, dispatch, togglePopMessage, setTogglePopMessage, setItemToRemove, theme}) => {
    const handleRemove = (flag = false) => {
        if (flag) {
            dispatch(removeFromCart(itemToRemove.id));
            setItemToRemove(null);
            setTogglePopMessage(false);
        } else {
            setItemToRemove(null);
            setTogglePopMessage(false);
        }
    }

    return (
        <motion.section
            className={`cart__shade ${theme === "dark" ? "cart__shade__dark" : "cart__shade__light"}`}
            variants={shadeAnimation}
            animate={togglePopMessage ? "show" : "hide"}
        >

            <motion.div
                className={
                    `cart__removeItemPopup 
                    ${theme === "dark"
                        ? "cart__removeItemPopup__dark"
                        : "cart__removeItemPopup__light"}`
                }
                variants={cartPopupRemoveAnimation}
                animate={togglePopMessage ? "show" : "hide"}
                transition={{duration: 0.15, delay: 0.2}}
            >
                <h4 className={
                    `cart__removeItemCard__message 
                    ${theme === "dark"
                        ? "cart__removeItemCard__message__dark"
                        : "cart__removeItemCard__message__light"}`
                }>
                    Do you want to remove this item?
                </h4>
                <div className="cart__removeItemInfo">
                    <div className={
                        `cart__removeItemInfo__imageContainer 
                        ${theme === "dark"
                            ? "cart__removeItemInfo__imageContainer__dark"
                            : "cart__removeItemInfo__imageContainer__light"}`
                    }>
                        <img src={itemToRemove?.productImage} alt={itemToRemove?.productName} width="70px"/>
                    </div>
                    <div className="cart__removeItemInfo__priceAndNameContainer">
                        <p className={
                            `cart__removeItemInfo__name 
                            ${theme === "dark"
                                ? "cart__removeItemInfo__name__dark"
                                : "cart__removeItemInfo__name__light"}`
                        }>{itemToRemove?.productName}</p>
                        <p className={
                            `cart__removeItemInfo__price 
                            ${theme === "dark"
                                ? "cart__removeItemInfo__price__dark"
                                : "cart__removeItemInfo__price__light"}`
                        }>Price ₹ {itemToRemove?.price} only!</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="cart__removeItemBtnContainer"
                variants={cartPopupRemoveAnimation}
                animate={togglePopMessage ? "show" : "hide"}
                transition={{duration: 0.15, delay: 0.2 * 2}}
            >
                <button
                    className={
                        `cart__removeItemBtn ${theme === "dark"
                            ? "cart__removeItemBtn__dark"
                            : "cart__removeItemBtn__light"}`
                    }
                    type="button"
                    onClick={() => handleRemove(true)}
                >
                    Remove!
                </button>
                <button
                    className={
                        `cart__removeItemBtn ${theme === "dark"
                            ? "cart__removeItemBtn__dark"
                            : "cart__removeItemBtn__light"}`
                    }
                    type="button"
                    onClick={() => handleRemove(false)}
                >
                    Don't
                </button>
            </motion.div>

        </motion.section>
    );
};

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [scope, animate] = useAnimate();
    const validCouponData = useSelector((state) => state.couponState.validCouponData[0]);
    const cartData = useSelector((state) => state.cartItems);
    const appliedCouponData = useSelector((state) => state.couponState.appliedCouponData);
    const themeMode = useSelector(state => state.themeSwitchSlices);
    const {theme} = themeMode;
    const {discount, subTotal} = useAmount(cartData, appliedCouponData, couponList);

    const [itemToRemove, setItemToRemove] = useState(null);
    const [togglePopMessage, setTogglePopMessage] = useState(false);
    const [isCouponValid, setIsCouponValid] = useState("ideal");

    const handleCouponMenuOpen = () => {
        dispatch(toggleNotificationMenu({State: false}));
        navigate("/cart/coupon");
    }
    const handleApplyCoupon = (selfCouponData = {}) => dispatch(toggleAppliedCoupon({
        type: "ADD",
        appliedCouponData: selfCouponData
    }));

    useEffect(() => {
        dispatch(toggleNavbar({State: false}));
    }, [cartData, appliedCouponData, discount, subTotal, dispatch]);

    const formikCouponCode = useFormik({
        initialValues: {
            code: '',
        },
        validationSchema: couponValidationSchema,
        onSubmit: (values, {resetForm}) => {
            setIsCouponValid("checking");

            setTimeout(() => {
                const getCouponByCode = validCouponData.find(
                    (coupon) => formikCouponCode.values.code.toUpperCase() === coupon.couponCode.toUpperCase()
                );

                if (!getCouponByCode || !calculateTimeDifference(getCouponByCode.endDate, true)) {
                    setIsCouponValid("inValid");
                } else {
                    switch (getCouponByCode.type) {
                        case "on-Product":
                            const hasValidProducts = getCouponByCode.validProduct.some(
                                (productId) => cartData.some((item) => item.id === productId)
                            );

                            if (hasValidProducts) {
                                setIsCouponValid("valid");
                                handleApplyCoupon(getCouponByCode);
                            } else {
                                setIsCouponValid("inValid");
                            }
                            break;

                        case "on-Purchase":
                            if (getCouponByCode.purchaseLimit <= subTotal) {
                                const isCouponAlreadyApplied = appliedCouponData.some(
                                    (coupon) => getCouponByCode.type === coupon.type
                                );

                                if (!isCouponAlreadyApplied) {
                                    setIsCouponValid("valid");
                                    handleApplyCoupon(getCouponByCode);
                                } else {
                                    setIsCouponValid("inValid");
                                }
                            } else {
                                setIsCouponValid("inValid");
                            }
                            break;

                        default:
                            setIsCouponValid("inValid");
                            break;
                    }
                }
            }, 2000);

            setTimeout(() => {
                setIsCouponValid("ideal");
                resetForm();
            }, 2500);
        },
    });

    const handleGotoPayment = () => navigate("/payment");

    return (
        <motion.section className="cart" variants={cartUIAnimation} initial="initial" animate="animate">
            <RemovePopUpCard
                dispatch={dispatch}
                itemToRemove={itemToRemove}
                togglePopMessage={togglePopMessage}
                setTogglePopMessage={setTogglePopMessage}
                setItemToRemove={setItemToRemove}
                theme={theme}
            />

            {
                cartData.length !== 0 ? <section
                    className="cart__section02 noScroll"
                    ref={scope}
                >
                    <p
                        className={
                            `cart__section02__message 
                            ${theme === "dark"
                                ? "cart__section02__message__dark"
                                : "cart__section02__message__light"}`
                        }
                    >
                        Item List
                    </p>
                    {cartData.map((value, index) => <CartProductCard
                            key={value.id}
                            id={value.id}
                            index={index}
                            productName={value.productName}
                            productImage={value.productImage}
                            productPrice={value.price}
                            productQuantity={value.quantity}
                            dispatch={dispatch}
                            setItemToRemove={setItemToRemove}
                            setTogglePopMessage={setTogglePopMessage}
                            animate={animate}
                            theme={theme}
                        />
                    )}
                </section> : <p
                    className={
                        `cart__section02__message 
                            ${theme === "dark"
                            ? "cart__section02__message__dark"
                            : "cart__section02__message__light"}`
                    }
                >
                    Cart is Empty
                </p>
            }
            {
                cartData.length !== 0 &&
                <section className="cart__section03">
                    <div className="cart__section03__info__couponOption">
                        <div className="cart__section03__info__couponOption__heading">
                            <p
                                className={
                                    `cart__section03__info__couponTitle 
                                    ${theme === "dark"
                                        ? "cart__section03__info__couponTitle__dark"
                                        : "cart__section03__info__couponTitle__light"}`
                                }
                            >
                                Apply Coupon
                            </p>
                            <button
                                className={
                                    `cart__section03__info__couponMenuBtn 
                                    ${theme === "dark"
                                        ? "cart__section03__info__couponMenuBtn__dark"
                                        : "cart__section03__info__couponMenuBtn__light"}`
                                }
                                type="button"
                                onClick={handleCouponMenuOpen}
                            >
                                Show All
                            </button>
                        </div>
                        <form
                            className={
                                `cart__section03__info__couponInput 
                                ${theme === "dark"
                                    ? "cart__section03__info__couponInput__dark"
                                    : "cart__section03__info__couponInput__light"}`
                            }
                            onSubmit={formikCouponCode.handleSubmit}
                        >
                            <input
                                type="text"
                                placeholder="Enter Code Here"
                                id="code"
                                name="code"
                                onChange={formikCouponCode.handleChange}
                                value={formikCouponCode.values.code}
                            />
                            <motion.button
                                type="submit"
                                className={
                                    formikCouponCode.errors.code || isCouponValid === "inValid" ? "errorCouponInputBtn" : ""
                                }
                                variants={couponApplyBtnAnimation}
                                animate={isCouponValid === "checking" ? "hide" : "show"}
                                transition={{ease: "linear", duration: 0.2,}}
                            >
                                {
                                    formikCouponCode.errors.code ?
                                        formikCouponCode.errors.code : isCouponValid === "ideal" ?
                                            "Apply" : isCouponValid === "checking" ?
                                                "" : isCouponValid === "valid" ? "Valid" : "In Valid"
                                }
                                {
                                    isCouponValid === "checking" &&
                                    <LoadingScreen
                                        width={22}
                                        height={22}
                                        loadingThickness={3}
                                        size="maxContent"
                                    />
                                }
                            </motion.button>
                        </form>
                    </div>
                    <div className="cart__section03__subtotal">
                        <p
                            className={
                                `cart__section03__subtotal__title 
                                 ${theme === "dark"
                                    ? "cart__section03__subtotal__title__dark"
                                    : "cart__section03__subtotal__title__light"}`
                            }
                        >
                            Total Bill
                        </p>
                        <div
                            className={
                                `cart__section03__subtotal__amount__container 
                                ${theme === "dark"
                                    ? "cart__section03__subtotal__amount__container__dark"
                                    : "cart__section03__subtotal__amount__container__light"}`
                            }
                        >
                            <div
                                className={
                                    `cart__section03__subtotal__amount 
                                    ${theme === "dark"
                                        ? "cart__section03__subtotal__amount__dark"
                                        : "cart__section03__subtotal__amount__light"}`
                                }
                            >
                                <p>Subtotal</p><p>₹{subTotal}</p>
                            </div>
                            <div
                                className={
                                    `cart__section03__subtotal__amount 
                                    ${theme === "dark"
                                        ? "cart__section03__subtotal__amount__dark"
                                        : "cart__section03__subtotal__amount__light"}`
                                }
                            >
                                <p>Coupon Discounts</p><p>-₹{discount}</p>
                            </div>
                            <div
                                className={
                                    `cart__section03__subtotal__amount 
                                    ${theme === "dark"
                                        ? "cart__section03__subtotal__amount__dark"
                                        : "cart__section03__subtotal__amount__light"}`
                                }
                            >
                                <p>Tax and Service Fees</p><p>+₹{Math.floor(subTotal * 0.015)}</p>
                            </div>
                            <div
                                className={
                                    `cart__section03__subtotal__amount 
                                    ${theme === "dark"
                                        ? "cart__section03__subtotal__amount__dark"
                                        : "cart__section03__subtotal__amount__light"}`
                                }
                            >
                                <p>Total Amount</p><p>₹{subTotal + 10 - discount}</p>
                            </div>
                        </div>
                    </div>
                </section>
            }

            {
                cartData.length !== 0 &&
                <div className="cart__subtotal__totalAmount">
                    <p>Total Amount ₹{subTotal + 10 - discount}</p>
                    <button type="button" onClick={handleGotoPayment}>Place Order</button>
                </div>
            }
        </motion.section>
    );
}

export default Cart;