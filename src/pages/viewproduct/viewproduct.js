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
            id: '',
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

    showDeleteModal(e) {
        // this.setState({id: e});
        this.state.id = e
        let modal = document.getElementById("myModal")
        modal.style.display = "block";
    }

    deleteModal(e) {
        let productid = e

        const headers = new Headers();
        headers.append('API-KEY', APIKEY);

        fetch(HTTPURL + `product/delete?productid=${productid}&userid=${sessionStorage.getItem('userId')}`, {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(data => {
            console.log(data, "deleted")
            let modal = document.getElementById("myModal")
            modal.style.display = "none";
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
                            {/* <div className="delete-icon">
                                &times;
                            </div> */}
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

            </div>
        );
    }
}


export default withContext(viewproduct);