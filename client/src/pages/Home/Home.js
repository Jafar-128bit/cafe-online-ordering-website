import './home.css';

import {mediaData, topOrders} from "../../data/data";

import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";

import {toggleCategories} from "../../store/slices/menuSlice";
import VideoContainer from "../../components/VideoContainer/VideoContainer";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import ProductCardSmall from "../../components/ProductCard/ProductCardSmall";

const topOrdersMotion = {
    hidden: {opacity: 0,},
    visible: {
        opacity: 1,
        transition: {
            duration: 0.2,
            delayChildren: 0.3,
            staggerChildren: 0.2,
        }
    }
};

const Home = () => {
    const dispatch = useDispatch();
    const [changeMedia, setChangeMedia] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(toggleCategories({categoriesTab: false}));

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        const intervalId = setInterval(() => {
            setTimeout(() => {
                if (changeMedia >= 4) setChangeMedia(0);
                else setChangeMedia(changeMedia + 1);
            }, 9500);
        }, 10000);

        return () => clearInterval(intervalId);
    }, [changeMedia, dispatch]);

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
                <div className="home__section-01__media">
                    <div className="home__loadingScreen" style={{opacity: isLoading ? 1 : 0}}>
                        <LoadingScreen size="full"/>
                    </div>
                    {mediaData.map((value) => {
                        return <div
                            key={value.id}
                            className="home__section-01__media__container"
                            style={{
                                transform: `translateX(-${changeMedia}00%)`,
                                opacity: isLoading ? 0 : 1,
                            }}
                        >
                            <div className="home__section-01__media__video">
                                <VideoContainer
                                    video={value.video}
                                    width="100%"
                                    height="100%"
                                    borderRadius="0"
                                />
                            </div>
                            <div className="home__section-01__media__shade"/>
                            <p className="home__section-01__media__heading">{value.heading}</p>
                        </div>
                    })}
                </div>
            </section>

            <section className="home__section-02 whiteGlass">
                <div
                    className="home__loadingScreen"
                    style={{
                        opacity: isLoading ? 1 : 0,
                        zIndex: isLoading ? 2 : 0,
                    }}
                >
                    <LoadingScreen color="var(--color01)"/>
                </div>
                {!isLoading && <section
                    className="home__section-02__container"
                    style={{
                        zIndex: isLoading ? 0 : 2,
                    }}
                >
                    <h2 className="home__section-02__title">Feed</h2>
                    <motion.section
                        className="home__section-02__container__topOrders"
                        variants={topOrdersMotion}
                        initial="hidden"
                        animate="visible"
                    >
                        <h4 className="home__section-02__container__topOrders__title">Top Orders</h4>
                        <div className="home__section-02__container__topOrders__productList">
                            {topOrders.map((value) => <ProductCardSmall
                                key={value.id}
                                id={value.id}
                                productName={value.productName}
                                productImage={value.productImage}
                                price={value.price}
                            />)}
                        </div>
                    </motion.section>
                </section>
                }
            </section>
        </section>
    )
}

export default Home;