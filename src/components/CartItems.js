import React from "react";

import CartItem from "./CartItem";

const CartItems = ({ products, calculateSubtotal, changeInCart, deleteFromCart, formatPrice }) => {
    return (
        <main className="cart-items">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Product Name</th>
                        <th>Unit Price</th>
                        <th>Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, id) => {
                            return <CartItem
                                key={product.id}
                                calculateSubtotal={calculateSubtotal}
                                product={product}
                                changeInCart={changeInCart}
                                deleteFromCart={deleteFromCart}
                                formatPrice={formatPrice}
                            />
                        })
                    }
                </tbody>
            </table>
            <div className="cart-items-button-div">
                <button className="cart-button" onClick={calculateSubtotal}>Update Shopping Cart</button>
            </div>
        </main>
    )
}

export default CartItems;


