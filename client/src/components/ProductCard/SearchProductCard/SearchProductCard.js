import './searchProductCard.css';
import './darkModeStyle.css';
import './lightModeStyle.css';
import './mediaQuerySearchProductCard.css';

import {specialMessage} from '../../../data/data';

import {motion} from "framer-motion";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";

const SearchProductCard = ({
                               productImage,
                               productName,
                               price,
                               buyBtn,
                               handleBuy,
                               discount,
                               isDiscount,
                               indexNumber,
                               message,
                               theme
                           }) => {

    return (
        <motion.div
            className={`
                searchProductCard 
                ${theme === "dark"
                ? "searchProductCard__dark"
                : "searchProductCard__light"}
            `}
        >
            <section className="searchProductCard__section01">
                <img src={productImage} alt={productName}/>
            </section>

            <section className="searchProductCard__section02">
                <div
                    className={`
                        searchProductCard__section02__infoContainer 
                        ${theme === "dark"
                        ? "searchProductCard__section02__infoContainer__dark"
                        : "searchProductCard__section02__infoContainer__light"}
                    `}
                >
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
                                    className={
                                        `searchProductCard__section02__message 
                                        ${theme === "dark"
                                            ? "searchProductCard__section02__message__dark"
                                            : "searchProductCard__section02__message__light"}`
                                    }
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
                                background: buyBtn ? "var(--color03)" : "var(--color01)",
                            }}
                        >

                            <motion.div
                                initial={{x: 0}}
                                animate={buyBtn ? {x: 50} : {x: 0}}
                                transition={{ease: "easeOut", duration: 0.5}}
                            >
                                <AddShoppingCartOutlinedIcon style={{
                                    color: "var(--colorWhite)",
                                }}/>
                            </motion.div>
                            <motion.div
                                initial={{x: -40}}
                                animate={buyBtn ? {x: 0} : {x: -40}}
                                transition={{ease: "easeOut", duration: 0.5}}
                            >
                                <RemoveShoppingCartOutlinedIcon style={{
                                    color: "var(--colorWhite)",
                                }}/>
                            </motion.div>
                        </button>
                    </section>

                </div>
            </section>
        </motion.div>
    );
}

export default SearchProductCard;