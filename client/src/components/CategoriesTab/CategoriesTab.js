import './categoriesTab.css';
import categoriesTabCover from '../../assets/background/categoriesTabCover.png';

import {menuList} from "../../data/data";
import {motion} from "framer-motion";
import ImageContainer from "../ImageContainer/ImageContainer";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

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
        transition: {ease: "easeOut", duration: 16, repeat: Infinity, repeatDelay: 0.5},
    }
}


const Options = ({id, optionName, symbol, goto}) => {

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
                onClick={() => goto(`/menu/normal/${id}`)}
            >
                {optionName}
            </button>
        </motion.section>
    );
}

const SpecialMenu = ({setTriggerSideImageAnimation, triggerSideImageAnimation, menuOption, goto}) => {
    return (menuOption === 1 ?
            <motion.div
                className="specialOption01"
                onClick={() => goto("/menu/specialMenu/1")}
                variants={categoryCard}
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
                onClick={() => goto("/menu/specialMenu/2")}
                variants={categoryCard}
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
    const [triggerSideImageAnimation, setTriggerSideImageAnimation] = useState(false);

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
                <SpecialMenu
                    setTriggerSideImageAnimation={setTriggerSideImageAnimation}
                    triggerSideImageAnimation={triggerSideImageAnimation}
                    menuOption={1}
                    goto={goto}
                />
                <SpecialMenu
                    setTriggerSideImageAnimation={setTriggerSideImageAnimation}
                    triggerSideImageAnimation={triggerSideImageAnimation}
                    menuOption={2}
                    goto={goto}
                />
            </div>
            <div className="categories__optionContainer">
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
        </motion.section>
    );
}

export default CategoriesTab;