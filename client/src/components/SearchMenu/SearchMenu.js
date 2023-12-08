import './searchMenu.css';
import {useDispatch, useSelector} from "react-redux";
import {motion} from 'framer-motion';
import IconContainer from "../IconContainer/IconContainer";
import closeIcon from "../../assets/icons/closeIcon.svg";
import searchIcon from '../../assets/icons/searchIcon.svg';
import {toggleSearchMenu} from "../../store/slices/menuSlice";
import {setData} from "../../store/slices/dataSlices";
import {useState} from "react";
import {
    cake, cold, iceCream, noodles, chai, snacks, sandwich, smoothies,
} from "../../data/data";
import ProductCard from "../ProductCard/ProductCard";

const searchData = [...cake, ...cold, ...iceCream, ...noodles, ...chai, ...snacks, ...sandwich, ...smoothies];

const searchMenuAnimation = {
    hide: {opacity: 0, x: -500},
    show: {opacity: 1, x: 0}
}

const SearchMenu = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const searchMenu = useSelector(state => state.menuState.searchMenuState);
    const {State, zIndex} = searchMenu;
    const productData = useSelector(state => state.filterDataState);

    const handleClose = () => dispatch(toggleSearchMenu({State: false}));
    const handleSetData = (data) => dispatch(setData(data));

    const handleFilteredData = ((event) => {
        const searchWord = event.target.value;
        setInputValue(searchWord);
        const newFilterData = searchData
            .filter((value) => value
                .productName
                .toLowerCase()
                .includes(searchWord.toLowerCase()));
        searchWord === '' ? handleSetData([]) : handleSetData(newFilterData);
    });

    const handleDataClear = () => {
        handleSetData([]);
        setInputValue('');
    }

    return (
        <motion.aside
            className="searchMenu darkGlass75"
            style={{zIndex: zIndex}}
            variants={searchMenuAnimation}
            animate={State ? 'show' : 'hide'}
            transition={{type: "spring", stiffness: 300, damping: 25}}
        >
            <button type="button" className="closeBtn searchMenu__closeBtn" onClick={handleClose}>
                <IconContainer src={closeIcon} alt="close icon svg" width={30} height={30} background={false}/>
            </button>
            <section className="searchMenu__searchBoxContainer">
                <div className="searchBar">
                    <input type="text" placeholder="Search Here" value={inputValue} onChange={handleFilteredData}/>
                    <button type="button" className="searchBar__searchBtn" onClick={handleDataClear}>
                        <IconContainer
                            src={inputValue.length === 0 ? searchIcon : closeIcon}
                            alt="Search Icon svg"
                            background={false}
                            size={true}
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