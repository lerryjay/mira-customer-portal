import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {withContext} from '../../common/context';
import { HTTPURL } from '../../common/global_constant';
import avatar from '../../assets/images/avatar.png'

class ClientProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            product: [],
            products : [ 
                {
                    "productid" : 1,
                    "name" : "Accissebs",
                    "description" : "It is an accounting software, designed to run in multiple locations across different states, nations and continents, ",
                    "price" : "₦370,000"
                }, 
                {
                    "productid" : 2,
                    "name" : "SYSBANKER EE",
                    "description" : "It is an accounting software, designed to run in multiple locations across different states, nations and continents, ",
                    "price" : "₦100,000"
                }, 
                {
                    "productid" : 3,
                    "name" : "Mira HPro",
                    "description" : "It is an accounting software, designed to run in multiple locations across different states, nations and continents, ",
                    "price" : "₦220,000"
                }
                
            ]
        };
    }
    componentDidMount(){

        let product = []
        console.log('changed successfully!', product)
        for (let i = 0; i < this.state.products.length; i++) {
            console.log(this.state.products[i])
            product.push(this.state.products[i])
            this.setState({ product :  product });
        }
    }

    editp() {
        // Make Form Editable
        let edit = document.querySelector('#edit');
        let input = document.getElementsByTagName('input');


        for (let d = input.length - 1; d >= 0; d--) {
            edit.addEventListener("click", function (e) {
                input[d].removeAttribute("disabled");
            });
        };
    }
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value });
    }

    handleSubmit = async e => {
        e.preventDefault()

        const headers = new Headers();
        headers.append('API-KEY','97899c-7d0420-1273f0-901d29-84e2f8');
        let form = new FormData(document.getElementById("profileform"));


        fetch(HTTPURL + 'user/updateprofile', {
            method: 'POST',
            body: form,
            headers: headers
        })
        .then(response => response.json())
        .then(json => {
        console.log(json);
        return json;
        });

        console.log('Profile Updated!')
    }

   render() {
    return (
        <div className="container mx-auto">
            <div className="row mt-4">

                <div className="col-md-8 mb-3" id="profile">

                    <form id="profileform" onSubmit={this.handleSubmit}>
                        <div className="card">
                            <div className="card-header bg-medium font-weight-bold text-dark">
                                Profile Information
                <span className="float-right"  id='edit' style={{ cursor: 'pointer' }} onClick={this.editp}><i className="fas fa-pen-square fa-2x"></i>
                                </span>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Name</label>
                                            <input type="text" className="form-control form-control-sm" name="fullname"
                                                id="fullname" value={sessionStorage.getItem("firstname")} placeholder="Name" autoComplete="fullname" onChange={this.handleInputChange}/>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Email</label>
                                            <input type="text" className="form-control form-control-sm" name="email"
                                                id="email" value={sessionStorage.getItem("email")} placeholder="johndoe@mail.com" disabled autoComplete="email" onChange={this.handleInputChange}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Phone-number</label>
                                            <input type="text" className="form-control form-control-sm" name="telephone"
                                                id="telephone" value={sessionStorage.getItem("telephone")} placeholder="090 ......." disabled autoComplete="tel" onChange={this.handleInputChange}/>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Company&nbsp;Name</label>
                                            <input type="text" className="form-control form-control-sm" name="company"
                                                id="company" value={sessionStorage.getItem("company")} placeholder="john & Sons"  autoComplete="company" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Company&nbsp;Address</label>
                                            <input type="text" className="form-control form-control-sm" name="address"
                                                id="address" value={sessionStorage.getItem("address")}  placeholder="lorem lorem lorem" disabled autoComplete="address" />
                                        </div>
                                    </div>

                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Image</label>
                                            <input type="file" className="file form-control-sm" name=""
                                                id="" value="" placeholder=""/>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="card-footer">
                                <div className="float-right">

                                    <button type="submit" className="btn btn-sm btn-primary px-3">
                                        <i className="fas fa-folder-open pr-2"></i>
                        Save
                    </button>
                                
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="col-md-4 text-center" id='profilePix'>
                    <div className="card">
                        <div className="card-header">
                        </div>
                        <div className="card-body">
                        <img src={avatar} className="image_sidebar" alt="" height="110px" width="110px" style={{ marginTop: '-80px' }} />
                            {/* <img src={avatar} 
                                alt="profile picture" className="img-fluid" style={{ marginTop: '-80px' }} /> */}
                                <h6 className="mt-3">{sessionStorage.getItem("name")} </h6>
                                <p className="mt-2"><i class="fa fa-map-marker" aria-hidden="true"></i> Lagos <br/>
                                <i class="fa fa-envelope" aria-hidden="true"></i> {sessionStorage.getItem("email")}</p>
                        </div>
                    </div>
                </div>

       
            </div>
        
                        <div className="card">
                            <div className="card-header bg-medium font-weight-bold text-dark">
                                PRODUCTS
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                    <div class="alert alert-warning" role="alert">
                                    Product is empty!
                                    </div>
                                    <button type="button" className="btn btn-sm btn-primary new_product mb-2">
                                        <Link to="/view_product">
                                    <i className="fas fa-folder-plus" style={{color: '#fff'}} aria-hidden="true">
                                            <small className="newproduct" style={{color: '#fff'}}>&nbsp;Add&nbsp;New&nbsp;Product</small>
                                    </i>
                                        </Link>
                                    </button>

                                    {/* <div id='table' className="card pt-2 mt-3 justify-content-center shadow px-2">
                                        <div className="table-responsive">
                                            <table
                                                className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-white home-chart">
                                                
                                                <thead>
                                                <tr>
                                                <th>S/N</th>
                                                    <th>Product&nbsp;Name</th>
                                                    <th>Description</th>
                                                    <th>Price</th>
                                                </tr>
                                                    
                                                </thead>
                                                <tbody> 
                                                    
                                                {this.state.products.map( product => {
                                                     return(

                                                        <tr>
                                                            <td>
                                                                {product.productid}
                                                            </td>
                                                            <td>
                                                                {product.name}
                                                            </td>
                                                            <td style={{maxWidth: "150px"}}>
                                                                {product.description}
                                                            </td>
                                                            <td>
                                                                {product.price}
                                                            </td>
                                                        </tr>
                                                     )
                                                    })  
                                                }  



                                       </tbody>
                                            </table>
                                        </div>
                                    </div> */}


                                    </div>
                                </div>
                            </div>

                    
                        </div>
        </div>
    )
}
}
export default withContext(ClientProfile);
