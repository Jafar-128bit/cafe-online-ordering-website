import './searchProductCard.css';
import './mediaQuerySearchProductCard.css';

import {specialMessage} from '../../../data/data';

import {motion} from "framer-motion";
import cartAddLightIcon from "../../../assets/icons/cart_add_Light_Icon.svg";
import cartRemoveLightIcon from "../../../assets/icons/cart_remove_Light_Icon.svg";

const SearchProductCard = ({id, productImage, productName, price, buyBtn, handleBuy, discount, isDiscount, indexNumber, message}) => {

    return (
        <motion.div className="searchProductCard">
            <section className="searchProductCard__section01">
                <img src={productImage} alt={productName}/>
            </section>

            <section className="searchProductCard__section02">
                <div className="searchProductCard__section02__infoContainer">
                    <p className="searchProductCard__section02__productName">
                        {productName}
                    </p>
                    <p className="searchProductCard__section02__productPrice">
                        <small>₹ </small>{price}.00
                    </p>
                </div>
                <div className="searchProductCard__section02__actionContainer">
                    <section className="searchProductCard__section02__notificationContainer">
                        <motion.div
                            className="searchProductCard__section02__offerIndicator"
                            initial={{y: 70}}
                            animate={isDiscount ? {y: 0} : {y: 70}}
                        >
                            <p className="searchProductCard__section02__offerIndicator__message">
                                {discount}% Off Pay Only <small>₹</small>
                                {Math.floor(price - (price * discount) / 100)}.00
                            </p>
                        </motion.div>
                        {
                            !isDiscount &&
                            <motion.div
                                className="searchProductCard__section02__messageIndicator"
                                initial={{y: 70}}
                                animate={{y: 0}}
                            >
                                <motion.p
                                    className="searchProductCard__section02__message"
                                    initial={{opacity: 0}}
                                    animate={message ? {opacity: 1} : {opacity: 0}}
                                >
                                    {specialMessage[indexNumber].message}
                                </motion.p>
                            </motion.div>
                        }
                    </section>
                    <section className="searchProductCard__section02__btnContainer">
                        <button
                            type="button"
                            className="searchProductCard__btnContainer__addToCartBtn"
                            onClick={handleBuy}
                            style={{
                                background: buyBtn ? "var(--color03)" : "var(--themeColor01)",
                            }}
                        >
                            <motion.img
                                src={cartAddLightIcon}
                                alt="addAndRemoveFromCartIcon"
                                initial={{x: 0}}
                                animate={buyBtn ? {x: 50} : {x: 0}}
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
                    </section>

                </div>
            </section>
        </motion.div>
    );
}

export default SearchProductCard;