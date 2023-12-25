import './categoriesTab.css';
import './responsiveCategoriesTab.css';

import {menuList} from "../../data/data";
import {motion} from "framer-motion";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {toggleResetSpecialMenu, toggleSetSpecialMenu} from "../../store/slices/specialMenuSlices";

const imageRotateAnimation = {
    initial: {rotate: 0},
    animate: {
        rotate: 360,
        transition: {ease: "linear", duration: 20, repeat: Infinity, repeatDelay: 0},
    },
}

const backgroundImageAnimation = {
    initial: {rotate: 0, x: 0, y: 0, scale: 1},
    animate: {
        rotate: [0, 30, -15, -30, 0],
        x: [0, 80, -80, 50, 0],
        y: [0, -50, 50, 0, 0],
        scale: [1, 1, 0.8, 0.65, 1],
        transition: {ease: "easeInOut", duration: 16, repeat: Infinity, repeatDelay: 0.5},
    }
}


const Options = ({id, optionName, symbol, goto, handleSelectSpecialMenu}) => {

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
                    handleSelectSpecialMenu("normal");
                }}
            >
                {optionName}
            </button>
        </motion.section>
    );
}

const SpecialMenu = ({
                         setTriggerSideImageAnimation,
                         triggerSideImageAnimation,
                         menuOption,
                         handleSelectSpecialMenu,
                         goto
                     }) => {

    const categoryCard = {
        initial: {opacity: 0, scale: 0},
        animate: () => ({
            opacity: 1,
            scale: 1,
            transition: {delay: 0.2, type: "spring", stiffness: 300, damping: 20}
        }),
    };

    return (menuOption === 1 ?
            <motion.div
                className="specialOption01"
                onClick={() => {
                    handleSelectSpecialMenu("special", 1);
                    goto("/menu/specialMenu/1");
                }}
                variants={categoryCard}
                initial="initial"
                animate="animate"
            >
                <motion.div
                    className="specialOption01__backgroundImage"
                    variants={backgroundImageAnimation}
                    initial="initial"
                    animate="animate"
                />
                <div className="specialOption01__container">
                    <p className="specialOption01__container__title title01">Cafe</p>
                    <p className="specialOption01__container__title title02">Special</p>
                </div>
            </motion.div> :
            <motion.div
                className="specialOption02"
                onClick={() => {
                    handleSelectSpecialMenu("special", 2);
                    goto("/menu/specialMenu/2");
                }}
                variants={categoryCard}
                initial="initial"
                animate="animate"
                onMouseOver={() => setTriggerSideImageAnimation(true)}
                onMouseLeave={() => setTriggerSideImageAnimation(false)}
            >
                <motion.div
                    className="specialOption02__centerImage"
                    variants={imageRotateAnimation}
                    initial="initial"
                    animate="animate"
                />
                {[
                    {className: "sideImage01", x: -100, y: -100},
                    {className: "sideImage02", x: 100, y: -100},
                    {className: "sideImage03", x: -100, y: 100},
                    {className: "sideImage04", x: 100, y: 100},
                ].map((image, index) => (
                    <motion.div
                        key={image.className}
                        className={image.className}
                        animate={triggerSideImageAnimation ?
                            {opacity: 0.75, x: 0, y: 0} :
                            {opacity: 0, x: image.x, y: image.y}}
                        transition={{ease: "easeOut", duration: 0.5}}
                    >
                        <motion.div
                            className="specialOption02__sideImage"
                            variants={imageRotateAnimation}
                            initial="initial"
                            animate="animate"
                        />
                    </motion.div>
                ))}
                <div className="specialOption02__container">
                    <p className="specialOption02__container__title01">Sacred</p>
                    <p className="specialOption02__container__title02">Menu</p>
                </div>
            </motion.div>
    );
}

const CategoriesTab = () => {
    const goto = useNavigate();
    const dispatch = useDispatch();
    const [triggerSideImageAnimation, setTriggerSideImageAnimation] = useState(false);

    const handleSelectSpecialMenu = (menuType = "normal", id) => {
        if (menuType === "normal") dispatch(toggleResetSpecialMenu());
        else dispatch(toggleSetSpecialMenu({specialMenu: id}));
    }

    return (
        <section className="categories">
            <div className="categories__HeadingContainer">
                <h3>EXPLORE OUR MENU AND DISCOVER A SYMPHONY OF TASTES</h3>
            </div>
            <div className="categories__optionContainer">
                <div
                    className="categories__optionContainerItems"
                >
                    <SpecialMenu
                        setTriggerSideImageAnimation={setTriggerSideImageAnimation}
                        triggerSideImageAnimation={triggerSideImageAnimation}
                        menuOption={1}
                        handleSelectSpecialMenu={handleSelectSpecialMenu}
                        goto={goto}
                    />
                    <SpecialMenu
                        setTriggerSideImageAnimation={setTriggerSideImageAnimation}
                        triggerSideImageAnimation={triggerSideImageAnimation}
                        menuOption={2}
                        handleSelectSpecialMenu={handleSelectSpecialMenu}
                        goto={goto}
                    />

                    {
                        menuList.map((value) => <Options
                                key={value.id}
                                id={value.id}
                                symbol={value.menuIcon}
                                optionName={value.menuHeading}
                                goto={goto}
                                handleSelectSpecialMenu={handleSelectSpecialMenu}
                            />
                        )
                    }
                </div>
            </div>
        </section>
    );
}

export default CategoriesTab;