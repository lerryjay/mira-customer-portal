import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { HTTPURL, APIKEY } from '../../common/global_constant';
import { withContext } from '../../common/context';
import image from '../../assets/images/Accsiss.png'


class viewproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            products: [],
            showmodal: true,
            loading: false
        }
    }

    componentDidMount() {
        this.getProduct();
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
                console.log(this.state.products)
            });
    }

    updateModal() {
        let modal = document.getElementById("myModal")
        modal.style.display = "block";
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
                form.append("userid", sessionStorage.getItem("userId"));
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
            <div className="container mx-auto row">

                <div className="container">
                    <div className="row mt-1" style={{ position: 'fixed', top: '70px', right: '10px', zIndex: '4' }}>
                        <div className="col-md-3 offset-md-9">
                            <button type="button" className="btn btn-sm btn-primary new_product">
                                <i className="fas fa-folder-plus" aria-hidden="true">
                                    <Link to="/createproduct">
                                        <small className="newproduct" style={{ color: '#fff' }}>&nbsp;New&nbsp;Product</small>
                                    </Link>
                                </i>
                            </button>
                        </div>
                    </div>
                    <div className="row my-2">
                        {this.state.products.map((product, i) => {
                            return (
                                <div className="col-md-3 col-lg-4 col-sm-12" key={i}>
                                    <div className="card text-center products">
                                        <img src={image} className="image_product" alt="" />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            {/* <Link  to={{ pathname:"", search}} onClick={this.handleViewMore}> */}
                                            <Link to={() => `/productdetails/${product.id}`}>
                                                <span class="badge px-3 py-2 badge-primary" value={product.id} style={{ cursor: "pointer", fontSize: 'medium' }}>View</span>
                                            </Link>
                                        </div>
                                        <Link to={() => `/updateproduct/${product.id}`}>
                                            <i className="fa fa-edit mr-1"></i>
                                        </Link>
                                        <i className="fa fa-trash text-danger"></i>



                                    </div>

                                    {this.state.showmodal ?
                                        <div id="myModal" class="modal">
                                            {/* Modal content  */}
                                            <div class="modal-content text-center p-5">


                                                <form onSubmit={this.handleSubmit} id="addpackage">

                                                    <div className="card">
                                                        <div className="card-header bg-medium font-weight-bold text-dark">
                                                            EDIT PRODUCT
            </div>

                                                        <div className="card-body">

                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    {/* Error Message */}
                                                                    {this.state.errormessage != null && this.state.errormessage.length > 0 ?
                                                                        <div className="alert alert-warning" role="alert">{this.state.errormessage}
                                                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                                                <span aria-hidden="true">&times;</span>
                                                                            </button>
                                                                        </div>
                                                                        :
                                                                        <span></span>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="row">

                                                                <div className="col-md-12 mb-1">
                                                                </div>

                                                                <div className="col-md-12 mb-1">
                                                                    <div className="form-group">
                                                                        <label htmlFor="" className="sr-only">Product Name</label>
                                                                        <input type="text" className="form-control form-control-sm" name="prdname"
                                                                            id="prdname" placeholder="Product Name"
                                                                            value={product.name}
                                                                            onChange={this.handleInputChange} />
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="" className="sr-only">Product Description</label>
                                                                        <textarea type="text" className="form-control form-control-sm" name="prddescription"
                                                                            id="prddescription" placeholder="Product Description"
                                                                            value={this.state.description}
                                                                            onChange={this.handleInputChange} />
                                                                    </div>
                                                                </div>


                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <button onClick={this.closeModal} className="btn-block btn btn-outline-secondary">Cancel</button>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    {this.state.loading ?
                                                                        <button type="submit" className="btn btn-block btn-primary">
                                                                            <div className="spinner-border text-secondary" role="status" id="loader">
                                                                                <span className="sr-only">Loading...</span>
                                                                            </div>
                                                                        </button>
                                                                        : <button type="submit" className="btn btn-primary btn-block">
                                                                            <i className="fas fa-folder-open mr-2"></i>
                                Save
                            </button>
                                                                    }

                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        :
                                        <span></span>
                                    }

                                </div>



                            )
                        }
                        )}
                    </div>



                </div>

            </div>
        );
    }
}


export default withContext(viewproduct);