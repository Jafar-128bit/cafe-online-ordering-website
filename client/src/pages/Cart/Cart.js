import "./cart.css";
import './responsiveCart.css';

import {useNavigate} from "react-router-dom";
import loadable from '@loadable/component';
import {useDispatch, useSelector} from "react-redux";
import {useAnimate, motion} from "framer-motion";
import {useEffect, useState} from "react";
import {removeFromCart} from "../../store/slices/cartSlices";
import {couponList} from "../../data/data";
import useAmount from "../../hooks/useAmount";
import {toggleCouponMenu, toggleMenuBar, toggleNavbar} from "../../store/slices/menuSlice";
import {useFormik} from 'formik';
import * as Yup from "yup";
import {addCoupon} from "../../store/slices/setCouponSlices";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import {calculateTimeDifference} from "../../util/utils";

const CartProductCard = loadable(() => import("../../components/ProductCard/CartProductCard/CartProductCard"));

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

const RemovePopUpCard = ({itemToRemove, dispatch, togglePopMessage, setTogglePopMessage, setItemToRemove}) => {
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
            className="cart__shade"
            variants={shadeAnimation}
            animate={togglePopMessage ? "show" : "hide"}
        >

            <motion.div
                className="cart__removeItemPopup"
                variants={cartPopupRemoveAnimation}
                animate={togglePopMessage ? "show" : "hide"}
                transition={{duration: 0.15, delay: 0.2}}
            >
                <h4 className="cart__removeItemCard__message">
                    Do you want to remove this item?
                </h4>
                <div className="cart__removeItemInfo">
                    <div className="cart__removeItemInfo__imageContainer">
                        <img src={itemToRemove?.productImage} alt={itemToRemove?.productName} width="70px"/>
                    </div>
                    <div className="cart__removeItemInfo__priceAndNameContainer">
                        <p className="cart__removeItemInfo__name">{itemToRemove?.productName}</p>
                        <p className="cart__removeItemInfo__price">Price ₹ {itemToRemove?.price} only!</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="cart__removeItemBtnContainer"
                variants={cartPopupRemoveAnimation}
                animate={togglePopMessage ? "show" : "hide"}
                transition={{duration: 0.15, delay: 0.2 * 2}}
            >
                <button className="cart__removeItemBtn" type="button" onClick={() => handleRemove(true)}>Remove!
                </button>
                <button className="cart__removeItemBtn" type="button" onClick={() => handleRemove(false)}>Don't</button>
            </motion.div>

        </motion.section>
    );
};

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [scope, animate] = useAnimate();
    const cartData = useSelector((state) => state.cartItems);
    const couponData = useSelector(state => state.couponState);

    const {discount, subTotal} = useAmount(cartData, couponData, couponList);

    const [itemToRemove, setItemToRemove] = useState(null);
    const [togglePopMessage, setTogglePopMessage] = useState(false);
    const [isCouponValid, setIsCouponValid] = useState("ideal");

    const handleCouponMenuOpen = () => dispatch(toggleCouponMenu({State: true}));
    const handleApplyCoupon = (selfCouponData = {}) => dispatch(addCoupon(selfCouponData));

    useEffect(() => {
        dispatch(toggleMenuBar({State: true}));
        dispatch(toggleNavbar({State: false}));
    }, [cartData, couponData, discount, subTotal, dispatch]);

    const formikCouponCode = useFormik({
        initialValues: {
            code: '',
        },
        validationSchema: couponValidationSchema,
        onSubmit: (values, {resetForm}) => {
            //TODO: Tyring to mimicking the process of applying coupon change.
            setIsCouponValid("checking");
            const getCouponByCode = couponList
                .find((coupon) => formikCouponCode
                    .values
                    .code
                    .toUpperCase() === coupon.couponCode.toUpperCase()
                );
            setTimeout(() => {
                if (!calculateTimeDifference(getCouponByCode.endDate, true)) setIsCouponValid("inValid");
                else if (getCouponByCode && getCouponByCode.type === "on-Product") {
                    if (getCouponByCode.validProduct
                        .some(productId => cartData.map(items => items.id).includes(productId))) {
                        setIsCouponValid("valid");
                        handleApplyCoupon(getCouponByCode);
                    } else setIsCouponValid("inValid");
                } else if (getCouponByCode && getCouponByCode.type === "on-Purchase") {
                    if (getCouponByCode.purchaseLimit >= subTotal) {
                        if (couponData.some(coupon => getCouponByCode.type === coupon.type)) setIsCouponValid("inValid");
                        else handleApplyCoupon(getCouponByCode);
                    } else setIsCouponValid("inValid");
                }
            }, 3000);

            setTimeout(() => {
                setIsCouponValid("ideal");
                resetForm();
            }, 4000);
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
            />
            <section className="cart__section01">
                <h1 className="cart__section01__title">Your Basket</h1>
            </section>

            {
                cartData.length !== 0 ? <section
                    className="cart__section02 noScroll"
                    ref={scope}
                >
                    <p className="cart__section02__message">Item List</p>
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
                        />
                    )}
                </section> : <p className="cart__section02__message">Cart is Empty</p>
            }
            {
                cartData.length !== 0 &&
                <section className="cart__section03">
                    <div className="cart__section03__info__couponOption">
                        <div className="cart__section03__info__couponOption__heading">
                            <p className="cart__section03__info__couponTitle">Apply Coupon</p>
                            <button
                                className="cart__section03__info__couponMenuBtn"
                                type="button"
                                onClick={handleCouponMenuOpen}
                            >
                                Show All
                            </button>
                        </div>
                        <form
                            className="cart__section03__info__couponInput"
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
                        <p className="cart__section03__subtotal__title">Total Bill</p>
                        <div className="cart__section03__subtotal__amount__container">
                            <div className="cart__section03__subtotal__amount">
                                <p>Subtotal</p><p>₹{subTotal}</p>
                            </div>
                            <div className="cart__section03__subtotal__amount">
                                <p>Coupon Discounts</p><p>-₹{discount}</p>
                            </div>
                            <div className="cart__section03__subtotal__amount">
                                <p>Tax and Service Fees</p><p>+₹{Math.floor(subTotal * 0.015)}</p>
                            </div>
                            <div className="cart__section03__subtotal__amount">
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