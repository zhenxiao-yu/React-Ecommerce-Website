import React from 'react';
import axios from 'commons/axios';
import ToolBar from 'components/ToolBar';
import Product from 'components/Product';

class Products extends React.Component {
  state = {
    products: []
  };

  componentDidMount() {
    axios.get('/products').then(response => {
      this.setState({
        products: response.data
      });
    });
  }

  render() {
    return (
      <div>
        <ToolBar />
        <div className="products">
          <div className="columns is-multiline is-desktop">
            {this.state.products.map(p => {
              return (
                <div className="column is-3" key={p.id}>
                  <Product product={p} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
