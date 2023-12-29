import './offerList.css';
import './mediaQueryOfferList.css';

import ProductCard from "../ProductCard/ProductCard";
import {motion} from "framer-motion";

const feedSectionAnimation = {
    hidden: {opacity: 0, x: 100,},
    visible: {
        opacity: 1, x: 0,
        transition: {
            duration: 0.2,
            delayChildren: 0.1,
            staggerChildren: 0.15,
        }
    }
};

const feedSubsectionAnimation = {
    initial: {opacity: 0, scale: 0.85},
    animate: () => ({
        opacity: 1,
        scale: 1,
    }),
};

const Banner = ({bannerHeading, bannerImage, bannerMessage}) => {
    return <motion.div
        className="bannerList"
        variants={feedSubsectionAnimation}
        initial="initial"
        animate="animate"
        transition={{delay: 0.3}}
    >
        <h4>{bannerHeading}</h4>
        <p>{bannerMessage}</p>
    </motion.div>
}

const OfferList = ({offerTitle, offerListData = [{}], type = "product"}) => {

    const Element = ({data, index}) => {
        switch (type) {
            case "product":
                return <ProductCard
                    key={data.id}
                    id={data.id}
                    productName={data.productName}
                    productImage={data.productImage}
                    price={data.price}
                    index={index}
                    type="small"
                />;
            case "banner":
                return <Banner
                    key={data.id}
                    bannerHeading={data.bannerHeading}
                    bannerImage={data.bannerImage}
                    bannerMessage={data.bannerMessage}
                />;
            default:
                return <></>
        }
    }

    return (
        <motion.section
            className="offerList"
            variants={feedSectionAnimation}
            initial="hidden"
            animate="visible"
        >
            <h4 className="offerList__title">{offerTitle}</h4>
            <div
                className={
                    `offerList__itemList noScroll 
                    ${
                        type === "product"
                            ? "offerList__itemList__productElement"
                            : "offerList__itemList__bannerElement"
                    }`
                }
            >
                {offerListData.map((data, index) => <Element key={index} data={data} index={index}/>)}
            </div>
        </motion.section>
    );
}

export default OfferList;