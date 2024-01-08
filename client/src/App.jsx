import './App.css';

import {useSelector} from "react-redux";
import {motion} from "framer-motion";
import {Outlet} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Menubar from "./components/Menubar/Menubar";
import NotificationMenu from "./components/NotificationMenu/NotificationMenu";
import PopUpMenus from "./components/PopUpMenus/PopUpMenus";

function App() {

    const menuBarState = useSelector((state) => state.menuState.menuBarState);
    const notificationMenuState = useSelector(state => state.menuState.notificationMenuState);
    const popCardState = useSelector(state => state.popUpMenus);
    const themeMode = useSelector(state => state.themeSwitchSlices);
    const {theme} = themeMode;

    return (
        <main className={`app ${theme === "dark" ? "app__dark" : "app__light"}`}>
            <motion.div
                className={`shade ${theme === "dark" ? "darkGlass50" : "whiteGlass50"}`}
                style={{
                    zIndex: (notificationMenuState?.State || menuBarState?.State)
                        ? notificationMenuState?.zIndex - 1
                        : 0,
                }}
                animate={(notificationMenuState?.State || menuBarState?.State)
                    ? {opacity: 1}
                    : {opacity: 0}}
                transition={{ease: "easeOut", duration: 0.25}}
            />

            <NotificationMenu theme={theme}/>
            <Navbar theme={theme}/>
            <Outlet/>
            {popCardState.isPopUpOpen && <PopUpMenus type={popCardState.popUpType}/>}
            <Menubar theme={theme}/>
        </main>
    );
}

export default App;
