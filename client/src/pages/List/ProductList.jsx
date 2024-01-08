import "./list.css";
import ProductCard from "../../components/ProductCard/ProductCard";

import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearData} from "../../store/slices/dataSlices";
import {cake, chai, cold, iceCream, noodles, sandwich, smoothies, snacks, menuList} from "../../data/data";

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
    const themeMode = useSelector(state => state.themeSwitchSlices);
    const {theme} = themeMode;

    const handleGoBack = () => {
        dispatch(clearData());
        navigate(-1);
    }

    useEffect(() => {
        if (type === "main") {
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

            {
                type === "all" &&
                menuList.map(
                    menu =>
                        <div key={menu.id} className="list__productCardList__categoryItemsList">
                            <h3 className="list__productCardList__categoryName" style={{
                                color: theme === "dark" ? "var(--colorWhite)" : "var(--colorBlack)",
                                background: theme === "dark" ? "var(--colorBlackTransparent50)" : "var(--colorWhiteTransparent75)",
                            }}>
                                {menu.menuHeading}
                            </h3>
                            <div className="list__productCardList__itemsList" style={{
                                padding: "0",
                            }}>
                                {renderProductCards(menu.id).map((value, index) => (
                                    <ProductCard
                                        key={value.id}
                                        id={value.id}
                                        index={index}
                                        productName={value.productName}
                                        productImage={value.productImage}
                                        totalPrice={value.subCategories ? value.subCategories[0].price : value.actualPrice}
                                        categoryName={value.categories}
                                        isCustomizable={value.isCustomizable}
                                        type="gridView"
                                    />))}
                            </div>
                        </div>
                )
            }

            <section className="list__productCardList noScroll">
                {(itemData && type !== "all") && itemData.map((value, index) => (
                    <ProductCard
                        key={value.id}
                        id={value.id}
                        index={index}
                        productName={value.productName}
                        productImage={value.productImage}
                        totalPrice={value.subCategories ? value.subCategories[0].price : value.actualPrice}
                        categoryName={value.categories}
                        isCustomizable={value.isCustomizable}
                        type="gridView"
                    />

                ))}
            </section>
        </section>
    );
}

export default ProductList;