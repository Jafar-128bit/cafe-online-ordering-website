import './navbar.css';
import './responsiveNavbar.css';

import cartIcon from '../../assets/icons/basketIcon.svg';
import foodIcon from '../../assets/icons/foodIcon.svg';
import searchLightIcon from '../../assets/icons/search2_Light_Icon.svg';

import {toggleSearchMenu} from '../../store/slices/menuSlice';

import IconContainer from "../IconContainer/IconContainer";
import {NavLink, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";

const linkStyle = {
    textDecoration: "none",
    textTransform: "uppercase",
    padding: "3px",
    margin: "0 10px",
    fontSize: "18px",
    fontWeight: "700",
    letterSpacing: "1px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
}

const searchButtonAnimation = {
    hide: {opacity: 0, scale: 0},
    show: {opacity: 1, scale: 1.1},
}

const basketIconAnimation = {
    initial: {rotate: 0, y: 0},
    animate: {
        rotate: [0, 0, 10, -5, 0, 0,],
        y: [0, 0, 5, 3, 0, 0,],
        transition: {ease: "easeIn", duration: 1,},
    },
}

const foodIconAnimation = {
    initial: {y: 0, opacity: 0},
    animate: {
        opacity: [1, 1, 0, 0, 0, 0],
        y: [10, 50, 50, 50, 0, 0],
        transition: {ease: "easeIn", duration: 1,},
    },
}

const Navbar = () => {
    const dispatch = useDispatch();
    const locationName = useLocation().pathname.split("/")[1];
    const cartData = useSelector((state) => state.cartItems);
    const [quantity, setQuantity] = useState(0);
    const [isSearchIcon, setIsSearchIcon] = useState(false);
    const [iconAnimate, setIconAnimate] = useState(false);
    const [isLink, setIsLink] = useState(null);

    useEffect(() => {
        setQuantity(cartData.map((value) => value.quantity).reduce((acc, cur) => acc + cur, 0));
        setIconAnimate(true);
        setTimeout(() => {
            setIconAnimate(false)
        }, 1050);

        if (locationName === "") setIsLink(0);
        if (locationName === "menu") setIsLink(1);
        if (locationName === "cart") setIsLink(2);

    }, [cartData, locationName]);

    const handleSearchMenu = () => dispatch(toggleSearchMenu({State: true}));

    return (
        <nav className="navbar">
            <section className="navbar__section_01">
                <NavLink to="/" style={({isActive}) => ({
                    color: "var(--colorBlack)",
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
                        src={searchLightIcon}
                        alt="search button"
                        width={25}
                        height={25}
                        background={false}
                    />
                    <motion.div
                        className="navbar__section_01__searchBtn__sudoElement1"
                        variants={searchButtonAnimation}
                        animate={isSearchIcon ? 'show' : 'hide'}
                        transition={{type: "spring", stiffness: 350, damping: 25, duration: 0.1}}
                    />
                    <motion.div
                        className="navbar__section_01__searchBtn__sudoElement2"
                        variants={searchButtonAnimation}
                        animate={isSearchIcon ? 'hide' : 'show'}
                        transition={{type: "spring", stiffness: 350, damping: 25, duration: 0.1}}
                    />
                </button>
            </section>
            <section className="navbar__section_02">
                {/* Link 01 */}
                <NavLink to="/" style={({isActive}) => ({
                    color: isActive ? "var(--themeColor01)" : "var(--colorBlack)",
                    ...linkStyle
                })} onClick={() => setIsLink(0)}>
                    Home
                    <div className={isLink === 0 ? `navbar__section_02__line` : `navbar__section_02__line__hide`}/>
                </NavLink>
                {/* Link 02 */}
                <NavLink to="/menu" style={({isActive}) => ({
                    color: isActive ? "var(--themeColor01)" : "var(--colorBlack)",
                    ...linkStyle
                })} onClick={() => setIsLink(1)}>
                    Menu
                    <div className={isLink === 1 ? `navbar__section_02__line` : `navbar__section_02__line__hide`}/>
                </NavLink>
                {/* Link 03 */}
                <NavLink to="/cart" style={({isActive}) => ({
                    color: isActive ? "var(--themeColor01)" : "var(--colorBlack)",
                    ...linkStyle
                })} onClick={() => setIsLink(2)}>
                    Cart
                    <div className={isLink === 2 ? `navbar__section_02__line` : `navbar__section_02__line__hide`}/>
                </NavLink>
            </section>
            <section className="navbar__section_03">
                {/* Option 01 */}
                <button
                    type="button"
                    className="navbar__section_03__cartMenuBtn"
                >
                    <motion.div
                        className="iconContainer navbar__icon1"
                        variants={basketIconAnimation}
                        animate={iconAnimate ? "animate" : "initial"}
                    >
                        <img src={cartIcon} alt="cart icon"/>
                    </motion.div>
                    <motion.div
                        className="iconContainer navbar__icon2"
                        variants={foodIconAnimation}
                        animate={iconAnimate ? "animate" : "initial"}
                    >
                        <img src={foodIcon} alt="food icon"/>
                    </motion.div>
                    <p className="navbar__section_03__cart__indicator">{quantity}</p>
                </button>
            </section>
        </nav>
    );
}

export default Navbar;