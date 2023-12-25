import './App.css';

import {Outlet} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import SearchMenu from "./components/SearchMenu/SearchMenu";
import CouponMenu from "./components/CouponMenu/CouponMenu";
import Menubar from "./components/Menubar/Menubar";
import React from "react";

function App() {

    return (
        <main className="app">
            <Navbar/>
            <SearchMenu/>
            <CouponMenu/>
            <Outlet/>
            <Menubar/>
        </main>
    );
}

export default App;
