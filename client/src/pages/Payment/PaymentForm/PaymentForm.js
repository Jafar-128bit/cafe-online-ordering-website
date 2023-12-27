import './paymentForm.css';

import eat__Dark__Icon from '../../../assets/icons/eat__Dark__Icon.svg';
import foodPack__Dark__Icon from '../../../assets/icons/packing__Dark__Icon.svg';
// import infoDarkIcon from "../../../assets/icons/info__Dark__Icon.svg";
import infoLightIcon from "../../../assets/icons/info__Light__Icon.svg";

import * as Yup from "yup";
import {useFormik} from "formik";
import {paymentInfoState} from "../../../store/slices/paymentSlice";
import {useDispatch} from "react-redux";
import {motion} from "framer-motion";

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('Required')
        .min(3, 'Too Short!')
        .max(15, 'Too Long!'),
    lastName: Yup.string()
        .required('Required')
        .min(3, 'Too Short!')
        .max(15, 'Too Long!'),
    number: Yup.string()
        .required('Required')
        .matches(/^\d+$/, 'Invalid Phone Number')
        .length(10, 'Must be 10 characters'),
    email: Yup.string()
        .required('Required')
        .email('Invalid email address'),
});

const inputBorderAnimation = {
    hide: {border: "2px solid var(--colorBlack)"},
    show: {border: "2px solid var(--color03)"}
}

const formErrorAnimation = {
    hide: {y: 30},
    show: {y: 0},
}

const toggleFoodPackIconAnimation = {
    no: {x: 0, rotate: 0},
    yes: {x: 59, rotate: 360},
}

const toggleFoodPackTextAnimation = {
    no: {x: 0},
    yes: {x: -30},
}

const PaymentForm = ({processIconAnimation, handleBack}) => {
    const dispatch = useDispatch();
    const formikPaymentInfo = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            number: '',
            email: '',
            foodPack: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(paymentInfoState({...values}));
        },
    });

    const paymentInputData = [
        {
            key: 1,
            id: 'firstName',
            name: 'firstName',
            type: 'text',
            placeholder: "Ex. John",
            label: 'First Name',
            onChange: formikPaymentInfo.handleChange,
            value: formikPaymentInfo.values.firstName,
            validation: formikPaymentInfo.errors.firstName,
            blurEvent: formikPaymentInfo.handleBlur,
            touched: formikPaymentInfo.touched.firstName,
        },
        {
            key: 2,
            id: 'lastName',
            name: 'lastName',
            type: 'text',
            placeholder: "Ex. Watson",
            label: 'Last Name',
            onChange: formikPaymentInfo.handleChange,
            value: formikPaymentInfo.values.lastName,
            validation: formikPaymentInfo.errors.lastName,
            blurEvent: formikPaymentInfo.handleBlur,
            touched: formikPaymentInfo.touched.lastName,
        },
        {
            key: 3,
            id: 'number',
            name: 'number',
            type: 'text',
            placeholder: "Ex. 123 456 7890 (No Country Code)",
            label: 'Phone Number',
            onChange: formikPaymentInfo.handleChange,
            value: formikPaymentInfo.values.number,
            validation: formikPaymentInfo.errors.number,
            blurEvent: formikPaymentInfo.handleBlur,
            touched: formikPaymentInfo.touched.number,
        },
        {
            key: 4,
            id: 'email',
            name: 'email',
            type: 'email',
            placeholder: "Ex. johnwatson99@email.com",
            label: 'Email',
            onChange: formikPaymentInfo.handleChange,
            value: formikPaymentInfo.values.email,
            validation: formikPaymentInfo.errors.email,
            blurEvent: formikPaymentInfo.handleBlur,
            touched: formikPaymentInfo.touched.email,
        },
    ];
    const paymentInputCheckData = [
        {
            key: 1,
            id: 'foodPack',
            name: 'foodPack',
            type: 'checkbox',
            placeholder: "",
            onChange: formikPaymentInfo.handleChange,
            value: formikPaymentInfo.values.foodPack,
            blurEvent: formikPaymentInfo.handleBlur,
            touched: formikPaymentInfo.touched.foodPack,
        },
    ]

    return (
        <div className="payment__processContainer">
            <div className="payment__process__title">
                <h2>Payment Info</h2>
                <motion.img
                    src={infoLightIcon}
                    alt="paymentInfo"
                    variants={processIconAnimation}
                    initial="initial"
                    animate="animate"
                />
            </div>
            <form className="payment__process1__formContainer" onSubmit={formikPaymentInfo.handleSubmit}>
                <section className="payment__process1__formInputContainer">
                    {
                        paymentInputData.map((input) =>
                            <div key={input.key} className="payment__process1__formInputs">
                                <motion.p
                                    className="payment__process1__formErrors"
                                    variants={formErrorAnimation}
                                    animate={input.validation && input.touched ? "show" : "hide"}
                                >
                                    {input.validation && input.touched ? input.validation : "error message!"}
                                </motion.p>
                                <label htmlFor={input.id}
                                       className="payment__process1__formInputs__labels">{input.label}</label>
                                <motion.input
                                    id={input.id}
                                    name={input.name}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    onBlur={input.blurEvent}
                                    onChange={input.onChange}
                                    value={input.value}
                                    required={true}
                                    variants={inputBorderAnimation}
                                    animate={input.validation && input.touched ? "show" : "hide"}
                                    transition={{ease: "linear", duration: 0.15}}
                                />
                            </div>
                        )}
                    {paymentInputCheckData.map((input) =>
                        <div key={input.key} className="payment__process1__formInputs checkedInput">
                            <p>Pack the Food?</p>
                            <input
                                id={input.id}
                                name={input.name}
                                type={input.type}
                                placeholder={input.placeholder}
                                onBlur={input.blurEvent}
                                onChange={input.onChange}
                                value={input.value}
                            />
                            <label
                                htmlFor={input.id}
                                className="payment__process1__formInputs__toggleInput"
                                style={{
                                    background: formikPaymentInfo.values.foodPack
                                        ? "var(--themeColor01)" : "var(--color03)"
                                }}
                            >
                                <motion.p
                                    variants={toggleFoodPackTextAnimation}
                                    animate={formikPaymentInfo.values.foodPack ? "yes" : "no"}
                                    transition={{ease: "easeOut", duration: 0.25}}
                                >
                                    {formikPaymentInfo.values.foodPack ? "Yes" : "No"}
                                </motion.p>
                                <motion.div
                                    className="toggleBtn"
                                    variants={toggleFoodPackIconAnimation}
                                    animate={formikPaymentInfo.values.foodPack ? "yes" : "no"}
                                    transition={{ease: "easeOut", duration: 0.25}}
                                >
                                    <img
                                        src={formikPaymentInfo.values.foodPack ? foodPack__Dark__Icon : eat__Dark__Icon}
                                        alt="food pack or not"
                                        width="20px"
                                        height="20px"
                                    />
                                </motion.div>
                            </label>
                        </div>)}
                </section>
                <section className="payment__process1__formSubmitBtn">
                    <button type="button" onClick={handleBack}>Cancel</button>
                    <button type="submit">Submit</button>
                </section>
            </form>
        </div>
    );
}

export default PaymentForm;