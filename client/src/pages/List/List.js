import './list.css';
import './responsiveList.css';

import {toggleMenuBar, toggleNavbar} from '../../store/slices/menuSlice';

import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {Outlet} from "react-router-dom";

const List = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(toggleMenuBar({State: true}));
        dispatch(toggleNavbar({State: true}));
    }, [dispatch]);

    return (
        <section className="list">
            <div className="list__routeContainer">
                <Outlet/>
            </div>
        </section>
    );
}

export default List;