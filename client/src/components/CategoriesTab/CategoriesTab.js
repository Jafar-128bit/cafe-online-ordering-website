import './categoriesTab.css';
import './darkModeStyle.css';
import './lightModeStyle.css';
import './responsiveCategoriesTab.css';

import {menuList} from "../../data/data";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Options = ({id, optionName, symbol, goto}) => {

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
            style={{backgroundImage: `url(${symbol})`,}}
            variants={categoryCard}
            initial="initial"
            animate="animate"
        >
            <button
                type="button"
                className="categories__optionName"
                onClick={() => {
                    goto(`/menu/normalMenu/${id}`);
                }}
            >
                {optionName}
            </button>
        </motion.section>
    );
}

const CategoriesTab = () => {
    const goto = useNavigate();

    const themeMode = useSelector(state => state.themeSwitchSlices);
    const {theme} = themeMode;

    return (
        <section className="categories">
            <div className={
                `categories__HeadingContainer 
                ${
                    theme === "dark"
                        ? "categories__HeadingContainer__dark"
                        : "categories__HeadingContainer__light"
                }`
            }>
                <h3>EXPLORE OUR MENU AND DISCOVER A SYMPHONY OF TASTES</h3>
            </div>
            <div className="categories__optionContainer">
                <div className="categories__optionContainerItems">
                    {
                        menuList.map((value) => <Options
                                key={value.id}
                                id={value.id}
                                symbol={value.menuIcon}
                                optionName={value.menuHeading}
                                goto={goto}
                            />
                        )
                    }
                </div>
            </div>
        </section>
    );
}

export default CategoriesTab;