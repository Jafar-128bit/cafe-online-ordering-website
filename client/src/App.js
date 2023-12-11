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
import CouponMenu from "./components/CouponMenu/CouponMenu";

function App() {
    const isCategoriesTab = useSelector((state) => state.menuState.categoriesTabState.State);
    const paymentMenuState = useSelector((state) => state.menuState.paymentMenuState);
    const {State, zIndex} = paymentMenuState;
    return (
        <main className="app">
            <div className="shade" style={{
                zIndex: State ? zIndex - 1 : 0,
                backgroundColor: State && 'var(--colorBlackTransparent75)',
            }}/>
            <BrowserRouter>
                <Navbar/>
                {isCategoriesTab && <CategoriesTab/>}
                <CartMenu/>
                <PaymentMenu/>
                <SearchMenu/>
                <CouponMenu/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/menu/:type?/:menuId?" element={<List/>}/>
                </Routes>
            </BrowserRouter>
        </main>
    );
}

export default App;
