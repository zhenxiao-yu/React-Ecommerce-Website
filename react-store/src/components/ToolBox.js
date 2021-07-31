import React from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

//Utility bar component
class ToolBox extends React.Component {
  //search bar input state
  state = {
    searchText: "",
  };

  //handles changes to the search bar
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      searchText: value,
    });
    this.props.search(value);
  };

  //empty search bar
  clearSearchText = () => {
    this.setState({
      searchText: "",
    });
    this.props.search("");
  };

  //redirect to shopping cart
  goCart = () => {
    //check if a user has already logged in
    if (!global.auth.isLogin()) {
      this.props.history.push("/login");
      //show required login notification
      toast.info("Please Login First");
      return;
    }
    //if logged in, go to shopping cart page
    this.props.history.push("/cart");
  };

  //JFX
  render() {
    return (
      <div className="tool-box">
        <div className="logo-text">
          <i className="fas fa-cog"></i> WDDT
        </div>
        <div className="search-box">
          <div className="field has-addons">
            <div className="control">
              <input
                // seatch bat input
                type="text"
                className="input search-input"
                // dearch bar text 
                placeholder="What are you looking for?"
                value={this.state.searchText}
                onChange={this.handleChange}
              />
            </div>
            {/* clear button */}
            <div className="control">
              <button className="button" onClick={this.clearSearchText}>
                X
              </button>
            </div>
          </div>
        </div>
        {/* shopping cart icon */}
        <div to="/cart" className="cart-box" onClick={this.goCart}>
          <i className="fas fa-shopping-cart"></i>
          <span className="cart-num">({this.props.cartNum})</span>
        </div>
      </div>
    );
  }
}

export default withRouter(ToolBox);
