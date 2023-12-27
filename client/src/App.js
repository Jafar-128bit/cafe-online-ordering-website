import './App.css';

import {Outlet} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import CouponMenu from "./components/CouponMenu/CouponMenu";
import Menubar from "./components/Menubar/Menubar";
import React from "react";
import NotificationMenu from "./components/NotificationMenu/NotificationMenu";

function App() {

    return (
        <main className="app">
            <NotificationMenu/>
            <Navbar/>
            <CouponMenu/>
            <Outlet/>
            <Menubar/>
        </main>
    );
}

export default App;
