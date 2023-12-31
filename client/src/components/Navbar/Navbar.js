import './navbar.css';
import './lightModeStyle.css';
import './darkModeStyle.css';
import './responsiveNavbar.css';

import cartDarkIcon from '../../assets/icons/cart_Dark_Icon.svg';
import cartLightIcon from '../../assets/icons/cart_Light_Icon.svg';
import arrowDarkIcon from '../../assets/icons/arrowBack_Dark_Icon.svg';
import arrowLightIcon from '../../assets/icons/arrowBack_Light_Icon.svg';
import notificationDarkIcon from "../../assets/icons/notifications__Dark__Icon.svg";
import notificationLightIcon from "../../assets/icons/notifications__Light__Icon.svg";

import nightModeDarkIcon from "../../assets/icons/nightMode__Dark__Icon.svg"
import lightModeLightIcon from "../../assets/icons/lightMode__Light__Icon.svg";

import {toggleCouponMenu, toggleNotificationMenu} from "../../store/slices/menuSlice";
// import {toggleSendNotification, toggleRemoveNotification} from "../../store/slices/notificationMenuSlices";

import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {toggleThemeMode} from "../../store/slices/themeSwitchSlices";

const basketIconAnimation = {
    initial: {x: 0},
    animate: {
        x: [0, 5, -5, 3, -3, 1, -1, 0],
        transition: {ease: "easeIn", duration: 0.5,},
    },
}
const notificationIconAnimation = {
    initial: {rotate: 0},
    animate: {
        rotate: [0, 5, -5, 5, -5, 5, -5, 0],
        transition: {ease: "easeIn", duration: 0.45,},
    },
}

const arrowIconAnimation = {
    hide: {y: -60},
    show: {y: 0},
    transition: {ease: "easeIn", duration: 0.25}
}

