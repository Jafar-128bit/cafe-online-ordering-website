import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useSelector} from "react-redux";

import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import CartMenu from "./components/CartMenu/CartMenu";
import Shade from "./components/Shade/Shade";
import LocationMenu from "./components/LocationMenu/LocationMenu";
import CategoriesTab from "./components/CategoriesTab/CategoriesTab";
import AccountMenu from "./components/AccountMenu/AccountMenu";
import List from "./pages/List/List";
import SmallShade from "./components/Shade/SmallShade";
import Favourite from "./pages/Favourite/Favourite";

function App() {
    const isCategoriesTab = useSelector((state) => state.menuState);
    const {categoriesTab} = isCategoriesTab;
    return (
        <main className="app">
            <BrowserRouter>
                <Navbar/>
                <SmallShade position="upperShade"/>
                <SmallShade position="lowerShade"/>
                {categoriesTab && <CategoriesTab/>}
                <CartMenu/>
                <LocationMenu/>
                <AccountMenu/>
                <Shade/>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/menu"} element={<List/>}/>
                    <Route path={"/favourite"} element={<Favourite/>}/>
                </Routes>
            </BrowserRouter>
        </main>
    );
}

export default App;
