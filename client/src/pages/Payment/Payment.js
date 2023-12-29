import './payment.css';
import './mediaQueryPaymentPage.css';

import {useNavigate} from "react-router-dom";

// import backIconDark from "../../assets/icons/arrowBack_Dark_Icon.svg";
// import backIconLight from "../../assets/icons/arrowBack_Light_Icon.svg";

import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {paymentInfoState} from "../../store/slices/paymentSlice";
// import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import PaymentForm from "./PaymentForm/PaymentForm";
import PaymentReview from "./PaymentReview/PaymentReview";
import {toggleMenuBar} from "../../store/slices/menuSlice";

const processIconAnimation = {
    initial: {scale: 1, rotate: 0},
    animate: {
        scale: [1, 0.9, 1, 0.9, 1],
        rotate: [0, 2, -2, 0],
        transition: {ease: "linear", duration: 2, repeat: Infinity, repeatDelay: 0},
    }
}

// const LoadingScreenToggleAnimation = {
//     hide: {opacity: 0, zIndex: -1},
//     show: {opacity: 1, zIndex: 10},
// }

const Payment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(toggleMenuBar({State: false}));
    }, [dispatch]);

    const handleBack = () => {
        dispatch(paymentInfoState({
            email: "",
            firstName: "",
            foodPack: "",
            lastName: "",
            number: "",
        }));
        navigate("/cart");
    }

    return (
        <section className="payment noScroll">
            <PaymentReview processIconAnimation={processIconAnimation}/>
            <PaymentForm processIconAnimation={processIconAnimation} handleBack={handleBack}/>
        </section>
    );
}

export default Payment;