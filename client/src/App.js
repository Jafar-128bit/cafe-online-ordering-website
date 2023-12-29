import './App.css';

import {Outlet} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import CouponMenu from "./components/CouponMenu/CouponMenu";
import Menubar from "./components/Menubar/Menubar";
import React from "react";
import NotificationMenu from "./components/NotificationMenu/NotificationMenu";
import {useSelector} from "react-redux";
import {motion} from "framer-motion";

function App() {

    const notificationMenuState = useSelector(state => state.menuState.notificationMenuState);
    const themeMode = useSelector(state => state.themeSwitchSlices);
    const {State, zIndex} = notificationMenuState;

    return (
        <main className="app">
            <motion.div
                className="shade whiteGlass50"
                style={{
                    zIndex: State ? zIndex - 1 : 0,
                }}
                animate={State ? {opacity: 1} : {opacity: 0}}
                transition={{ease: "easeOut", duration: 0.25}}
            />

            <NotificationMenu/>
            <Navbar themeMode={themeMode}/>
            <CouponMenu/>
            <Outlet/>
            <Menubar/>
        </main>
    );
}

export default App;
