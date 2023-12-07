import './productCardSmall.css';
import {useState} from "react";
import {motion} from 'framer-motion';

const productCardSmall = {
    hidden: {scale: 0, opacity: 0,},
    visible: {scale: 1, opacity: 1,},
};
const priceAnimation = {
    hide: {opacity: 0, y: -40},
    show: {opacity: 1, y: 0}
}
const productNameAnimation = {
    hide: {x: 0},
    show: {x: -170}
}
const addToCartAnimation = {
    hide: {x: 175},
    show: {x: 0}
}

const ProductCardSmall = ({id, productImage, productName, price, buyBtn, handleBuy}) => {
    const [onHover, setOnHover] = useState(true);

    return (
        <motion.div
            className="productCardSmall"
            style={{backgroundImage: `url(${productImage})`,}}
            onClick={handleBuy}
            variants={productCardSmall}
            transition={{type: "spring", stiffness: 300, damping: 20}}
        >
            <motion.p
                className="productCardSmall__productName"
                variants={productNameAnimation}
                animate={onHover ? 'hide' : 'show'}
                transition={{ease: "easeIn", duration: 0.1,}}
            >
                {productName}
            </motion.p>
            <motion.p
                className="productCardSmall__addToCart"
                variants={addToCartAnimation}
                animate={onHover && !buyBtn ? 'hide' : 'show'}
                transition={{ease: "easeIn", duration: 0.1,}}
            >
                {buyBtn ? 'Added' : 'Buy'}
            </motion.p>
            <motion.p
                className="productCardSmall__productPrice"
                variants={priceAnimation}
                animate={onHover ? 'hide' : 'show'}
                transition={{type: "spring", stiffness: 300, damping: 20}}
            >₹{price}</motion.p>
            <div
                className="productCardSmall__shade"
                style={{opacity: onHover ? 0 : 0.8}}
                onMouseOver={() => setOnHover(false)}
                onMouseLeave={() => setOnHover(true)}
            />
        </motion.div>
    );
}

export default ProductCardSmall;