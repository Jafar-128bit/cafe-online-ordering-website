import './list.css';
import {
    cake, cold, iceCream, noodles, chai, snacks, sandwich, smoothies,
} from "../../data/data";

import ProductCard from "../../components/ProductCard/ProductCard";
import {toggleCategories} from '../../store/slices/menuSlice';
import {changeCategory} from "../../store/slices/categoriesSlices";

import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

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
    const {selectedCategory} = useSelector((state) => state.categoriesState);
    const [isLoading, setIsLoading] = useState(true);
    const [dataIndex, setDataIndex] = useState(0);

    useEffect(() => {
        dispatch(toggleCategories({State: true}));
        dispatch(changeCategory({selectedCategory: 0}));

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

    }, [dispatch]);

    useEffect(() => {
        setIsLoading(true);
        setDataIndex(0);
        setTimeout(() => {
            setDataIndex(selectedCategory);
            setIsLoading(false);
        }, 500);
    }, [selectedCategory]);

    return (
        <section className="list">
            <div className="list__loading" style={{left: isLoading ? 0 : "-210px"}}>
                <p className="list__loading__message">Loading</p>
                <LoadingScreen
                    width={30}
                    height={30}
                    loadingThickness={4}
                    size="maxContent"
                    color="var(--masterColor)"
                />
            </div>
            <section className="list__container">
                <section
                    className="list__section__01"
                    style={{
                        opacity: isLoading ? 0 : 1,
                        zIndex: isLoading ? -10 : 2,
                    }}
                >
                    {renderProductCards(dataIndex).map((value) => (
                        <ProductCard
                            key={value.id}
                            id={value.id}
                            productName={value.productName}
                            productImage={value.productImage}
                            price={value.price}
                            type="main"
                        />
                    ))}
                </section>
                {selectedCategory === 0 && <section
                    className="list__section__02"
                    style={{
                        opacity: isLoading ? 0 : 1,
                        zIndex: isLoading ? -10 : 2,
                    }}
                >
                    <h2 className="list__section__02__title">Explore our menu and discover a symphony of tastes</h2>
                    <article className="list__section__02__article">
                        Indulge in a delightful culinary journey at Campus'Cafe, where every dish is a celebration
                        of flavors and quality ingredients. Our menu is thoughtfully curated to satisfy every
                        palate,
                        offering a diverse range of dishes that blend creativity with classic favorites.
                    </article>
                </section>}
            </section>
        </section>
    );
}

export default List;