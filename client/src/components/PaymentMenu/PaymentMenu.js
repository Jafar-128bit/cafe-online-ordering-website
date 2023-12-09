import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {motion} from 'framer-motion';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {toggleCartMenu, toggleCouponMenu, togglePaymentMenu} from '../../store/slices/menuSlice';
import {paymentInfoState} from '../../store/slices/paymentSlice';
import {couponList} from '../../data/data';

import IconContainer from '../IconContainer/IconContainer';
import backIcon from '../../assets/icons/arrowBackIcon.svg';
import eatIcon from '../../assets/icons/eatIcon.svg';
import foodPackIcon from '../../assets/icons/packingIcon.svg';
import './paymentMenu.css';


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


const InputComponent = ({id, name, type, onChange, value, label}) => {
    return <>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={name} type={type} onChange={onChange} value={value} required={true}/>
    </>;
}

const PaymentMenu = () => {
    const TAX_AND_SERVICE_FEE = 10;

    const dispatch = useDispatch();
    const [track, setTrack] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const paymentMenuState = useSelector((state) => state.menuState.paymentMenuState);
    // const paymentData = useSelector((state => state.paymentInfoState));
    const cartData = useSelector((state) => state.cartItems);
    const couponId = useSelector(state => state.couponState);
    const {State, zIndex} = paymentMenuState;

    const handlePaymentClose = () => {
        if (track === 0) {
            dispatch(paymentInfoState({
                email: "",
                firstName: "",
                foodPack: "",
                lastName: "",
                number: "",
            }));
            dispatch(toggleCouponMenu({State: false}));
            dispatch(togglePaymentMenu({State: false,}));
            dispatch(toggleCartMenu({State: true,}));
        } else if (track > 0) {
            dispatch(toggleCouponMenu({State: false}));
            setTrack(track - 1);
        }
    }
    const handleCouponMenuOpen = () => dispatch(toggleCouponMenu({State: true}));

    const formikPaymentInfo = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            number: '',
            email: '',
            foodPack: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values, {resetForm}) => {
            dispatch(paymentInfoState({...values}));
            resetForm();
            setTrack(1);
        },
    });

    useEffect(() => {
        const selectedCoupons = couponList.filter(coupon => couponId.includes(coupon.id));
        const filteredItems = cartData.filter(product => selectedCoupons.some(coupon => coupon.validProduct.includes(product.id)));
        const totalDiscountPrice = filteredItems
            .map(product => selectedCoupons
                .reduce((discount, coupon) => coupon
                    .validProduct
                    .includes(product.id) ?
                    discount + (product.price * coupon.discount) / 100 :
                    discount, 0)).reduce((acc, cur) => acc + cur, 0);
        couponId && setDiscount(totalDiscountPrice);
        setSubTotal(cartData.map((value) => value.price * value.quantity).reduce((acc, cur) => acc + cur, 0));
    }, [cartData, couponId]);

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
        <motion.aside
            className="paymentMenu darkGlass35"
            style={{zIndex: zIndex}}
            variants={paymentMenuAnimation}
            animate={State ? 'show' : 'hide'}
            transition={{type: "spring", stiffness: 300, damping: 25}}
        >
            <button type="button" className="closeBtn paymentMenu__closeBtn" onClick={handlePaymentClose}>
                <IconContainer
                    src={backIcon}
                    alt="close icon svg"
                    width="15px"
                    height="15px"
                />
                BACK
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
                    Order Review
                </motion.span>
                <motion.span
                    className="paymentMenu__processIndicator__process"
                    variants={paymentStageAnimation}
                    animate={track === 2 ? 'show' : 'hide'}
                    transition={{duration: 0.15, ease: "easeInOut"}}
                >
                    Place Order
                </motion.span>
            </div>

            <div className="paymentMenu__processContainer">
                {/* Process 01 */}
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
                                style={{backgroundColor: !formikPaymentInfo.values.foodPack && "var(--alertColor2)",}}
                                variants={optionsAnimation1}
                                animate={formikPaymentInfo.values.foodPack ? 'hide' : 'show'}
                                transition={{ease: "easeInOut", duration: 0.35}}
                            >No</motion.p>
                            <motion.p
                                className="isFoodPack__option"
                                style={{backgroundColor: formikPaymentInfo.values.foodPack && "var(--baseColor)",}}
                                variants={optionsAnimation2}
                                animate={formikPaymentInfo.values.foodPack ? 'show' : 'hide'}
                                transition={{ease: "easeInOut", duration: 0.35}}
                            >Yes
                            </motion.p>
                            <motion.div
                                className="isFoodPack__icon"
                                variants={iconAnimationIcon1}
                                animate={formikPaymentInfo.values.foodPack ? 'hide' : 'show'}
                                transition={{ease: "easeInOut", duration: 0.35}}
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
                                transition={{ease: "easeInOut", duration: 0.35}}
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
                {/* Process 02 */}
                <motion.section
                    className="paymentMenu__process2"
                    variants={slideAnimation}
                    animate={track === 1 ? 'current' : 'next'}
                    transition={{duration: 0.15, ease: "easeInOut"}}
                >
                    <div className="paymentMenu__process2__heading">
                        <h4 className="paymentMenu__process2__orderIdNumber">Your Order ID #MMDDXXXXX</h4>
                    </div>
                    <div className="paymentMenu__process2__itemList">
                        <div className="paymentMenu__process2__itemList__tableHead">
                            <table className="">
                                <thead>
                                <tr>
                                    <th width="60">Sl. No.</th>
                                    <th>Item Name</th>
                                    <th width="85">Item Price</th>
                                    <th width="25">Qty</th>
                                    <th width="65">Total</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="paymentMenu__process2__itemList__tableItems addScroll">
                            <table>
                                <tbody>
                                {cartData.map((value, index) => (
                                    <tr key={value.id}>
                                        <td width="60">{index + 1}</td>
                                        <td>{value.productName}</td>
                                        <td width="85">{value.price}</td>
                                        <td width="25">{value.quantity}</td>
                                        <td width="65">{value.price * value.quantity}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="paymentMenu__process2__priceDetails">
                        <div className="paymentMenu__process2__priceDetails__info">
                            <p>Subtotal</p>
                            <p>₹{subTotal}</p>
                        </div>
                        <div className="paymentMenu__process2__priceDetails__info">
                            <p>Apply Coupon</p>
                            <button type="button" onClick={handleCouponMenuOpen}>
                                All Coupons
                            </button>
                        </div>
                        {couponId.length !== 0 && <div className="paymentMenu__process2__priceDetails__info">
                            <p>Coupon Discounts</p>
                            <p>-₹{discount}</p>
                        </div>}
                        <div className="paymentMenu__process2__priceDetails__info">
                            <p>Tax and Service Fees</p>
                            <p>+₹{TAX_AND_SERVICE_FEE}</p>
                        </div>
                        <div className="paymentMenu__process2__priceDetails__info">
                            <p>Total Amount</p>
                            <p>₹{subTotal + TAX_AND_SERVICE_FEE - discount}</p>
                        </div>
                    </div>
                    <div className="paymentMenu__process2__btnContainer">
                        <button
                            type="button"
                            className="paymentMenu__process2__btnContainer__btnPay"
                            onClick={() => setTrack(2)}
                        >
                            Pay
                        </button>
                    </div>
                </motion.section>
                {/* Process 03 */}
                <motion.div
                    className="paymentMenu__process3"
                    variants={slideAnimation}
                    animate={track === 2 ? 'current' : 'next'}
                    transition={{duration: 0.15, ease: "easeInOut"}}
                >
                    <h3>Under Development...</h3>
                </motion.div>
            </div>
        </motion.aside>
    );
}

export default PaymentMenu;