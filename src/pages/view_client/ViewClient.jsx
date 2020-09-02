import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {withContext} from '../../common/context';
import avatar from '../../assets/images/avatar.png'
import { HTTPURL, APIKEY } from '../../common/global_constant';


class ViewClient extends Component{
    constructor(props){
        super(props);
        console.log(this.props);
        this.state = {
            product: [],
            products: [],
            name: '',
            email: '',
            telephone: '',
            businessname: ''

        };
    }
   
    componentWillMount() {
        const clienId = this.props.location.pathname.split('/')[2];
        fetch(`${HTTPURL}clients/getclient?clientid=${clienId}&userid=${sessionStorage.getItem('userId')}`, {
            method: "GET",
            headers: { "api-key": APIKEY },
        }).then(res => res.json()).then(result => {
            if (result.status == true) {
                this.setState({ name: result.data.name, email: result.data.email, telephone: result.data.telephone, businessname: result.data.businessname })       
            }
         
        })
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

    edit() {
        // Make Form Editable
        let edit = document.querySelector('#edit');
        let input = document.getElementsByTagName('input');


        for (let d = input.length - 1; d >= 0; d--) {
            edit.addEventListener("click", function (e) {
                input[d].removeAttribute("disabled");
            });
        };
    }

render() {
    return (
        <div className="container-fluid mx-auto">
            <div className="row mt-4">

                <div className="col-md-8 mb-3" id="profile">
                    <form action="">
                        <div className="card">
                            <div className="card-header bg-medium font-weight-bold text-dark">
                                CLIENT INFORMATION
                <span className="float-right" id='edit' style={{ cursor: 'pointer' }} onClick={this.edit}><i className="fas fa-pen-square fa-2x"></i>
                                </span>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                <div className="col-md-6 mb-0">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Name</label>
                                            <input type="text" className="form-control form-control-sm" name=""
                                                id="" value={this.state.name} placeholder="Name" autoComplete="name" disabled />
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-0">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Email</label>
                                            <input type="email" className="form-control form-control-sm" name=""
                                                id="" value={this.state.email} placeholder="johnDoe@mail.com" autoComplete="email" disabled />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-0">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Telephone</label>
                                            <input type="tel" className="form-control form-control-sm" name=""
                                                id="" value={this.state.telephone} placeholder="090 ......" autoComplete="tel" disabled />
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-0">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Company&nbsp;Name</label>
                                            <input type="text" className="form-control form-control-sm" name=""
                                                id="" value={this.state.businessname} placeholder="Company Name" autoComplete="name" disabled />
                                        </div>
                                    </div>


                                    <div className="col-md-6 mb-0">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Company&nbsp;Address</label>
                                            <input type="text" className="form-control form-control-sm" name=""
                                                id="" value="" placeholder="Company Address" autoComplete="text" disabled />
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-0">
                                        <div className="form-group">
                                            <label htmlFor="" className="sr-only">Image</label>
                                            <input type="file" className="form-file form-file-sm" name=""
                                                id="" placeholder="" />
                                        </div>
                                    </div>

                                    
                                    {/* <div className="col-md-12 mb-0">
                                        <div className="form-group">
                                            <textarea id="message" name="message" rows="5" cols="50" className="form-control text-left form-control-sm" 
                                            value="" required placeholder="Describe yourself" />
                                        </div>
                                    </div> */}

                                </div>


                            </div>

                            <div className="card-footer">
                                <div className="float-right">

                                    <button className="btn btn-sm btn-primary px-3">
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
                            <img src={avatar}
                                alt="profile picture" className=" rounded-circle" style={{ marginTop: '-80px', width:"105px", height:"105px" }} />
                                <h6 className="mt-3">{this.state.name}</h6>
                                <p className="mt-2"><i class="fa fa-map-marker" aria-hidden="true"></i> Lagos <br/>
                                <i class="fa fa-envelope" aria-hidden="true"></i> {this.state.email} </p>
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
                                <Link to={{ pathname: "/addclientproduct", search:this.props.location.pathname.split('/')[2] }}>
                                    <i className="fas fa-folder-plus" style={{color: '#fff'}} aria-hidden="true">
                                            <small className="newproduct" style={{color: '#fff'}}>&nbsp;Add&nbsp;New&nbsp;Product</small>
                                    </i>
                                        </Link>
                                    </button>

                                    {/* <div id='table' className="card pt-2 mt-3 justify-content-center shadow px-2">
                                        <div className="table-responsive">
                                            <table
                                                className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-dark home-chart">
                                               
                                                <thead>
                                                <tr>
                                                <th className="py-2">S/N</th>
                                                    <th className="py-2">Product&nbsp;Name</th>
                                                    <th className="py-2">Packages</th>
                                                    <th className="py-2">Price</th>
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
                                                                {product.packages}
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
                                    </div>
 */}

                                    </div>
                                </div>
                            </div>

                    
                        </div>
        </div>
    )
}
}
export default withContext(ViewClient);
