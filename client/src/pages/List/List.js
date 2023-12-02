import './list.css';
import {
    cake, cold, iceCream, noodles, chai, snacks, sandwich, smoothies,
} from "../../data/data";

import ProductCard from "../../components/ProductCard/ProductCard";
import {toggleCategories} from '../../store/slices/menuSlice';
import {changeCategory} from "../../store/slices/categoriesSlices";

import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

const renderProductCards = (category) => {
    const dataMap = {
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
    useEffect(() => {
        dispatch(toggleCategories({categoriesTab: true}));
        dispatch(changeCategory({selectedCategory: 0}));
    }, []);

    return (
        <section className="list whiteGlass">
            {selectedCategory !== 0 ?
                <section className="list__section__01">
                    {renderProductCards(selectedCategory).map((value) => (
                        <ProductCard
                            key={value.id}
                            id={value.id}
                            productName={value.productName}
                            productImage={value.productImage}
                            price={value.price}
                            quantity={1}
                        />
                    ))}
                </section> :
                <section className="list__section__02">
                    <h2 className="list__section__02__title">Explore our menu and discover a symphony of tastes</h2>
                    <article className="list__section__02__article">
                        Indulge in a delightful culinary journey at  Campus'Cafe, where every dish is a celebration
                        of flavors and quality ingredients. Our menu is thoughtfully curated to satisfy every palate,
                        offering a diverse range of dishes that blend creativity with classic favorites.
                    </article>
                </section>
            }
        </section>
    );
}

export default List;