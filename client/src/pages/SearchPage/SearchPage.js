import './searchPage.css';
import './mediaQuerySearchPage.css';

// import searchDarkIcon from "../../assets/icons/search_Dark_Icon.svg";
import search2LightIcon from "../../assets/icons/search2_Light_Icon.svg";
import closeLightIcon from "../../assets/icons/close_Light_Icon.svg";

import {useEffect} from "react";
import {motion} from "framer-motion";
import ProductCard from "../../components/ProductCard/ProductCard";
import useSearchFilterOnChange from "../../hooks/useSearchFilterOnChange";

const searchIconAnimation = {
    hide: {x: 0},
    show: {x: 50},
}

const SearchPage = () => {
    const {inputValue, productData, handleFilteredData, handleDataClear} = useSearchFilterOnChange(1000);

    useEffect(() => {
        handleDataClear();
    }, [handleDataClear]);

    return (
        <section className="searchPage">
            <section className="searchPage__section01">
                <h1>Search Here</h1>
            </section>
            <section className="searchPage__section02">
                <div className="searchPage__searchBar">
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
                            src={search2LightIcon}
                            alt="search icon"
                        />
                        <motion.img
                            variants={searchIconAnimation}
                            animate={inputValue.length !== 0 ? "hide" : "show"}
                            src={closeLightIcon}
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