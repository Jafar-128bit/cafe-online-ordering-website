import './home.css';
import './responsiveHome.css';
import {topOrders} from "../../data/data";

import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {toggleMenuBar} from "../../store/slices/menuSlice";
import OfferList from "../../components/OfferList/OfferList";

const Home = () => {
    const dispatch = useDispatch();
    // const themeMode = useSelector(state => state.themeSwitchSlices);
    // const {theme} = themeMode;

    useEffect(() => {
        dispatch(toggleMenuBar({State: true}));
    }, [dispatch]);

    return (
        <section className="home">
            <section className="home__section-01">
                <section className="home__section-01__info">
                    <h2 className="home__section-01__subtitle">Taste the Difference at</h2>
                    <h1 className="home__section-01__title">Campus'Cafe</h1>
                </section>
            </section>

            <section className="home__section-02">
                <section className="home__section-02__container">
                    <OfferList type="product" offerListData={topOrders} offerTitle="Top 6 Bestsellers"/>
                </section>
            </section>
        </section>
    )
}

export default Home;