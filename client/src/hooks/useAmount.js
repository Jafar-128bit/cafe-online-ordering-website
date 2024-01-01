import {useEffect, useState} from 'react';

const useAmount = (cartData, couponData, couponList) => {
    const [discount, setDiscount] = useState(0);
    const [subTotal, setSubTotal] = useState(0);

    useEffect(() => {
        const selectedCoupons = couponList.filter((coupon) => couponData.map(coupon => coupon.id).includes(coupon.id));

        // on product type
        const productDiscount = cartData
            .filter((product) => selectedCoupons
                .filter((coupon) => coupon.type === 'on-Product' && coupon.validProduct)
                .some((coupon) => coupon.validProduct.includes(product.id)))
            .map((product) => selectedCoupons
                .reduce((discount, coupon) => coupon.validProduct && coupon.validProduct.includes(product.id)
                    ? discount + Math.ceil(((product.price * product.quantity) * coupon.discount) / 100)
                    : discount, 0))
            .reduce((acc, cur) => acc + cur, 0);


        // on purchase type
        const purchaseDiscount = selectedCoupons.filter((coupon) => coupon.type === 'on-Purchase')
            .reduce((acc, coupon) => {
                const eligiblePurchase = cartData.reduce((total, product) => total + product.price * product.quantity, 0);
                return coupon.purchaseLimit && eligiblePurchase >= coupon.purchaseLimit
                    ? Math.ceil((eligiblePurchase * coupon.discount) / 100) : 0;
            }, 0);

        setDiscount(productDiscount + purchaseDiscount);
        setSubTotal(cartData.map((value) => value.price * value.quantity).reduce((acc, cur) => acc + cur, 0));
    }, [cartData, couponData, couponList]);

    return {discount, subTotal};
};

export default useAmount;
