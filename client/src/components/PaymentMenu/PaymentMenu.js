import './paymentMenu.css';

import {togglePaymentMenu} from "../../store/slices/menuSlice";
import IconContainer from "../IconContainer/IconContainer";
import closeIcon from "../../assets/icons/closeIcon.svg";
import eatIcon from "../../assets/icons/eatIcon.svg";
import foodPackIcon from "../../assets/icons/packingIcon.svg";

import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {motion} from "framer-motion";
import {useFormik} from "formik";
import {paymentInfoState} from "../../store/slices/paymentSlice";

const paymentMenuAnimation = {
    hide: {x: 700},
    show: {x: 0},
}

const paymentStageAnimation = {
    hide: {opacity: 0.5, scale: 0.80},
    show: {opacity: 1, scale: 1},
}

const inputErrorAnimation = {
    hide: {x: 300},
    show: {x: 0},
}

const iconAnimationIcon1 = {
    hide: {x: 50},
    show: {x: 0},
}

const iconAnimationIcon2 = {
    hide: {x: 50},
    show: {x: 0},
}

const optionsAnimation1 = {
    hide: {y: 50},
    show: {y: 0},
}

const optionsAnimation2 = {
    hide: {y: 50},
    show: {y: 0},
}

const slideAnimation = {
    current: {x: 0},
    next: {x: -550},
}

