import './home.css';
import './responsiveHome.css';

import {topOrders, specialNotification} from "../../data/data";

import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {motion} from "framer-motion";

import {toggleCategories, toggleMenuBar} from "../../store/slices/menuSlice";
import ProductCard from "../../components/ProductCard/ProductCard";
import {toggleResetSpecialMenu} from "../../store/slices/specialMenuSlices";


const feedSectionAnimation = {
    hidden: {opacity: 0, x: 100,},
    visible: {
        opacity: 1, x: 0,
        transition: {
            duration: 0.2,
            delayChildren: 0.1,
            staggerChildren: 0.15,
        }
    }
};

const feedSubsectionAnimation = {
    initial: {opacity: 0, scale: 0.85},
    animate: () => ({
        opacity: 1,
        scale: 1,
    }),
};

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(toggleCategories({State: false}));
        dispatch(toggleResetSpecialMenu());
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
                    <motion.section
                        className="home__section-02__container__topOrders"
                        variants={feedSectionAnimation}
                        initial="hidden"
                        animate="visible"
                    >
                        <h4 className="home__section-02__container__title">Top 6 Orders</h4>
                        <div
                            className="home__section-02__container__topOrders__productList noScroll"
                        >
                            {topOrders.map((value, index) => <ProductCard
                                key={value.id}
                                id={value.id}
                                productName={value.productName}
                                productImage={value.productImage}
                                price={value.price}
                                index={index}
                                type="small"
                            />)}
                        </div>
                    </motion.section>
                    <motion.section
                        className="home__section-02__container__specialSection"
                        variants={feedSectionAnimation}
                        initial="hidden"
                        animate="visible"
                    >
                        <h2 className="home__section-02__container__title">Today's Special</h2>
                        <div
                            className="home__section-02__container__specialSection__list noScroll"
                            style={{
                                gridTemplateColumns: `repeat(${specialNotification.length}, 280px)`
                            }}
                        >
                            {specialNotification.map((value, index) => <motion.div
                                className="home__section-02__container__specialSection__listItems"
                                key={value.id}
                                variants={feedSubsectionAnimation}
                                initial="initial"
                                animate="animate"
                                transition={{delay: 0.3 * index}}
                            >
                                <h4>{value.title}</h4>
                            </motion.div>)}
                        </div>
                    </motion.section>
                </section>
            </section>
        </section>
    )
}

export default Home;