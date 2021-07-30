import React from 'react';
import Products from 'components/Products'; //import products components
import Layout from 'Layout'; //import template

class App extends React.Component {
  render() {
    return (
      <Layout>
        {/*render list of products */}
        <Products />
      </Layout>
    );
  }
}

export default App;
