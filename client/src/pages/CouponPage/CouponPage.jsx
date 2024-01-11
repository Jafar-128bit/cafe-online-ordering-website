import './couponPage.css';
import './mediaQueryCouponPage.css';

import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import {couponList} from "../../data/data";
import CouponCard from "../../components/CouponCard/CouponCard";
import useValidCoupon from "../../hooks/useValidCoupon";

const CouponPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [subtotal, setSubtotal] = useState([]);
    const cartData = useSelector((state) => state.cartItems);
    const themeMode = useSelector(state => state.themeSwitchSlices);
    const {theme} = themeMode;

    const {validCouponData} = useValidCoupon(subtotal, couponList, cartData);
    const handleNavigate = () => navigate(-1);

    useEffect(() => {
        setSubtotal(cartData.map((value) => value.price * value.quantity).reduce((acc, cur) => acc + cur, 0));
    }, [cartData, subtotal, dispatch]);

    return (
        <section className="couponPage">
            <div className="couponPage__title">
                <button
                    className="couponPage__backBtn"
                    style={{
                        color: theme === "dark" ? "var(--colorWhite)" : "var(--colorBlack)",
                    }}
                    onClick={handleNavigate}
                >
                    <ArrowBackIosIcon style={{
                        color: theme === "dark" ? "var(--colorWhite)" : "var(--colorBlack)",
                        fontSize: "14px"
                    }}/>
                    Back
                </button>
            </div>
            <section className="couponPage__couponList noScroll" style={{
                gridTemplateRows: `repeat(${couponList.length}, auto-fill)`
            }}>
                {validCouponData && validCouponData.map((value, index) => <CouponCard
                        key={value.id}
                        id={value.id}
                        index={index}
                        couponCode={value.couponCode}
                        discount={value.discount}
                        couponType={value.type}
                        validProductIDs={value?.validProduct}
                        purchaseLimit={value?.purchaseLimit}
                        endDate={value.endDate}
                        isHide={value.isHide}
                        selfCouponData={validCouponData[index]}
                    />
                )}
            </section>
        </section>
    );
}

export default CouponPage;