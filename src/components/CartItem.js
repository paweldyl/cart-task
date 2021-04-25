import React from "react";

const CartItem = ({ product, calculateSubtotal, changeInCart, deleteFromCart, formatPrice }) => {
    return (
        <tr>
            <td>
                <img onClick={() => deleteFromCart(product.id)} src="./images/x-img.png" alt="x" className="cart-delete-img" />
            </td>
            <td>
                <img src={`./images/${product.image}`} alt={product.name} className="cart-product-img" />
            </td>
            <td>{product.name}</td>
            <td className="break">${formatPrice(product.price)}</td>
            <td>
                <button onClick={() => changeInCart(product.id, product.inCart - 1)}>-</button>
                <input onChange={e => changeInCart(product.id, e.target.value)} type="text" value={product.inCart} />
                <button onClick={() => changeInCart(product.id, product.inCart + 1)}>+</button>
                <img className="edit-button" src="images/edit-img.png" alt="edit" onClick={calculateSubtotal} />
            </td>
        </tr>
    )
}

export default CartItem;