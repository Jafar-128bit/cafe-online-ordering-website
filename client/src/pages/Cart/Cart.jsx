import "./cart.css";
import "./lightModeStyle.css";
import "./darkModeStyle.css";
import './responsiveCart.css';

import emptyCartIconLight from "../../assets/icons/emptyCartIcon__Light__01.svg";
import emptyCartIconDark from "../../assets/icons/emptyCartIcon__Dark__01.svg";

import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {couponList} from "../../data/data";
import useAmount from "../../hooks/useAmount";
import {toggleNavbar, toggleNotificationMenu} from "../../store/slices/menuSlice";
import {useFormik} from 'formik';
import * as Yup from "yup";
import {toggleAppliedCoupon} from "../../store/slices/setCouponSlices";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import {calculateTimeDifference} from "../../util/utils";
import CartProductCard from "../../components/ProductCard/CartProductCard/CartProductCard";
import RemovePopUpCard from "../../components/RemoveCArtItemPop/RemoveCArtItemPop";

const cartUIAnimation = {
    initial: {opacity: 0,},
    animate: {opacity: 1, transition: {ease: "easeOut", duration: 0.2,}}
};

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
const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                >
                    {cartData.map((value, index) => <CartProductCard
                            key={value.id}
                            id={value.id}
                            index={index}
                            productName={value.productName}
                            productImage={value.productImage}
                            totalPrice={value.totalPrice}
                            totalQuantity={value.totalQuantity}
                            subCategories={value.subCategories}
                            categories={value.categories}
                            isCustomizable={value.isCustomizable}
                            customizeOptions={value.customizeOptions}
                            dispatch={dispatch}
                            setItemToRemove={setItemToRemove}
                            setTogglePopMessage={setTogglePopMessage}
                            theme={theme}
                        />
                    )}
                </section> : <div
                    className={
                        `cart__section02__message 
                            ${theme === "dark"
                            ? "cart__section02__message__dark"
                            : "cart__section02__message__light"}`
                    }
                >
                    <motion.div
                        className="cart__section02__message__iconContainer"
                        initial={{rotate: 0}}
                        animate={{
                            rotate: [0, 5, -5, 5, -5, 0],
                            transition: {ease: "easeInOut", duration: 3, repeat: Infinity}
                        }}
                    >
                        <img src={theme === "dark" ? emptyCartIconDark : emptyCartIconLight} alt="empty cart icon"/>
                    </motion.div>
                    <p>Cart is Empty</p>
                </div>
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