import './couponCard.css';
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {addCoupon, removeCoupon} from "../../store/slices/setCouponSlices";
import {useDispatch, useSelector} from "react-redux";

const applyCouponAnimation = {
    hide: {x: 0},
    show: {x: 85}
}

const CouponCard = ({id, couponCode, discount}) => {
    const dispatch = useDispatch();
    const couponId = useSelector(state => state.couponState);
    const [applyCoupon, setApplyCoupon] = useState(false);

    useEffect(() => {
        const isCouponId = couponId.some((couponId) => couponId === id);
        setApplyCoupon(isCouponId);
    }, [couponId, id]);

    const handleApplyCoupon = (id) => {
        if (applyCoupon === false) dispatch(addCoupon(id));
        else if (applyCoupon === true) dispatch(removeCoupon(id));
    }

    return (
        <div className="couponCard">
            <div className="couponCard__upper">
                <h3>{couponCode}</h3>
            </div>
            <div className="couponCard__lower">
                <p className="couponCard__lower__title">
                    Unlock a delightful {discount}% off on your basket items!
                </p>
                <div className="couponCard__lower__info">
                    <p className="couponCard__lower__code">{couponCode}</p>
                    <div className="couponCard__lower__applyCouponSlider">
                        <input
                            type="checkbox"
                            id={`applyCouponBtn__${id}`}
                            name="applyCouponBtn"
                            onClick={() => handleApplyCoupon(id)}
                        />
                        <label className="sliderBase" htmlFor={`applyCouponBtn__${id}`}>
                            Nope!
                            <motion.div
                                className="sliderCircle"
                                variants={applyCouponAnimation}
                                animate={applyCoupon ? 'show' : 'hide'}
                                transition={{type: "spring", stiffness: 300, damping: 25}}
                            >
                                Apply!
                            </motion.div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CouponCard;