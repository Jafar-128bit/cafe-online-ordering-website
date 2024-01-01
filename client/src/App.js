import './App.css';

import {useSelector} from "react-redux";
import {motion} from "framer-motion";
import {Outlet} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import CouponMenu from "./components/CouponMenu/CouponMenu";
import Menubar from "./components/Menubar/Menubar";
import NotificationMenu from "./components/NotificationMenu/NotificationMenu";

function App() {

    const menuBarState = useSelector((state) => state.menuState.menuBarState);
    const notificationMenuState = useSelector(state => state.menuState.notificationMenuState);
    const couponMenu = useSelector(state => state.menuState.couponMenuState);
    const themeMode = useSelector(state => state.themeSwitchSlices);
    const {theme} = themeMode;

    return (
        <main className={`app ${theme === "dark" ? "app__dark" : "app__light"}`}>
            <motion.div
                className={`shade ${theme === "dark" ? "darkGlass50" : "whiteGlass50"}`}
                style={{
                    zIndex: (notificationMenuState.State || couponMenu.State || menuBarState.State)
                        ? couponMenu.zIndex - 1
                        : 0,
                }}
                animate={(notificationMenuState.State || couponMenu.State || menuBarState.State)
                    ? {opacity: 1}
                    : {opacity: 0}}
                transition={{ease: "easeOut", duration: 0.25}}
            />

            <NotificationMenu theme={theme}/>
            <Navbar theme={theme}/>
            <CouponMenu theme={theme}/>
            <Outlet/>
            <Menubar theme={theme}/>
        </main>
    );
}

export default App;
