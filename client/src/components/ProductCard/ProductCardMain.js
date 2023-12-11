import './productCard.css';
import IconContainer from "../IconContainer/IconContainer";
import cartIcon from "../../assets/icons/cartIcon.svg";

import {motion} from "framer-motion";

const ProductCardMain = ({id, productImage, productName, price, buyBtn, handleBuy, index}) => {
    const productCardAnimation = {
        initial: {opacity: 0, scale: 0.85},
        animate: () => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: 0.1 * index,
            }
        }),
    }

    return (
        <motion.div
            className="productCard"
            style={{backgroundImage: `url(${productImage})`}}
            variants={productCardAnimation}
            initial="initial"
            animate="animate"
        >
            <p className="productCard__productName">{productName}</p>
            <p className="productCard__productPrice">₹{price}</p>
            <button
                className={
                    `productCard__addToCard ${buyBtn ?
                        "productCard__addToCard__hide"
                        : "productCard__addToCard__show"}`
                }
                onClick={handleBuy}
            >
                <IconContainer
                    src={cartIcon}
                    alt="cart icon svg"
                    width={32}
                    height={32}
                    background={false}
                />
                Buy
            </button>
        </motion.div>
    );
}

export default ProductCardMain;