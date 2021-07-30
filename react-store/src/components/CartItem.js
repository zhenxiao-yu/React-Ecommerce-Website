import React, { useState, useMemo } from "react";
import axios from "commons/axios";
import { formatPrice } from "commons/helper";

const CartItem = (props) => {
  const [mount, setMount] = useState(props.cart.mount);
  ///define cart item fields
  const { id, name, image, price } = props.cart || {};

  //calculate the total price of an item
  const sumPrice = useMemo(() => {
    return formatPrice(mount * parseInt(price));
  }, [mount, price]);

  //handle data changes
  const handleChange = (e) => {
    const _mount = parseInt(e.target.value);
    setMount(_mount);
    const newCart = {
      ...props.cart,
      mount: _mount,
    };
    axios.put(`/carts/${id}`, newCart).then((res) => {
      props.updateCart(newCart);
    });
  };

  //delete cart item by id
  const deleteCart = () => {
    axios.delete(`/carts/${id}`).then((res) => {
      props.deleteCart(props.cart);
    });
  };

  return (
    <div className="columns is-vcentered">
      {/* Delete cart item */}
      <div className="column is-narrow" onClick={deleteCart}>
        <span className="close"><i class="fas fa-trash-alt"></i></span>
      </div>
      {/* Cart Item image */}
      <div className="column is-narrow">
        <img src={image} alt={name} width="100" />
      </div>
      {/* Cart Item name */}
      <div className="column cart-name is-narrow">{name}</div>
      {/* Cart Item price*/}
      <div className="column">
        <span className="price">{formatPrice(price)}</span>
      </div>
      {/* Cart Item Amount */}
      <div className="column">
        <input
          type="number"
          className="input num-input"
          min={1} // minimum number of an item allowed
          value={mount} //amount of an item in cart
          onChange={handleChange}
        />
      </div>
      {/* Total Price */}
      <div className="column">
        <span className="sum-price">{sumPrice}</span>
      </div>
    </div>
  );
};

export default CartItem;
