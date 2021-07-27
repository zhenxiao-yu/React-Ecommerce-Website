import React from "react";
import ToolBar from 'components/ToolBar';
import Product from 'components/Product';

class Products extends React.Component {
  render() {
    return (
      <div>
        <ToolBar />
        <div className="products">
          {/*Body consisting of products*/}
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
        </div>
      </div>
    );
  }
}

export default Products;