const validate = (values = {}) => {
    const errors = {};

    if (!values.firstName) {
        errors.firstName = 'Required';
    } else if (values.firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less';
    }

    if (!values.lastName) {
        errors.lastName = 'Required';
    } else if (values.lastName.length > 15) {
        errors.lastName = 'Must be 15 characters or less';
    }

    if (!values.number) {
        errors.number = 'Required!';
    } else if (values.number.length !== 10) {
        errors.number = !/^\d+$/.test(values.number) ? 'Invalid Phone Number!' : 'Phone number must be 10 characters!';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

const InputComponent = ({id, name, type, onChange, value, label}) => {
    return <>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={name} type={type} onChange={onChange} value={value} required={true}/>
    </>;
}

const PaymentMenu = () => {
    const dispatch = useDispatch();
    const [track, setTrack] = useState(0);
    const paymentMenuState = useSelector((state) => state.menuState.paymentMenuState);
    // const paymentData = useSelector((state => state.paymentInfoState));
    const {State, zIndex} = paymentMenuState;
    const handlePaymentClose = () => dispatch(togglePaymentMenu({State: false,}));
    const formikPaymentInfo = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            number: '',
            email: '',
            foodPack: false,
        },
        validate,
        onSubmit: (values, {resetForm}) => {
            dispatch(paymentInfoState({...values}));
            resetForm();
            setTrack(1);
        }
    });

    const paymentInfoInput = [
        {
            key: 1,
            id: 'firstName',
            name: 'firstName',
            type: 'text',
            label: 'First Name',
            onChange: formikPaymentInfo.handleChange,
            value: formikPaymentInfo.values.firstName,
            validation: formikPaymentInfo.errors.firstName,
        },
        {
            key: 2,
            id: 'lastName',
            name: 'lastName',
            type: 'text',
            label: 'Last Name',
            onChange: formikPaymentInfo.handleChange,
            value: formikPaymentInfo.values.lastName,
            validation: formikPaymentInfo.errors.lastName,
        },
        {
            key: 3,
            id: 'number',
            name: 'number',
            type: 'text',
            label: 'Phone Number',
            onChange: formikPaymentInfo.handleChange,
            value: formikPaymentInfo.values.number,
            validation: formikPaymentInfo.errors.number,
        },
        {
            key: 4,
            id: 'email',
            name: 'email',
            type: 'email',
            label: 'Email',
            onChange: formikPaymentInfo.handleChange,
            value: formikPaymentInfo.values.email,
            validation: formikPaymentInfo.errors.email,
        },
    ];

    return (
        <motion.div
            className="paymentMenu darkGlass75"
            style={{zIndex: zIndex}}
            variants={paymentMenuAnimation}
            animate={State ? 'show' : 'hide'}
            transition={{type: "spring", stiffness: 300, damping: 25}}
        >
            <button type="button" className="closeBtn paymentMenu__closeBtn" onClick={handlePaymentClose}>
                <IconContainer
                    src={closeIcon}
                    alt="close icon svg"
                    width={30}
                    height={30}
                    background={false}
                />
            </button>
            <div className="paymentMenu__processIndicator">
                <motion.span
                    className="paymentMenu__processIndicator__process"
                    variants={paymentStageAnimation}
                    animate={track === 0 ? 'show' : 'hide'}
                    transition={{duration: 0.15, ease: "easeInOut"}}
                >
                    Payment Info
                </motion.span>
                <motion.span
                    className="paymentMenu__processIndicator__process"
                    variants={paymentStageAnimation}
                    animate={track === 1 ? 'show' : 'hide'}
                    transition={{duration: 0.15, ease: "easeInOut"}}
                >
                    Receipt
                </motion.span>
                <motion.span
                    className="paymentMenu__processIndicator__process"
                    variants={paymentStageAnimation}
                    animate={track === 2 ? 'show' : 'hide'}
                    transition={{duration: 0.15, ease: "easeInOut"}}
                >
                    Checkout
                </motion.span>
            </div>

            <div className="paymentMenu__processContainer">
                <motion.form
                    className="paymentMenu__process1"
                    onSubmit={formikPaymentInfo.handleSubmit}
                    variants={slideAnimation}
                    animate={track === 0 ? 'current' : 'next'}
                    transition={{duration: 0.15, ease: "easeInOut"}}
                >
                    {paymentInfoInput.map((inputVal) => {
                        const {key, id, name, type, onChange, value, validation, label} = inputVal;
                        return <div key={key} className="paymentMenu__process1__inputContainer">
                            <InputComponent
                                id={id}
                                name={name}
                                value={value}
                                onChange={onChange}
                                type={type}
                                label={label}
                            />
                            <motion.p
                                className="paymentMenu__process1__errorContainer"
                                variants={inputErrorAnimation}
                                animate={validation ? 'show' : 'hide'}
                                transition={{type: "spring", stiffness: 300, damping: 25, duration: 0.1}}
                            >
                                {validation}
                            </motion.p>
                        </div>
                    })}
                    <div className="paymentMenu__process1__inputContainer">
                        <label
                            htmlFor="foodPack"
                            className="paymentMenu__process1__isFoodPack"
                        >
                            Pack the Food?
                            <motion.p
                                className="isFoodPack__option"
                                variants={optionsAnimation1}
                                animate={formikPaymentInfo.values.foodPack ? 'hide' : 'show'}
                                transition={{type: "spring", stiffness: 300, damping: 20, duration: 0.1}}
                            >No</motion.p>
                            <motion.p
                                className="isFoodPack__option"
                                variants={optionsAnimation2}
                                animate={formikPaymentInfo.values.foodPack ? 'show' : 'hide'}
                                transition={{type: "spring", stiffness: 300, damping: 20, duration: 0.1}}
                            >Yes
                            </motion.p>
                            <motion.div
                                className="isFoodPack__icon"
                                variants={iconAnimationIcon1}
                                animate={formikPaymentInfo.values.foodPack ? 'hide' : 'show'}
                                transition={{type: "spring", stiffness: 300, damping: 20, duration: 0.1}}
                            >
                                <IconContainer
                                    src={eatIcon}
                                    alt="eat icon"
                                    width={24}
                                    height={24}
                                    background={false}
                                />
                            </motion.div>
                            <motion.div
                                className="isFoodPack__icon"
                                variants={iconAnimationIcon2}
                                animate={formikPaymentInfo.values.foodPack ? 'show' : 'hide'}
                                transition={{type: "spring", stiffness: 300, damping: 20, duration: 0.1}}
                            >
                                <IconContainer
                                    src={foodPackIcon}
                                    alt="food pack icon"
                                    width={24}
                                    height={24}
                                    background={false}
                                />
                            </motion.div>
                        </label>
                        <input
                            type="checkbox"
                            name="foodPack"
                            id="foodPack"
                            onChange={formikPaymentInfo.handleChange}
                            value={formikPaymentInfo.values.foodPack}
                            required={false}
                        />
                    </div>
                    <button
                        type="submit"
                        className="paymentMenu__process1__submitBtn"
                    >
                        Submit
                    </button>
                </motion.form>

                <motion.section
                    className="paymentMenu__process2"
                    variants={slideAnimation}
                    animate={track === 1 ? 'current' : 'next'}
                    transition={{duration: 0.15, ease: "easeInOut"}}
                >
                    <div className="paymentMenu__process2__heading">
                        <h3 className="paymentMenu__process2__title">CAMPUS'CAFE</h3>
                        <h4 className="paymentMenu__process2__receiptNumber">RECEIPT NO. - #123456</h4>
                    </div>
                    <div className="paymentMenu__process2__itemList">

                    </div>
                </motion.section>
            </div>
        </motion.div>
    );
}

export default PaymentMenu;