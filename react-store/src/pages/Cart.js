import React, { useState, useEffect, useMemo } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import axios from "commons/axios";
import Layout from "Layout"; //page template
import CartItem from "components/CartItem"; //item component
import { formatPrice } from "commons/helper"; //formated price

const Cart = () => {
  const [carts, setCarts] = useState([]);
  useEffect(() => {
    const user = global.auth.getUser() || {};
    //retrive shopping cart associated with each user
    axios.get(`/carts?userId=${user.email}`).then((res) => setCarts(res.data));
  }, []);

  //calculate the total price of all th items in the shopping cart
  const totalPrice = useMemo(() => {
    const totalPrice = carts
      //multiply the price of one item with the amount of that item
      .map((cart) => cart.mount * parseInt(cart.price))
      .reduce((a, value) => a + value, 0);
    //display formatted price
    return formatPrice(totalPrice);
  }, [carts]);

  //update an item in the shopping cart
  const updateCart = (cart) => {
    const newCarts = [...carts];
    const _index = newCarts.findIndex((c) => c.id === cart.id);
    newCarts.splice(_index, 1, cart);
    setCarts(newCarts);
  };

  //delete an item from the shopping cart
  const deleteCart = (cart) => {
    //'filter out' the item by item's id
    const _carts = carts.filter((c) => c.id !== cart.id);
    //apply new changes
    setCarts(_carts);
  };

  return (
    <Layout>
      <div className="cart-page">
        {/*page header*/}
        <span className="cart-title">Shopping Cart</span>
        {/*list of cart items*/}
        <div className="cart-list">
          <TransitionGroup component={null}>
            
            {carts.map((cart) => (
              //fade out cart item when deleted
              <CSSTransition classNames="cart-item" timeout={300} key={cart.id}>
                <CartItem
                  key={cart.id}
                  cart={cart}
                  updateCart={updateCart}
                  deleteCart={deleteCart}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        {/*show message when no items is the shopping cart*/}
        {carts.length === 0 ? (
          <p className="no-cart">No Item In Cart :(</p>
        ) : (
          ""
        )}
        {/*total price*/}
        <div className="cart-total">
          Total:
          <span className="total-price">{totalPrice}</span>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
