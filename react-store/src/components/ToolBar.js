import React from "react";

class ToolBar extends React.Component {

  state 
  render() {
    return (
      <div className="tool-box">
        {/*Logo*/}
        <div className="logo-text">Store</div>
        {/*Search Box*/}
        <div className="search-box">
          <div className="field has-addons">
            <div className="control">
              <input
                type="text"
                className="input search-input"
                placeholder="Search Product..."
              />
            </div>
            <div className="control">
              <button className="button">X</button>
            </div>
          </div>
        </div>
        {/*Shopping Cart*/}
        <div className="cart-box">
          <i className="fas fa-shopping-cart"></i>
          <span className="cart-num">(0)</span>
        </div>
      </div>
    );
  }
}

export default ToolBar;
