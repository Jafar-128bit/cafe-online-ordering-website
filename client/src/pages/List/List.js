import './list.css';
import './responsiveList.css';

import {toggleCategories, toggleMenuBar, toggleNavbar} from '../../store/slices/menuSlice';

import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {Outlet} from "react-router-dom";
// import ProductList from "./ProductList";
import {toggleResetSpecialMenu} from "../../store/slices/specialMenuSlices";

const List = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(toggleCategories({State: true}));
        dispatch(toggleResetSpecialMenu());
        dispatch(toggleMenuBar({State: true}));
        dispatch(toggleNavbar({State: true}));
    }, [dispatch]);

    return (
        <section className="list">
            <div className="list__title">
                <h1>Menu</h1>
            </div>
            <div className="list__routeContainer">
                <Outlet/>
            </div>
        </section>
    );
}

export default List;