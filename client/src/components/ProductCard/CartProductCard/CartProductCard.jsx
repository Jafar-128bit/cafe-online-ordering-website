import './cartProductCard.css';
import './darkModeStyle.css';
import './lightModeStyle.css';
import './mediaQueryCartProductCard.css';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import {useEffect} from "react";
import {motion, stagger} from "framer-motion";
import {updateCartItem} from "../../../store/slices/cartSlices";

const CartProductCard = ({
                             id,
                             productName,
                             productImage,
                             productPrice,
                             productQuantity,
                             dispatch,
                             setItemToRemove,
                             setTogglePopMessage,
                             animate,
                             theme
                         }) => {

    useEffect(() => {
        animate(".cart__productInfo",
            {opacity: 1},
            {duration: 0.2, delay: stagger(0.1, {startDelay: 0.1})}
        );

        animate(".cart__productInfo__section02",
            {opacity: 1},
            {duration: 0.2},
        );

        animate(".cart__productInfo__section03",
            {opacity: 1,},
            {duration: 0.25, delay: 0.3}
        );
    });

    const handleQuantity = (flag) => {
        let newQuantity;

        if (flag === "dec" && productQuantity === 1) {
            setItemToRemove({
                id: id,
                productImage: productImage,
                productName: productName,
                price: productPrice,
            });
            setTogglePopMessage(true);
        }

        if (flag === "dec" && productQuantity > 1) newQuantity = productQuantity - 1;
        else if (flag === "inc" && productQuantity < 10) newQuantity = productQuantity + 1;
        else return;

        dispatch(updateCartItem({
            itemId: id,
            updatedItem: {
                id: id,
                productImage: productImage,
                productName: productName,
                price: productPrice,
                quantity: newQuantity,
            }
        }));
    };

    return (
        <motion.div
            className={
                `cart__productInfo 
                ${theme === "dark"
                    ? "cart__productInfo__dark"
                    : "cart__productInfo__light"}`
            }
        >
            <section
                className={
                    `cart__productInfo__section01 
                    ${theme === "dark"
                        ? "cart__productInfo__section01__dark"
                        : "cart__productInfo__section01__light"}`
                }
            >
                <img src={productImage} alt={productName} width="50px"/>
            </section>

            <section
                className={
                    `cart__productInfo__section02 
                    ${theme === "dark"
                        ? "cart__productInfo__section02__dark"
                        : "cart__productInfo__section02__light"}`
                }
            >
                <p className="cart__productInfo__section02__name">{productName}</p>
                <p className="cart__productInfo__section02__price">
                    Price ₹ {productPrice}
                </p>
                <p className="cart__productInfo__section02__totalPrice">
                    Total <small>₹ </small>{productPrice * productQuantity}
                </p>
            </section>

            <motion.section className="cart__productInfo__section03">
                <motion.button
                    type="button"
                    className="cart__productInfo__section03__qtyBtn animateQtyComponents"
                    onClick={() => handleQuantity("inc")}
                >
                    <AddOutlinedIcon style={{color: "var(--colorWhite)"}}/>
                </motion.button>
                <motion.p className="cart__productInfo__section03__quantityCounter animateQtyComponents">
                    {productQuantity}
                </motion.p>
                <motion.button
                    type="button"
                    className="cart__productInfo__section03__qtyBtn animateQtyComponents"
                    onClick={() => handleQuantity("dec")}
                >
                    {productQuantity < 2
                        ? <CloseOutlinedIcon style={{color: "var(--colorWhite)"}}/>
                        : <RemoveOutlinedIcon style={{color: "var(--colorWhite)"}}/>
                    }
                </motion.button>
            </motion.section>
        </motion.div>
    );
}

export default CartProductCard;