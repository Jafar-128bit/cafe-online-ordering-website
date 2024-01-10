import './navbar.css';
import './lightModeStyle.css';
import './darkModeStyle.css';
import './responsiveNavbar.css';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import {toggleMenuBar, toggleNotificationMenu} from "../../store/slices/menuSlice";
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
        dispatch(toggleNotificationMenu({State: !State}));
    }

    const handleOpenMenuBar = () => dispatch(toggleMenuBar({State: true}));

    const handleNavigation = () => {
        dispatch(toggleNotificationMenu({State: false}));
        navigate(-1);
    }

    const handleSwitch = () => {
        if (theme === "light") dispatch(toggleThemeMode({theme: "dark"}));
        else dispatch(toggleThemeMode({theme: "light"}));
    }

    useEffect(() => {
        setQuantity(cartData.map((value) => value.totalQuantity).reduce((acc, cur) => acc + cur, 0));
        setIconAnimate(true);
        setTimeout(() => {
            setIconAnimate(false);
        }, 500);

        if (locationName === "") setIsLink(0);
        else if (locationName === "menu") setIsLink(1);
        else if (locationName === "cart") setIsLink(2);
        else if (locationName === "event") setIsLink(3);

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
                    transition={{ease: "easeIn", duration: 0.25}}
                >
                    <ArrowBackIosIcon style={{color: theme === "dark" ? "var(--colorWhite)" : "var(--colorBlack)", fontWeight: 200}}/>
                    <p>Go Back</p>
                </motion.button>
            </section>
            <section
                className="navbar__section_02"
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
                {/*<NavLink to="/event" style={{...linkStyle}} onClick={() => setIsLink(3)}>*/}
                {/*    Event*/}
                {/*    <div className={isLink === 3 ? `navbar__section_02__line` : `navbar__section_02__line__hide`}/>*/}
                {/*</NavLink>*/}
            </section>
            <section
                className="navbar__section_03"
            >
                {/* Option 01 */}
                <motion.button
                    type="button"
                    className="navbar__section_03__openMenuBtn"
                    onClick={handleOpenMenuBar}
                >
                    <MenuOutlinedIcon style={{
                        color: theme === "dark" ? "var(--colorWhite)" : "var(--colorBlack)",
                        fontSize: "35px",
                        fontWeight: 200
                    }}/>
                </motion.button>
                {/* Option 02 */}
                <motion.button
                    type="button"
                    className="navbar__section_03__notificationMenuBtn"
                    onClick={handleNotificationMenu}
                    variants={notificationIconAnimation}
                    initial="initial"
                    animate={isRingNotificationIcon ? "animate" : ""}
                >
                    <NotificationsOutlinedIcon style={{
                        color: theme === "dark" ? "var(--colorWhite)" : "var(--colorBlack)",
                        fontSize: "35px",
                        fontWeight: 200
                    }}/>
                </motion.button>
                {/* Option 03 */}
                <button
                    type="button"
                    className="navbar__section_03__cartMenuBtn"
                    onClick={handleNotificationMenu}
                >
                    <motion.div
                        className="navbar__section_03__cartIcon"
                        variants={basketIconAnimation}
                        animate={iconAnimate ? "animate" : "initial"}
                        transition="transition"
                    >
                        <ShoppingBasketOutlinedIcon style={{
                            color: theme === "dark" ? "var(--colorWhite)" : "var(--colorBlack)",
                            fontSize: "35px",
                            fontWeight: 200
                        }}/>
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
                {/* Option 04 */}
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
                        <WbSunnyOutlinedIcon style={{
                            color: "var(--colorWhite)",
                            fontSize: "14px",
                            opacity: theme === "light" ? 1 : 0,
                            position: "absolute",
                        }}/>

                        <ModeNightOutlinedIcon style={{
                            color: "var(--colorBlack)",
                            fontSize: "14px",
                            opacity: theme === "dark" ? 1 : 0,
                            position: "absolute",
                        }}/>
                    </motion.div>
                </button>
            </section>
        </nav>
    );
}

export default Navbar;