const Navbar = ({theme}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const locationName = useLocation().pathname.split("/")[1];
    const cartData = useSelector((state) => state.cartItems);
    const notificationMenuState = useSelector(state => state.menuState.notificationMenuState);
    const {State} = notificationMenuState;
    const [quantity, setQuantity] = useState(0);
    const [iconAnimate, setIconAnimate] = useState(false);
    const [isLink, setIsLink] = useState(null);
    const [isBackBtnHide, setBackBtnHide] = useState(true);
    const [isRingNotificationIcon, setRingNotificationIcon] = useState(false);

    const handleNotificationMenu = () => {
        dispatch(toggleCouponMenu({State: false}));
        dispatch(toggleNotificationMenu({State: !State}));
    }

    const handleNavigation = () => {
        dispatch(toggleNotificationMenu({State: false}));
        navigate(-1);
    }

    const handleSwitch = () => {
        if (theme === "light") dispatch(toggleThemeMode({theme: "dark"}));
        else dispatch(toggleThemeMode({theme: "light"}));
    }

    useEffect(() => {
        setQuantity(cartData.map((value) => value.quantity).reduce((acc, cur) => acc + cur, 0));
        setIconAnimate(true);
        setTimeout(() => {
            setIconAnimate(false);
        }, 500);

        if (locationName === "") setIsLink(0);
        else if (locationName === "menu") setIsLink(1);
        else if (locationName === "cart") setIsLink(2);
        else if (locationName === "search") setIsLink(3);

        if (locationName === "") setBackBtnHide(false);
        else setBackBtnHide(true);

    }, [cartData, locationName]);

    useEffect(() => {
        setInterval(() => {
            setRingNotificationIcon(false);
            setTimeout(() => {
                setRingNotificationIcon(true);
            }, 500);
        }, 15000);
    }, []);

    const linkStyle = {
        color: theme === "dark" ? "var(--color04)" : "var(--color02)",
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

    return (
        <nav className="navbar">
            <section className="navbar__section_01">
                <motion.button
                    type="button"
                    className={`
                    navbar__section_01__hideIconButton 
                    ${theme === "dark" 
                        ? "navbar__section_01__hideIconButton__dark" 
                        : "navbar__section_01__hideIconButton__light"}
                    `}
                    onClick={handleNavigation}
                    variants={arrowIconAnimation}
                    animate={isBackBtnHide ? "show" : "hide"}
                    transition="transition"
                >
                    <img
                        src={theme === "dark" ? arrowLightIcon : arrowDarkIcon}
                        alt="arrow light icon"
                    />
                    <p>Go Back</p>
                </motion.button>
            </section>
            <section
                className={
                    `navbar__section_02
                    ${theme === "dark"
                        ? "navbar__section_02__dark"
                        : "navbar__section_02__light"}`
                }
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
                    Basket
                    <div className={isLink === 2 ? `navbar__section_02__line` : `navbar__section_02__line__hide`}/>
                </NavLink>
                {/* Link 04 */}
                <NavLink to="/search" style={{...linkStyle}} onClick={() => setIsLink(3)}>
                    Search
                    <div className={isLink === 3 ? `navbar__section_02__line` : `navbar__section_02__line__hide`}/>
                </NavLink>
            </section>
            <section
                className="navbar__section_03"
            >
                {/* Option 01 */}
                <motion.button
                    type="button"
                    className="navbar__section_03__notificationMenuBtn"
                    onClick={handleNotificationMenu}
                    variants={notificationIconAnimation}
                    initial="initial"
                    animate={isRingNotificationIcon ? "animate" : ""}
                >
                    <img src={theme === "dark" ? notificationLightIcon : notificationDarkIcon} alt="cart icon"/>
                </motion.button>
                {/* Option 02 */}
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
                        <img src={theme === "dark" ? cartLightIcon : cartDarkIcon} alt="cart icon"/>
                    </motion.div>
                    <motion.p
                        className={`navbar__section_03__cart__indicator ${
                            theme === "dark"
                                ? "navbar__section_03__cart__indicator__dark"
                                : "navbar__section_03__cart__indicator__light"
                        }`}
                        animate={quantity > 0 ? {y: 0} : {y: -25}}
                    >
                        {quantity === 0 ? "1" : quantity}
                    </motion.p>
                </button>
                {/* Option 03 */}
                <button
                    type="button"
                    onClick={handleSwitch}
                    className="navbar__section_03__themeSwitcher"
                >
                    <motion.div
                        className="themeSwitcherBackgroundNightMode"
                        initial={{opacity: 0}}
                        animate={theme === "light" ? {opacity: 0} : {opacity: 1}}
                        transition={{duration: 0.25}}
                    />
                    <motion.div
                        className="themeSwitcherBackgroundLightMode"
                        initial={{opacity: 1}}
                        animate={theme === "dark" ? {opacity: 0} : {opacity: 1}}
                        transition={{duration: 0.25}}
                    />
                    <motion.div
                        className={
                            `navbar__section_03__themeSwitcher__nobe ${
                                theme === "dark"
                                    ? "themeSwitcherBackgroundLightMode"
                                    : "themeSwitcherBackgroundNightMode"
                            }`
                        }
                        initial={{x: 0}}
                        animate={theme === "dark" ? {x: 30, rotate: 180} : {x: 0, rotate: 0}}
                        transition={{ease: "easeOut", duration: 0.25}}
                    >
                        <motion.img
                            src={lightModeLightIcon}
                            alt="mode icon"
                            initial={{opacity: 1}}
                            animate={theme === "light" ? {opacity: 1} : {opacity: 0}}
                            transition={{duration: 0.25}}
                        />
                        <motion.img
                            src={nightModeDarkIcon}
                            alt="mode icon"
                            initial={{opacity: 0}}
                            animate={theme === "dark" ? {opacity: 1} : {opacity: 0}}
                            transition={{duration: 0.25}}
                        />
                    </motion.div>
                </button>
            </section>
        </nav>
    );
}

export default Navbar;