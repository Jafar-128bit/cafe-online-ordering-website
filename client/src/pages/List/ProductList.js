import "./list.css";
import ProductCard from "../../components/ProductCard/ProductCard";

import {useLoaderData, useNavigate} from "react-router-dom";
import CategoriesTabSmall from "../../components/CategoriesTabSmall/CategoriesTabSmall";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toggleCouponMenu} from "../../store/slices/menuSlice";
import {clearData} from "../../store/slices/dataSlices";

const ProductList = ({type}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [itemData, setItemData] = useState(null);
    const loaderData = useLoaderData();
    const couponData = useSelector(state => state.filterDataState);

    const handleGoBack = () => {
        dispatch(clearData());
        navigate(-1);
    }

    useEffect(() => {
        dispatch(toggleCouponMenu({State: false}));
        if (type === "offer") {
            setItemData(couponData);
        } else {
            setItemData(null);
        }
    }, [dispatch, loaderData, type, couponData]);

    return (
        <section className="list__productCardContainer noScroll">
            {type === "main" && <CategoriesTabSmall/>}
            {
                type === "offer" &&
                <div className="list__productCardContainer__backBtnContainer">
                    <button type="button" onClick={handleGoBack}>Back</button>
                </div>
            }
            <section className="list__productCardList">
                {(itemData && !loaderData) && itemData.map((value, index) => (
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
                {(loaderData && !itemData) && loaderData.map((value, index) => (
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