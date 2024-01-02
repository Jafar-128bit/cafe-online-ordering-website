import "./list.css";
import ProductCard from "../../components/ProductCard/ProductCard";

import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearData} from "../../store/slices/dataSlices";
import {cake, chai, cold, iceCream, noodles, sandwich, smoothies, snacks} from "../../data/data";

const allItems = [...cake, ...cold, ...iceCream, ...noodles, ...chai, ...snacks, ...sandwich, ...smoothies,];

const renderProductCards = (category) => {
    const dataMap = {
        0: allItems,
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

const ProductList = ({type}) => {
    const dispatch = useDispatch();
    const param = useParams();
    const navigate = useNavigate();
    const productData = useOutletContext();
    const [itemData, setItemData] = useState(null);
    const couponData = useSelector(state => state.filterDataState);

    const handleGoBack = () => {
        dispatch(clearData());
        navigate(-1);
    }

    useEffect(() => {
        if (type === "all") {
            setItemData(renderProductCards(0));
        } else if (type === "main") {
            setItemData(renderProductCards(param.id));
        } else if (type === "offer") {
            setItemData(couponData);
        } else if (type === "search") {
            setItemData(productData);
        } else {
            setItemData(null);
        }
    }, [dispatch, type, couponData, param.id, productData]);

    return (
        <section className="list__productCardContainer noScroll">
            {
                type === "offer" &&
                <div className="list__productCardContainer__backBtnContainer">
                    <button type="button" onClick={handleGoBack}>Back</button>
                </div>
            }
            <section className="list__productCardList noScroll">
                {itemData && itemData.map((value, index) => (
                    <ProductCard
                        key={value.id}
                        id={value.id}
                        index={index}
                        productName={value.productName}
                        productImage={value.productImage}
                        price={value.price}
                        type="main"
                    />

                ))}
            </section>
        </section>
    );
}

export default ProductList;