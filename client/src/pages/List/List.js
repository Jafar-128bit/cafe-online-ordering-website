import './list.css';
import {
    cake, cold, iceCream, noodles, chai, snacks, sandwich, smoothies,
} from "../../data/data";

import {toggleCategories} from '../../store/slices/menuSlice';

import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import MenuIndex from "./MenuIndex";
import ProductList from "./ProductList";

const renderProductCards = (category) => {
    const dataMap = {
        0: [],
        1: cake,
        2: cold,
        3: iceCream,
        4: noodles,
        5: chai,
        6: snacks,
        7: sandwich,
        8: smoothies,
    };
    return dataMap[category];
};

const List = () => {
    const dispatch = useDispatch();
    let params = useParams();
    const {menuId, type} = params;

    useEffect(() => {
        dispatch(toggleCategories({State: true}));
    }, [dispatch]);

    return (
        <section className="list">
            {!type && <MenuIndex/>}
            {type === "normal" && <ProductList productData={renderProductCards(menuId)}/>}
        </section>
    );
}

export default List;