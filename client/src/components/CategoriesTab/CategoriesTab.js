import './categoriesTab.css';
import categoriesTabCover from '../../assets/background/categoriesTabCover.png';

import {menuList} from "../../data/data";
import {changeCategory} from "../../store/slices/categoriesSlices";
import {useDispatch} from "react-redux";
import {motion} from "framer-motion";
import ImageContainer from "../ImageContainer/ImageContainer";

const categoryCard = {
    hidden: {scale: 0, opacity: 0,},
    visible: {scale: 1, opacity: 1,}
};

const categories = {
    hidden: {opacity: 0, y: -100},
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2,
            delayChildren: 0.1,
            staggerChildren: 0.15,
            type: "spring", stiffness: 300, damping: 15
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
            variants={categoryCard}
            transition={{type: "spring", stiffness: 300, damping: 20}}
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
            <ImageContainer
                src={categoriesTabCover}
                height="100%"
                alt="categories tab cover image"
                position="absolute"
                zIndex={0}
            />
            <div className="categories__specialOption">
                <motion.div
                    className="specialOption01"
                    variants={categoryCard}
                >
                </motion.div>
                <motion.div
                    className="specialOption02"
                    variants={categoryCard}
                >
                </motion.div>
            </div>
            <div className="categories__optionContainer">
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
            </div>
        </motion.section>
    );
}

export default CategoriesTab;