import './couponCard.css';
import './mediaQueryCouponCard.css';

import hourGlassDarkIcon from "../../assets/icons/hourGlass__Dark__Icon.svg";

import {useNavigate} from "react-router-dom";
import {motion} from 'framer-motion';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addCoupon, removeCoupon} from '../../store/slices/setCouponSlices';
import {cake, cold, iceCream, noodles, chai, snacks, sandwich, smoothies} from '../../data/data';
import {setData} from "../../store/slices/dataSlices";
import useTimeDifference from "../../hooks/useTimeDifference";
import {calculateTimeDifference} from "../../util/utils";

const allItems = [...cake, ...cold, ...iceCream, ...noodles, ...chai, ...snacks, ...sandwich, ...smoothies,];

const hourGlassAnimation = {
    initial: {rotate: 0,},
    animate: {
        rotate: [0, -45, 45, 0],
        transition: {ease: "linear", duration: 1, repeat: Infinity, repeatDelay: 0},
    }
}

const CouponCard = ({
                        id,
                        couponCode,
                        discount,
                        couponType,
                        validProductIDs,
                        purchaseLimit,
                        endDate,
                        isHide,
                        selfCouponData
                    }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const couponData = useSelector(state => state.couponState);
    const [applyCoupon, setApplyCoupon] = useState(true);
    const [validProducts, setValidProducts] = useState([]);
    const [deleteCoupon, setDeleteCoupon] = useState(true);

    const checkValidity = calculateTimeDifference(endDate, true);
    const timerData = useTimeDifference(endDate);

    useEffect(() => {
        const validProductList = allItems.filter(products => validProductIDs?.includes(products.id));
        const isCouponId = couponData.some((coupon) => coupon.id === id);
        setApplyCoupon(isCouponId);
        setValidProducts([...validProductList]);
    }, [couponData, id, validProductIDs, applyCoupon]);

    useEffect(() => {
        const validate = calculateTimeDifference(endDate, true);
        if (!validate) {
            setTimeout(() => {
                setDeleteCoupon(false);
            }, 2000);
        }
    }, [endDate]);

    const handleApplyCoupon = () => {
        if (!applyCoupon) dispatch(addCoupon(selfCouponData));
        else if (applyCoupon) dispatch(removeCoupon(selfCouponData));
    }

    const handleShowProducts = () => {
        dispatch(setData(validProducts));
        navigate(`/menu/offerProducts`);
    }

    return (
        <motion.div
            className={
                `couponCard ${
                    couponType === "on-Product"
                        ? "couponCard__onProductType"
                        : "couponCard__onPurchaseType"
                }`
            }
            style={{display: isHide ? "none" : "flex"}}
            initial={{x: 0,}}
            animate={deleteCoupon
                ? {x: 0,}
                : {x: -375,}}
        >
            < motion.div
                className="couponCard__Shade"
                initial={{opacity: 0, zIndex: -1}}
                animate={
                    !checkValidity
                        ? {opacity: 0.75, zIndex: 11}
                        : {opacity: 0, zIndex: -1}
                }
            />
            <section className="couponCard__section01">
                <section
                    className={
                        `couponCard__section01__discountContainer 
                        ${
                            couponType === "on-Product"
                                ? "discountContainerOnProduct"
                                : "discountContainerOnPurchase"}`
                    }>
                    <p>Coupon</p>
                    <p>{discount}%</p>
                    <p>OFF</p>
                </section>
                {
                    couponType === "on-Product" &&
                    <section className="couponCard__section01__couponCodeContainer">
                        <p>{couponCode}</p>
                    </section>
                }
            </section>
            <section className="couponCard__section02">
                <p className="couponCard__section02__title">{checkValidity ? "Valid For" : "Expired"}</p>
                <div className="couponCard__section02__validity">
                    {
                        checkValidity &&
                        <div className="couponCard__section02__validity__validTimer">
                            <p>{timerData.days < 10 ? `0${timerData.days}` : timerData.days}</p>:
                            <p>{timerData.hours < 10 ? `0${timerData.hours}` : timerData.hours}</p>:
                            <p>{timerData.minutes < 10 ? `0${timerData.minutes}` : timerData.minutes}</p>:
                            <p>{timerData.seconds < 10 ? `0${timerData.seconds}` : timerData.seconds}</p>
                        </div>
                    }
                    {
                        checkValidity &&
                        <motion.div
                            className="couponCard__section02__validity__icon"
                            variants={hourGlassAnimation}
                            initial="initial"
                            animate="animate"
                        >
                            <img src={hourGlassDarkIcon} alt="hour glass icon"/>
                        </motion.div>
                    }
                    {
                        !checkValidity && <p>Time Over!</p>
                    }
                </div>
                <div className="couponCard__section02__messageContainer">
                    {
                        (checkValidity && couponType === "on-Product") &&
                        <p>Unlock <strong>{discount}%</strong> discount on your basket items</p>
                    }
                    {
                        (checkValidity && couponType === "on-Purchase") &&
                        <p>Unlock <strong>{discount}%</strong> discount on
                            purchase more than <strong>₹{purchaseLimit}</strong>
                        </p>
                    }
                    {
                        !checkValidity && <p>No Offer!</p>
                    }
                </div>
                <div className="couponCard__section02__btnContainer">
                    {
                        couponType === "on-Product" &&
                        <button type="button" onClick={handleShowProducts}>Show Products</button>

                    }
                    {
                        couponType === "on-Purchase" &&
                        <div className="couponCard__section02__couponCodeContainer">
                            <p>{couponCode}</p>
                        </div>
                    }
                    <button type="button" onClick={handleApplyCoupon}>
                        {applyCoupon ? "Applied" : "Apply"}
                    </button>
                </div>
            </section>
        </motion.div>
    );
}

export default CouponCard;