import './paymentReview.css';
import {useSelector} from "react-redux";
import useAmount from "../../../hooks/useAmount";
import {couponList} from "../../../data/data";

const PaymentReview = ({setTrack, setIsLoading}) => {

    const cartData = useSelector((state) => state.cartItems);
    const couponId = useSelector(state => state.couponState);
    const {discount, subTotal} = useAmount(cartData, couponId, couponList);

    const handlePay = (flag = "") => {
        setIsLoading(true);
        if (flag === "cash") {
            setTimeout(() => {
                setTrack(2);
                setIsLoading(false);
            }, 1000);
        } else if (flag === "online") {
            setTimeout(() => {
                setTrack(2);
                setIsLoading(false);
            }, 1000);
        }
    };

    return (
        <div className="payment__process process02">
            <div className="payment__process2__heading">
                <h4 className="payment__process2__orderIdNumber">Your Order ID #MMDDXXXXX</h4>
            </div>
            <div className="payment__process2__itemList">
                <div className="payment__process2__itemList__tableHead">
                    <table className="">
                        <thead>
                        <tr>
                            <th width="60">Sl. No.</th>
                            <th>Item Name</th>
                            <th width="70">Item Price</th>
                            <th width="20">Qty</th>
                            <th width="60">Total</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div className="payment__process2__itemList__tableItems addScroll">
                    <table>
                        <tbody>
                        {cartData.map((value, index) =>
                            <tr key={value.id}>
                                <td width="60">{index + 1}</td>
                                <td>{value.productName}</td>
                                <td width="70">{value.price}</td>
                                <td width="20">{value.quantity}</td>
                                <td width="60">{value.price * value.quantity}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="payment__process2__priceDetails">
                <div className="payment__process2__priceDetails__info">
                    <p>Subtotal</p>
                    <p>₹{subTotal}</p>
                </div>
                {couponId.length !== 0 && <div className="payment__process2__priceDetails__info">
                    <p>Coupon Discounts</p>
                    <p>-₹{discount}</p>
                </div>}
                <div className="payment__process2__priceDetails__info">
                    <p>Tax and Service Fees</p><p>+₹{Math.floor(subTotal * 0.015)}</p>
                </div>
                <div className="payment__process2__priceDetails__info">
                    <p>Total Amount</p><p>₹{subTotal + 10 - discount}</p>
                </div>
            </div>
            <div className="payment__process2__btnContainer">
                <button
                    type="button"
                    className="payment__process2__btnContainer__btnPay"
                    onClick={() => handlePay("cash")}
                >
                    Pay Cash
                </button>
                <button
                    type="button"
                    className="payment__process2__btnContainer__btnPay"
                    onClick={() => handlePay("online")}
                >
                    Pay Online
                </button>
            </div>
        </div>
    );
}

export default PaymentReview;