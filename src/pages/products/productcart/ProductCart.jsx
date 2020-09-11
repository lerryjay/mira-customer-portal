import React, { Component } from "react";
import { HTTPURL } from "../../../common/context";
import { withContext } from "../../../common/context";
import { Link } from 'react-router-dom';
import placeholder from "../../../assets/images/product-placeholder.gif";

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
      <div className="container mt-4">
        <div className="w-100 text-center">
          <h3>My Products </h3>
        </div>
        <div className="container mt-4">
          <div className="row my-2">
                        {this.state.products.map((product, i) => {
                            return (
                                <div className="col-md-3 col-lg-4 col-sm-12 my-2  d-flex justify-content-center" key={i}>
                                    <div className="card text-center products">
                                    <img className="img-fluid" src={placeholder} onError={(e)=>{e.target.onerror = null; e.target.src= placeholder}}/>
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <Link to={() => `/viewproductcart/${product.id}`}>
                                                <span class="badge px-3 py-2 badge-primary" value={product.id} style={{ cursor: "pointer", fontSize: 'medium' }}>View</span>
                                            </Link>
                                        </div>


                                    </div>

                                </div>



                            )
                        }
                        )}
            
          {/* <table className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark home-chart">
            
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
                    <td style={{cursor:"pointer"}}>
                        <Link to={() => `/viewproductcart/${product.id}`}>
                            <span className="badge px-3 py-2 badge-primary" value={product.id} style={{cursor:"pointer"}}>View</span>
                        </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
         */}
          </div>
        </div>
    </div>
    );
  }
}

export default withContext(ProductCart);
