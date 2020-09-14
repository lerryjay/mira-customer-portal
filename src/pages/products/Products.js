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
            loading: false
        }
    }

    componentDidMount() {
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
            .then(data => {
                console.log(data, "deleted")
                let modal = document.getElementById("myModal")
                modal.style.display = "none";
                this.state.getProducts();
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

    handleSubmit = async e => {
        e.preventDefault()
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false });
            this.setState({ successmessage: 'Added Successfully!' })
            setTimeout(() => {
                this.setState({ successmessage: false });

                const headers = new Headers();
                headers.append('API-KEY', APIKEY);

                let form = new FormData();
                form.append("userid", this.state.user.userid);
                form.append("productid", this.state.id);
                form.append("name", this.state.prdname);
                form.append("description", this.state.prddescription);

                fetch(HTTPURL + 'product/addmodule', {
                    method: 'POST',
                    body: form,
                    headers: headers
                })
                    .then(response => response.json())
                    .then(json => {
                        console.log(json);
                        return json;
                    });
                // const res = this.state.addpackage(document.getElementById("addpackage"));
                console.log('submitting')

            }, 5000);
        }, 3000);

    }



    render() {
        return (
            <div className="container-fluid">

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

                <div className="row mt-4 d-flex justify-content-end mr-3" >
                    <Link to="/createproduct">
                        <button type="button" className="btn btn-sm btn-primary new_product">
                            <i className="fas fa-plus" aria-hidden="true">
                                <small className="newproduct" style={{ color: '#fff' }}>&nbsp;Add&nbsp;Product</small>
                            </i>
                        </button>
                    </Link>
                </div>
   
                    <div className="row mx-5 my-2">
                        {this.state.products.map((product, i) => {
                            return (
                                <div className="col-md-3 col-lg-4 col-sm-12 my-2 d-flex justify-content-center" key={i}>
                                    <div className="card text-center products">
                                        {/* <img src={image} className="image_product" alt="" /> */}
                                        <img className="img-fluid" src={FILEURL + product.imageurl} onError={(e) => { e.target.onerror = null; e.target.src = placeholder }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            {/* <Link  to={{ pathname:"", search}} onClick={this.handleViewMore}> */}
                                            <Link to={() => `/productdetails/${product.id}`}>
                                                <span className="badge px-3 py-2 badge-primary" value={product.id} style={{ cursor: "pointer", fontSize: 'medium' }}>View</span>
                                            </Link>
                                        </div>
                                        <Link to={() => `/updateproduct/${product.id}`}>
                                            <i className="fa fa-edit mr-1"></i>
                                        </Link>

                                        <Link onClick={() => this.showDeleteModal(product.id)}>
                                            <i className="fa fa-trash text-danger"></i>
                                        </Link>


                                    </div>

                                </div>




                            )
                        }
                        )}

                    </div>

                {this.state.showmodal ?
                    <div id="myModal" class="modal">
                        {/* Modal content  */}
                        <div class="modal-content text-center p-5">
                            <i class="fa fa-exclamation-triangle fa-3x dark-red mb-2" aria-hidden="true"></i>
                            <h3>Are you sure?</h3>
                            <p> Do you really want to delete this file?</p>
                            <div className="row">
                                <div className="col-md-6">
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