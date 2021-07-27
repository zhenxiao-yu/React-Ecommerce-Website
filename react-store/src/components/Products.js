import React from "react";
import ToolBar from "components/ToolBar";
import Product from "components/Product";

class Products extends React.Component {
  render() {
    return (
      <div>
        <ToolBar />
        <div className="products">
          {/*Body consisting of products*/}
          <div className="columns is-multiline is-desktop">
            <div className="column is-3"> {/*12 columns / 4 product per row = 3 column*/}
              <Product /> 
            </div>
            <div className="column is-3">
              <Product />
            </div>
            <div className="column is-3">
              <Product />
            </div>
            <div className="column is-3">
              <Product />
            </div>
            <div className="column is-3">
              <Product />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
