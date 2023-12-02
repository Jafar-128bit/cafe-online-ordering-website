import './cartMenu.css';
import closeIcon from '../../assets/icons/closeIcon.svg';
import {useDispatch, useSelector} from "react-redux";
import IconContainer from "../IconContainer/IconContainer";
import {toggleCartMenu} from "../../store/slices/menuSlice";
import ProductCardList from "../ProductCard/ProductCardList";
import {useEffect, useState} from "react";

const CartMenu = () => {
    const dispatch = useDispatch();
    const [subTotal, setSubTotal] = useState(0);
    const cartMenuState = useSelector((state) => state.menuState.cartState);
    const cartData = useSelector((state) => state.cartItems);

    useEffect(() => {
        setSubTotal(cartData.map((value) => value.price * value.quantity).reduce((acc, cur) => acc + cur, 0));
    }, [cartData]);

    const handleCloseCart = () => {
        dispatch(toggleCartMenu({
            zIndex: 99,
            cartState: false,
        }));
    }

    return (
        <div className={`cartMenu ${cartMenuState ? "cartMenuOpen" : "cartMenuHide"}`}>
            <button
                type="button"
                className="closeBtn"
                onClick={handleCloseCart}
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
            <div className="separator-full-white-horizontal"/>
            <div className="cartMenu__productList" style={{placeContent: `${cartData.length !== 0 ? "flex-start" : "center"}`}}>
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
            <div className="separator-full-white-horizontal"/>
            <div className="cartMenu__subTotal">
                <p className="cartMenu__subTotal__subtext">Subtotal</p>
                <p className="cartMenu__subTotal__subtext">₹{subTotal}</p>
            </div>
            <div className="separator-full-white-horizontal"/>
            <div className="cartMenu__btn">
                <button type="button" onClick={handleCloseCart}>Continue Shopping</button>
                {cartData.length !== 0 && <button type="button">Proceed to Checkout</button>}
            </div>
        </div>
    );
}

export default CartMenu;