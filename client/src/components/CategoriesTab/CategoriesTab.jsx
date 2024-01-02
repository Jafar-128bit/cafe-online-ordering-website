import './categoriesTab.css';
import './darkModeStyle.css';
import './lightModeStyle.css';
import './responsiveCategoriesTab.css';

import {menuList} from "../../data/data";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const Options = ({id, optionName, symbol, goto, theme}) => {

    const categoryCard = {
        initial: {opacity: 0, scale: 0.85},
        animate: () => ({
            opacity: 1,
            scale: 1,
            transition: {delay: 0.1 * id, type: "spring", stiffness: 300, damping: 20}
        }),
    };

    return (
        <motion.section
            className="categories__options"
            variants={categoryCard}
            initial="initial"
            animate="animate"
            onClick={() => goto(`normalMenu/${id}`)}
        >
            <div className="categories__options__imageContainer">
                <img src={symbol} alt={optionName}/>
            </div>
            <h4
                className={`
                categories__options__title 
                ${theme === "dark"
                    ? "categories__options__title__dark"
                    : "categories__options__title__light"}`
                }
            >
                {optionName}
            </h4>
        </motion.section>
    );
}

const CategoriesTab = ({inputValue, handleFilteredData, handleDataClear}) => {
    const goto = useNavigate();
    const themeMode = useSelector(state => state.themeSwitchSlices);
    const {theme} = themeMode;

    return (
        <section className={`categories ${theme === "dark" ? "categories__dark" : "categories__light"}`}>
            <div className={
                `categories__HeadingContainer 
                ${
                    theme === "dark"
                        ? "categories__HeadingContainer__dark"
                        : "categories__HeadingContainer__light"
                }`
            }>
                <p>Hello,</p>
                <h1>Explore our menu and,<br/> Discover a symphony of tastes</h1>
            </div>

            <div className="categories__searchBoxContainer">
                <div
                    className={
                        `categories__searchBox
                        ${theme === "dark"
                            ? "categories__searchBox__dark"
                            : "categories__searchBox__light"}`
                    }
                >
                    <input
                        type="text"
                        placeholder="Search here..."
                        value={inputValue}
                        onChange={handleFilteredData}
                        onClick={() => goto("search")}
                    />
                    <button type="button" onClick={handleDataClear}>
                        {
                            inputValue.length === 0 ?
                                <SearchOutlinedIcon style={{
                                    color: theme === "dark" ? "var(--colorWhite)" : "var(--colorBlack)",
                                }}/> : <CloseOutlinedIcon style={{
                                    color: theme === "dark" ? "var(--colorWhite)" : "var(--colorBlack)",
                                }}/>
                        }
                    </button>
                </div>
            </div>

            <div className="categories__optionContainer">
                <div
                    className="categories__optionContainerItems noScroll"
                    style={{
                        gridTemplateColumns: `repeat(${menuList.length + 1}, 1fr)`
                    }}
                >
                    <div className="categories__options">
                        <section
                            className="categories__options"
                            onClick={() => goto(`/menu`)}
                        >
                            <div className="categories__options__imageContainer">

                            </div>
                            <h4
                                className={`
                                categories__options__title 
                                ${theme === "dark"
                                    ? "categories__options__title__dark"
                                    : "categories__options__title__light"}`
                                }
                            >
                                All
                            </h4>
                        </section>
                    </div>
                    {
                        menuList.map((value) => <Options
                                key={value.id}
                                id={value.id}
                                symbol={value.menuIcon}
                                optionName={value.menuHeading}
                                goto={goto}
                                theme={theme}
                            />
                        )
                    }
                </div>
            </div>
        </section>
    );
}

export default CategoriesTab;