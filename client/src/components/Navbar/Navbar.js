import './navbar.css';
import cartIcon from '../../assets/icons/cartIcon.svg';
// import cartIconDark from '../../assets/icons/cartIconDark.svg';
import searchIcon from '../../assets/icons/searchIcon.svg';

import {toggleCartMenu, toggleSearchMenu} from '../../store/slices/menuSlice';

import IconContainer from "../IconContainer/IconContainer";
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";

const linkStyle = {
    color: "var(--masterColor)",
    textDecoration: "none",
    textTransform: "uppercase",
    padding: "3px",
    fontSize: "18px",
    fontWeight: "700",
    letterSpacing: "1px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

const searchButtonAnimation = {
    hide: {opacity: 0, scale: 0},
    show: {opacity: 1, scale: 1.2},
}

const Navbar = () => {
    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.cartItems);
    const [quantity, setQuantity] = useState(0);
    const [isSearchIcon, setIsSearchIcon] = useState(false);

    useEffect(() => {
        setQuantity(cartData.map((value) => value.quantity).reduce((acc, cur) => {
            return acc + cur
        }, 0));
    }, [cartData]);

    const handleSearchMenu = () => {
        dispatch(toggleSearchMenu({State: true}));
    }

    return (
        <nav className="navbar">
            <section className="navbar__section_01">
                <NavLink to="/" style={({isActive}) => ({
                    color: isActive ? "var(--masterColor)" : "var(--masterColor)",
                    textDecoration: "none",
                })}>
                    <h1 className="navbar__section_01__logo">Campus'Cafe</h1>
                </NavLink>
                <button
                    type="button"
                    className="navbar__section_01__searchBtn"
                    onMouseOver={() => setIsSearchIcon(true)}
                    onMouseLeave={() => setIsSearchIcon(false)}
                    onClick={handleSearchMenu}
                >
                    <IconContainer
                        src={searchIcon}
                        alt="search button"
                        width={25}
                        height={25}
                        background={false}
                    />
                    <motion.div
                        className="navbar__section_01__searchBtn__sudoElement"
                        variants={searchButtonAnimation}
                        animate={isSearchIcon ? 'show' : 'hide'}
                        transition={{type: "spring", stiffness: 350, damping: 15, duration: 0.1}}
                    />
                </button>
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
            </section>
            <section className="navbar__section_03">
                {/* Option 01 */}
                <button
                    type="button"
                    className="navbar__section_03__cartMenuBtn"
                    onClick={() => dispatch(toggleCartMenu({State: true}))}
                >
                    <p className="navbar__section_03__cart__indicator">{quantity}</p>
                    <IconContainer
                        src={cartIcon}
                        alt="cart icon svg"
                        width={32}
                        height={32}
                        background={false}
                    />
                    BASKET
                </button>
            </section>
        </nav>
    );
}

export default Navbar;