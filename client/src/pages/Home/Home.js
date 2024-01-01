import './home.css';
import './darkModeStyle.css';
import './lightModeStyle.css';
import './responsiveHome.css';

import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

import {topOrders, bannerData} from "../../data/data";
import ProductCard from "../../components/ProductCard/ProductCard";
import {toggleMenuBar} from "../../store/slices/menuSlice";
import {calculateTimeDifference} from "../../util/utils";
import useTimeDifference from "../../hooks/useTimeDifference";

import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

const Banner = ({
                    bannerImage,
                    bannerEndTime,
                    bannerType,
                    bannerTitle,
                    discount,
                    bannerLink,
                }) => {
    const [bannerSize, setBannerSize] = useState("");
    const navigate = useNavigate();

    const checkValidity = calculateTimeDifference(bannerEndTime, true);
    const timerData = useTimeDifference(bannerEndTime);

    useEffect(() => {
        setBannerSize(`bannerSize__${bannerType}`);
    }, [bannerType]);

    return (
        <section
            className={`home__banner ${bannerSize}`}
            style={{backgroundImage: `url(${bannerImage})`}}
        >
            <div className="home__banner__details">
                <h3 className="home__banner__title">{bannerTitle}</h3>
                <div className="home__banner__message">
                    <p>Explore the {bannerTitle} menu and enjoy the moment with us</p>
                </div>
                <div className="home__banner__discount">
                    <p>{discount}%</p>
                    <p>OFF</p>
                </div>
                {
                    checkValidity &&
                    <div className="home__banner__timer">
                        <p>Limited Deal Hurry!</p>
                        <div className="home__banner__timer__validTimer">
                            <p>{timerData.days < 10 ? `0${timerData.days}` : timerData.days} days</p>
                            <p>{timerData.hours < 10 ? `0${timerData.hours}` : timerData.hours} hr</p>
                            <p>{timerData.minutes < 10 ? `0${timerData.minutes}` : timerData.minutes} m</p>
                            <p>{timerData.seconds < 10 ? `0${timerData.seconds}` : timerData.seconds} s</p>
                        </div>
                    </div>
                }
                <button type="button" className="home__banner__linkBtn" onClick={() => navigate(bannerLink)}>Explore
                    Now!
                </button>
            </div>
        </section>
    );
};

const SpecialProductList = ({feedTitle = "", feedData = [{}], theme}) => {

    const itemListRef = useRef(null);
    const [isScroll, setIsScroll] = useState(1);

    const handleScrollClick = (flag = 1) => {
        let scrollValue;
        if (itemListRef && flag === 1)
            scrollValue = itemListRef.current.scrollWidth / feedData.length;
        else if (itemListRef && flag === -1)
            scrollValue = -itemListRef.current.scrollWidth / feedData.length;

        const scrollOptions = {
            left: itemListRef.current.scrollLeft + scrollValue,
            behavior: 'smooth',
        };

        itemListRef.current.scrollTo(scrollOptions);
    };

    useEffect(() => {
        const handleScroll = () => {
            const isLastScrollValue =
                itemListRef.current.scrollLeft + itemListRef.current.clientWidth >=
                itemListRef.current.scrollWidth;
            const isFirstScrollValue = itemListRef.current.scrollLeft <= 0;

            if (isLastScrollValue && isScroll === 1) setIsScroll(-1);
            if (isFirstScrollValue && isScroll === -1) setIsScroll(1);
        };

        const currentRef = itemListRef.current;
        if (currentRef) currentRef.addEventListener('scroll', handleScroll);
        return () => {
            if (currentRef) currentRef.removeEventListener('scroll', handleScroll);
        };
    }, [isScroll]);

    return (
        <section className="home__specialProductList">
            <h3
                className={
                    `home__specialProductList__title 
                    ${theme === "dark"
                        ? "home__specialProductList__title__dark"
                        : "home__specialProductList__title"}`
                }
            >
                {feedTitle}
            </h3>
            <div className="home__specialProductList__list noScroll" ref={itemListRef}>
                <button
                    className="home__specialProductList__list__prevBtn"
                    style={{opacity: isScroll === 1 ? 0.5 : 1}}
                    onClick={() => handleScrollClick(-1)}
                >
                    <ArrowBackIosOutlinedIcon style={{
                        color: "var(--colorWhite)",
                        fontSize: "30px"
                    }}
                    />
                </button>
                {feedData.map((value, index) => <ProductCard
                        key={value.id}
                        id={value.id}
                        productName={value.productName}
                        productImage={value.productImage}
                        price={value.price}
                        index={index}
                        type="small"
                    />
                )}
                <button
                    className="home__specialProductList__list__nextBtn"
                    style={{opacity: isScroll === -1 ? 0.5 : 1}}
                    onClick={() => handleScrollClick(1)}
                >
                    <ArrowForwardIosOutlinedIcon style={{
                        color: "var(--colorWhite)",
                        fontSize: "30px"
                    }}
                    />
                </button>
            </div>
        </section>
    );
}

const Home = () => {
    const dispatch = useDispatch();
    const themeMode = useSelector(state => state.themeSwitchSlices);
    const {theme} = themeMode;

    useEffect(() => {
        dispatch(toggleMenuBar({State: false}));
    }, [dispatch]);

    return (
        <section className="home">
            <section className="home__section-01">
                <section className="home__section-01__info">
                    <h2
                        className={`
                        home__section-01__subtitle 
                        ${theme === "dark"
                            ? "home__section-01__subtitle__dark"
                            : "home__section-01__subtitle__light"}
                        `}
                    >Taste the Difference at</h2>
                    <h1
                        className={`
                        home__section-01__title 
                        ${theme === "dark"
                            ? "home__section-01__title__dark"
                            : "home__section-01__title__light"}
                        `}
                    >
                        Campus'Cafe
                    </h1>
                </section>
            </section>

            <section className="home__section-02">
                <SpecialProductList feedTitle="Top 6 Bestsellers" feedData={topOrders} theme={theme}/>
                {bannerData.map(banner =>
                    <Banner
                        key={banner.id}
                        bannerImage={banner.bannerImage}
                        bannerEndTime={banner.bannerEndTime}
                        bannerType={banner.bannerType}
                        bannerTitle={banner.bannerTitle}
                        discount={banner.discount}
                        bannerLink={banner.bannerLink}
                    />)}
            </section>
        </section>
    )
}

export default Home;