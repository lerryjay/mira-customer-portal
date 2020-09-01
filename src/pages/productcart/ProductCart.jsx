import React, { Component } from 'react';
import { HTTPURL } from '../../common/global_constant';
import {withContext} from '../../common/context';

class ProductCart extends Component{
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
        }
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
    // $(function(){
    //     $(".dropdown-menu").on('click', 'a', function(){
    //         $(this).parents('.dropdown').find('button').text($(this).text());
    //     });
    //  });
   
     render() {

        return (
            <div className="container">
                <div className="row mt-4">
    
                    <div className="col-md-12 mb-3" id="profile">
                        <form action="">
                            <div className="card home-chart">
                                <div className="card-header text-white">
                                    Product Cart
                </div>
                                <div className="card-body">
    
                                    <div id='table' className="card pt-2 mt-3 justify-content-center shadow px-2">
                                        <div className="table-responsive">
                                            <table
                                                className="table table-hover table-bordered table-sm text-center align-middle mb-0 text-white home-chart">
                                                {/* <caption>Hello World!</caption> */}
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
                                    </div>
    
    
                                </div>
    
                            </div>
                        </form>
                    </div>
                </div>
           
                <div className="overlay"></div>
    
    <div className="modal fade" id="viewproduct" tabIndex="-1" role="dialog" aria-labelledby="viewproductTitle"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form action="">
                        <div className="card">
                            <div className="card-header h6">
                                Create product
                            </div>
                            <div className="card-body">
    
                                <div className="row">
    
                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="">Email</label>
                                            <input type="text" className="form-control form-control-sm" name="" id=""
                                                value="Johndoe@mail.com" placeholder="" disabled/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="" className="">Subject</label>
                                            <input type="text" className="form-control form-control-sm" name="" id=""
                                                value="John" placeholder="" disabled/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="type" className="">product&nbsp;Type</label>
                                            <select name="type" id="type" className="form-select form-select-sm" disabled>
                                                <option value="" defaultValue disabled>--Select&nbsp;product&nbsp;Type--
                                                </option>
                                                <option value="complaint">complaint</option>
                                                <option value="request">Request</option>
                                                <option value="enquiry">Enquiry</option>
                                            </select>
                                        </div>
                                    </div>
    
                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="message">Message</label>
                                            <textarea id="message" name="message" rows="10" cols="50"
                                                className="form-control text-left" disabled>
    
                                        </textarea>
                                        </div>
                                    </div>
    
                                </div>
    
    
                            </div>
    
                        </div>
                    </form>
                </div>
    
            </div>
        </div>
    </div>
            </div>
        )
     }
       
}

export default withContext(ProductCart);