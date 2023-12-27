import './couponCard.css';

import hourGlassDarkIcon from "../../assets/icons/hourGlass__Dark__Icon.svg";

import {useNavigate} from "react-router-dom";
import {motion} from 'framer-motion';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addCoupon, removeCoupon} from '../../store/slices/setCouponSlices';
import {cake, cold, iceCream, noodles, chai, snacks, sandwich, smoothies} from '../../data/data';

const allItems = [...cake, ...cold, ...iceCream, ...noodles, ...chai, ...snacks, ...sandwich, ...smoothies,];

const hourGlassAnimation = {
    initial: {rotate: 0,},
    animate: {
        rotate: [0, 180, 360],
        transition: {ease: "linear", duration: 0.9, repeat: Infinity, repeatDelay: 0},
    }
}

const CouponCard = ({
                        id,
                        couponCode,
                        discount,
                        couponType,
                        validProductIDs,
                        purchaseLimit,
                        couponTimeLimit,
                        isHide,
                        selfCouponData
                    }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const couponData = useSelector(state => state.couponState);
    const [applyCoupon, setApplyCoupon] = useState(true);
    const [validProducts, setValidProducts] = useState([]);

    console.log(validProducts);

    useEffect(() => {
        const validProductList = allItems.filter(products => validProductIDs?.includes(products.id));
        const isCouponId = couponData.some((coupon) => coupon.id === id);
        setApplyCoupon(isCouponId);
        setValidProducts([...validProductList]);
    }, [couponData, id, validProductIDs, applyCoupon]);

    const handleApplyCoupon = () => {
        if (!applyCoupon) dispatch(addCoupon(selfCouponData));
        else if (applyCoupon) dispatch(removeCoupon(selfCouponData));
    }

    const handleShowProducts = () => {
        navigate(`menu/offer/${couponCode}`);
    }

    return (
        <div
            className={
                `couponCard ${
                    couponType === "on-Product"
                        ? "couponCard__onProductType"
                        : "couponCard__onPurchaseType"
                }`
            }
            style={{display: isHide ? "none" : "flex"}}
        >
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
                <p className="couponCard__section02__title">Valid For</p>
                <div className="couponCard__section02__validity">
                    <div className="couponCard__section02__validity__validTimer">
                        <p>DD</p>:<p>HH</p>:<p>MM</p>:<p>SS</p>
                    </div>
                    <motion.div
                        className="couponCard__section02__validity__icon"
                        variants={hourGlassAnimation}
                        initial="initial"
                        animate="animate"
                    >
                        <img src={hourGlassDarkIcon} alt="hour glass icon"/>
                    </motion.div>
                </div>
                <div className="couponCard__section02__messageContainer">
                    {
                        couponType === "on-Product" &&
                        <p>Unlock <strong>{discount}%</strong> discount on your basket items</p>
                    }
                    {
                        couponType === "on-Purchase" &&
                        <p>Unlock <strong>{discount}%</strong> discount on
                            purchase more than <strong>₹{purchaseLimit}</strong>
                        </p>
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
        </div>
    );
}

export default CouponCard;