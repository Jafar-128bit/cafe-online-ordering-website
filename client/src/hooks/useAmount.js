import { useEffect, useState } from 'react';

const useAmount = (cartData, couponId, couponList) => {
    const [discount, setDiscount] = useState(0);
    const [subTotal, setSubTotal] = useState(0);

    useEffect(() => {
        const selectedCoupons = couponList.filter((coupon) => couponId.includes(coupon.id));
        const filteredItems = cartData.filter((product) =>
            selectedCoupons.some((coupon) => coupon.validProduct.includes(product.id))
        );
        const totalDiscountPrice = filteredItems.map((product) => selectedCoupons.reduce((discount, coupon) =>
                        coupon.validProduct.includes(product.id)
                            ? Math.ceil(((product.price * product.quantity) * coupon.discount) / 100) : discount,
                    0
                )
            )
            .reduce((acc, cur) => acc + cur, 0);

        couponId && setDiscount(totalDiscountPrice);
        setSubTotal(cartData.map((value) => value.price * value.quantity).reduce((acc, cur) => acc + cur, 0));
    }, [cartData, couponId, couponList]);

    return { discount, subTotal };
};

export default useAmount;
