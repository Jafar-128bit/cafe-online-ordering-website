import './cartMenu.css';
import closeIcon from '../../assets/icons/closeIcon.svg';

import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";

import IconContainer from "../IconContainer/IconContainer";
import {toggleCartMenu, togglePaymentMenu} from "../../store/slices/menuSlice";
import ProductCardList from "../ProductCard/ProductCardList";

const cartMenuAnimation = {
    hide: {x: 700},
    show: {x: 0},
}

const CartMenu = () => {
    const dispatch = useDispatch();
    const [subTotal, setSubTotal] = useState(0);
    const cartMenuState = useSelector((state) => state.menuState.cartState);
    const {State, zIndex} = cartMenuState;
    const cartData = useSelector((state) => state.cartItems);

    useEffect(() => {
        setSubTotal(cartData.map((value) => value.price * value.quantity).reduce((acc, cur) => acc + cur, 0));
    }, [cartData]);

    const handleClose = () => {
        dispatch(toggleCartMenu({State: false}));
        dispatch(togglePaymentMenu({State: false}));
    };
    const handlePaymentOpen = () => {
        dispatch(toggleCartMenu({State: false}));
        dispatch(togglePaymentMenu({State: true}));
    }

    return (
        <motion.div
            className="cartMenu darkGlass75"
            style={{zIndex: zIndex}}
            variants={cartMenuAnimation}
            animate={State ? 'show' : 'hide'}
            transition={{type: "spring", stiffness: 300, damping: 25}}
        >
            <button
                type="button"
                className="closeBtn cartMenu__closeBtn"
                onClick={handleClose}
            >
                <IconContainer
                    src={closeIcon}
                    alt="close icon svg"
                    width={30}
                    height={30}
                    background={false}
                />
            </button>
            <div className="cartMenu__title">
                <p>BASKET</p>
            </div>
            <div className="cartMenu__productList addScroll"
                 style={{placeContent: `${cartData.length !== 0 ? "flex-start" : "center"}`}}>
                {cartData.length !== 0 ? cartData.map((value) => <ProductCardList
                        key={value.id}
                        id={value.id}
                        productName={value.productName}
                        productImage={value.productImage}
                        price={value.price}
                        quantity={value.quantity}
                    />
                ) : <p className="cartMenu__productList__emptyMessage">Cart is Empty</p>}
            </div>
            <div className="cartMenu__subTotal">
                <p className="cartMenu__subTotal__subtext">Subtotal</p>
                <p className="cartMenu__subTotal__subtext">₹{subTotal}</p>
            </div>
            <div className="cartMenu__btn">
                <button type="button" onClick={handleClose}>Continue Shopping</button>
                {cartData.length !== 0 && <button
                    type="button"
                    onClick={handlePaymentOpen}
                >
                    Proceed to Checkout
                </button>}
            </div>
        </motion.div>
    );
}

export default CartMenu;