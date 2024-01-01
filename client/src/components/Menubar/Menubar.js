import './menubar.css';
import './darkModeStyle.css';
import './lightModeStyle.css';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import RoofingOutlinedIcon from '@mui/icons-material/RoofingOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

import {useLocation, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";
import {toggleMenuBar} from "../../store/slices/menuSlice";

const menuBarAnimation = {
    show: {x: 0},
    hide: {x: -150},
}

const Menubar = () => {
    const location = useLocation().pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(0);
    const menuBarState = useSelector((state) => state.menuState.menuBarState);
    const cartData = useSelector((state) => state.cartItems);
    const themeMode = useSelector(state => state.themeSwitchSlices);
    const {theme} = themeMode;

    useEffect(() => {
        setQuantity(cartData.map((value) => value.quantity).reduce((acc, cur) => acc + cur, 0));
    }, [cartData]);

    const handleCloseMenuBar = () => dispatch(toggleMenuBar({State: false}));

    const menuOptionsData = [
        {
            id: 1,
            optionName: "Home",
            optionIcon: location === "/"
                ? <RoofingOutlinedIcon style={{color: "var(--colorWhite)", zIndex: 5, fontSize: "30px"}}/>
                : <RoofingOutlinedIcon
                    style={{
                        color: theme === "dark" ? "var(--colorWhite)" : "var(--colorBlack)",
                        fontSize: "32px"
                    }}
                />,
            goto: ""
        },
        {
            id: 2,
            optionName: "Menu",
            optionIcon: location.split("/")[1] === "menu"
                ? <MenuBookOutlinedIcon style={{color: "var(--colorWhite)", zIndex: 5, fontSize: "30px"}}/> :
                <MenuBookOutlinedIcon
                    style={{
                        color: theme === "dark" ? "var(--colorWhite)" : "var(--colorBlack)",
                        fontSize: "32px"
                    }}
                />,
            goto: "menu"
        },
        {
            id: 3,
            optionName: "Basket",
            optionIcon: location.split("/")[1] === "cart"
                ? <ShoppingBasketOutlinedIcon style={{color: "var(--colorWhite)", zIndex: 5, fontSize: "30px"}}/> :
                <ShoppingBasketOutlinedIcon
                    style={{
                        color: theme === "dark" ? "var(--colorWhite)" : "var(--colorBlack)",
                        fontSize: "32px"
                    }}
                />,
            goto: "cart"
        },
        {
            id: 4,
            optionName: "Search",
            optionIcon: location.split("/")[1] === "search"
                ? <SearchOutlinedIcon style={{color: "var(--colorWhite)", zIndex: 5, fontSize: "30px"}}/> :
                <SearchOutlinedIcon
                    style={{
                        color: theme === "dark" ? "var(--colorWhite)" : "var(--colorBlack)",
                        fontSize: "32px"
                    }}
                />,
            goto: "search"
        },
        {
            id: 5,
            optionName: "Event",
            optionIcon: location.split("/")[1] === "event"
                ? <CalendarMonthOutlinedIcon style={{color: "var(--colorWhite)", zIndex: 5, fontSize: "30px"}}/> :
                <CalendarMonthOutlinedIcon
                    style={{
                        color: theme === "dark" ? "var(--colorWhite)" : "var(--colorBlack)",
                        fontSize: "32px"
                    }}
                />,
            goto: "event"
        },
    ];

    return (
        <motion.nav
            className={`menubar ${theme === "dark" ? "menubar__dark" : "menubar__light"}`}
            variants={menuBarAnimation}
            animate={menuBarState.State ? "show" : "hide"}
            transition={{ease: "easeInOut", duration: 0.25}}
        >
            <button
                type="button"
                className="menubar__closeBtn"
                onClick={handleCloseMenuBar}
            >
                <CloseOutlinedIcon
                    style={{
                        color: theme === "dark" ? "var(--colorWhite)" : "var(--colorBlack)",
                        fontSize: "32px"
                    }}/>
            </button>
            <div className="menubar__container">
                {menuOptionsData.map((option) => <motion.div
                    key={option.id}
                    className="menubar__option"
                    onClick={() => navigate(option.goto)}
                    whileTap={{scale: 0.8,}}
                    transition={{type: "spring", stiffness: 350, damping: 25, duration: 0.1}}
                >
                    {option.optionIcon}
                    <motion.div
                        className={
                            `menubar__option__sudoElement 
                                ${theme === "dark"
                                ? "menubar__option__sudoElement__dark"
                                : "menubar__option__sudoElement__light"}`
                        }
                        initial={{opacity: 0}}
                        animate={location.split("/")[1] === option.goto ? {opacity: 1,} : {opacity: 0,}}
                        transition={{ease: "easeOut", duration: 0.15}}
                    />
                    {
                        option.optionName === "Basket" &&
                        <motion.p
                            className={
                                `menubar__option__cartQuantity 
                                    ${theme === "dark"
                                    ? "menubar__option__cartQuantity__dark"
                                    : "menubar__option__cartQuantity__light"}`
                            }
                            initial={{y: -20}}
                            animate={quantity > 0 ? {y: 0} : {y: -20}}
                        >
                            {quantity > 0 ? quantity : 1}
                        </motion.p>
                    }
                    <p
                        className="menubar__option__optionName"
                        style={{
                            color: location.split("/")[1] === option.goto
                                ? "var(--colorWhite)"
                                : theme === "dark" ? "var(--colorWhite)"
                                    : "var(--colorBlack)",
                            fontWeight: location.split("/")[1] === option.goto
                                ? 700
                                : 300,
                        }}
                    >{option.optionName}</p>
                </motion.div>)}
            </div>
        </motion.nav>
    );
}

export default Menubar;