import './gridViewCard.css'
import './darkModeStyle.css';
import './lightModeStyle.css';
import './mediaQueryGridViewCard.css';

import {motion} from "framer-motion";

import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";

const GridViewCard = ({
                          index,
                          productImage,
                          productName,
                          price,
                          buyBtn,
                          handleBuy,
                          isDiscount,
                          discount,
                          indexNumber,
                          message,
                          theme
                      }) => {

    const productCardAnimation = {
        initial: {
            opacity: 0,
            scale: 0.9,
        },
        animate: () => ({
            opacity: 1,
            scale: 1,
            transition: {delay: 0.1 * index, type: "spring", stiffness: 300, damping: 20}
        }),
    }

    return (
        <motion.div
            className={
                `mainProductCard 
                ${theme === "dark"
                    ? "mainProductCard__dark"
                    : "mainProductCard__light"}`
            }
            variants={productCardAnimation}
            initial="initial"
            animate="animate"
        >
            <section className="mainProductCard__productImage">
                {
                    isDiscount &&
                    <div className="mainProductCard__messageContainer">
                        <p>{isDiscount && `${discount}% Off`}</p>
                    </div>
                }
                <img src={productImage} alt={productName}/>
            </section>

            <div
                className={
                    `mainProductCard__productInfo 
                        ${theme === "dark"
                        ? "mainProductCard__productInfo__dark"
                        : "mainProductCard__productInfo__light"}`
                }
            >
                <h2>{productName}</h2>
                <div
                    className={
                        `mainProductCard__productInfo__productPrice 
                        ${theme === "dark"
                            ? "mainProductCard__productInfo__productPrice__dark"
                            : "mainProductCard__productInfo__productPrice__light"}`
                    }
                >
                    {
                        isDiscount &&
                        <p className="price__big">
                            <small>₹ </small>
                            {Math.floor(price - (price * discount) / 100)}
                        </p>
                    }
                    <p
                        className={
                            isDiscount
                                ? `price__small ${
                                    theme === "dark"
                                        ? "price__small__dark"
                                        : "price__small__light"
                                }` : "price__big"
                        }
                    >
                        {isDiscount && "Actual Price "}
                        <small>₹ </small>{price}
                    </p>
                </div>
            </div>

            <section className="mainProductCard__btnContainer">
                <button
                    className={
                        `mainProductCard__addToCartBtn
                    ${theme === "dark"
                            ? "mainProductCard__addToCartBtn__dark"
                            : "mainProductCard__addToCartBtn__light"}`
                    }
                    style={{
                        background: buyBtn ? "var(--color03)" : "var(--color05)",
                        color: buyBtn ? "var(--colorWhite)" : "var(--colorBlack)"
                    }}
                    onClick={handleBuy}
                >
                    {buyBtn ? <RemoveShoppingCartOutlinedIcon style={{
                        color: buyBtn ? "var(--colorWhite)" : "var(--colorBlack)",
                        margin: "0 10px 0 0",
                        fontSize: "18px",
                        fontWeight: 200
                    }}/> : <AddShoppingCartOutlinedIcon style={{
                        color: buyBtn ? "var(--colorWhite)" : "var(--colorBlack)",
                        margin: "0 10px 0 0",
                        fontSize: "18px",
                        fontWeight: 200
                    }}/>}
                    {buyBtn ? "Remove" : "Add to Basket"}
                </button>
            </section>
        </motion.div>
    );
}

export default GridViewCard;