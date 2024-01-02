import './searchPage.css';
import './lightModeStyle.css';
import './darkModeStyle.css';
import './mediaQuerySearchPage.css';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

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
        <section className="searchPage noScroll">
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
                        <motion.div
                            variants={searchIconAnimation}
                            animate={inputValue.length === 0 ? "hide" : "show"}
                        >
                            <SearchOutlinedIcon style={{
                                color: theme === "dark" ? "var(--colorWhite)" : "var(--colorBlack)",
                            }}/>
                        </motion.div>
                        <motion.div
                            variants={searchIconAnimation}
                            animate={inputValue.length !== 0 ? "hide" : "show"}
                        >
                            <CloseOutlinedIcon style={{
                                color: theme === "dark" ? "var(--colorWhite)" : "var(--colorBlack)",
                            }}/>
                        </motion.div>
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