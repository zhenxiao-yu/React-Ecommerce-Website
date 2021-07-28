import React from "react";
import ToolBar from "components/ToolBar";
import Product from "components/Product";

class Products extends React.Component {
  products = [
    {
      id: 1,
      name: "Air Jordan 4",
      image: "/images/1.jpg",
      tags: "92 ",
      price: 19440,
      status: "available",
    },
    {
      id: 2,
      name: "Nike Paul George PG 3",
      image: "/images/2.jpg",
      tags: "25 Colors",
      price: 23800,
      status: "available",
    },
    {
      id: 3,
      name: "Jordan Why Not Zer0.2",
      image: "/images/3.jpg",
      tags: "16 Color, y",
      price: 18900,
      status: "available",
    },
    {
      id: 4,
      name: "Nike Air Foamposite One",
      image: "/images/4.jpg",
      tags: "84 Colors",
      price: 23148,
      status: "available",
    },
    {
      id: 5,
      name: "adidas Harden Vol.3",
      image: "/images/5.jpg",
      tags: "34 Colors",
      price: 26900,
      status: "unavailable",
    },
  ];

  render() {
    return (
      <div>
        <ToolBar />
        <div className="products">
          {/*Body consisting of products*/}
          <div className="columns is-multiline is-desktop">
            {this.products.map((p) => {
              return (
                <div className="column is-3" key={p.id}> {/*12 columns / 4 product per row = 3 column*/}
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
