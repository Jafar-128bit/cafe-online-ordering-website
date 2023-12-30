import './searchPage.css';
import './lightModeStyle.css';
import './darkModeStyle.css';
import './mediaQuerySearchPage.css';

import search2LightIcon from "../../assets/icons/search2_Light_Icon.svg";
import search2DarkIcon from "../../assets/icons/search2_Dark_Icon.svg";
import closeLightIcon from "../../assets/icons/close_Light_Icon.svg";
import closeDarkIcon from "../../assets/icons/close_Dark_Icon.svg";

import {useEffect} from "react";
import {motion} from "framer-motion";
import ProductCard from "../../components/ProductCard/ProductCard";
import useSearchFilterOnChange from "../../hooks/useSearchFilterOnChange";
import {setData} from "../../store/slices/dataSlices";
import {useDispatch, useSelector} from "react-redux";

const searchIconAnimation = {
    hide: {x: 0},
    show: {x: 50},
}

const SearchPage = () => {
    const dispatch = useDispatch();
    const {inputValue, productData, handleFilteredData, handleDataClear} = useSearchFilterOnChange(1000);
    const themeMode = useSelector(state => state.themeSwitchSlices);
    const {theme} = themeMode;

    useEffect(() => {
        dispatch(setData([]));
    }, [dispatch]);

    return (
        <section className="searchPage">
            <section className="searchPage__section02">
                <div
                    className={
                        `searchPage__searchBar 
                        ${theme === "dark"
                            ? "searchPage__searchBar__dark"
                            : "searchPage__searchBar__light"}`
                    }
                >
                    <input
                        type="text"
                        placeholder="Search here..."
                        value={inputValue}
                        onChange={handleFilteredData}
                    />
                    <button type="button" onClick={handleDataClear}>
                        <motion.img
                            variants={searchIconAnimation}
                            animate={inputValue.length === 0 ? "hide" : "show"}
                            src={theme === "dark" ? search2LightIcon : search2DarkIcon}
                            alt="search icon"
                        />
                        <motion.img
                            variants={searchIconAnimation}
                            animate={inputValue.length !== 0 ? "hide" : "show"}
                            src={theme === "dark" ? closeLightIcon : closeDarkIcon}
                            alt="search icon"
                        />
                    </button>
                </div>
            </section>
            <section className="searchPage__section03">
                {inputValue.length !== 0 && productData.map((value) => <ProductCard
                    key={value.id}
                    id={value.id}
                    productName={value.productName}
                    productImage={value.productImage}
                    price={value.price}
                    type="searchList"
                />)}
            </section>
        </section>
    );
}

export default SearchPage;