import './notificationMenu.css';
import './lightModeStyle.css';
import './darkModeStyle.css';
import './mediaQueryNotificationMenu.css';

import closeLightIcon from "../../assets/icons/close_Light_Icon.svg"
import closeDarkIcon from "../../assets/icons/close_Dark_Icon.svg"

import {toggleNotificationMenu} from "../../store/slices/menuSlice";
import {cake, cold, iceCream, noodles, chai, snacks, sandwich, smoothies} from '../../data/data';
import {couponList} from "../../data/data";

import {useDispatch, useSelector} from "react-redux";
import {motion} from "framer-motion";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {calculateTimeDifference, generateUniqueRandomNumbers} from "../../util/utils";
import {setData} from "../../store/slices/dataSlices";

const allItems = [...cake, ...cold, ...iceCream, ...noodles, ...chai, ...snacks, ...sandwich, ...smoothies,];

const CartInfoCard = ({quantity, subTotal, navigate, closeNotificationMenu, themeMode}) => {
    return (
        <div className="cartInfoCard">
            <h4
                className={
                    `cartInfoCard__title 
                    ${themeMode === "dark"
                        ? "cartInfoCard__title__dark"
                        : "cartInfoCard__title__light"}`
                }
            >
                Basket info
            </h4>
            {
                quantity !== 0 &&
                <div
                    className={
                        `cartInfoCard__cartItems 
                        ${themeMode === "dark"
                            ? "cartInfoCard__cartItems__dark"
                            : "cartInfoCard__cartItems__light"}`
                    }
                >
                    <p>Your basket is brimming with a delightful assortment of total</p>
                    <span>
                    <p>{quantity > 10 ? quantity : `0${quantity}`}</p>
                    <p>Items</p>
                </span>
                </div>
            }
            {
                quantity !== 0 &&
                <div
                    className={
                        `cartInfoCard__cartItems 
                        ${themeMode === "dark"
                            ? "cartInfoCard__cartItems__dark"
                            : "cartInfoCard__cartItems__light"}`
                    }
                >
                    <p>With {quantity} items in your basket, your subtotal is a delightful</p>
                    <span>
                    <p><small>₹</small>{subTotal > 10 ? subTotal : `0${subTotal}`}</p>
                    <p>only</p>
                </span>
                </div>
            }
            {
                quantity === 0 &&
                <p
                    className={
                        `cartInfoCard__cartEmptyMessage 
                        ${themeMode === "dark"
                            ? "cartInfoCard__cartEmptyMessage__dark"
                            : "cartInfoCard__cartEmptyMessage__light"}`
                    }
                >
                    Start your culinary adventure! Your basket is brimming
                    with tempting delights, and your subtotal is
                    ready to be discovered. Begin your feast now!
                </p>
            }
            <button
                type="button"
                className={
                    `cartInfoCard__basketLinkBtn 
                    ${themeMode === "dark"
                        ? "cartInfoCard__basketLinkBtn__dark"
                        : "cartInfoCard__basketLinkBtn__light"}`
                }
                onClick={() => {
                    closeNotificationMenu();
                    navigate(`${quantity > 0 ? "/cart" : "/menu"}`);
                }}
            >
                {quantity > 0 ? "Goto Basket?" : "Explore Menu!"}
            </button>
        </div>
    )
}

