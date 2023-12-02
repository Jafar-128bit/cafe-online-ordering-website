import './home.css';

import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {toggleCategories} from "../../store/slices/menuSlice";

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(toggleCategories({categoriesTab: false}));
    });
    return (
        <section className="home">
            <section className="home__section-01">
                <h1 className="home__section-01__title">Taste the Difference at Campus'Cafe</h1>
                <article className="home__section-01__article">Welcome to Campus'Cafe, where we turn moments into
                    memories through a menu crafted with passion. From rich coffees to refreshing smoothies,
                    our offerings celebrate taste and quality. Indulge in tempting cakes, snacks, and sandwiches,
                    curated for a elevated dining experience. Join us to discover the essence of cafe indulgence,
                    and order online for flavors delivered to your space.
                </article>
            </section>
            <section className="home__section-02 whiteGlass">
                <h2 className="home__section-02__title">Top Orders</h2>
            </section>
        </section>
    )
}

export default Home;