import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useSelector} from "react-redux";

import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import CartMenu from "./components/CartMenu/CartMenu";
import CategoriesTab from "./components/CategoriesTab/CategoriesTab";
import List from "./pages/List/List";
import PaymentMenu from "./components/PaymentMenu/PaymentMenu";
import SearchMenu from "./components/SearchMenu/SearchMenu";

function App() {
    const isCategoriesTab = useSelector((state) => state.menuState.categoriesTabState.State);
    return (
        <main className="app">
            <div className="shade"/>
            <BrowserRouter>
                <Navbar/>
                {isCategoriesTab && <CategoriesTab/>}
                <CartMenu/>
                <PaymentMenu/>
                <SearchMenu/>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/menu"} element={<List/>}/>
                </Routes>
            </BrowserRouter>
        </main>
    );
}

export default App;
