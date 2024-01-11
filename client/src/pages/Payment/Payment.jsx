import './payment.css';
import './mediaQueryPaymentPage.css';

import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {paymentInfoState} from "../../store/slices/paymentSlice";
import * as Yup from "yup";
import {useFormik} from "formik";
import useAmount from "../../hooks/useAmount";
import {couponList} from "../../data/data";
import {useEffect, useState} from "react";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import {toggleNavbar} from "../../store/slices/menuSlice";

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('First Name Required')
        .min(3, 'Too Short!')
        .max(15, 'Too Long!'),
    lastName: Yup.string()
        .required('Last Name Required')
        .min(3, 'Too Short!')
        .max(15, 'Too Long!'),
    number: Yup.string()
        .required('Number Required')
        .matches(/^\d+$/, 'Invalid Phone Number')
        .length(10, 'Must be 10 characters'),
    email: Yup.string()
        .required('Email Required')
        .email('Invalid email address'),
});

const PaymentInfo = ({handleBack, formikPaymentInfo, paymentInputData, loading}) => {
    return (
        <section className="payment__info">
            <h2 className="payment__info__title">Payment Info</h2>
            <div className="payment__info__errorContainer">
                {paymentInputData.map((input, index) =>
                    <p key={index}>
                        {input.validation && input.touched ? `*${input.validation}` : null}
                    </p>
                )}
            </div>
            <form
                className="payment__info__form"
                onSubmit={(event) => {
                    event.preventDefault();
                    formikPaymentInfo.handleSubmit();
                }}
            >
                {paymentInputData.map((input) =>
                    <div key={input.key} className="payment__info__inputComponent">
                        <label htmlFor={input.id}>{input.label}</label>
                        <input
                            id={input.id}
                            name={input.name}
                            type={input.type}
                            placeholder={input.placeholder}
                            onBlur={input.blurEvent}
                            onChange={input.onChange}
                            value={input.value}
                            required={true}
                        />
                    </div>
                )}

                <div className="payment__info__form__btnContainer">
                    <button
                        type="button"
                        className="payment__info__form__btnCancel"
                        onClick={handleBack}
                    >
                        cancel
                    </button>
                    <button type="submit" className="payment__info__form__btnSubmit">
                        {
                            loading
                                ?
                                <LoadingScreen
                                    width={20}
                                    height={20}
                                    size="maxContent"
                                    loadingThickness={3}
                                    color="var(--colorWhite)"/>
                                : "Submit"
                        }
                    </button>
                </div>
            </form>
        </section>
    );
}
const PaymentReview = ({subtotal, totalQuantity, discountPrice, taxAndFees, orderTotal, isPay, handlePay}) => {
    return (
        <section className="payment__review">
            <button
                type="button"
                className={
                    `payment__review__btnPay 
                    ${isPay ? "payment__review__btnPay__enabled"
                        : "payment__review__btnPay__disabled"}`
                }
                onClick={handlePay}
            >
                {isPay ? "Pay" : "Submit the form!"}
            </button>
            <p className="payment__review__agreement">
                By placing your order, you agree to our company Privacy policy and Conditions of use.
            </p>
            <div className="payment__separator"/>
            <h4 className="payment__review__orderSummary__title">Order Summary</h4>
            <div className="payment__review__orderSummaryContainer">
                <p>{`Items (${totalQuantity})`}</p>
                <p>{subtotal}</p>
            </div>
            <div className="payment__review__orderSummaryContainer">
                <p>Discount</p>
                <p>-{discountPrice}</p>
            </div>
            <div className="payment__review__orderSummaryContainer">
                <p>Before tax:</p>
                <p>{subtotal - discountPrice}</p>
            </div>
            <div className="payment__review__orderSummaryContainer">
                <p>Tax Collected:</p>
                <p>+{taxAndFees}</p>
            </div>
            <div className="payment__separator"/>
            <div className="payment__review__orderTotal">
                <p>Order Total:</p>
                <p>{orderTotal}</p>
            </div>
        </section>
    )
}

const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isPay, setIsPay] = useState(false);

    const cartData = useSelector((state) => state.cartItems);
    const appliedCouponData = useSelector((state) => state.couponState.appliedCouponData);
    const {discount, subTotal} = useAmount(cartData, appliedCouponData, couponList);
    const tax = Math.floor(subTotal * 0.015);
    const orderTotal = subTotal - discount + tax;

    useEffect(() => {
        dispatch(toggleNavbar({State: false}));
        setQuantity(cartData.map((value) => value.totalQuantity).reduce((acc, cur) => acc + cur, 0));
    }, [cartData, dispatch]);

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
    const handlePay = () => {
        if (!isPay) return -1;
        navigate("/pay");
    }

    const formikPaymentInfo = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            number: '',
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true);
            setTimeout(() => {
                dispatch(paymentInfoState({...values}));
                setIsPay(true);
                setLoading(false);
            }, 1000);
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

    return (
        <section className="payment noScroll">
            <PaymentInfo
                handleBack={handleBack}
                formikPaymentInfo={formikPaymentInfo}
                paymentInputData={paymentInputData}
                loading={loading}
            />
            <PaymentReview
                subtotal={subTotal}
                totalQuantity={quantity}
                discountPrice={discount}
                taxAndFees={tax}
                orderTotal={orderTotal}
                isPay={isPay}
                handlePay={handlePay}
            />
        </section>
    );
}

export default Payment;