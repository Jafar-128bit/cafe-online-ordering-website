import './App.css';

import lightModeBackground from "./assets/background/backgroundWhite.jpg";
import DarkModeBackground from "./assets/background/backgroundDark.jpg";

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
    const themeMode = useSelector(state => state.themeSwitchSlices);
    const {theme} = themeMode;
    const {State, zIndex} = notificationMenuState;

    return (
        <main className="app" style={{
            backgroundImage: theme === "light" ? `url(${lightModeBackground})` : `url(${DarkModeBackground})`
        }}>
            <motion.div
                className="shade whiteGlass50"
                style={{
                    zIndex: State ? zIndex - 1 : 0,
                }}
                animate={State ? {opacity: 1} : {opacity: 0}}
                transition={{ease: "easeOut", duration: 0.25}}
            />

            <NotificationMenu themeMode={theme}/>
            <Navbar themeMode={theme}/>
            <CouponMenu themeMode={theme}/>
            <Outlet/>
            {menuBarState.State && <Menubar themeMode={theme}/>}
        </main>
    );
}

export default App;
