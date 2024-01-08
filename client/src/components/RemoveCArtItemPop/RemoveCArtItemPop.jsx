import './removeCArtItemPop.css';

import {removeFromCart} from "../../store/slices/cartSlices";
import {motion} from "framer-motion";

const shadeAnimation = {
    hide: {opacity: 0, display: "none"},
    show: {opacity: 1, display: "flex"}
}

const cartPopupRemoveAnimation = {
    hide: {opacity: 0, scale: 0},
    show: {opacity: 1, scale: 1}
}

const RemovePopUpCard = ({itemToRemove, dispatch, togglePopMessage, setTogglePopMessage, setItemToRemove, theme}) => {
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
            className={`cart__shade ${theme === "dark" ? "cart__shade__dark" : "cart__shade__light"}`}
            variants={shadeAnimation}
            animate={togglePopMessage ? "show" : "hide"}
        >

            <motion.div
                className={
                    `cart__removeItemPopup 
                    ${theme === "dark"
                        ? "cart__removeItemPopup__dark"
                        : "cart__removeItemPopup__light"}`
                }
                variants={cartPopupRemoveAnimation}
                animate={togglePopMessage ? "show" : "hide"}
                transition={{duration: 0.15}}
            >
                <h4 className={
                    `cart__removeItemCard__message 
                    ${theme === "dark"
                        ? "cart__removeItemCard__message__dark"
                        : "cart__removeItemCard__message__light"}`
                }>
                    Do you want to remove this item?
                </h4>
                <div className="cart__removeItemInfo">
                    <div className={
                        `cart__removeItemInfo__imageContainer 
                        ${theme === "dark"
                            ? "cart__removeItemInfo__imageContainer__dark"
                            : "cart__removeItemInfo__imageContainer__light"}`
                    }>
                        <img src={itemToRemove?.productImage} alt={itemToRemove?.productName} width="70px"/>
                    </div>
                    <div className="cart__removeItemInfo__priceAndNameContainer">
                        <p className={
                            `cart__removeItemInfo__name 
                            ${theme === "dark"
                                ? "cart__removeItemInfo__name__dark"
                                : "cart__removeItemInfo__name__light"}`
                        }>{itemToRemove?.productName}</p>
                        <p className={
                            `cart__removeItemInfo__price 
                            ${theme === "dark"
                                ? "cart__removeItemInfo__price__dark"
                                : "cart__removeItemInfo__price__light"}`
                        }>Price ₹ {itemToRemove?.price} only!</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="cart__removeItemBtnContainer"
                variants={cartPopupRemoveAnimation}
                animate={togglePopMessage ? "show" : "hide"}
                transition={{duration: 0.15,}}
            >
                <button
                    className={
                        `cart__removeItemBtn ${theme === "dark"
                            ? "cart__removeItemBtn__dark"
                            : "cart__removeItemBtn__light"}`
                    }
                    type="button"
                    onClick={() => handleRemove(true)}
                >
                    Remove!
                </button>
                <button
                    className={
                        `cart__removeItemBtn ${theme === "dark"
                            ? "cart__removeItemBtn__dark"
                            : "cart__removeItemBtn__light"}`
                    }
                    type="button"
                    onClick={() => handleRemove(false)}
                >
                    Don't
                </button>
            </motion.div>

        </motion.section>
    );
}

export default RemovePopUpCard;