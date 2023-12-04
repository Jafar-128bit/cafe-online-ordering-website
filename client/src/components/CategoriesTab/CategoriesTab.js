import './categoriesTab.css';
import {menuList} from "../../data/data";
import {changeCategory} from "../../store/slices/categoriesSlices";
import {useDispatch} from "react-redux";
import {motion} from "framer-motion";

const productCard = {
    hidden: {scale: 0, opacity: 0,},
    visible: {
        scale: 1,
        opacity: 1,
    }
};

const categories = {
    hidden: {opacity: 0, y: -100},
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2,
            delayChildren: 0.3,
            staggerChildren: 0.2,
        }
    }
};

const Options = ({id, optionName, symbol, dispatch}) => {
    return (
        <motion.section
            className="categories__options"
            style={{
                backgroundImage: `url(${symbol})`,
            }}
            variants={productCard}
        >
            <button
                type="button"
                className="categories__optionName"
                onClick={() => dispatch(changeCategory({selectedCategory: id}))}
            >
                {optionName}
            </button>
        </motion.section>
    );
}

const CategoriesTab = () => {
    const dispatch = useDispatch();
    return (
        <motion.section
            className="categories"
            variants={categories}
            initial="hidden"
            animate="visible"
        >
            {
                menuList.map((value) => <Options
                        key={value.id}
                        id={value.id}
                        symbol={value.menuIcon}
                        optionName={value.menuHeading}
                        dispatch={dispatch}
                    />
                )
            }
        </motion.section>
    );
}

export default CategoriesTab;