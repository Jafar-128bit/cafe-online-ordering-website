import './couponCard.css';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon, removeCoupon } from '../../store/slices/setCouponSlices';
import { cake, cold, iceCream, noodles, chai, snacks, sandwich, smoothies } from '../../data/data';
import ImageContainer from '../ImageContainer/ImageContainer';
import IconContainer from '../IconContainer/IconContainer';
import crossIcon from '../../assets/icons/closeDarkIcon.svg';


const allItems = [...cake, ...cold, ...iceCream, ...noodles, ...chai, ...snacks, ...sandwich, ...smoothies,];

const applyCouponAnimation = {
    hide: {x: 0},
    show: {x: 85}
}

const cardExpandAnimation = {
    hide: {height: 200,},
    show: {height: 500,},
}

const productListExpandAnimation = {
    hide: {
        height: 0,
        padding: "0",
        transition: {ease: "linear", duration: 0.5, delayChildren: 0.3, staggerChildren: 0.3,}
    },
    show: {
        height: 300,
        padding: "15px 0",
        transition: {ease: "linear", duration: 0.5, delayChildren: 0.3, staggerChildren: 0.3,}
    },
}

const validProductCardAnimation = {
    hide: {scale: 0.5, opacity: 0},
    show: {scale: 1, opacity: 1},
}


const discountPriceAnimation = {
    hidden: {opacity: 1, scale: 1},
    visible: {
        opacity: 1,
        scale: [1.1, 0.95, 1, 1.15, 1.05],
        transition: {ease: "linear", duration: 0.5, repeat: Infinity, repeatDelay: 1},
    },
}

const CouponCard = ({id, couponCode, discount, validProductIDs, isActive}) => {
    const dispatch = useDispatch();
    const couponId = useSelector(state => state.couponState);
    const [applyCoupon, setApplyCoupon] = useState(false);
    const [showProducts, setShowProducts] = useState(false);
    const [validProducts, setValidProducts] = useState([]);

    useEffect(() => {
        const validProductList = allItems.filter(products => validProductIDs.includes(products.id));
        const isCouponId = couponId.some((couponId) => couponId === id);
        setApplyCoupon(isCouponId);
        setValidProducts([...validProductList]);
    }, [couponId, id, validProductIDs]);

    const handleApplyCoupon = (id) => {
        if (applyCoupon === false) dispatch(addCoupon(id));
        else if (applyCoupon === true) dispatch(removeCoupon(id));
    }
    const handleCardBackground = () => {
        if (discount < 10) return "cardTypeLevel1";
        else if (discount < 20) return "cardTypeLevel2";
        else if (discount < 30) return "cardTypeLevel3";
        else if (discount < 40) return "cardTypeLevel4";
        else if (discount < 60) return "cardTypeLevel5";
        else return "cardTypeLevel6";
    }
    const handleShowProducts = () => setShowProducts(!showProducts);

    return (
        <motion.div
            className="couponCard"
            variants={cardExpandAnimation}
            animate={showProducts ? 'show' : 'hide'}
            transition={{duration: 0.4, ease: "linear",}}
        >
            <div className={`couponCard__upper ${isActive ? handleCardBackground() : "couponCard__upper__inactive"}`}>
                <h3>{discount}% OFF</h3>
            </div>
            <motion.div
                className="couponCard__productList whiteGlass35 addScroll"
                variants={productListExpandAnimation}
                animate={showProducts ? 'show' : 'hide'}
            >
                {
                    validProducts.map((product) => <motion.div
                        key={product.id}
                        className="couponCard__validProductCard"
                        variants={validProductCardAnimation}
                        animate={showProducts ? 'show' : 'hide'}
                    >
                        <ImageContainer
                            src={product.productImage}
                            alt={product.productName}
                            height="70px"
                            width="80px"
                        />
                        <p className="validProductCard__productName">{product.productName}</p>
                        <div className="validProductCard__productPrice">
                            <p className="validProductCard__productPrice__price">
                                ₹{product.price}
                                <div className="validProductCard__productPrice__price__crossIcon">
                                    <IconContainer
                                        src={crossIcon}
                                        alt="crossed icon"
                                        height={22}
                                        width={22}
                                        round={true}
                                    />
                                </div>
                            </p>
                            <motion.p
                                className="validProductCard__productPrice__discountedPrice"
                                variants={discountPriceAnimation}
                                initial="hidden"
                                animate={showProducts ? "visible" : "hidden"}
                            >
                                ₹{product.price - Math.ceil(((product.price * discount) / 100))}
                            </motion.p>
                        </div>
                    </motion.div>)
                }
            </motion.div>
            <div className="couponCard__lower">
                <p className="couponCard__lower__title">
                    Unlock a delightful {discount}% off on your basket items!
                </p>
                <button
                    type="button"
                    className="couponCard__lower__expandBtn"
                    onClick={handleShowProducts}
                >
                    {showProducts ? 'Hide' : 'Show'} Products
                </button>
                <div className="couponCard__lower__info">
                    <p className="couponCard__lower__code">{couponCode}</p>
                    <div className="couponCard__lower__applyCouponSlider">
                        <input
                            type="checkbox"
                            id={`applyCouponBtn__${id}`}
                            name="applyCouponBtn"
                            onClick={() => handleApplyCoupon(id)}
                        />
                        {isActive ? <label className="sliderBase" htmlFor={`applyCouponBtn__${id}`}>
                            Nope!
                            <motion.div
                                className="sliderCircle"
                                variants={applyCouponAnimation}
                                animate={applyCoupon ? 'show' : 'hide'}
                                transition={{type: "spring", stiffness: 300, damping: 25}}
                            >
                                Apply!
                            </motion.div>
                        </label> : <p className="couponCard__lower__applyCouponSlider__notValidMsg">Not Valid</p>}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default CouponCard;