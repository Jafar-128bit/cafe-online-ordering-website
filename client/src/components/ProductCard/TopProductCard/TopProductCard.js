import './topProductCard.css';
import './mediaQueryTopProductCard.css';

import cartAddLightIcon from "../../../assets/icons/cart_add_Light_Icon.svg";
import cartRemoveLightIcon from "../../../assets/icons/cart_remove_Light_Icon.svg";

import {motion} from 'framer-motion';

const productCardSmall = {
    hidden: {scale: 0, opacity: 0,},
    visible: {scale: 1, opacity: 1,},
};

const TopProductCard = ({productImage, productName, price, buyBtn, handleBuy, rank, isDiscount, discount}) => {

    return (
        <motion.div
            className="topProductCard"
            variants={productCardSmall}
            transition={{type: "spring", stiffness: 300, damping: 20}}
        >
            <div className="topProductCard__imageContainer">
                <img src={productImage} alt={productName}/>
            </div>
            <div className="topProductCard__infoContainer">
                <p className="topProductCard__infoContainer__productName">{productName}</p>
                <p className="topProductCard__infoContainer__productPrice"><small>₹ </small>{price}.00</p>
                <button
                    type="button"
                    className="topProductCard__infoContainer__addToCartBtn"
                    onClick={handleBuy}
                    style={{
                        background: buyBtn ? "var(--color03)" : "var(--themeColor01)",
                    }}
                >
                    <motion.img
                        src={cartAddLightIcon}
                        alt="addAndRemoveFromCartIcon"
                        initial={{x: 0}}
                        animate={buyBtn ? {x: 40} : {x: 0}}
                        transition={{ease: "easeOut", duration: 0.5}}
                    />
                    <motion.img
                        src={cartRemoveLightIcon}
                        alt="addAndRemoveFromCartIcon"
                        initial={{x: -40}}
                        animate={buyBtn ? {x: 0} : {x: -40}}
                        transition={{ease: "easeOut", duration: 0.5}}
                    />
                </button>
            </div>
            <div className="topProductCard__rankContainer">
                <p>#{rank}</p>
            </div>
            <motion.div
                className="topProductCard__offerIndicator"
                initial={{y: 0}}
                animate={isDiscount ? {y: 0} : {y: 30}}
            >
                <p className="topProductCard__offerIndicator__message">
                    {discount}% Off Pay Only <small>₹</small>
                    {Math.floor(price - (price * discount) / 100)}
                </p>
            </motion.div>
        </motion.div>
    );
}

export default TopProductCard;