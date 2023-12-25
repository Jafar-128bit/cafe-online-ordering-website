import './categoriesTabSmall.css'
import './mediaQueryCategoriesTabSmall.css';

import {menuList} from "../../data/data";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";

const CategoriesTabSmall = () => {
    const navigate = useNavigate();
    const handleNavigate = (url = "") => navigate(url);

    return (
        <nav className="categoriesTabSmall noScroll">
            <button
                className="categoriesTabSmall__optionContainer specialMenu01"
                onClick={() => handleNavigate(`/menu/specialMenu/1`)}
            >
                <p className="categoriesTabSmall__optionContainer__optionName">
                    Cafe Special
                </p>
            </button>
            <button
                className="categoriesTabSmall__optionContainer specialMenu02"
                onClick={() => handleNavigate(`/menu/specialMenu/2`)}
            >
                <p className="categoriesTabSmall__optionContainer__optionName">
                    Sacred Menu
                </p>
            </button>
            {menuList.map((option, index) =>
                <motion.button
                    className="categoriesTabSmall__optionContainer"
                    onClick={() => handleNavigate(`/menu/normalMenu/${option.id}`)}
                    initial={{opacity: 0, scale: 0.85}}
                    animate={() => ({
                        opacity: 1,
                        scale: 1,
                        transition: {delay: 0.1 * index, type: "spring", stiffness: 300, damping: 20}
                    })}
                >
                    <div className="categoriesTabSmall__optionContainer__imageContainer">
                        <img src={option.menuIcon} alt={option.menuHeading}/>
                    </div>
                    <p className="categoriesTabSmall__optionContainer__optionName">{option.menuHeading}</p>
                </motion.button>
            )}
        </nav>
    );
}

export default CategoriesTabSmall;