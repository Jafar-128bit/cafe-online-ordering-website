import './list.css';
// import './responsiveList.css';

import {toggleNavbar} from '../../store/slices/menuSlice';

import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {Outlet} from "react-router-dom";
import CategoriesTab from "../../components/CategoriesTab/CategoriesTab";
import useSearchFilterOnChange from "../../hooks/useSearchFilterOnChange";

const List = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(toggleNavbar({State: true}));
    }, [dispatch]);

    const {inputValue, productData, handleFilteredData, handleDataClear} = useSearchFilterOnChange(1000);

    return (
        <section className="list noScroll">
            <div className="list__routeContainer">
                <CategoriesTab
                    inputValue={inputValue}
                    handleFilteredData={handleFilteredData}
                    handleDataClear={handleDataClear}
                />
                <Outlet context={productData}/>
            </div>
        </section>
    );
}

export default List;