import React, { Component } from "react";
import { HTTPURL,APIKEY, FILEURL } from "../../../common/global_constant";
import { withContext } from "../../../common/context";
import { Link } from 'react-router-dom';
import placeholder from "../../../assets/images/product-placeholder.gif";

class ProductCart extends Component {
  
    state = {
      product: [],
      products: [],
      ...this.props
    }


componentDidMount() {
  this.state.showLoader();
    this.getProduct();
  this.setState({ loading: false });
  this.state.hideLoader();
}

getProduct() {
  const headers = new Headers();
  headers.append("API-KEY", APIKEY);
  fetch(
    HTTPURL +
      `clients/products?userid=${this.state.user.userid}&clientid=${this.state.user.userid}`,
    {
      method: "GET",
      headers: headers,
    }
  ).then((response) => response.json())
  .then((res) => {
    if (!res["status"]) {
      this.setState({ products: [] });
    } else {
      this.setState({ products: res.data });
    }
  });
}
 
  render() {
    return (
      <div className="container mt-4">
        <div className="w-100 text-center">
          <h3>My Products </h3>
        </div>

        {this.state.loader && (
          <div className="spin-center">
            <span class="text-primary ">
              <span
                class="spinner-grow spinner-grow-sm mr-2"
                role="status"
                aria-hidden="true"
              ></span>
              <span style={{ fontSize: "14px" }}>Loading...</span>
            </span>
          </div>
        )}

        {  !this.state.loader &&
          <div className="container mt-4">
            <div className="row mx-5 my-2">
                        {this.state.products.length === 0 
                        ? <div className="col-md-12 my-2">
                            <div className="alert alert-warning mt-5" role="alert">
                                <h6 className="text-center">No product has been added yet</h6>
                            </div>
                          </div>
           : <div className="row my-2">
              {this.state.products.map((product, i) => {
                return (
                  <div className="col-md-3 col-lg-4 col-sm-12 my-2  d-flex justify-content-center" key={i}>
                    <div className="card text-center products  position-relative">
                    <div className="imageProduct p-3">
                        <img className="imageProduct-inner"
                        src={FILEURL + product.imageurl}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = placeholder;
                        }} 
                        alt="product logo" />
                    </div>                      
                    {/* <img className="img-fluid" src={placeholder} onError={(e) => { e.target.onerror = null; e.target.src = placeholder }} /> */}
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <Link to={() => `/clientviewdeployment/${product.id}`}>
                          <span class="badge px-3 py-2 badge-primary" value={product.id} style={{ cursor: "pointer", fontSize: 'medium' }}>View</span>
                        </Link>
                      </div>


                    </div>

                  </div>



                )
              }
              )}

            </div>
   } </div>
        
          </div>
        }
      </div>
    );
  }
}

export default withContext(ProductCart);
