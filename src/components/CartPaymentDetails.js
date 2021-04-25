import React, { useState, useEffect } from "react";

const CartPaymentDetails = ({ subtotal, formatPrice, setShoppingCompleted }) => {
    const [shipping, setShipping] = useState(23.80);

    useEffect(() => {
        setShipping(subtotal <= 100 ? 23.80 : 0);
    }, [subtotal]);

    return (
        <aside className="cart-payment-details">
            <section className="cart-shipping">
                <a>Shipping:</a> <a>${formatPrice(shipping)}</a>
            </section>
            <section className="cart-costs">
                <div className="cart-totals">CART TOTALS</div>
                <div className="cart-payment-summary">
                    <div><a>Subtotal</a><a>${formatPrice(subtotal)}</a></div>
                    <div><a>Grand Total</a><a>${formatPrice(subtotal + shipping)}</a></div>
                    <div style={{ textAlign: "center", display: "block" }}>
                        <button className="cart-button" onClick={() => setShoppingCompleted(true)}>Proceed checkout</button>
                    </div>
                </div>
            </section>
        </aside>
    )
}

export default CartPaymentDetails;