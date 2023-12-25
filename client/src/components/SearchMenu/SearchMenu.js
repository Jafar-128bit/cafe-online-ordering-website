import './searchMenu.css';
import './responsiveSearchMenu.css';

import {useDispatch, useSelector} from "react-redux";
import {motion} from 'framer-motion';
import IconContainer from "../IconContainer/IconContainer";
import closeLightIcon from "../../assets/icons/close_Light_Icon.svg";
import searchLightIcon from '../../assets/icons/search2_Light_Icon.svg';
import {toggleSearchMenu} from "../../store/slices/menuSlice";
import ProductCard from "../ProductCard/ProductCard";
import useSearchFilterOnChange from "../../hooks/useSearchFilterOnChange";

const searchMenuAnimation = {
    hide: {opacity: 0, x: 0, display: "none"},
    show: {opacity: 1, x: 478, display: "flex"}
}

const SearchMenu = () => {
    const {inputValue, productData, handleFilteredData, handleDataClear} = useSearchFilterOnChange(1000);

    const dispatch = useDispatch();
    const searchMenu = useSelector(state => state.menuState.searchMenuState);
    const {State, zIndex} = searchMenu;
    const handleClose = () => dispatch(toggleSearchMenu({State: false}));

    return (
        <motion.aside
            className="searchMenu whiteGlass50"
            style={{zIndex: zIndex}}
            variants={searchMenuAnimation}
            animate={State ? 'show' : 'hide'}
            transition={{type: "spring", stiffness: 300, damping: 25}}
        >
            <button type="button" className="closeBtn searchMenu__closeBtn" onClick={handleClose}>
                <IconContainer src={closeLightIcon} alt="close icon svg" width={30} height={30} background={false}/>
            </button>
            <section className="searchMenu__searchBoxContainer">
                <div className="searchBar">
                    <input type="text" placeholder="Search Here" value={inputValue} onChange={handleFilteredData}/>
                    <button type="button" className="searchBar__searchBtn" onClick={handleDataClear}>
                        <IconContainer
                            src={inputValue.length === 0 ? searchLightIcon : closeLightIcon}
                            alt="Search Icon svg"
                            background={false}
                            size={true}
                            width="70%"
                            height="70%"
                        />
                    </button>
                </div>
            </section>
            <section className="searchMenu__resultContainer addScroll">
                {productData.map((value) => <ProductCard
                    key={value.id}
                    id={value.id}
                    productName={value.productName}
                    productImage={value.productImage}
                    price={value.price}
                    type="searchList"
                />)}
            </section>
        </motion.aside>
    );
}

export default SearchMenu;