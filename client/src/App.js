import './App.css';

import lightModeBackground from "./assets/background/backgroundWhite.jpg";

import Navbar from "./components/Navbar/Navbar";
import CouponMenu from "./components/CouponMenu/CouponMenu";
import Menubar from "./components/Menubar/Menubar";
import React from "react";
import NotificationMenu from "./components/NotificationMenu/NotificationMenu";
import {useSelector} from "react-redux";
import {motion} from "framer-motion";
import {Outlet} from "react-router-dom";

function App() {

    const menuBarState = useSelector((state) => state.menuState.menuBarState);
    const notificationMenuState = useSelector(state => state.menuState.notificationMenuState);
    const couponMenu = useSelector(state => state.menuState.couponMenuState);
    const themeMode = useSelector(state => state.themeSwitchSlices);
    const {theme} = themeMode;

    return (
        <main className="app" style={{
            background: theme === "light" ? `url(${lightModeBackground})` : `var(--color08)`
        }}>
            <motion.div
                className="shade whiteGlass50"
                style={{
                    zIndex: (notificationMenuState.State || couponMenu.State)
                        ? couponMenu.zIndex - 1
                        : 0,
                }}
                animate={(notificationMenuState.State || couponMenu.State) ? {opacity: 1} : {opacity: 0}}
                transition={{ease: "easeOut", duration: 0.25}}
            />

            <NotificationMenu theme={theme}/>
            <Navbar theme={theme}/>
            <CouponMenu theme={theme}/>
            <Outlet/>
            {menuBarState.State && <Menubar theme={theme}/>}
        </main>
    );
}

export default App;
