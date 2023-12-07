import './paymentMenu.css';

import {togglePaymentMenu} from "../../store/slices/menuSlice";
import IconContainer from "../IconContainer/IconContainer";
import closeIcon from "../../assets/icons/closeIcon.svg";
import foodPackImage from "../../assets/background/packFood.jpg";
import foodEatImage from "../../assets/background/eatFood.jpg";

import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {motion} from "framer-motion";
import {useFormik} from "formik";

const paymentMenuAnimation = {
    hide: {scale: 0, opacity: 0, transition: {duration: 0.15, ease: "easeOut"}},
    show: {scale: 1, opacity: 1, transition: {duration: 0.15, ease: "easeIn"}},
}

const MAX_NAME_LENGTH = 15;
const PHONE_NUMBER_LENGTH = 10;

const validateLength = (value, maxLength, fieldName) => {
    return value && value.length > maxLength
        ? `Must be ${maxLength} characters or less for ${fieldName}!` :
        value.length === 0 ?
            'Required!' :
            null;
};
const validate = (values = {}) => {
    const errors = {
        firstName: '',
        lastName: '',
        number: '',
        email: '',
    };

    errors.firstName = validateLength(values.firstName, MAX_NAME_LENGTH, 'First Name');
    errors.lastName = validateLength(values.lastName, MAX_NAME_LENGTH, 'Last Name');

    let number = values.number.toString();

    if (!number) {
        errors.number = 'Required!';
    } else if (number.length !== PHONE_NUMBER_LENGTH) {
        errors.number = !/^\d+$/.test(number) ?
            'Invalid Phone Number!' :
            'Phone number must be 10 characters!';
    } else errors.number = null;

    errors.email = !values.email
        ? 'Required!'
        : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ? 'Invalid email address!'
            : null;

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
    const [isPack, setIsPack] = useState(false);
    const paymentMenuState = useSelector((state) => state.menuState.paymentMenuState);
    const {State, zIndex} = paymentMenuState;
    const handlePaymentClose = () => dispatch(togglePaymentMenu({State: false,}));
    const formikPaymentInfo = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            number: '',
            email: '',
            isFoodPack: false,
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
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
            className={`paymentMenu ${State ? 'paymentMenuOpen' : 'paymentMenuHide'}`}
            style={{zIndex: zIndex}}
            variants={paymentMenuAnimation}
            animate={State ? 'show' : 'hide'}
        >
            <button type="button" className="closeBtn" onClick={handlePaymentClose}>
                <IconContainer
                    src={closeIcon}
                    alt="close icon svg"
                    width={30}
                    height={30}
                    background={false}
                />
            </button>
            <div className="paymentMenu__processIndicator">
                <span
                    className={`paymentMenu__processIndicator__stage 
                    ${track === 0 ? "processIndicatorActive" : "processIndicatorInActive"}`}
                >
                    Payment Info
                </span>
                <span
                    className={`paymentMenu__processIndicator__stage 
                    ${track === 1 ? "processIndicatorActive" : "processIndicatorInActive"}`}
                >
                    Receipt
                </span>
                <span
                    className={`paymentMenu__processIndicator__stage 
                    ${track === 2 ? "processIndicatorActive" : "processIndicatorInActive"}`}
                >
                    Checkout
                </span>
                <div className="paymentMenu__processIndicator__track"/>
            </div>

            <div className="paymentMenu__container__stage01">
                <form onSubmit={formikPaymentInfo.handleSubmit} className="paymentMenu__container__stage01__form">
                    <fieldset id="inputGroup" className="inputGroup">
                        {paymentInfoInput.map((inputVal) => {
                            const {key, id, name, type, onChange, value, validation, label} = inputVal;
                            return <div key={key} className="inputGroup__Container">
                                <InputComponent
                                    id={id}
                                    name={name}
                                    value={value}
                                    onChange={onChange}
                                    type={type}
                                    label={label}
                                />
                                <p className={`inputGroup__errorContainer ${validation ? 'errorShow' : 'errorHide'}`}>
                                    {validation}
                                </p>
                            </div>
                        })}
                    </fieldset>
                    <fieldset id="optionsGroup" className="foodPackGroup">
                        <h3 className="foodPackGroup__title">Eat Or Pack The Food?</h3>
                        <div
                            className="foodPackGroup__foodOption"
                            style={{
                                backgroundImage: `url(${foodEatImage})`,
                                border: !isPack ? "2px solid var(--color07)" : "2px solid transparent"
                            }}
                        >
                            <label htmlFor="eat" style={{backgroundColor: isPack ? "transparent" : "var(--color15)"}}>
                                <div
                                    className={`foodPackGroup__foodOption__indicator
                                    ${!isPack && "foodPackGroup__foodOption__indicator__selected"}`}
                                />
                                Eat Here
                            </label>
                            <input
                                type="radio"
                                id="eat"
                                value={formikPaymentInfo.values.isFoodPack}
                                onChange={formikPaymentInfo.handleChange}
                                name="foodPackGroup"
                                checked={true}
                                onClick={() => setIsPack(false)}
                            />
                        </div>
                        <div
                            className="foodPackGroup__foodOption"
                            style={{
                                backgroundImage: `url(${foodPackImage})`,
                                border: isPack ? "2px solid var(--color07)" : "2px solid transparent"
                            }}
                        >
                            <label htmlFor="pack" style={{backgroundColor: isPack ? "var(--color15)" : "transparent"}}>
                                <div
                                    className={`foodPackGroup__foodOption__indicator
                                    ${isPack && "foodPackGroup__foodOption__indicator__selected"}`}
                                />
                                Pack Food
                            </label>
                            <input
                                type="radio"
                                id="pack"
                                value={formikPaymentInfo.values.isFoodPack}
                                onChange={formikPaymentInfo.handleChange}
                                name="foodPackGroup"
                                onClick={() => setIsPack(true)}
                            />
                        </div>
                    </fieldset>
                </form>
            </div>
            <div className="paymentMenu__btnContainer">
                <button type="button" className="paymentMenu__btnContainer__Button"
                        style={{
                            opacity: track === 0 ? 0.3 : 1,
                            cursor: track === 0 ? "not-allowed" : "pointer",
                        }}
                        onClick={() => setTrack(track - 1)}
                >
                    Back
                </button>
                <button type="button" className="paymentMenu__btnContainer__Button"
                        style={{
                            opacity: track === 2 ? 0.3 : 1,
                            cursor: track >= 0 && track <= 2 ? "pointer" : "not-allowed",
                        }}
                        onClick={() => setTrack(track + 1)}
                >
                    Next
                </button>
            </div>
        </motion.div>
    );
}

export default PaymentMenu;