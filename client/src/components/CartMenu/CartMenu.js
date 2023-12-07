import './cartMenu.css';
import closeIcon from '../../assets/icons/closeIcon.svg';

import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";

import IconContainer from "../IconContainer/IconContainer";
import {toggleCartMenu, togglePaymentMenu} from "../../store/slices/menuSlice";
import ProductCardList from "../ProductCard/ProductCardList";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const cartMenuAnimation = {
    hide: {scale: 0, opacity: 0, transition: {duration: 0.15, ease: "easeOut"}},
    show: {scale: 1, opacity: 1, transition: {duration: 0.15, ease: "easeIn"}},
}

const CartMenu = () => {
    const dispatch = useDispatch();
    const [subTotal, setSubTotal] = useState(0);
    // const [cartMenuOpen, setCartMenuOpen] = useState(false);
    const cartMenuState = useSelector((state) => state.menuState.cartState);
    const {State, zIndex} = cartMenuState;
    const paymentMenuState = useSelector((state) => state.menuState.paymentMenuState.State);
    const cartData = useSelector((state) => state.cartItems);

    useEffect(() => {
        setSubTotal(cartData.map((value) => value.price * value.quantity).reduce((acc, cur) => acc + cur, 0));
    }, [cartData]);

    const handleClose = () => {
        dispatch(toggleCartMenu({State: false}));
        dispatch(togglePaymentMenu({State: false}));
    };
    const handlePaymentOpen = () => dispatch(togglePaymentMenu({State: true}));

    return (
        <motion.div
            className={`cartMenu ${State ? "cartMenuOpen" : "cartMenuHide"}`}
            style={{zIndex: zIndex}}
            variants={cartMenuAnimation}
            animate={State ? 'show' : 'hide'}
        >
            <button
                type="button"
                className="closeBtn"
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
            <p className="cartMenu__title">CART MENU</p>
            <div className="separator-full-black-horizontal"/>
            <div className="cartMenu__productList"
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
            <div className="separator-full-black-horizontal"/>
            <div className="cartMenu__subTotal">
                <p className="cartMenu__subTotal__subtext">Subtotal</p>
                <p className="cartMenu__subTotal__subtext">₹{subTotal}</p>
            </div>
            <div className="separator-full-black-horizontal"/>
            <div className="cartMenu__btn">
                <button type="button" onClick={handleClose}>Continue Shopping</button>
                {cartData.length !== 0 && <button
                    type="button"
                    onClick={handlePaymentOpen}
                    className={paymentMenuState ? "cartMenu__btn__active" : "cartMenu__btn__inActive"}
                >
                    {paymentMenuState ?
                        <p>
                            <LoadingScreen
                                width={15}
                                height={15}
                                color="var(--color07)"
                                loadingThickness={2}
                                size="maxContent"
                            />
                            Processing...
                        </p> : 'Proceed to Checkout'
                    }
                </button>}
            </div>
        </motion.div>
    );
}

export default CartMenu;