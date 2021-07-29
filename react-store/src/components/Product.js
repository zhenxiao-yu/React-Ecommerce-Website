import React from "react";
import axios from 'commons/axios';
import { toast } from 'react-toastify';
import Panel from "components/Panel";
import { formatPrice } from "commons/helper";
import EditInventory from "components/EditInventory";

class Product extends React.Component {
  //edit inventory method
  toEdit = () => {
    Panel.open({
      component: EditInventory,
      props: {
        product: this.props.product,
        deleteProduct: this.props.delete,
      },
      callback: (data) => {
        if (data) {
          //update new data after edit/delete
          this.props.update(data);
        }
      },
    });
  };

  addCart = async () => {
    try {
      //Declare product fields
      const { id, name, image, price } = this.props.product;
      const res = await axios.get(`/carts?productId=${id}`);
      const carts = res.data;
      
      /*check if an item with the same id is already in cart,
        if true, increase number of that item by 1
        else, add new item 
      */
      if (carts && carts.length > 0) {
        const cart = carts[0];
        cart.mount += 1;
        await axios.put(`/carts/${cart.id}`, cart);
      } else {
        const cart = {
          productId: id,
          name,
          image,
          price,
          mount: 1 //add 1 item to cart when clicked
        };
        await axios.post('/carts', cart);
      }
      //show notification message
      toast.success('Add Cart Success');
    } catch (error) {
      toast.error('Add Cart Failed');
    }
  };

  render() {
    //Declare product fields
    const { name, image, tags, price, status } = this.props.product;
    //Decalre product states
    const _pClass = {
      available: "product",
      unavailable: "product out-stock",
    };

    return (
      <div className={_pClass[status]}>
        <div className="p-content">
          {/*Edit Icon*/}
          <div className="p-head has-text-right" onClick={this.toEdit}>
            <span className="icon edit-btn">
              <i className="fas fa-sliders-h"></i>
            </span>
          </div>
          {/*Product Image*/}
          <div className="img-wrapper">
            {/*Out of Stock Label*/}
            <div className="out-stock-text">Out Of Stock</div>
            <figure className="image is-4by3">
              <img src={image} alt={name} />
            </figure>
          </div>
          {/*Tag and Name*/}
          <p className="p-tags">{tags}</p>
          <p className="p-name">{name}</p>
        </div>
        {/*Product footer*/}
        <div className="p-footer">
          {/*Price*/}
          <p className="price">{formatPrice(price)}</p>
          {/*Add to cart button*/}
          <button
            className="add-cart"
            disabled={status === "unavailable"}
            onClick={this.addCart}
          >
            <i className="fas fa-shopping-cart"></i>
            <i className="fas fa-exclamation"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default Product;