const CouponInfoCard = ({
                            couponCode,
                            discount,
                            couponType,
                            validProductIDs,
                            purchaseLimit,
                            closeNotificationMenu,
                            navigate,
                            dispatch,
                            themeMode
                        }) => {
    const [validProducts, setValidProducts] = useState([]);

    useEffect(() => {
        if (couponType === "on-Product") {
            const validProductList = allItems.filter(products => validProductIDs?.includes(products.id));
            setValidProducts([...validProductList]);
        } else setValidProducts([]);
    }, [validProductIDs, couponType]);

    const handleBtn = () => {
        closeNotificationMenu();
        if (couponType === "on-Product") {
            dispatch(setData(validProducts));
            navigate(`/menu/offerProducts`);
        } else {
            navigate(`/menu`);
        }
    }

    return (
        <div
            className={
                `couponInfoCard__details 
                ${themeMode === "dark"
                    ? "couponInfoCard__details__dark"
                    : "couponInfoCard__details__light"}`
            }
        >
            <div
                className={
                    `couponInfoCard__details__discount 
                    ${themeMode === "dark"
                        ? "couponInfoCard__details__discount__dark"
                        : "couponInfoCard__details__discount__light"}`
                }
            >
                <p>{discount}%</p>
                <p>OFF</p>
            </div>
            <div className="couponInfoCard__details__Info">
                <div
                    className={
                        `couponInfoCard__details__message 
                        ${themeMode === "dark"
                            ? "couponInfoCard__details__message__dark"
                            : "couponInfoCard__details__message__light"}`
                    }
                >
                    {couponType === "on-Product" &&
                    <p>Unlock a delightful {discount}% off – a delightful treat for your basket items awaits!</p>}
                    {
                        couponType === "on-Purchase" &&
                        <p>
                            Unlock an exclusive {discount}% discount on your order when you
                            spend over ₹{purchaseLimit}!
                        </p>
                    }
                </div>
                <div
                    className={
                        `couponInfoCard__details__couponCode 
                        ${themeMode === "dark"
                            ? "couponInfoCard__details__couponCode__dark"
                            : "couponInfoCard__details__couponCode__light"}`
                    }
                >
                    <p>{couponCode}</p>
                    <button type="button" onClick={handleBtn}>
                        {couponType === "on-Product" ? "Explore Products!" : "Shop More!"}
                    </button>
                </div>
            </div>
        </div>
    );
}

const NotificationMenu = ({themeMode}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [couponRandomData, setCouponRandomData] = useState([]);
    const cartData = useSelector((state) => state.cartItems);

    const notificationMenuState = useSelector(state => state.menuState.notificationMenuState);
    const {State, zIndex} = notificationMenuState;

    const handleCloseNotificationMenu = () => dispatch(toggleNotificationMenu({State: false}));

    useEffect(() => {
        setQuantity(cartData.map((value) => value.quantity).reduce((acc, cur) => acc + cur, 0));
        setSubTotal(cartData.map((value) => value.price * value.quantity).reduce((acc, cur) => acc + cur, 0));
    }, [dispatch, cartData]);

    useEffect(() => {
        setInterval(() => {
            const generatedCouponId = generateUniqueRandomNumbers(3, 1, couponList.length - 1);
            const generatedCouponData = couponList.filter((coupon) =>
                generatedCouponId.some(id => id === coupon.id)
                && calculateTimeDifference(coupon.endDate, true));
            setCouponRandomData([...generatedCouponData]);
        }, 15000);
    }, []);

    return (
        <motion.div
            className={
                `notificationMenu noScroll
                ${themeMode === "dark" ? "notificationMenu__dark" : "whiteGlass50"}`
            }
            style={{zIndex: zIndex}}
            initial={{opacity: 0, y: 0}}
            animate={State ? {opacity: 1, y: 0} : {opacity: 0, y: -420}}
            transition={{ease: "easeOut", duration: 0.3}}
        >
            <button
                type="button"
                className={
                    `notificationMenu__closeBtn 
                    ${themeMode === "dark"
                        ? "notificationMenu__closeBtn__dark"
                        : "notificationMenu__closeBtn__light"}`
                }
                onClick={handleCloseNotificationMenu}>
                <img src={themeMode === "dark" ? closeDarkIcon : closeLightIcon} alt="close icon btn"/>
            </button>
            <h3
                className={`notificationMenu__title 
                ${themeMode === "dark"
                    ? "notificationMenu__title__dark"
                    : "notificationMenu__title__light"
                }`}
            >
                Info Area
            </h3>
            <CartInfoCard
                themeMode={themeMode}
                quantity={quantity}
                subTotal={subTotal}
                navigate={navigate}
                closeNotificationMenu={handleCloseNotificationMenu}
            />
            <div className="couponInfoCard">
                <h4
                    className={
                        `couponInfoCard__title 
                        ${themeMode === "dark" 
                            ? "couponInfoCard__title__dark" 
                            : "couponInfoCard__title__light"}`
                    }
                >
                    Available Coupons
                </h4>
                {

                    couponRandomData.map((value, index) => <CouponInfoCard
                        key={value.id + index}
                        index={index}
                        themeMode={themeMode}
                        couponCode={value.couponCode}
                        discount={value.discount}
                        couponType={value.type}
                        validProductIDs={value?.validProduct}
                        purchaseLimit={value?.purchaseLimit}
                        navigate={navigate}
                        closeNotificationMenu={handleCloseNotificationMenu}
                        dispatch={dispatch}
                    />)
                }
            </div>
        </motion.div>
    );
}

export default NotificationMenu;