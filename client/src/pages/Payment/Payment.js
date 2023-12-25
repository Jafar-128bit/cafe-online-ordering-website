import './payment.css';

import {useNavigate} from "react-router-dom";

import backIconDark from "../../assets/icons/arrowBack_Dark_Icon.svg";
// import backIconLight from "../../assets/icons/arrowBack_Light_Icon.svg";
import infoDarkIcon from "../../assets/icons/info__Dark__Icon.svg";
import reviewDarkIcon from "../../assets/icons/review__Dark__Icon.svg";
import checkoutDarkIcon from "../../assets/icons/checkout__Dark__Icon.svg";

import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {
    toggleMenuBar,
    toggleNavbar,
} from "../../store/slices/menuSlice";
import {paymentInfoState} from "../../store/slices/paymentSlice";
import {motion} from "framer-motion";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import PaymentForm from "./PaymentForm/PaymentForm";
import PaymentReview from "./PaymentReview/PaymentReview";

const paymentStageAnimation = {
    hide: {y: 40},
    show: {y: 0},
}

const processIconAnimation = {
    initial: {scale: 1, rotate: 0},
    animate: {
        scale: [1, 0.9, 1, 0.9, 1],
        rotate: [0, 2, -2, 0],
        transition: {ease: "linear", duration: 2, repeat: Infinity, repeatDelay: 0},
    }
}

const backBtnIconAnimation = {
    initial: {x: 0},
    animate: {
        x: [0, 2, -2, 2, -2, 0],
        transition: {ease: "easeInOut", duration: 3, repeat: Infinity, repeatDelay: 0},
    }
}

const LoadingScreenToggleAnimation = {
    hide: {opacity: 0, zIndex: -1},
    show: {opacity: 1, zIndex: 10},
}

const Payment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [track, setTrack] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleBack = () => {
        setIsLoading(true);
        setTimeout(() => {
            if (track === 0) {
                dispatch(paymentInfoState({
                    email: "",
                    firstName: "",
                    foodPack: "",
                    lastName: "",
                    number: "",
                }));
                navigate("/cart");
                setIsLoading(false);
            } else if (track > 0) {
                setTrack(track - 1);
                setIsLoading(false);
            }
        }, 2000);
    }

    useEffect(() => {
        dispatch(toggleMenuBar({State: false}));
        dispatch(toggleNavbar({State: false}));
    }, [dispatch]);

    const processData = [
        {id: 0, processName: "Payment Info", processIcon: infoDarkIcon, trackValue: 0},
        {id: 1, processName: "Order Review", processIcon: reviewDarkIcon, trackValue: 1},
        {id: 2, processName: "Pay", processIcon: checkoutDarkIcon, trackValue: 2},
    ];

    return (
        <section className="payment">
            <section className="payment__processIndicator">
                <button type="button" className="backBtn" onClick={handleBack}>
                    <motion.img
                        src={backIconDark}
                        alt="back arrow"
                        width="20px"
                        height="20px"
                        variants={backBtnIconAnimation}
                        animate="animate"
                    />
                    {track === 0 ? "Cancel" : "Back"}
                </button>

                {processData.map((process) =>
                    <motion.div
                        key={process.id}
                        className="payment__processIndicator__process"
                        style={{zIndex: 2}}
                        variants={paymentStageAnimation}
                        animate={track === process.trackValue ? 'show' : 'hide'}
                        transition={{duration: 0.15, ease: "easeInOut"}}
                    >
                        <p>{process.processName}</p>
                        <motion.div
                            className="payment__processIndicator__process__iconContainer"
                            variants={processIconAnimation}
                            initial="initial"
                            animate="animate"
                        >
                            <img src={process.processIcon} alt={process.processName}/>
                        </motion.div>
                    </motion.div>
                )}
            </section>

            <motion.div
                className="payment__loadingScreen"
                variants={LoadingScreenToggleAnimation}
                animate={isLoading ? "show" : "hide"}
                transition={{ease: "linear", duration: "0.5"}}
            >
                <LoadingScreen
                    height={50}
                    width={50}
                    color="var(--colorBlack)"
                    loadingThickness={5}
                    size="max-content"/>
            </motion.div>

            <section className="payment__processContainer">
                {track === 0 && <PaymentForm setTrack={setTrack} setIsLoading={setIsLoading}/>}
                {track === 1 && <PaymentReview setTrack={setTrack} setIsLoading={setIsLoading}/>}
                {track === 2 && <>Under Development</>}
            </section>

        </section>
    );
}

export default Payment;