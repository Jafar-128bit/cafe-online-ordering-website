import './navbar.css';
import cartIcon from '../../assets/icons/cartIcon.svg';

import {toggleCartMenu, toggleAccountMenu} from '../../store/slices/menuSlice';

import IconContainer from "../IconContainer/IconContainer";
import SearchBar from "../SearchBar/SearchBar";
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

const linkStyle = {
    color: "var(--color07)",
    textDecoration: "none",
    textTransform: "uppercase",
    padding: "3px",
    fontSize: "14px",
    fontWeight: "400",
    letterSpacing: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

const Navbar = () => {
    const dispatch = useDispatch();
    const accountMenuState = useSelector(state => state.menuState);
    const {
        zIndex,
        accountState,
    } = accountMenuState;
    const cartData = useSelector((state) => state.cartItems);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        setQuantity(cartData.map((value) => value.quantity).reduce((acc, cur) => {
            return acc + cur
        }, 0));
    }, [cartData])

    return (
        <nav className="navbar">
            <section className="navbar__section_01">
                <NavLink to="/" style={({isActive}) => ({
                    color: isActive ? "var(--color02)" : "var(--color07)",
                    textDecoration: "none",
                })}>
                    <h1 className="navbar__section_01__logo">Campus'Cafe</h1>
                </NavLink>
                <SearchBar/>
            </section>
            <section className="navbar__section_02">
                {/* Link 01 */}
                <NavLink to="/" style={({isActive}) => ({...linkStyle})}>
                    Home
                </NavLink>
                {/* Link 02 */}
                <NavLink to="/menu" style={({isActive}) => ({...linkStyle})}>
                    Menu
                </NavLink>
                {/* Link 03 */}
                <NavLink to="/favourite" style={({isActive}) => ({...linkStyle})}>
                    Favourite
                </NavLink>
            </section>
            <section className="navbar__section_03">
                {/* Option 02 */}
                <div className="navbar__section_03__accountMenu">
                    <button type="button" className="navbar__section_03__accountMenu__btn"
                            onClick={() => dispatch(toggleAccountMenu({zIndex: 95, accountState: !accountState}))}>
                        ACCOUNT
                    </button>
                </div>
                {/* Option 03 */}
                <button
                    type="button"
                    className="navbar__section_03__cartMenuBtn"
                    onClick={() => dispatch(toggleCartMenu({zIndex: 99, cartState: true}))}
                >
                    <p className="navbar__section_03__cart__indicator">{quantity}</p>
                    <IconContainer
                        src={cartIcon}
                        alt="cart icon svg"
                        width={32}
                        height={32}
                        background={false}
                    />
                    CART
                </button>
            </section>
        </nav>
    );
}

export default Navbar;