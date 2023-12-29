import './mainProductCard.css'
import './mediaQueryMainProductCard.css';
import {motion} from "framer-motion";
import {specialMessage} from "../../../data/data";
import cartAddLightIcon from "../../../assets/icons/cart_add_Light_Icon.svg";
import cartRemoveLightIcon from "../../../assets/icons/cart_remove_Light_Icon.svg";

const MainProductCard = ({
                             index,
                             productImage,
                             productName,
                             price,
                             buyBtn,
                             handleBuy,
                             isDiscount,
                             discount,
                             indexNumber,
                             message
                         }) => {

    const productCardAnimation = {
        initial: {opacity: 0, scale: 0.85},
        animate: () => ({
            opacity: 1,
            scale: 1,
            transition: {delay: 0.1 * index, type: "spring", stiffness: 300, damping: 20}
        }),
    }

    return (
        <motion.div
            className="mainProductCard"
            variants={productCardAnimation}
            initial="initial"
            animate="animate"
        >
            <section className="mainProductCard__productImage">
                <img src={productImage} alt={productName}/>
            </section>
            <section className="mainProductCard__productInfoContainer">
                <div className="mainProductCard__productInfo">
                    <h2>{productName}</h2>
                    <p><small>₹</small>{price}</p>
                </div>
                <div className="mainProductCard__notificationContainer">
                    {
                        isDiscount &&
                        <div className="mainProductCard__notificationContainer__message">
                            <p>
                                {discount}% Off Pay Only <small>₹</small>
                                {Math.floor(price - (price * discount) / 100)}.00
                            </p>
                        </div>
                    }
                    {
                        !isDiscount &&
                        <motion.div
                            className="mainProductCard__messageContainer"
                            initial={{x: 70}}
                            animate={{x: 0}}
                        >
                            <motion.p
                                className="mainProductCard__messageContainer__message"
                                initial={{opacity: 0}}
                                animate={message ? {opacity: 1} : {opacity: 0}}
                            >
                                "{specialMessage[indexNumber].message}"
                            </motion.p>
                        </motion.div>
                    }
                </div>
            </section>
            <section
                className="mainProductCard__btnContainer"
            >
                <motion.div
                    className="mainProductCard__btnContainer__iconContainer"
                    initial={{x: 0}}
                    animate={buyBtn ? {x: -50} : {x: 0}}
                    transition={{ease: "easeOut", duration: 0.5}}
                >
                    <img
                        src={cartAddLightIcon}
                        alt="addAndRemoveFromCartIcon"
                    />
                </motion.div>
                <motion.div
                    className="mainProductCard__btnContainer__iconContainer"
                    initial={{x: 50}}
                    animate={buyBtn ? {x: 0} : {x: -50}}
                    transition={{ease: "easeOut", duration: 0.5}}
                >
                    <img
                        src={cartRemoveLightIcon}
                        alt="addAndRemoveFromCartIcon"
                    />
                </motion.div>
                <button
                    className="mainProductCard__addToCartBtn"
                    onClick={handleBuy}
                    style={{
                        background: buyBtn ? "var(--color03)" : "var(--themeColor01)",
                    }}
                >
                    {buyBtn ? "Remove" : "Buy"}
                </button>
            </section>
        </motion.div>
    );
}

export default MainProductCard;