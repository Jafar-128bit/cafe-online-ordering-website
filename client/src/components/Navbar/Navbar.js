import './navbar.css';
import cartIcon from '../../assets/icons/basketIcon.svg';
import foodIcon from '../../assets/icons/foodIcon.svg';
import searchIcon from '../../assets/icons/searchIcon.svg';

import {toggleCartMenu, toggleSearchMenu} from '../../store/slices/menuSlice';

import IconContainer from "../IconContainer/IconContainer";
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {motion, useAnimate} from "framer-motion";

const linkStyle = {
    color: "var(--colorWhite)",
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
    const [scopeBucket, animateBucket] = useAnimate();
    const [scopeFood, animateFood] = useAnimate();

    const bucketIconAnimation = async () => {
        await animateBucket(scopeBucket.current, {y: 0, rotate: 0, duration: 0.3});
        await animateBucket(scopeBucket.current, {y: 2, rotate: -5, duration: 0.3});
        await animateBucket(scopeBucket.current, {y: 2, rotate: 5});
        await animateBucket(scopeBucket.current, {y: 0, rotate: 0, duration: 0.15});
        animateBucket(scopeBucket.current, {y: 0, rotate: 0}, {
            repeat: 0,
            repeatType: "mirror",
            type: "spring",
            stiffness: 300,
            damping: 15
        });
    };

    const foodIconAnimation = async () => {
        await animateFood(scopeFood.current, {opacity: 1, y: 0});
        await animateFood(scopeFood.current, {opacity: 1, y: 45, duration: 0.15});
        await animateFood(scopeFood.current, {opacity: 0, y: 45});
        animateFood(scopeFood.current, {opacity: 0, y: 0}, {
            repeat: 0,
            repeatType: "mirror",
            ease: "easeInOut",
            duration: 0.15
        });
    };

    useEffect(() => {
        setQuantity(cartData.map((value) => value.quantity).reduce((acc, cur) => acc + cur, 0));
        bucketIconAnimation();
        foodIconAnimation();
    }, [cartData]);


    const handleSearchMenu = () => {
        dispatch(toggleSearchMenu({State: true}));
    }

    return (
        <nav className="navbar">
            <section className="navbar__section_01">
                <NavLink to="/" style={({isActive}) => ({
                    color: isActive ? "var(--neonGreen)" : "var(--colorWhite)",
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
                    <div className="iconContainer navbar__icon1" ref={scopeBucket}><img src={cartIcon} alt="cart icon"/>
                    </div>
                    <div className="iconContainer navbar__icon2" ref={scopeFood}><img src={foodIcon} alt="food icon"/>
                    </div>
                    BASKET
                    <p className="navbar__section_03__cart__indicator">{quantity}</p>
                </button>
            </section>
        </nav>
    );
}

export default Navbar;