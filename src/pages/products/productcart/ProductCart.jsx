import React, { Component } from "react";
import { HTTPURL } from "../../../common/context";
import { withContext } from "../../../common/context";
import { Link } from 'react-router-dom';

class ProductCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      products: [
        {
          productid: 1,
          name: "Accissebs",
          description:
            "It is an accounting software, designed to run in multiple locations across different states, nations and continents, ",
          price: "₦370,000",
        },
        {
          productid: 2,
          name: "SYSBANKER EE",
          description:
            "It is an accounting software, designed to run in multiple locations across different states, nations and continents, ",
          price: "₦100,000",
        },
        {
          productid: 3,
          name: "Mira HPro",
          description:
            "It is an accounting software, designed to run in multiple locations across different states, nations and continents, ",
          price: "₦220,000",
        },
      ],
    };
  }
  componentDidMount() {
    let product = [];
    console.log("changed successfully!", product);
    for (let i = 0; i < this.state.products.length; i++) {
      console.log(this.state.products[i]);
      product.push(this.state.products[i]);
      this.setState({ product: product });
    }
  }
  

  render() {
    return (
      <div className="container">
        <div className="w-100 text-center">
          <h3>My Products </h3>
        </div>
        <div className="row mt-4">
          <table className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark home-chart">
            {/* <caption>Hello World!</caption> */}
            <thead>
              <tr>
                <th>S/N</th>
                <th>Product&nbsp;Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.products.map((product) => {
                return (
                  <tr>
                    <td>{product.productid}</td>
                    <td>{product.name}</td>
                    <td style={{ maxWidth: "150px" }}>{product.description}</td>
                    <td>{product.price}</td>
                    <td className="align-middle" style={{cursor:"pointer"}}>
                        <Link to={() => `/viewproductcart/${product.id}`}>
                            <span className="badge px-3 py-2 badge-primary" value={product.id} style={{cursor:"pointer"}}>View</span>
                        </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
    </div>
    );
  }
}

export default withContext(ProductCart);
