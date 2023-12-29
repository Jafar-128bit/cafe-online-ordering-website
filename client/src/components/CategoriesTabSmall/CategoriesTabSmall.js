import './categoriesTabSmall.css'
import './mediaQueryCategoriesTabSmall.css';

import arrowDarkIcon from "../../assets/icons/arrowBack_Dark_Icon.svg";

import {menuList} from "../../data/data";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const collapseBtnAnimation = {
    hide: {rotate: -90},
    show: {rotate: 90},
}

const collapseCategoriesListAnimation = {
    hide: {height: 50},
    show: {height: "max-content"}
}

const CategoriesTabSmall = () => {
    const navigate = useNavigate();
    const handleNavigate = (url = "") => navigate(url);
    const [isScrollEnd, setIsScrollEnd] = useState(false);

    return (
        <nav className="categoriesTabSmall noScroll">
            <motion.div
                className="categoriesTabSmall__categoriesList noScroll"
                variants={collapseCategoriesListAnimation}
                animate={isScrollEnd ? "show" : "hide"}
                transition={{ease: "easeIn", duration: 0.15}}
            >
                {menuList.map((option, index) =>
                    <motion.button
                        key={option.id}
                        className="categoriesTabSmall__optionContainer"
                        onClick={() => handleNavigate(`/menu/normalMenu/${option.id}`)}
                        initial={{opacity: 0, scale: 0.85}}
                        animate={() => ({
                            opacity: 1,
                            scale: 1,
                            transition: {delay: 0.1 * index, type: "spring", stiffness: 300, damping: 20}
                        })}
                    >
                        <p className="categoriesTabSmall__optionContainer__optionName">{option.menuHeading}</p>
                    </motion.button>
                )}
            </motion.div>
            <button
                className="categoriesTabSmall__collapseBtn"
                onClick={() => setIsScrollEnd(!isScrollEnd)}
            >
                <motion.img
                    src={arrowDarkIcon}
                    alt="arrow icon"
                    variants={collapseBtnAnimation}
                    animate={isScrollEnd ? "show" : "hide"}
                    transition={{ease: "easeIn", duration: 0.15}}
                />
            </button>
        </nav>
    );
}

export default CategoriesTabSmall;