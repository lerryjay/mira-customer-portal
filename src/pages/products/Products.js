import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { HTTPURL, APIKEY, FILEURL } from '../../common/global_constant';
import { withContext } from '../../common/context';
import placeholder from "../../assets/images/product-placeholder.gif";


class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            showmodal: true,
            id: '',
            updateData: false
        }
    }

   
  componentDidUpdate(){
    if(this.state.updateData) {return this.state.products}
  }

    showDeleteModal(e) {
        this.state.id = e
        let modal = document.getElementById("myModal")
        modal.style.display = "block";
    }

    deleteModal(e) {
        let productid = e

        const headers = new Headers();
        headers.append('API-KEY', APIKEY);

        fetch(HTTPURL + `product/delete?productid=${productid}&userid=${this.state.user.userid}`, {
            method: 'GET',
            headers: headers
        })
            .then(response => response.json())
            .then(async data => {
                if(data.status === true) {
                    this.state.showAlert("success", data.message);
                    await this.state.getProducts();
                    let modal = document.getElementById("myModal")
                    modal.style.display = "none";
                    this.props.history.push('/products');
    
                } else{
                    this.state.showAlert("danger",  data.message)
                }
            });
    }

    closeModal() {
        let modal = document.getElementById("myModal")
        modal.style.display = "none";
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value, errormessage: '' });
    }



    render() {
        return (
            <div className="container-fluid">

               {this.state.user.role == "admin" &&  
                <div className="row mt-4 d-flex justify-content-end mr-3" >
                        <Link to="/createproduct">
                            <button type="button" className="btn btn-sm btn-primary new_product">
                                <i className="fas fa-plus" aria-hidden="true">
                                    <small className="newproduct" style={{ color: '#fff' }}>&nbsp;Add&nbsp;Product</small>
                                </i>
                            </button>
                        </Link>
                    </div>
                }
   
                    <div>
                        {this.state.products.length === 0 
                        ? <div className="col-md-12 w-100 alert alert-warning mt-5" role="alert">
                            <h6 className="text-center">No product has been added yet</h6>
                        </div>
                        : <div className="row mx-5 my-2">
                            {this.state.products.map((product, i) => {
                            return (
                                <div className="col-md-3 col-lg-4 col-sm-12 my-2 d-flex justify-content-center" key={i}>
                                    <div className="card text-center products position-relative">
                                        {/* <img src={image} className="image_product" alt="" /> */}
                                        <div className="imageProduct p-3">
                                            <img className="imageProduct-inner" src={FILEURL + product.imageurl} onError={(e) => { e.target.onerror = null; e.target.src = placeholder }} />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            {/* <Link  to={{ pathname:"", search}} onClick={this.handleViewMore}> */}
                                            <Link to={() => `/productdetails/${product.id}`}>
                                                <span className="btn px-3 py-2 btn-primary" value={product.id} style={{ cursor: "pointer", fontSize: 'medium' }}>View</span>
                                            </Link>
                                        </div>
                                        {this.state.user.role == "admin" &&  
                                            <Link to={() => `/updateproduct/${product.id}`}>
                                                <i className="fa fa-edit mr-1"></i>
                                            </Link>
                                        }

                                        {this.state.user.role == "admin" &&  
                                            <span onClick={() => this.showDeleteModal(product.id)}>
                                                <i className="fa fa-trash text-danger"></i>
                                            </span>
                                        }

                                    </div>
                                </div>




                            )
                        }
                        )}
                        </div>

                    }
                    </div>

                {this.state.showmodal ?
                    <div id="myModal" className="modal">
                        {/* Modal content  */}
                        <div className="modal-content text-center p-5">
                            <i className="fa fa-exclamation-triangle fa-3x dark-red mb-2" aria-hidden="true"></i>
                            <h3>Are you sure?</h3>
                            <p> Do you really want to delete this file?</p>
                            <div className="row">
                                <div className="col-md-6 mb-1">
                                    <button onClick={this.closeModal} className="btn-block btn btn-outline-secondary">Cancel</button>
                                </div>
                                <div className="col-md-6">
                                    <button onClick={() => this.deleteModal(this.state.id)} className="btn btn-danger btn-block">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <span></span>
                }
            </div>

        );
    }
}


export default withContext(Products);