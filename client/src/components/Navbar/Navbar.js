import './navbar.css';
import './responsiveNavbar.css';

import cartLightIcon from '../../assets/icons/cart_Light_Icon.svg';
import arrowLightIcon from '../../assets/icons/arrowBack_Light_Icon.svg';

import {toggleNotificationMenu} from "../../store/slices/menuSlice";
// import {toggleSendNotification, toggleRemoveNotification} from "../../store/slices/notificationMenuSlices";

import {NavLink, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";

const linkStyle = {
    color: "var(--color06)",
    textDecoration: "none",
    textTransform: "uppercase",
    padding: "3px",
    margin: "0 10px",
    fontSize: "16px",
    fontWeight: "700",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
}

const basketIconAnimation = {
    initial: {x: 0},
    animate: {
        x: [0, 5, -5, 3, -3, 1, -1, 0],
        transition: {ease: "easeIn", duration: 0.5,},
    },
}

const navbarLinkHideAnimation = {
    hide: {y: -70, opacity: 0},
    show: {y: 0, opacity: 1},
    transition: {ease: "easeIn", duration: 0.1}
}

const arrowRotateIconAnimation = {
    hide: {rotate: 180},
    show: {rotate: 0},
    transition: {ease: "easeIn", duration: 0.25}
}

const Navbar = () => {
    const dispatch = useDispatch();
    const locationName = useLocation().pathname.split("/")[1];
    const cartData = useSelector((state) => state.cartItems);
    const notificationMenuState = useSelector(state => state.menuState.notificationMenuState);
    const {State} = notificationMenuState;
    const [quantity, setQuantity] = useState(0);
    const [iconAnimate, setIconAnimate] = useState(false);
    const [isLink, setIsLink] = useState(null);
    const [isNavbarHide, setNavbarHide] = useState(true);

    const handleNotificationMenu = () => dispatch(toggleNotificationMenu({State: !State}));

    useEffect(() => {
        setQuantity(cartData.map((value) => value.quantity).reduce((acc, cur) => acc + cur, 0));
        setIconAnimate(true);
        setTimeout(() => {
            setIconAnimate(false);
        }, 500);

        if (locationName === "") setIsLink(0);
        if (locationName === "menu") setIsLink(1);
        if (locationName === "cart") setIsLink(2);
        if (locationName === "search") setIsLink(3);

    }, [cartData, locationName]);

    useEffect(() => {
        setTimeout(() => {
            setNavbarHide(false);
        }, 500);
    }, []);

    return (
        <nav className="navbar">
            <section className="navbar__section_01">
                <motion.button
                    type="button"
                    className="navbar__section_01__autoHideIcon"
                    onClick={() => setNavbarHide(!isNavbarHide)}
                    variants={arrowRotateIconAnimation}
                    animate={isNavbarHide ? "show" : "hide"}
                    transition="transition"
                >
                    <img src={arrowLightIcon} alt="arrow light icon"/>
                </motion.button>
            </section>
            <motion.section
                className="navbar__section_02"
                variants={navbarLinkHideAnimation}
                animate={isNavbarHide ? "show" : "hide"}
                transition="transition"
            >
                {/* Link 01 */}
                <NavLink to="/" style={{...linkStyle}} onClick={() => setIsLink(0)}>
                    Home
                    <div className={isLink === 0 ? `navbar__section_02__line` : `navbar__section_02__line__hide`}/>
                </NavLink>
                {/* Link 02 */}
                <NavLink to="/menu" style={{...linkStyle}} onClick={() => setIsLink(1)}>
                    Menu
                    <div className={isLink === 1 ? `navbar__section_02__line` : `navbar__section_02__line__hide`}/>
                </NavLink>
                {/* Link 03 */}
                <NavLink to="/cart" style={{...linkStyle}} onClick={() => setIsLink(2)}>
                    Cart
                    <div className={isLink === 2 ? `navbar__section_02__line` : `navbar__section_02__line__hide`}/>
                </NavLink>
                {/* Link 04 */}
                <NavLink to="/search" style={{...linkStyle}} onClick={() => setIsLink(3)}>
                    Search
                    <div className={isLink === 3 ? `navbar__section_02__line` : `navbar__section_02__line__hide`}/>
                </NavLink>
            </motion.section>
            <section
                className="navbar__section_03"
            >
                {/* Option 01 */}
                <button
                    type="button"
                    className="navbar__section_03__cartMenuBtn"
                    onClick={handleNotificationMenu}
                >
                    <motion.div
                        className="iconContainer"
                        variants={basketIconAnimation}
                        animate={iconAnimate ? "animate" : "initial"}
                        transition="transition"
                    >
                        <img src={cartLightIcon} alt="cart icon"/>
                    </motion.div>
                    <p className="navbar__section_03__cart__indicator">{quantity}</p>
                </button>
            </section>
        </nav>
    );
}

export default Navbar;