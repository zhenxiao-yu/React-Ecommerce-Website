import React, { useState, useEffect } from 'react';
import axios from 'commons/axios';
import Layout from 'Layout';
import CartItem from 'components/CartItem';
import { formatPrice } from 'commons/helper';



const Cart = () => {
  //use hook to define state status
  const [carts, setCarts] = useState([]);

  
  useEffect(() => {
    axios.get('/carts').then(res => setCarts(res.data));
  });

  //total cost of the entire shopping cart
  const totalPrice = () => {
    const totalPrice = carts
      .map(cart => cart.mount * parseInt(cart.price))
      .reduce((a, value) => a + value, 0);
    return formatPrice(totalPrice);
  };

  return (
    <Layout>
      <div className="cart-page">
        <span className="cart-title">Shopping Cart</span>
        <div className="cart-list">
          {/*render call cart items*/}
          {carts.map(cart => (
            <CartItem key={cart.id} cart={cart} />
          ))}
        </div>
        <div className="cart-total">
          Total:
          <span className="total-price">{totalPrice()}</span>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
