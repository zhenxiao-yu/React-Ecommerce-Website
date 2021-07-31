import React from "react";
import { withRouter } from "react-router-dom";
import axios from "commons/axios";
import { toast } from "react-toastify";
import Panel from "components/Panel";
import { formatPrice } from "commons/helper";
import EditInventory from "components/EditInventory";

//product (card) compoent
class Product extends React.Component {
  toEdit = () => {
    Panel.open({
      component: EditInventory,
      props: {
        product: this.props.product,
        deleteProduct: this.props.delete,
      },
      callback: (data) => {
        if (data) {
          this.props.update(data);
        }
      },
    });
  };

  //add product item into cart method
  addCart = async () => {
    //check if user is logged in
    if (!global.auth.isLogin()) {
      //if not, redirect to login page
      this.props.history.push("/login");
      //show login requirement notification
      toast.info("Please Login First");
      return;
    }

    try {
      //get user instance
      const user = global.auth.getUser() || {};
      //get product item information
      const { id, name, image, price } = this.props.product;
      //get Backend Connection
      const res = await axios.get(`/carts?productId=${id}`);
      //add product data to cart
      const carts = res.data;
      //if cart is not empty and the same product already exists in cart
      if (carts && carts.length > 0) {
        const cart = carts[0];
        //increase amount by one
        cart.mount += 1;
        await axios.put(`/carts/${cart.id}`, cart);
      } else {
        //add new item to cart
        const cart = {
          productId: id,
          name,
          image,
          price,
          mount: 1,
          userId: user.email,
        };
        await axios.post("/carts", cart);
      }
      //display
      toast.success("Item Added To Cart!");
      this.props.updateCartNum();
    } catch (error) {
      toast.error("An Error occurred! Please Try Again.");
    }
  };

  //show edit button button for admin
  renderMangerBtn = () => {
    const user = global.auth.getUser() || {};
    if (user.type === 1) {
      return (
        <div className="p-head has-text-right" onClick={this.toEdit}>
          <span className="icon edit-btn">
            <i className="fas fa-sliders-h"></i>
          </span>
        </div>
      );
    }
  };

  //JFX
  render() {
    //Declare item fields
    const { name, image, tags, price, status } = this.props.product;
    //decalre product item state
    const _pClass = {
      available: "product",
      unavailable: "product out-stock",
    };
    return (
      <div className={_pClass[status]}>
        <div className="p-content">
          {/* edit button */}
          {this.renderMangerBtn()}
          <div className="img-wrapper">
            {/* Out of stock label */}
            <div className="out-stock-text">Out Of Stock</div>
            {/* item image className="image is-WidthbyHeight"*/}
            <figure className="image is-4by3"> 
              <img src={image} alt={name} />
            </figure>
          </div>
          {/* product tag  */}
          <p className="p-tags">{tags}</p>
          {/* product name  */}
          <p className="p-name">{name}</p>
        </div>
        <div className="p-footer">
          <p className="price">{formatPrice(price)}</p>
          <button
            className="add-cart"
            disabled={status === "unavailable"}
            onClick={this.addCart}
          >
            {/* add to cart button */}
            <i className="fas fa-cart-plus"></i>
            <i className="fas fa-exclamation"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Product);
