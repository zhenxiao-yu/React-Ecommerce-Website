import React from 'react';
import axios from 'commons/axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import UtilityBar from 'components/ToolBox';
import Product from 'components/Product';
import Panel from 'components/Panel';
import AddInventory from 'components/AddInventory';

class Products extends React.Component {
  //Define product list state 
  state = {
    products: [], // list of products 
    sourceProducts: [],
    cartNum: 0 //no cart item in cart at default
  };

  componentDidMount() {
    //hook
    axios.get('/products').then(response => {
      this.setState({
        products: response.data,
        sourceProducts: response.data
      });
    });
    //update the number of items currently in the shopping cart 
    this.updateCartNum();
  }

  // search
  search = text => {
    //create new search result product array 
    let _products = [...this.state.sourceProducts];

    //Filter the newly created array 
    _products = _products.filter(p => {
      // name: Abcd text: ab   ===> ['Ab']
      // text: '' ==> ["", "", "", "", ""]
      const matchArray = p.name.match(new RegExp(text, 'gi'));
      return !!matchArray;
    });

    //set the new state of the product 
    this.setState({
      products: _products
    });
  };

  //Add new item to the product list 
  toAdd = () => {
    //open panel component 
    Panel.open({
      component: AddInventory,
      callback: data => {
        if (data) {
          this.add(data);
        }
      }
    });
  };

  //update the number of item in cart currently
  updateCartNum = async () => {
    const cartNum = await this.initCartNum();
    //change state of the cartNum value 
    this.setState({
      cartNum: cartNum
    });
  };


  //add product method 
  add = product => {
    const _products = [...this.state.products];
    _products.push(product);
    const _sProducts = [...this.state.sourceProducts];
    _sProducts.push(product);

    this.setState({
      products: _products,
      sourceProducts: _sProducts
    });
  };

  //update product method 
  update = product => {
    const _products = [...this.state.products];
    const _index = _products.findIndex(p => p.id === product.id);
    _products.splice(_index, 1, product);
    const _sProducts = [...this.state.sourceProducts];
    
    const _sIndex = _products.findIndex(p => p.id === product.id);
    _sProducts.splice(_sIndex, 1, product);
    this.setState({
      products: _products,
      sourceProducts: _sProducts
    });
  };

  //delet product method 
  delete = id => {
    const _products = this.state.products.filter(p => p.id !== id);
    const _sProducts = this.state.sourceProducts.filter(p => p.id !== id);
    this.setState({
      products: _products,
      sourceProducts: _sProducts
    });
  };

  //initialize cart number method 
  initCartNum = async () => {
    //get user info
    const user = global.auth.getUser() || {};
    //get the shopping cart associated with each user 
    const res = await axios.get('/carts', {
      params: {
        userId: user.email
      }
    });
    const carts = res.data || [];
    const cartNum = carts
      .map(cart => cart.mount) // [2, 1,2 ]
      .reduce((a, value) => a + value, 0);
    return cartNum;
  };

  render() {
    return (
      <div>
        <UtilityBar search={this.search} cartNum={this.state.cartNum} />
        <div className="products">
          <div className="columns is-multiline is-desktop">
            <TransitionGroup component={null}>
              {this.state.products.map(p => {
                return (
                  //markdown css transition area 
                  <CSSTransition
                    classNames="product-fade"
                    timeout={300}
                    key={p.id}
                  >
                    {/* react has 12 columns, each product takeing up 3 columns = 4 products per row*/}
                    <div className="column is-3" key={p.id}>
                      <Product
                        product={p}
                        //update product list items
                        update={this.update}
                        delete={this.delete}
                        //render cart number in real time
                        updateCartNum={this.updateCartNum}
                      />
                    </div>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </div>
          {/* add item button */}
          {(global.auth.getUser() || {}).type === 1 && (
            <button className="button is-primary add-btn" onClick={this.toAdd}>
             <i class="fas fa-plus-circle"></i>
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Products;
