import './home.css';
import instagramIcon from '../../assets/icons/instagramIcon.svg';
import facebookIcon from '../../assets/icons/facebookIcon.svg';
import twitterIcon from '../../assets/icons/twitterIcon.svg';

import {topOrders} from "../../data/data";

import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";

import {toggleCategories} from "../../store/slices/menuSlice";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import IconContainer from "../../components/IconContainer/IconContainer";
import {NavLink} from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";

const topOrdersMotion = {
    hidden: {opacity: 0,},
    visible: {
        opacity: 1,
        transition: {
            duration: 0.2,
            delayChildren: 0.1,
            staggerChildren: 0.15,
        }
    }
};

const Home = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(toggleCategories({State: false}));

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [dispatch]);

    return (
        <section className="home">
            <section className="home__section-01">
                <div className="home__section-01__info">
                    <h2 className="home__section-01__subtitle">Taste the Difference at</h2>
                    <h1 className="home__section-01__title">Campus'Cafe</h1>
                    <article className="home__section-01__article">
                        Campus’Cafe: moments, memories, and passion. Enjoy our
                        delicious coffees, smoothies, cakes, snacks, and sandwiches.
                        Experience the best of cafe indulgence,
                        and order online for flavors at your doorstep.
                    </article>
                </div>
                <div className="home__section-01__contactInfo">
                    <section className="home__section-01__contactInfo__contact">
                        <p>Contact Us</p>
                        <p>+123 456 7890</p>
                    </section>
                    <section className="home__section-01__contactInfo__socialMediaLink">
                        <NavLink to="/">
                            <IconContainer
                                src={instagramIcon}
                                background={false}
                                alt="instagram icon"
                                width={30}
                                height={30}
                            />
                        </NavLink>
                        <NavLink to="/">
                            <IconContainer
                                src={twitterIcon}
                                background={false}
                                alt="instagram icon"
                                width={30}
                                height={30}
                            />
                        </NavLink>
                        <NavLink to="/">
                            <IconContainer
                                src={facebookIcon}
                                background={false}
                                alt="instagram icon"
                                width={30}
                                height={30}
                            />
                        </NavLink>
                    </section>
                </div>
            </section>
            <section className="home__section-02">
                <div
                    className="home__loadingScreen"
                    style={{
                        opacity: isLoading ? 1 : 0,
                        zIndex: isLoading ? 2 : 0,
                    }}
                >
                    <LoadingScreen/>
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
                            {topOrders.map((value) => <ProductCard
                                key={value.id}
                                id={value.id}
                                productName={value.productName}
                                productImage={value.productImage}
                                price={value.price}
                                type="small"
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