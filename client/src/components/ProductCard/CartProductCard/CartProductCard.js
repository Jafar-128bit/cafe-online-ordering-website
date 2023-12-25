import'./cartProductCard.css';

import {useEffect} from "react";
import {motion, stagger} from "framer-motion";
import {updateCartItem} from "../../../store/slices/cartSlices";
import addLightIcon from "../../../assets/icons/add_Light_Icon.svg";
import removeLightIcon from "../../../assets/icons/remove_Light_Icon.svg";

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
            {opacity: 1, scale: 1, height: "72px"},
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
            className="cart__productInfo"
        >
            <section className="cart__productInfo__section01">
                <img src={productImage} alt={productName} width="50px"/>
            </section>

            <section className="cart__productInfo__section02">
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
                    <img src={addLightIcon} alt="icon add" height="20px"/>
                </motion.button>
                <motion.p className="cart__productInfo__section03__quantityCounter animateQtyComponents">
                    {productQuantity}
                </motion.p>
                <motion.button
                    type="button"
                    className="cart__productInfo__section03__qtyBtn animateQtyComponents"
                    onClick={() => handleQuantity("dec")}
                >
                    <img src={removeLightIcon} alt="icon remove" height="20px"/>
                </motion.button>
            </motion.section>
        </motion.div>
    );
};

export default CartProductCard;