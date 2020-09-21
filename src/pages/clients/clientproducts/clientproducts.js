import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { HTTPURL, APIKEY,FILEURL } from '../../../common/global_constant';
import { withContext } from '../../../common/context';
import placeholder from "../../../assets/images/product-placeholder.gif";


class clientviewproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            products: [],
            id: '',
            loading: false,
            loader: false
        }
    }

    
   
   componentDidMount() {
    this.state.showLoader();
     this.getProduct();
    this.setState({ loading: false });
    this.state.hideLoader();
 }
 
    getProduct() {
        const headers = new Headers();
        headers.append('API-KEY', APIKEY);
        fetch(HTTPURL + 'product', {
            method: 'GET',
            headers: headers
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data.data })
            });
    }

    render() {
        return (
            <div className="container mx-auto row">

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

                <div className="container mt-4"> 
                {!this.state.loader &&  this.state.products.length === 0 ?
                    <div className="card-body">
                        <div className="alert alert-warning" role="alert">
                            <h6 className="text-center"> Product is empty!</h6>
                        </div>
                        </div>
                        :
                    <div className="row my-2">
                        {!this.state.loader && this.state.products.map((product, i) => {
                            return (
                                <div className="col-md-3 col-lg-4 col-sm-12 my-2  d-flex justify-content-center" key={i}>
                                    <div className="card text-center products">
                                    <img className="img-fluid" src={FILEURL+product.imageurl} onError={(e)=>{e.target.onerror = null; e.target.src= placeholder}} alt=""/>
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            {/* <Link  to={{ pathname:"", search}} onClick={this.handleViewMore}> */}
                                            <Link to={() => `/clientproductdetails/${product.id}`}>
                                                <span class="badge px-3 py-2 badge-primary" value={product.id} style={{ cursor: "pointer", fontSize: 'medium' }}>View</span>
                                            </Link>
                                        </div>


                                    </div>

                                </div>



                            )
                        }
                        )}
                    </div>
    }
    

                </div>

            </div>
        );
    }
}


export default withContext(clientviewproduct);