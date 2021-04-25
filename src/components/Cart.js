import React, { useState, useEffect } from "react";

import CartItems from "./CartItems";
import CartPaymentDetails from "./CartPaymentDetails";


const Cart = () => {
  const [shoppingCompleted, setShoppingCompleted] = useState(false);
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    Promise.all([fetch('./data/cart_products.json'), fetch('./data/products.json')])
      .then(responses => {
        return Promise.all([responses[0].json(), responses[1].json()]);
      })
      .then(data => {
        const howManyProducts = data[0].length;
        const currentProducts = [];
        let currentProduct;
        let newSubtotal = 0;

        for (let i = 0; i < howManyProducts; i++) {
          currentProduct = findCurrentPorduct(data[0][i]["productId"], data[1]);
          if (currentProduct && data[0][i]["quantity"] > 0) {
            currentProducts.push(
              {
                id: data[0][i]["productId"],
                quantity: data[0][i]["quantity"],
                name: currentProduct["name"],
                image: currentProduct["image"],
                price: currentProduct["price"],
                inCart: 1
              }
            );
            newSubtotal += currentProduct.price;
          }

        }
        setProducts([...currentProducts]);
        setSubtotal(newSubtotal);
      });
  }, []);

  const findCurrentPorduct = (id, data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i]["id"] === id)
        return data[i];
    }
    return false;
  }

  const changeInCart = (id, value) => {
    console.log(value);
    if (value < 0 || isNaN(value)) {
      alert("Please provide positive number");
      return;
    }
    if (value !== "")
      value = parseInt(value);
    console.log(value);
    setProducts(products.map(product => {
      if (product.id === id) {
        if (value <= product.quantity) {
          return {
            ...product,
            inCart: value
          }
        }
        else {
          alert(`only ${product.quantity} in stock`);
          return {
            ...product,
            inCart: product.quantity
          }
        }
      }
      return product;
    }));
  }

  const deleteFromCart = id => {
    setProducts(
      products.filter(product => {
        return id !== product.id;
      })
    );
  }

  const formatPrice = price => {
    price = price.toString();
    console.log(price.split('.'))
    if (!price.includes("."))
      price += ".00";
    else if (price.split(".")[1].length === 1)
      price += "0";
    return price;
  }


  const calculateSubtotal = () => {
    let newSubtotal = 0;
    for (let i = 0; i < products.length; i++) {
      newSubtotal += products[i].price * products[i].inCart;
    }
    setSubtotal(newSubtotal);
  }

  return (
    shoppingCompleted ? <div className="completed-order">Your order has been submitted successfully</div> :
      < article className="cart" >
        <header className="cart-header">
          <div>
            Shopping Cart
        </div>
          <button className="cart-button" onClick={() => setShoppingCompleted(true)}>Proceed to checkout</button>
        </header>
        <div className="cart-container">
          <CartItems products={products} calculateSubtotal={calculateSubtotal} changeInCart={changeInCart} deleteFromCart={deleteFromCart} formatPrice={formatPrice} />
          <CartPaymentDetails subtotal={subtotal} formatPrice={formatPrice} setShoppingCompleted={setShoppingCompleted} />
        </div>
      </article >
  );
}

export default Cart;
