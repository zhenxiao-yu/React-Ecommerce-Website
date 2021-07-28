import React from "react";
import axios from "commons/axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ToolBar from "components/ToolBar";
import Product from "components/Product";
import Panel from "components/Panel";

class Products extends React.Component {
  state = {
    products: [],
    sourceProducts: [],
  };

  componentDidMount() {
    //get product information from JSON Server
    axios.get("/products").then((response) => {
      this.setState({
        products: response.data,
        sourceProducts: response.data,
      });
    });
  }

  // search
  search = (text) => {
    // 1. retrieved new array
    let _products = [...this.state.sourceProducts];

    // 2.filter the retrieved array
    _products = _products.filter((p) => {
      // name: Abcd text: ab   ===> ['Ab']
      // text: '' ==> ["", "", "", "", ""]
      const matchArray = p.name.match(new RegExp(text, "gi"));
      return !!matchArray;
    });

    // 3. set State
    this.setState({
      products: _products,
    });
  };

  //open panel
  toAdd = () => {
    Panel.open();
  };

  render() {
    return (
      <div>
        <ToolBar search={this.search} />
        <div className="products">
          <div className="columns is-multiline is-desktop">
            {/*define transition area*/}
            <TransitionGroup component={null}>
              {this.state.products.map((p) => {
                return (
                  //css transtition settings
                  <CSSTransition
                    classNames="product-fade"
                    timeout={300}
                    key={p.id}
                  >
                    <div className="column is-3" key={p.id}>
                      <Product product={p} />
                    </div>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </div>
          <button className="button is-primary add-btn" onClick={this.toAdd}>
            +
          </button>
        </div>
      </div>
    );
  }
}

export default Products;
