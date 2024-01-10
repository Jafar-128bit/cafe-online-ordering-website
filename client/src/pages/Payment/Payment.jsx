import './payment.css';
import './mediaQueryPaymentPage.css';

import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {paymentInfoState} from "../../store/slices/paymentSlice";
import * as Yup from "yup";
import {useFormik} from "formik";

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

const PaymentInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            navigate("/checkout");
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

    const InputComponent = () => {
        return <div className="payment__info__inputComponent">
            <label></label>
            <input/>
        </div>
    }

    return (
        <section className="payment__info">
            <h2 className="payment__info__title">Payment Info</h2>
            <form className="payment__info__form" onSubmit={formikPaymentInfo.handleSubmit}>
                <div>

                </div>
            </form>
        </section>
    )

}

const Payment = () => {
    return (
        <section className="payment noScroll">
            <PaymentInfo/>
        </section>
    );
}

export default Payment;