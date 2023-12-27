import "./list.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import {couponList} from "../../data/data";
import {cake, chai, cold, iceCream, noodles, sandwich, smoothies, snacks} from "../../data/data";

import {useLoaderData, useParams, useNavigate} from "react-router-dom";
import CategoriesTabSmall from "../../components/CategoriesTabSmall/CategoriesTabSmall";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {toggleCouponMenu} from "../../store/slices/menuSlice";

const allItems = [...cake, ...cold, ...iceCream, ...noodles, ...chai, ...snacks, ...sandwich, ...smoothies,];

const ProductList = ({type}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const couponCode = useParams().couponId;
    const [itemData, setItemData] = useState(null);
    const loaderData = useLoaderData();

    const handleGoBack = () => navigate("/cart");

    useEffect(() => {
        dispatch(toggleCouponMenu({State: false}));
        if (type === "offer") {
            const couponData = couponList.find(coupon => coupon.couponCode === couponCode);
            const validProductList = allItems.filter(products => couponData.validProduct?.includes(products.id));
            setItemData(validProductList);
        } else {
            setItemData(null);
        }
    }, [dispatch, couponCode, loaderData, type]);

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
                {loaderData && loaderData.map((value, index) => (
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