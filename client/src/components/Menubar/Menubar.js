import './menubar.css';

import cartDarkIcon from "../../assets/icons/cart_Dark_Icon.svg";
import homeDarkIcon from "../../assets/icons/home_Dark_Icon.svg";
import menuDarkIcon from "../../assets/icons/menu_Dark_Icon.svg";
import searchDarkIcon from "../../assets/icons/search_Dark_Icon.svg";

import cartLightIcon from "../../assets/icons/cart_Light_Icon.svg";
import homeLightIcon from "../../assets/icons/home_Light_Icon.svg";
import menuLightIcon from "../../assets/icons/menu_Light_Icon.svg";
import searchLightIcon from "../../assets/icons/search_Light_Icon.svg";

import {NavLink, useLocation} from "react-router-dom";
import {motion} from "framer-motion";
import {useSelector} from "react-redux";
import {useState, useEffect} from "react";

const menuBarAnimation = {
    show: {y: 0},
    hide: {y: 70},
}

const Menubar = () => {
    const location = useLocation().pathname;
    const [quantity, setQuantity] = useState(0);
    const menuBarState = useSelector((state) => state.menuState.menuBarState);
    const cartData = useSelector((state) => state.cartItems);

    useEffect(() => {
        setQuantity(cartData.map((value) => value.quantity).reduce((acc, cur) => acc + cur, 0));
    }, [cartData]);

    const menuOptionsData = [
        {
            id: 1,
            optionName: "Home",
            optionIcon: location === "/" ? homeLightIcon : homeDarkIcon,
            goto: ""
        },
        {
            id: 2,
            optionName: "Menu",
            optionIcon: location.split("/")[1] === "menu" ? menuLightIcon : menuDarkIcon,
            goto: "menu"
        },
        {
            id: 3,
            optionName: "Basket",
            optionIcon: location.split("/")[1] === "cart" ? cartLightIcon : cartDarkIcon,
            goto: "cart"
        },
        {
            id: 4,
            optionName: "Search",
            optionIcon: location.split("/")[1] === "search" ? searchLightIcon : searchDarkIcon,
            goto: "search"
        },
    ];

    return (
        <motion.nav
            className="menubar"
            variants={menuBarAnimation}
            animate={menuBarState.State ? "show" : "hide"}
            transition={{ease: "easeInOut", duration: 0.25}}
        >
            <div className="menubar__container">
                {menuOptionsData.map((option) => <NavLink
                    to={`/${option.goto}`}
                    key={option.id}
                    style={({isActive}) => ({
                        color: isActive ? "var(--colorWhite)" : "var(--colorBlack)",
                        fontWeight: isActive ? "800" : "300",
                        textDecoration: "none",
                    })}
                >
                    <motion.div
                        className="menubar__option"
                        whileTap={{scale: 0.8,}}
                        transition={{type: "spring", stiffness: 350, damping: 25, duration: 0.1}}
                    >
                        <motion.div
                            className="menubar__option__sudoElement"
                            initial={{height: 0}}
                            animate={location.split("/")[1] === option.goto ? {height: "100%",} : {height: 0,}}
                            transition={{ease: "easeOut", duration: 0.15}}
                        />
                        <img
                            className="menubar__option__icons"
                            src={option.optionIcon}
                            alt={option.optionName}
                            height="24"
                        />
                        {
                            option.optionName === "Basket" &&
                            <motion.p
                                className="menubar__option__cartQuantity"
                                initial={{y: -20}}
                                animate={quantity > 0 ? {y: 0} : {y: -20}}
                            >
                                {quantity}
                            </motion.p>
                        }
                        <p className="menubar__option__optionName">{option.optionName}</p>
                    </motion.div>
                </NavLink>)}
            </div>
        </motion.nav>
    );
}

export default Menubar;